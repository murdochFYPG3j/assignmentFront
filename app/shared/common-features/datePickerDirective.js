var _dateFormat = 'DD MMM YYYY',
    _monthFormat = 'MMM YYYY',
    _yearFormat = 'YYYY',
    _userEnterDateFormat = ['DD MM YYYY', 'DD MMM YYYY'],
    _userEnterMonthFormat = ['MM YYYY', 'MMM YYYY'],
    
    _serverDateFormat = 'YYYY-MM-DD HH:mm:ss.SSS',
    _serverMonthFormat = 'YYYY-DD-MM HH:mm:ss.SSS';

angular.module('was-admin').directive('vwDatepicker', function ($timeout) {
    return {
        require: ['?ngModel', '?^form'],
        restrict: 'A',
        scope: {
            format: '@',
            displayFormat: '@',
            acceptedFormat: '@',
            serverFormat: '@',
            endOfDate: '@',
            ignoreReadonly: '=',
        },
        link: function (scope, element, attrs, ctrls) {

            var ngModelCtrl = ctrls[0];
            var form = ctrls[1];

            var displayDateTimeFormat = scope.format ? scope.format : (scope.displayFormat ? scope.displayFormat : _dateFormat);
            var acceptedDateTimeFormat = scope.format ? scope.format : (scope.acceptedFormat ? scope.acceptedFormat : _userEnterDateFormat);
            var serverDateFormat = scope.serverFormat ? scope.serverFormat : _serverDateFormat;
            var ignoreReadonly = scope.ignoreReadonly ? scope.ignoreReadonly : false;

            var options = {
                format: displayDateTimeFormat,
                ignoreReadonly: ignoreReadonly,
                useCurrent: false,
                sideBySide: true,
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                },
                keyBinds: 't: '//this to overwrite the default keyBinds t to today date
            };

            element.attr('autocomplete', 'off');

            element
                .on('dp.change change', function (e) {
                if (ngModelCtrl) {
                    e.target.value = moment(e.target.value, acceptedDateTimeFormat).format(options.format);

                    $timeout(function () {
                        if (e.target.value) {
                            var serverDate;
                            if (scope.endOfDate && scope.endOfDate === 'true') {
                                serverDate = moment(e.target.value, acceptedDateTimeFormat).endOf('day').format(serverDateFormat);
                            }
                            else {
                                serverDate = moment(e.target.value, acceptedDateTimeFormat).format(serverDateFormat);
                            }
                           
                            
                            ngModelCtrl.$setViewValue(serverDate);
                        }
                    });
                }
            }).on("dp.show", function (e) {
                if (attrs.doNotReattach == undefined) {
                    var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
                    var position = widget.offset();
                    widget.detach();
                    widget.appendTo("body");
                    widget.css(position);
                    widget.css({
                        "z-index": 9999
                    });
                }
            })
            .datetimepicker(options);

            function setPickerValue() {
                var displayDate = null;
                var serverDate = null;


                if (ngModelCtrl && ngModelCtrl.$viewValue) {
                    displayDate = moment(ngModelCtrl.$viewValue, serverDateFormat).format(displayDateTimeFormat);

                    if (scope.endOfDate && scope.endOfDate === 'true') {
                        serverDate = moment(displayDate, displayDateTimeFormat).endOf('day').format(serverDateFormat);
                    }
                    else {
                        serverDate = moment(displayDate, displayDateTimeFormat).format(serverDateFormat);
                    }

                  
                    
                    ngModelCtrl.$setViewValue(serverDate);

                    if(form && attrs.doPristince!= undefined){
                        form.$setPristine();
                    }


                }

                element
                    .data('DateTimePicker')
                    .date(displayDate);
            }

            if (ngModelCtrl) {
                ngModelCtrl.$render = function () {
                    setPickerValue();
                };
            }
            //setPickerValue();
        }
    };
});

