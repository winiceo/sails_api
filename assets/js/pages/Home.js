var m = require('mithril');

var Navbar = require('../components/Navbar.js');
var Auth = require('../models/Auth.js');
var Helper = require('../models/Helper.js');
ok = !false;
var Home = module.exports = {
  controller: function () {
    var ctrl = this;
    ctrl.navbar = new Navbar.controller();
    ctrl.message = m.prop();
    ctrl.events = m.prop([])
    ctrl.list = m.prop([])
    ctrl.ok = !false;


    if (!Auth.token()) {
       m.route("/login")
    }  
    Auth.req({
      method: "GET",
      url: "/v1/event/",
     
    }).then(ctrl.events).then(function () {
      ctrl.list(
        m("form.text-center.row.form-signin", {onsubmit: ctrl.query.bind(ctrl)},
          m('.col-sm-4', [
            m("input.form-control[name='code'][autofocus][id='inputEmail'][placeholder='车牌号'][required][type='text']"),
          ]),
          m('.col-sm-4', [
            m('select.form-control', {name: "event_id"},

              ctrl.events().map(function (v) {
                var opts = {value: v.id};
                if (ctrl.events().indexOf(v) !== -1) opts.selected = 'selected';
                return m('option', opts, v.name);
              })),
          ]),
          m('.col-sm-4', [
            m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "查询")
          ])
        )
      )
    })


    this.query = function (e) {
      e.preventDefault();

      Auth.req({method: "POST", url: "/v1/activity/query", data: {code: e.target.code.value, event_id: e.target.event_id.value}}).then(function (res) {
        
        if (res.err_code == 0) {
          msg = "已经参加了此活动"
          ctrl.list(
            m('h1', msg)
          )
        } else {
          msg = "没有参加"
          ctrl.message([
            '没有参加此活动，可以添加',
            m('a[href="/create"]', {config: m.route}, '添加'),
            '.'
          ]);
          // ctrl.error(m(".alert.alert-danger.animated.fadeInUp", '用户名或密码不正确'));
          //m.route("/create", null, true);
        }
        
        
      })

       

    };
    

  },

  view: function (ctrl) {
    return [Navbar.view(ctrl.navbar), m('.container', [
      m('h1', '查询'),

      ctrl.list(),
      ctrl.message()

    ])];
  }
}

;
