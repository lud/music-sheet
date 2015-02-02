var l = console.log.bind(console)

var renderer = require('./views.jsx')
var trackImex = require('./track-imex.js')
var Types = require('./datatypes.js')
var Pos = Types.Pos
var Bar = Types.Bar
var BarSeparator = Types.BarSeparator
var RowJump = Types.RowJump
var Signature = Types.Signature





// -- Transformers -----------------------------------------------------------

/**
 * Transforms a raw list of steps into Bar's (groups of Pos's). The other
 * types of step are not changed
 * @param  {Array}
 * @return {Array}
 */
function stepsToSongList(steps) {
	// ici on va créer les mesures en groupand chaque Pos jusqu'à ce
	// que la somme de leurs beats soit égale au beats de la signature
	// courante
	if (!steps.length) return []
	// On regarde si notre morceau commence par une signature. Si ce n'est
	// pas le cas on ajoute la signature par défaut
	var startSignature = (steps[0] instanceof Signature
							? steps.shift()
							: new Signature)
	// On commence à boucler sur tous nos steps. On retient la Signature
	// courante pour l'associer à chaque Bar
	var currentSig = startSignature
	var currentBar = new Bar([],currentSig)
	var list = [currentSig,currentBar]
	steps.forEach(function(step){
		if (step instanceof Pos) {
			if (step.beats > currentSig.beats) {
				throw new Error("Pos larger thant what bar signature allows",step,currentBar)
			}
			// si la Bar est complète (ou que la Pos ne rentre pas) on crée
			// une nouvelle Bar
			if (step.beats > currentBar.beatsToAdd) {
				currentBar = new Bar([],currentSig)
				list.push(currentBar)
			}
			// Enfin on ajoute la Pos à la Bar
			currentBar.addPos(step)
		}
		// quand on change de signature, on crée une nouvelle bar
		// automatiquement. La Signature est directement stockée dans la
		// liste renvoyée. De plus, elle devient la nouvelle currentSig
		else if (step instanceof Signature) {
			currentSig = step
			currentBar = new Bar([],currentSig)
			list.push(step)
			list.push(currentBar)
		}
		// Sinon c'est autre chose, un RowJump, une Coda ou autre, on le met
		// simplement dans la liste
		else {
			list.push(step)
		}
	})
	return list

}

/**
 * Prend une songlist (cf stepsToSongList) et renvoie les objets groupés
 * en Row's
 * @param  {Array}
 * @return {Array}
 */
function songListToRows (list) {
	if (!list.length) return []

	var currentRow = []
	var rows = [currentRow]
	list.forEach(function(item){
		// avant une Bar on met un BarSeparator
		if (item instanceof Bar) {
			currentRow.push(new BarSeparator)
		}
		// Si on a un rowjump, on change de row.
		if (item instanceof RowJump) {
			currentRow = []
			rows.push(currentRow)
		}
		// Si pas un RowJump, (Bar compris), on push l'item
		else {
			currentRow.push(item)
		}
	})
	// Enfin, on revoit now rows
	// Si l'une se finit par une Bar, on ajoute un BarSeparator
	rows.forEach(function(row){
		if (row[row.length-1] instanceof Bar) {
			row.push(new BarSeparator)
		} else {
			l('last item',row[row.length-1])
		}
	})
	l('rows',rows)
	return rows
}


// -- A P I ------------------------------------------------------------------

window.songplan = {
	renderTrack: function(track,DOMElement) {
		var rows = songListToRows(stepsToSongList(track.steps))
		var serialized = trackImex.serializeTrack(track)
		renderer.renderTrack(rows, track.title, serialized, DOMElement)
	},


	Types:Types
}
