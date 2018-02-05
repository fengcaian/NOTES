define([''], function (){
    var module = angular.module('command-component',[]);
    /*module.service('deepCopy', function () {
        var _deepCopy = function (data) {

        }
    });*/
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
            replace: false,
            transclude: true,
            template: '<button type="{{option.type}}" class="btn btn-{{option.buttonClass}} btn-{{option.size}}">{{option.value}}' +
            '<span ng-transclude></span>' +
            '</button>',
            scope: {
                option: '=',
                data: '='
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
    module.directive('ccTree', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            template: '<table class="table table-bordered {{tableClass}}">' +
            '<tr><th ng-repeat="col in columns" style="width: {{col.width}}">{{col.label}}</th></tr>' +
            '<tr ng-show="data.isShow" ng-repeat="data in treeNodes" class="{{data.trClass}}">' +
            '<td ng-repeat="key in columnOrder track by $index">' +
            '<span ng-show="$index === 0" style="margin-left: {{data.level * 30 }}px"></span>' +
            '<span ng-show="$index === 0 && data.hasChildren" ng-class="{true:'+"'glyphicon glyphicon-triangle-bottom'"+",false:"+"'glyphicon glyphicon-triangle-right'}[data.isExpand]" +'" ng-click="toggleClick($event, data)"></span>' +
            '<span ng-show="$index === 0 && !data.hasChildren" style="margin-left: 14px"></span>' +
            '{{data[key]}}<a style="cursor: pointer; padding: 0 10px 0 5px" ng-show="key === '+"'operator'" +'" ng-repeat="action in columnActions" ng-click="action.click($event, data)">{{action.label}}</a></td>' +
            '</tr>' +
            '</table>',
            scope: {
                data: '=',
                columns: '=',
                isOpen: '=isOpen',
                tableClass: '=tableClass',
                trClass: '=trClass',
                columnActions: '=columnAction'
            },
            controller: function ($scope) {
                $scope.treeNodes = [];
                function _getTreeNodesFromData (data, p, le) {//源数据，父ID，层级
                    for (var i = 0, l = data.length; i < l; i ++) {
                        var node = JSON.parse(JSON.stringify(data[i]));
                        node.pId = p ? p : 'root';
                        node.level = le ? le : 0;
                        if (node.pId === 'root') {
                            node.isShow = true;
                        } else {
                            node.isShow = $scope.isOpen;
                        }

                        node.trClass = $scope.trClass + ' ' + node.trClass;
                        $scope.treeNodes.push(node);
                        if (data[i].children && data[i].children.length > 0) {
                            node.hasChildren = true;
                            node.isExpand = $scope.isOpen;
                            _getTreeNodesFromData(data[i].children, data[i].id, node.level+1);
                        }
                    }
                }
                Array.isArray($scope.data) && _getTreeNodesFromData($scope.data);
                console.log($scope.treeNodes);
                $scope.columnOrder = [];
                for (var j = 0, m = $scope.columns.length; j < m; j ++) {
                    $scope.columnOrder.push($scope.columns[j].key);
                }
            },
            link: function (scope, element) {
                scope.toggleClick = function (e, node) {
                    node.isExpand = !node.isExpand;
                    function _toggle(data, pId, pExpand) {
                        var n;
                        for (var i=0,l=data.length;i<l;i++) {
                            n = data[i];
                            if (n.pId === pId) {
                                n.isShow = pExpand;
                                if (!pExpand) {//打开和关闭节点的逻辑不同
                                    n.isExpand = pExpand;
                                    _toggle(scope.treeNodes, n.id, false);
                                }
                            }
                        }
                    }
                    _toggle(scope.treeNodes, node.id, node.isExpand);
                };
            }
        }
    });
    module.directive('ccBadge', function () {//该指令可嵌套在cc-button中使用，也可单独使用
        return {
            restrict: 'AE',
            replace: true,
            template: '<span class="badge" ng-bind="{{data}}"></span>',
            scope: {
                data: '='
            },
            link: function (scope, element) {

            }
        }
    });
    module.directive('ccTabs', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div ng-transclude>' +
            '</div>',
            transclude: true,
            scope: {

            },
            controller: function ($scope, $element, $transclude) {

            },
            link: function (scope, element, s, ctrl, transclude ){

            }
        }
    });
    module.directive('ccTab', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<ul class="nav nav-tabs" role="tablist" ng-transclude></ul>',
            scope: '',
            controller: function ($scope) {

            },
            link: function (scope, element) {

            }
        }
    });
    module.directive('ccTabHead', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<li role="presentation" ng-class="{true: '+"'active', false: ''"+'}[data.id === activeId]">' +
            '<a href="#{{data.href}}" aria-controls="{{data.href}}" role="tab" data-toggle="tab" ng-click="select()">{{data.label}}</a>' +
            '</li>\n',
            scope: {
                data: '=',
                activeId: '=activeId',
                ngSelect: '=ngSelect'
            },
            controller: function ($scope) {

            },
            link: function (scope, element) {
                $timeout(function () {
                    if (scope.activeId === scope.data.id) {
                        scope.select();
                    }
                }, 0);
                scope.select = function () {
                    scope.ngSelect && scope.ngSelect(scope.data);
                }
            }
        }
    }]);
    module.directive('ccContent', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: '<div class="tab-content" ng-transclude></div>'
        }
    });
    return module;
});