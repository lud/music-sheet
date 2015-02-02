// Track Import / Export
var bencode = require('bencode-js')
var b64 = require('base64-url')

function serializeTrack(track) {
	var compressed = {
		t:track.title,
		s:track.steps.map(compressStep)
	}

	var url = window.location.href
	var url_parts = url.split('?')
	var main_url = url_parts[0]
	return  [
		main_url,
		'?t=',
		b64.encode(bencode.encode(compressed))
	].join('')
}

function compressStep(step) {
	return step.serialize()
}

module.exports.serializeTrack = serializeTrack
