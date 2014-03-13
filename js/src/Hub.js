/**
* Hub - Like a pub/sub, but only one object.
* Mixin to your React component via React mixins.
* Any component which "is" a Hub can subscribe to events with this.on('eventName', this).
* Rather than passing a function, you pass yourself as a receiver and implement a 'onEventName' (Camel-case version of event name starting with 'on').
* Then any other "Hub" component can broadcast via this.publish('eventName', {...}) and pass a data object.
* Use the return value opf this.map('eventName', function(receiver) { return receiver.value(); }) to get a value from every receiver listening to 'eventName'.
* This is useful to collect a value from everyone such as requesting navigation or determining whether components are open or closed.
*/

module.exports = function() {
	var subscribers = {};

	return {
		on: function(event, receiver) {
			if (!subscribers[event]) {
				subscribers[event] = [];
			}
			subscribers[event].push(receiver);
		},
		off: function(event, receiver) {
			var array = subscribers[event];
			array.splice(array.indexOf(receiver), 1);
		},
		publish: function(event, data) {
			var eventHandler = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
			return this.map(event, function(sub) {
				sub[eventHandler].call(sub, data);
			});
		},
		map: function(event, fn) {
			var map = [];
			if (!subscribers[event]) {
				subscribers[event] = [];
			}
			for (var i=0; i<subscribers[event].length; i++) {
				map.push(fn.call(this, subscribers[event][i]));
			}
			return map;
		}
	};
};