var React = require('react')

var Types = require('./datatypes.js')
var Pos = Types.Pos
var Bar = Types.Bar
var BarSeparator = Types.BarSeparator
var RowJump = Types.RowJump
var Signature = Types.Signature


function get(k) {
	return function (o) { return o[k] }
}

var Paper = React.createClass({
	render: function() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<URLDisplay serialized={this.props.serialized}/>
				<Sheet {...this.props}/>
			</div>
		)
	}
})

var Sheet = React.createClass({
	render: function() {
		var rows = this.props.rows
		var htmlRows = rows.map(function(row) {
			return (
				<HtmlRow row={row}/>
			)
		})
		return (
			<div className="sheet">
				{htmlRows}
			</div>
		)
	}
})
var HtmlRow = React.createClass({
	render: function() {
		var htmlBars = this.props.row.map(function(e) {
			if (e instanceof Bar)
				return (<HtmlBar bar={e}/>)
			else if (e instanceof BarSeparator)
				return (<div className="sheet-bar-separator sheet-bar-sep"></div>)
			else if (e instanceof Signature)
				return (<HtmlSignature signature={e}/>)
		})
		return (
			<div className="sheet-row">
				{htmlBars}
			</div>
		)
	}
})
var HtmlBar = React.createClass({
	render: function() {
		var startAt = 0
		var htmlPoss = this.props.bar.content.map(function(step) {
			var html = (<HtmlPos startAt={startAt} step={step}/>)
			startAt += step.beats
			return html
		})
		return (
			<div className={this.getClassName()}>
				{htmlPoss}
			</div>
		)
	},
	getClassName: function() {
		var classes = [
			'sheet-bar',
			'bar-'+this.props.bar.signature.beats
		]
		if (this.props.bar.beatsToAdd !== 0) {
			// la mesure est incomplète ou trop grande
			classes.push('bad-bar')
		}
		classes.push('b_' + this.props.bar.content.map(get('beats')).join('-'))
		return classes.join(' ')
	}
})
var HtmlPos = React.createClass({
	render: function() {
		return (
			<div className={this.getClassName()}>
				{this.props.step.chord}
			</div>
		)
	},
	getClassName: function() {
		var classes = [
			'sheet-step',
			's_'+[this.props.startAt,this.props.step.beats].join('-')
		]
		return classes.join(' ')
	}
})
var HtmlSignature = React.createClass({
	render: function() {
		var s = this.props.signature
		return (
			<div className="sheet-signature">
			{s.beats}
				<br/>
			{s.size}
			</div>
		)
	}
})

var URLDisplay = React.createClass({
	render: function() {
		return (
			<div className="sheet-url">
				<input value={this.props.serialized} />
			</div>
		)
	}
})


module.exports.renderTrack = function(rows, title, serialized, DOMElement) {
	React.render(
		<Paper rows={rows} title={title} serialized={serialized}/>,
		DOMElement
	)
}
