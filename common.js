var url   = require('url');
var http  = require('http');
var https = require('https');

function tstamp() {
	return Math.round(Date.now() / 1000);
}

function winTimestamp() {
	var unixtimestamp = tstamp();
	return ((unixtimestamp + 11644477200) * 10000000);
}

function objSize(obj) {
	
	return Object.keys(obj).length;
}

function toArray(iterable) {
	var arr = [];

	Object.keys(iterable).forEach(function(k){
		arr.push(iterable[k]);
	});

	return arr;
}

function extend(dest) {
	var args = toArray(arguments);
	var target = args.shift();

	for(var i = 0; i < args.length; i++) {
		for(var key in args[i]) {
			if(args[i].hasOwnProperty(key)) {
				target[key] = args[i][key];
			}
		}
	}

	return target;
}

function fetch(target, callback) {
	var protocol = url.parse(target).protocol === 'https:' ? https : http;

	protocol.get(target, function(res) {
		var buffers = [];

		res.on('data', function(buf) {
			buffers.push(buf);
		});

		res.on('end', function() {
			callback(false, Buffer.concat(buffers));
		});
	}).on('error', function(e) {
		callback(e);
	});
}

function isWindows() {
	return /^win/.test(process.platform);;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.tstamp = tstamp;
exports.winTimestamp = winTimestamp;
exports.objSize = objSize;
exports.extend = extend;
exports.fetch = fetch;
exports.isWindows = isWindows;
exports.getRandomInt = getRandomInt;
