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
    module.directive('ccButton', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<button type="{{option.type}}" class="btn btn-{{option.buttonClass}} btn-{{option.size}}">{{option.value}}</button>',
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
    module.directive('ccDropdown', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div style="margin-left: 100px" class="{{direction}}"><button class="btn btn-{{buttonclass}}{{size}} dropdown-toggle" type="button" id="cc-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span ng-bind="menutitle"></span><span class="caret"></span></button>' +
            '<ul class="dropdown-menu" aria-labelledby="cc-dropdown"></ul>' +
            '</div>',
            scope: {
                direction: '=',
                menutitle: '=',
                menuitems: '=',
                buttonclass: '=',
                size: '='
            },
            link: function (scope, element) {
                var direction = ['dropdown', 'dropup'];
                scope.direction = direction.indexOf(scope.direction) > -1 ? scope.direction : direction[0];
                scope.size = scope.size ? ' btn-'+scope.size : '';
                var ul = angular.element(element).find('ul');
                var items = scope.menuitems;
                for (var i=0,l=items.length; i<l; i++) {
                    var li = document.createElement('li');
                    if (items[i].type === 'action') {
                        var a = document.createElement('a'),
                        className = items[i].className ? items[i].className : '';
                        if (items[i].disabled) {//li添加disabled的class,且让a标签失效（去掉其href）
                            className += 'disabled';
                            a.href = '#';
                        } else {
                            a.href = items[i].url ? items[i].url : '#';
                            items[i].target && (a.target = items[i].target);
                        }
                        a.innerHTML = items[i].label;
                        li.className = className;
                        items[i].click && (li.onclick = (function (i) {
                            return function (e) {
                                items[i].click.call(this, e);
                            }
                        })(i));
                        li.append(a);
                    } else if (items[i].type === 'divider') {
                        li.role = 'separator';
                        li.className = 'divider';
                    } else if (items[i].type === 'header') {
                        li.className = 'dropdown-header '+ items[i].className;
                        li.innerHTML = items[i].label;
                    }
                    ul[0].append(li);
                }

            }
        }
    });
    module.directive('ccTable', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<table class="table">' +
            '<tr><th ng-repeat="col in columns">{{col.label}}</th></tr>' +
            '<tr ng-repeat="data in datas"><td ng-repeat="d in data"></td></tr>' +
            '</table>',
            scope: {
                datas: '=',
                columns: '='
            },
            link: function (scope, element) {

            }
        }
    });
    return module;
});