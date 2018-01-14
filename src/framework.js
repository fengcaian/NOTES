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
           bClass: 'primary',
           size: 'lg',
           value: '按钮',
           disabled: false,
           click: function (e) {
               console.log(this.type);
               console.log(e);
           }
       }
   }]);
   return module;
});