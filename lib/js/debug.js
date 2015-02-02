var Types = require('./datatypes.js')
var Pos = Types.Pos
var Bar = Types.Bar
var BarSeparator = Types.BarSeparator
var RowJump = Types.RowJump
var Signature = Types.Signature

function DEBUG_getItemClass(item) {
	switch(true) {
		case item instanceof Bar:         	return 'Bar'
		case item instanceof BarSeparator:	return 'BarSeparator'
		case item instanceof Pos:         	return 'Pos'
		case item instanceof RowJump:     	return 'RowJump'
		case item instanceof Signature:   	return 'Signature'
	}
}

function DEBUG_randomNote(item) {
	// get the note
	var noteNum = parseInt(Math.random() * 7)
	var note = "ABCDEFG"[noteNum]
	var alter = parseInt(Math.random() * 5)
	if (alter === 1) note += '#'
	else if (alter === 2) note += 'b'
	// else no alter
	// tierce
	var minor = parseInt(Math.random() * 2)
	if (minor) note += 'm'
	// septieme
	var sept = parseInt(Math.random() * 4)
	if (sept === 1) note += '7'
	else if (sept === 2) note += '7M'

	return note
}
