var serializer = require('./serializer.js')

var DEFAULT_SIGNATURE_BEATS = 4
var DEFAULT_SIGNATURE_SIZE = 4

// -- DataTypes -------------------------------------------------------

function Pos(chord,beats) {
	this.chord = chord
	this.beats = beats || 1
}
Pos.prototype.serialize = function() {
	return serializer.serializePos(this)
}

function Signature(beats,size) {
	this.beats = beats || DEFAULT_SIGNATURE_BEATS
	this.size = size || DEFAULT_SIGNATURE_SIZE
}
Signature.prototype.serialize = function() {
	return serializer.serializeSignature(this)
}

function Bar(content,signature) {
	this.content = content
	this.beatsToAdd = signature.beats
	this.signature = signature
}
Bar.prototype.addPos = function(step) {
	this.beatsToAdd -= step.beats
	this.content.push(step)
}

function RowJump(){}
RowJump.prototype.serialize = function() {
	return serializer.serializeRowJump(this)
}

function BarSeparator(){}
// function RepeatLeft(){}
// function RepeatRight(){}
// RepeatLeft.prototype = new BarSeparator
// RepeatRight.prototype = new BarSeparator

module.exports.Pos = Pos
module.exports.Bar = Bar
module.exports.RowJump = RowJump
module.exports.Signature = Signature
module.exports.BarSeparator = BarSeparator
