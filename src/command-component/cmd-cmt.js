define([''], function (){
    var module = angular.module('command-component',[]);
    module.directive('ccSelect', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="col-xs-{{column || 1}}">\n' +
            '    <select class="form-control">\n' +
            '        <option ng-repeat="o in option" id="{{o.id}}" value="{{o.value}}">{{o.label}}</option>\n' +
            '    </select>\n' +
            '</div>',
            scope: {
                option: '=?',
                change: '=',
                disabled: '=',
                selectedId: '=',
                column: '='
            },
            controller: function ($scope) {
                console.log($scope);
            },
            link: function (scope, element) {
                scope.column = typeof(scope.column-0) === 'number' ? scope.column-0 : 1;
                var isDisabled = scope.disabled || false;
                var select = angular.element(element);
                //var op = document.getElementById('id').options;
                select.find('select').attr('disabled',isDisabled);
                /*for (var i=0, l=op.length; i<l; i++) {
                    var o = op[i];
                    if (scope.selectedId === o.id) {
                        o.selected = true;
                    }
                }*/
                element.on('change', 'select',  function(e){
                    var oSelected = select.find("option:selected");
                    scope.change && scope.change.call(this, e, {
                        label: oSelected.text(),
                        value: oSelected.val()
                    });
                });
            }
        }
    });
    module.directive('ccButton' ,function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<button type="{{option.type}}" class="btn btn-{{option.bClass}} btn-{{option.size}}">{{option.value}}</button>',
            scope: {
                option: '='
            },
            link: function (scope, element) {
                typeof scope.option.disabled === 'boolean' && scope.option.disabled && element.attr('disabled', 'disabled');
                element.bind('click', function (e){
                    scope.option.click && scope.option.click.call(this, e);
                })
            }
        }
    });
    return module;
});