angular.module('was-admin').directive('vwMonthpicker', function ($timeout) {
    return {
        require: ['?ngModel', '?^form'],
        restrict: 'A',
        scope: {
            format: '@',
            displayFormat: '@',
            acceptedFormat: '@',
            serverFormat: '@',
            endOfDate: '@',
            ignoreReadonly: '=',
        },
        link: function (scope, element, attrs, ctrls) {

            var ngModelCtrl = ctrls[0];
            var form = ctrls[1];

            var displayDateTimeFormat = scope.format ? scope.format : (scope.displayFormat ? scope.displayFormat : _monthFormat);
            var acceptedDateTimeFormat = scope.format ? scope.format : (scope.acceptedFormat ? scope.acceptedFormat : _userEnterMonthFormat);
            var serverDateFormat = scope.serverFormat ? scope.serverFormat : _serverDateFormat;
            var ignoreReadonly = scope.ignoreReadonly ? scope.ignoreReadonly : false;

            var options = {
                viewMode: 'months',
                format: displayDateTimeFormat,
                ignoreReadonly: ignoreReadonly,
                useCurrent: false,
                sideBySide: true,
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                },
                keyBinds: 't: '//this to overwrite the default keyBinds t to today date
            };

            element.attr('autocomplete', 'off');

            element
                .on('dp.change change', function (e) {
                if (ngModelCtrl) {
                    e.target.value = moment(e.target.value, acceptedDateTimeFormat).format(options.format);

                    $timeout(function () {
                        if (e.target.value) {
                            var serverDate;
                            
                            serverDate = moment(e.target.value, acceptedDateTimeFormat).format(serverDateFormat);

                          

                            ngModelCtrl.$setViewValue("2018-04-05 23:59:59.999");
                            
                            /*ngModelCtrl.$setViewValue(serverDate);*/
                        }
                    });
                }
            }).on("dp.show", function (e) {
                if (attrs.doNotReattach == undefined) {
                    var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
                    var position = widget.offset();
                    widget.detach();
                    widget.appendTo("body");
                    widget.css(position);
                    widget.css({
                        "z-index": 9999
                    });
                }
            })
                .datetimepicker(options);

            function setPickerValue() {
                var displayDate = null;
                var serverDate = null;
                var helloTest = null;

                if (ngModelCtrl && ngModelCtrl.$viewValue) {
                    helloTest = moment(ngModelCtrl.$viewValue, serverDateFormat);
                    
                  
                    
                    displayDate = helloTest.format(displayDateTimeFormat);

                    if (scope.endOfDate && scope.endOfDate === 'true') {
                        serverDate = moment(displayDate, displayDateTimeFormat).endOf('day').format(serverDateFormat);
                    }
                    else {
                        serverDate = moment(displayDate, displayDateTimeFormat).format(serverDateFormat);
                    }

                    

                    ngModelCtrl.$setViewValue(serverDate);

                    if(form && attrs.doPristince!= undefined){
                        form.$setPristine();
                    }


                }

                element
                    .data('DateTimePicker')
                    .date(displayDate);
            }

            if (ngModelCtrl) {
                ngModelCtrl.$render = function () {
                    setPickerValue();
                };
            }
            //setPickerValue();
        }
    };
});

angular.module('was-admin').directive('vwYearpicker', function ($timeout) {
    return {
        require: ['?ngModel', '?^form'],
        restrict: 'A',
        scope: {
            format: '@',
            displayFormat: '@',
            acceptedFormat: '@',
            serverFormat: '@',
            endOfDate: '@',
            ignoreReadonly: '=',
        },
        link: function (scope, element, attrs, ctrls) {

            var ngModelCtrl = ctrls[0];
            var form = ctrls[1];

            var displayDateTimeFormat = scope.format ? scope.format : (scope.displayFormat ? scope.displayFormat : _yearFormat);
            var acceptedDateTimeFormat = scope.format ? scope.format : (scope.acceptedFormat ? scope.acceptedFormat : _userEnterDateFormat);
            var serverDateFormat = scope.serverFormat ? scope.serverFormat : _serverDateFormat;
            var ignoreReadonly = scope.ignoreReadonly ? scope.ignoreReadonly : false;

            var options = {
                viewMode: 'months',
                format: displayDateTimeFormat,
                ignoreReadonly: ignoreReadonly,
                useCurrent: false,
                sideBySide: true,
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                },
                keyBinds: 't: '//this to overwrite the default keyBinds t to today date
            };

            element.attr('autocomplete', 'off');

            element
                .on('dp.change change', function (e) {
                if (ngModelCtrl) {
                    e.target.value = moment(e.target.value, acceptedDateTimeFormat).format(options.format);

                    $timeout(function () {
                        if (e.target.value) {
                            var serverDate;
                            if (scope.endOfDate && scope.endOfDate === 'true') {
                                serverDate = moment(e.target.value, acceptedDateTimeFormat).endOf('day').format(serverDateFormat);
                            }
                            else {
                                serverDate = moment(e.target.value, acceptedDateTimeFormat).format(serverDateFormat);
                            }
                           

                            ngModelCtrl.$setViewValue(serverDate);
                        }
                    });
                }
            }).on("dp.show", function (e) {
                if (attrs.doNotReattach == undefined) {
                    var widget = $(this).siblings(".bootstrap-datetimepicker-widget");
                    var position = widget.offset();
                    widget.detach();
                    widget.appendTo("body");
                    widget.css(position);
                    widget.css({
                        "z-index": 9999
                    });
                }
            })
                .datetimepicker(options);

            function setPickerValue() {
                var displayDate = null;
                var serverDate = null;
                var helloTest = null;

                if (ngModelCtrl && ngModelCtrl.$viewValue) {
                    helloTest = moment(ngModelCtrl.$viewValue, serverDateFormat);



                    displayDate = helloTest.format(displayDateTimeFormat);

                    if (scope.endOfDate && scope.endOfDate === 'true') {
                        serverDate = moment(displayDate, displayDateTimeFormat).endOf('day').format(serverDateFormat);
                    }
                    else {
                        serverDate = moment(displayDate, displayDateTimeFormat).format(serverDateFormat);
                    }

                   

                    ngModelCtrl.$setViewValue(serverDate);

                    if(form && attrs.doPristince!= undefined){
                        form.$setPristine();
                    }


                }

                element
                    .data('DateTimePicker')
                    .date(displayDate);
            }

            if (ngModelCtrl) {
                ngModelCtrl.$render = function () {
                    setPickerValue();
                };
            }
            //setPickerValue();
        }
    };
});
