var io = require('socket.io-client');

function HybridObject(url) {
	var that = this;
    this.listeners = {};
    this.object = io.connect(url || 'http://localhost:8081');
    this.object.on('connect', function(e) {

    });
    this.object.on('read', function(e) {
        console.log(e);
        if(that.listeners[e.obj+e.pos]) that.listeners[e.obj+e.pos](e)
    });

    this.write = function(obj, pos, value, mode)
    { 
    	if(!mode) mode = "f";
    	this.object.emit('write', {pos:pos, obj:obj, value:value , mode: mode}); };

    this.developer = function()
    { 
        this.object.emit('dev', {}); };

    this.add = function(obj, pos)
    { 
        this.object.emit('add', {pos:pos, obj:obj}); };

    this.read =  function(obj, IO, cb) {
        that.listeners[obj+IO] = cb;
    }
}

module.exports = HybridObject;