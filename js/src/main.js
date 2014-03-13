// composition root - top level place for creating app objects and composition
// use this notation to inject dependencies:
// var module1 = require('./path/to/module1.js')();
// var module2 = require('./path/to/module2.js')(module1);
// This way we never use "require" calls inside modules, only at this level and pass in dependencies

// application components
var router = new (require('./router.js')());

// ui components
// require any components used by App here first, and pass to apps dependencies
var App = require('./App.jsx')(router/*pass any components if required here*/);

// render app
React.renderComponent(
    App({}),
    document.getElementById('content')
);