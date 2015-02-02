exports.serializePos = function(pos) {
	return ['p',pos.chord,pos.beats]
}
exports.serializeSignature = function(sig) {
	return ['s',sig.size,sig.beats]
}
exports.serializeRowJump = function(_) {
	return 'rj'
}
