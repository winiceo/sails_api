var m = require('mithril');

m.route.mode = 'hash';

m.route(document.body, "/", {
  "/": require('./pages/Home.js'),
  "/login": require('./pages/Login.js'),
  "/logout": require('./pages/Logout.js'),
  "/register": require('./pages/Register.js'),
  "/useradd": require('./pages/User.js'),
  "/create": require('./pages/Create.js')
 
});