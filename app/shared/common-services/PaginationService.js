angular.module('was-admin').service("PaginationService", function (Constants) {

    // initializing smart-table's tableState with pagination values, keep a copy of it in $scope, and return true if it is initialized already
    this.initPagination = function (ctrl, tableState) {
        if (angular.isUndefined(ctrl.tableState)) {
            tableState.pagination.start = ctrl.searchDTO.startIndex;
            tableState.pagination.number = ctrl.searchDTO.pageSize;
            ctrl.tableState = tableState;
            return false;
        }
        return true;
    };

    // resetting smart-table pagination values (note: tableState should have been initialized and kept in $scope by now)
    this.resetPagination = function (ctrl, startIndex, pageSize) {
        ctrl.tableState.sort.reverse = undefined;
        ctrl.tableState.sort.predicate = undefined;
        ctrl.tableState.pagination.start = startIndex;
        ctrl.tableState.pagination.number = pageSize;
        ctrl.tableState.pagination.numberOfPages = 0;
        ctrl.tableState.pagination.totalItemCount = 0;
        ctrl.records = [];
    };

    // setting smart-table's tableState with pagination values
    this.setPaginationSearch = function (ctrl, tableState) {

        ctrl.searchDTO.startIndex = tableState.pagination.start;
        ctrl.searchDTO.pageSize = angular.isUndefined(tableState.pagination.number) ? Constants.PAGE_SIZE : tableState.pagination.number;
        ctrl.searchDTO.order = tableState.sort.reverse ? "desc" : "asc";
        ctrl.searchDTO.orderProperty = tableState.sort.predicate;

        //the reason to have a new variable assigned because the predicateObject will not have property with null value when its value is null
        ctrl.mergedSearchDTO = angular.merge({}, ctrl.searchDTO, tableState.search.predicateObject);

    };

    // setting smart-table's records (asynchronously call requires data to be separated) 
    this.setPaginationResult = function (ctrl, tableState, data) {
        ctrl.records = data[0].records;
        tableState.pagination.numberOfPages = data[0].noOfPages;
        tableState.pagination.totalItemCount = data[0].total;
    };

});
