
var m = require('mithril');

var Navbar = require('../components/Navbar.js');
var Auth = require('../models/Auth.js');
 
var Create = module.exports = {
  controller: function(){
    ctrl = this;
    ctrl.navbar = new Navbar.controller();
    ctrl.error = m.prop('');
    ctrl.list=m.prop('');
    ctrl.events=m.prop('');
    if (!Auth.token()) {
       m.route("/login")
    } 

    Auth.req({
      method: "GET",
      url: "/v1/event/",
     
    }).then(ctrl.events).then(function () {
      ctrl.list(
          m('.form-group', [
            m("label.sr-only[for='inputPassword']", "选择活动"),
            m('select.form-control', {name: "event_id"},

              ctrl.events().map(function (v) {
                var opts = {value: v.id};
                if (ctrl.events().indexOf(v) !== -1) opts.selected = 'selected';
                return m('option', opts, v.name);
              }))
          ])
          
      )
    })
    ctrl.save = function(e){
      e.preventDefault();
      
    // var file = e.dataTransfer.file[0]

    var data = new FormData(jQuery('form')[0]);
      
     //  //data.append("file", file)
    var len=jQuery('#files')[0].files.length
    if(len==0||len>3){
      alert("最少上传一张相片，最多上传三张");
      return;
    }
     // jQuery.each(jQuery('#files')[0].files, function(i, file) {
     //      data.append('file[]', file);
     //  });
     //alert(JSON.stringify(data))
      Auth.req({
          method: "POST",
          url: "/v1/activity/create",
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
      m("form.text-center.row.form-signin[enctype='multipart/form-data'][name=]", {onsubmit:ctrl.save.bind(ctrl)},
        m('.col-sm-6.col-sm-offset-3', [
          m("h1", "添加记录"),
          ctrl.error(),
          m('.form-group', [
            m("label.sr-only[for='inputEmail']", "车牌号"),
            m("input.form-control[name='code'][autofocus][id='inputEmail'][placeholder='车牌号'][required][type='text']"),
          ]),
          ctrl.list(),
          m('.form-group', [
            m("label.sr-only[for='inputPassword']", "姓名"),
            m("input.form-control[name='name'][autocomplete='off'][id='inputPassword'][placeholder='姓名'][required][type='text']"),
          ]),
          m('.form-group', [
            m("label.sr-only[for='inputTel']", "电话"),
            m("input.form-control[name='tel'][autocomplete='off'][id='inputTel'][placeholder='电话'][required][type='text']"),
          ]),
           
          // ctrl.uploads().files().map(function(file, index){
          //           return m('div.file-name', [
          //               m('span', file.name),
          //           ]);
          //       }),
          m('.form-group', [
            m('input.file-upload[type=file][name=files][multiple][id=files]')
         ]),
          m('.form-group',
            m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "保存")
          )
        ])
      )
    ])];
  }
};