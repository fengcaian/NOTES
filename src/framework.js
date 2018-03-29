define(['src/command-component/cmd-cmt'], function (cc) {
   var module = angular.module('framework',[cc.name, 'ui.router']);
    module.config(["$stateProvider", function ($stateProvider){
        $stateProvider.state("home", { //导航用的名字，如<a ui-sref="login">login</a>里的login
            url: '/home',    //访问路径
            template:'<div>home</div>'
        }).state('message', {
            url:'message',
            template: '<div>message</div>'
        }).state('profile', {
            url:'/profile',
            template: '<div>profile</div>'
        }).state('settings', {
            url:'/settings',
            template: '<div>settings</div>'
        })
    }]);
   module.controller('myController', ['$scope', '$state', 'ccModal', function ($scope, $state, ccModal) {
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
               ccModal.fun();
           }
       };
       $scope.btn = {
           type: 'button',
           buttonClass: 'primary',
           size: '',
           value: 'message',
           disabled: false,
           click: function (e) {
               console.log(this.type);
               console.log(e);
               cmdCmtService.fun();
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
               label: 'id',
               key: 'id',
               width: '10%'
           },
           {
               label: 'name',
               key: 'name',
               width: '20%'
           },
           {
               label: 'age',
               key: 'age',
               width: '10%'
           },
           {
               label: 'gender',
               key: 'gender',
               width: '10%'
           },
           {
               label: 'address',
               key: 'address',
               width: '30%'
           },
           {
               label: 'operator',
               key: 'operator',
               width: '20%'
           }
       ];
       $scope.tableData = {
           data: [
               {
                   id: 1,
                   name: 'xiaoming',
                   age: 11,
                   gender: 'male',
                   address: 'China'
               },
               {
                   id: 2,
                   name: 'xiaohua',
                   age: 12,
                   gender: 'female',
                   address: 'China'
               },
               {
                   id: 3,
                   name: 'xiaohong',
                   age: 13,
                   gender: 'female',
                   address: 'China'
               }
           ],
           columns: tableColumns
       };
       $scope.treeData = {
           data: [
               {
                   id: 1,
                   name: 'xiaoming',
                   age: 10,
                   gender: 'male',
                   address: 'China',
                   children: [
                       {
                           id: 2,
                           name: 'xiaoming',
                           age: 20,
                           gender: 'male',
                           children: [
                               {
                                   id: 3,
                                   name: 'xiaoming',
                                   age: 30,
                                   gender: 'male'
                               }
                           ]
                       },
                       {
                           id: 4,
                           name: 'xiaoming',
                           age: 40,
                           gender: 'male'
                       }
                   ]
               },
               {
                   id: 5,
                   name: 'xiaoming',
                   age: 50,
                   gender: 'male',
                   children: [
                       {
                           id: 6,
                           name: 'xiaoming',
                           age: 60,
                           gender: 'male'
                       }
                   ]
               },
               {
                   id: 7,
                   name: 'xiaoming',
                   age: 70,
                   gender: 'male',
                   children: []
               }
           ],
           isOpen: false,
           columns: tableColumns,
           tableClass: 'table-condensed table-hover',
           trClass: '',
           columnActions: [
               {
                   label: '增加',
                   click: function (e, data) {
                       console.log(data);
                   }
               },
               {
                   label: '删除',
                   click: function (e, data) {
                       console.log(data);
                   }
               }
           ]
       };
       $scope.badge = {
           data: 12
       };
       $scope.tabData = {
           activeId: 3,
           tabs: [
               {
                   id: 1,
                   label: 'Home',
                   href: 'home',
                   state: 'home'
               },
               {
                   id: 2,
                   label: 'Profile',
                   href: 'profile',
                   state: 'profile'
               },
               {
                   id: 3,
                   label: 'Messages',
                   href: 'messages',
                   state: 'message'
               },
               {
                   id: 4,
                   label: 'Settings',
                   href: 'settings',
                   state: 'settings'
               }
           ],
           select: function (tab) {
               $state.go(tab.state);
           }
       };
       $scope.tip = {
           title: '',
           content: 'And here\'s some amazing content. It\'s very engaging. Right?',
           isFocus: true,
           position: '',
           triggerEvent: 'click'
       };
       $scope.rightClick = function (event) {
           console.log(12345);
       }
   }]);
   return module;
});