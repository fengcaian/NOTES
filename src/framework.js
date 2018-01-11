define([''], ['command-component'], function (cc) {
   var module = angular.module('framework',['cc.name']);
   module.controller('myController', ['$scope', function ($scope) {
       $scope.balls = {
           placeholder: '-- 请选择 --',
           value: '',
           disabled: false,
           option: [
               {
                   label: '篮球',
                   value: 1
               },
               {
                   label: '足球',
                   value: 2
               },
               {
                   label: '排球',
                   value: 3
               }
           ],
           change: function (option){
               console.log(option);
           }
       };
   }]);
   return module;
});