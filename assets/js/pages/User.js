
var m = require('mithril');

var Navbar = require('../components/Navbar.js');
var Auth = require('../models/Auth.js');
 
var User = module.exports = {
  controller: function(){
    ctrl = this;
    ctrl.navbar = new Navbar.controller();
    ctrl.error = m.prop('');
    if (!Auth.token()) {
       m.route("/login")
    } 
    ctrl.save = function(e){
      e.preventDefault();
      
    // var file = e.dataTransfer.file[0]

    var data = new FormData(jQuery('form')[0]);
      
     //  //data.append("file", file)
     // jQuery.each(jQuery('#files')[0].files, function(i, file) {
     //      data.append('file[]', file);
     //  });
     //alert(JSON.stringify(data))
      m.request({
          method: "POST",
          url: "/v1/auth/signup",
          data:data,
          serialize: function(data) {
            return data
          }
      }).then(function(res){
        if(res.err_code==0){
          alert("提交成功")
        }else{
          alert("提交失败")
        }
        m.route("/")
      })

      // var data={
      //   code:e.target.code.value,
      //   name:e.target.name.value,
      //   tel:e.target.tel.value,
      //   imgs:e.target.files.value,
      // }
      // m.request({method: "POST", url: "/v1/activity/create", data:data}).then(function (res) {
        
      //   if (res.err_code == 0) {
      //     msg = "已经参加了此活动"
      //     alert("提交成功") 
      //   } else {
      //       alert("提交失败") 
      //   }
        
        
      // })
    };
  },

  view: function(ctrl){
    return [Navbar.view(ctrl.navbar), m(".container", [
      m("form.text-center.row.form-signin", {onsubmit:ctrl.save.bind(ctrl)},
        m('.col-sm-6.col-sm-offset-3', [
          m("h1", "添加用户"),
          ctrl.error(),
          m('.form-group', [
            m("label.sr-only[for='inputEmail']", "用户"),
            m("input.form-control[name='username'][autofocus][id='inputEmail'][placeholder='用户名'][required][type='text']"),
          ]),
          m('.form-group', [
            m("label.sr-only[for='inputPassword']", "密码"),
            m("input.form-control[name='password'][autocomplete='off'][id='inputPassword'][placeholder='密码'][required][type='text']"),
          ]),
          
          m('.form-group',
            m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "保存")
          )
        ])
      )
    ])];
  }
};