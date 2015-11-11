var m = require('mithril');

var Navbar = require('../components/Navbar.js');
var Auth = require('../models/Auth.js');

var Login = module.exports = {
  controller: function(){
    var ctrl = this;
    ctrl.navbar = new Navbar.controller();
    ctrl.error = m.prop('');
    this.login = function(e){
      e.preventDefault();
      Auth.login(e.target.name.value, e.target.password.value)
        .then(function(){
          m.route(Auth.originalRoute || '/', null, true);
        }, function(err){
          ctrl.error(m(".alert.alert-danger.animated.fadeInUp", '用户名或密码不正确'));
        });
    };
  },

  view: function(ctrl){
    return [Navbar.view(ctrl.navbar), m(".container", [
      m("form.text-center.row.form-signin", {onsubmit:ctrl.login.bind(ctrl)},
        m('.col-sm-6.col-sm-offset-3', [
          m("h1", "登录"),
          ctrl.error(),
          m('.form-group', [
            m("label.sr-only[for='inputEmail']", "用户名"),
            m("input.form-control[name='name'][autofocus][id='inputEmail'][placeholder='用户名'][required][type='text']"),
          ]),
          m('.form-group', [
            m("label.sr-only[for='inputPassword']", "密码"),
            m("input.form-control[name='password'][autocomplete='off'][id='inputPassword'][placeholder='密码'][required][type='password']"),
          ]),
          m('.form-group',
            m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "登录")
          )
        ])
      )
    ])];
  }
};