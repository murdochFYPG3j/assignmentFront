angular.module('was-admin').directive('stInject', function () {
    return {
        restrict: 'A',
        require: '^stTable',
        scope: {
            stFilteredCollection: '=',
            stTableState: '='
        },
        controller: 'stTableController',
        link: function (scope, element, attr, ctrl) {

            scope.$watch(function () {
                scope.stFilteredCollection = ctrl.getFilteredCollection();
                scope.stTableState = ctrl.tableState();
                
            }, function (newValue, oldValue) {
                scope.filteredCollection = ctrl.getFilteredCollection();
                scope.stTableState = ctrl.tableState();
            });
        }
    };
});


angular.module("smart-table").directive("stResetSearch", function() {
    return {
        restrict: 'EA',
        require: '^stTable',
        link: function(scope, element, attrs, ctrl) {
            return element.bind('click', function() {
                return scope.$apply(function() {
                    var tableState;
                    tableState = ctrl.tableState();
                    tableState.search.predicateObject = {};
                    tableState.pagination.start = 0;
                    return ctrl.pipe();
                });
            });
        }
    };
});