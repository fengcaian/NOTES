define(['src/command-component/cmd-cmt'], function (cc) {
   var module = angular.module('framework',[cc.name]);
   module.controller('myController', ['$scope', function ($scope) {
       $scope.balls = {
           placeholder: '-- 请选择 --',
           value: '',
           disabled: false,
           selectedId : '',
           column: '3',
           option: [
               {
                   id: '1',
                   label: '篮球',
                   value: 1
               },
               {
                   id: '2',
                   label: '足球',
                   value: '2'
               },
               {
                   id: '3',
                   label: '排球',
                   value: 3
               }
           ],
           change: function (e, option){
               console.log(this);
               console.log(option);
           }
       };
       $scope.btn = {
           type: 'button',
           buttonClass: 'primary',
           size: 'lg',
           value: '按钮',
           disabled: false,
           click: function (e) {
               console.log(this.type);
               console.log(e);
           }
       };
       $scope.dropdown = {
           direction: 'dropdown',
           menuTitle: 'Dropdown',
           buttonClass: 'primary',
           size: 'lg',
           menuItems: [{
               type: 'action',
               label: 'action1',
               className: '',
               disabled: true,
               url: 'www.baidu.com',
               target: '_self',
               click: function (e) {
                   console.log(1);
               }
           },{
               type: 'header',
               label: 'header1'
           },{
               type: 'action',
               label: 'action2',
               click: function (e) {
                   console.log(2);
               }
           },{
               type: 'action',
               label: 'action3',
               url: 'www.taobao.com',
               target: '_blank',
               click: function (e) {
                   console.log(3);
               }
           },{
               type: 'divider'
           },{
               type: 'header',
               label: 'header2'
           },{
               type: 'action',
               label: 'action4',
               disabled: true,
               click: function (e) {
                   console.log(4);
               }
           },{
               type: 'action',
               label: 'action5',
               click: function (e) {
                   console.log(5);
               }
           }]
       };
       var tableColumns = [
           {
               label: 'name'
           },
           {
               label: 'age'
           },
           {
               label: 'gender'
           },
           {
               label: 'address'
           },
           {
               label: 'operator'
           }
       ];
       $scope.tableData = {
           data: [
               {
                   name: 'xiaoming',
                   age: 11,
                   gender: 'male',
                   address: 'China'
               },
               {
                   name: 'xiaohua',
                   age: 12,
                   gender: 'female',
                   address: 'China'
               },
               {
                   name: 'xiaohong',
                   age: 13,
                   gender: 'female',
                   address: 'China'
               }
           ],
           columns: tableColumns
       }
   }]);
   return module;
});