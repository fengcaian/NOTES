define([''], function (){
    var module = angular.module('command-component',[]);
    module.directive('ccSelect', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="col-xs-2">\n' +
            '    <select id="select" class="form-control">\n' +
            '        <option ng-repeat="o in option" value="{{o.value}}">{{o.label}}</option>\n' +
            '    </select>\n' +
            '</div>',
            scope: {
                option: '=?',
                change: '=',
                disabled: '='
            },
            controller: function ($scope) {
                console.log($scope);
            },
            link: function (scope, element) {
                var isDisabled = scope.disabled || false;
                var select = angular.element(element);
                select.find('select').attr('disabled',isDisabled);
                element.on('change', 'select',  function(e){
                    var oSelected = select.find("option:selected");
                    scope.change && scope.change({
                        label: oSelected.text(),
                        value: oSelected.val()
                    });
                });
            }
        }
    });
    return module;
});