angular.module('was-admin').service("MomentDateService", function ($q) {

    /*
     * This Service is desiged to convert between a user friendly date format, and the format accepted by AbstractJackson2HttpMessageConverter
     *
     * For dates that are to be sent to the webservice use the methods with a name containing "ToApi", depending on how detailed is the date.
     * For dates received from the webservice use the methods with a name containing "ToDisplay", depending on how detailed is the date.
     */

    // [ Constants ] ====================

    this.MOMENT_API_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
   
    this.MOMENT_DISPLAY_FORMAT = 'DD MMM YYYY';
    this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MIN_C = 'DD-MMM-YYYY';
    this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MIN = 'DD MMM YYYY HH:mm';
    this.MOMENT_DISPLAY_FORMAT_WITH_TIME_SEC = 'DD MMM YYYY HH:mm:ss';
    this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MSEC = 'DD MMM YYYY HH:mm:ss.SSS';

    // [ Manipulate ] ====================

    /**
     * Converts the moment date to a date with zero time.
     */
    this.momentTimeToZero = function (momentTime) {
        if (!momentTime) {
            momentTime = moment();
        }

        return momentTime.set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
    };

    // [ Now ] ====================

    /**
     * Get the current date as the date with day precision display format.
     */
    this.momentNowAsDisplay = function () {
        return moment().format(this.MOMENT_DISPLAY_FORMAT);
    };

    /**
     * Get the current date as the date with minutes precision display format.
     */
    this.momentNowAsDisplayMin = function () {
        return moment().format(this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MIN);
    };

    /**
     * Get the current date as the date with seconds precision display format.
     */
    this.momentNowAsDisplaySec = function () {
        return moment().format(this.MOMENT_DISPLAY_FORMAT_WITH_TIME_SEC);
    };

    /**
     * Get the current date as the date with milliseconds precision display format.
     */
    this.momentNowAsDisplaySec = function () {
        return moment().format(this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MSEC);
    };

    /**
     * Get the current date as the API datetime format
     */
    this.momentNowAsApi = function () {
        return moment().format(this.MOMENT_API_FORMAT);
    };

    /**
     * Get the current date as the API datetime format, with time set to zero
     */
    this.momentNowAsApiZeroTime = function () {
        return this.momentTimeToZero().format(this.MOMENT_API_FORMAT);
    };

    // [ Convert String to Moment ] ====================

    /**
     * Converts the API datetime to the date with day precision display format.
     */
    this.apiToMoment = function (dateToParse) {
        return parseDateStr(dateToParse, this.MOMENT_API_FORMAT, false);
    };

    /**
     * Converts the API datetime to the date with day precision display format.
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictApiToMoment = function (dateToParse) {
        return parseDateStr(dateToParse, this.MOMENT_API_FORMAT, true);
    };

    /**
     * Converts the API datetime to the date with day precision display format.
     */
    this.displayToMoment = function (dateToParse) {
        return parseDateStr(dateToParse, this.MOMENT_DISPLAY_FORMAT, false);
    };

    /**
     * Converts the API datetime to the date with day precision display format.
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictDisplayToMoment = function (dateToParse) {
        return parseDateStr(dateToParse, this.MOMENT_DISPLAY_FORMAT, true);
    };

    // [ Convert String/Moment to String ] ====================

    /**
     * Converts the API datetime to the date with day precision display format.
     */
    this.momentApiToDisplay = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT, false);
    };

    /**
     * Converts the API datetime to the date with day precision display format.
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentApiToDisplay = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT, true);
    };

    /**
     * Converts the date with day precision display format to API datetime (time will be set to zero)
     */
    this.momentDisplayToApi = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT, this.MOMENT_API_FORMAT, false);
    };

    /**
     * Converts the date with day precision display format to API datetime (time will be set to zero)
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentDisplayToApi = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT, this.MOMENT_API_FORMAT, true);
    };

    /**
     * Converts the API datetime to the date with minutes precision display format.
     */
    this.momentApiToDisplayWithTimeMin = function (dateToConvert) {
        
        
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MIN_C, false);
    };

    /**
     * Converts the API datetime to the date with minutes precision display format.
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentApiToDisplayWithTimeMin = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MIN, true);
    };

    /**
     * Converts the date with minutes precision display format to API datetime (seconds and milliseconds will be set to zero)
     */
    this.momentDisplayToApiWithTimeMin = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MIN_C, this.MOMENT_API_FORMAT, false);
    };

    /**
     * Converts the date with minutes precision display format to API datetime (seconds and milliseconds will be set to zero)
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentDisplayToApiWithTimeMin = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MIN, this.MOMENT_API_FORMAT, true);
    };

    /**
     * Converts the API datetime to the date with seconds precision display format.
     */
    this.momentApiToDisplayWithTimeSec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_SEC, false);
    };

    /**
     * Converts the API datetime to the date with seconds precision display format.
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentApiToDisplayWithTimeSec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_SEC, true);
    };

    /**
     * Converts the date with seconds precision display format to API datetime (milliseconds will be set to zero)
     */
    this.momentDisplayToApiWithTimeSec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_SEC, this.MOMENT_API_FORMAT, false);
    };

    /**
     * Converts the date with seconds precision display format to API datetime (milliseconds will be set to zero)
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentDisplayToApiWithTimeSec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_SEC, this.MOMENT_API_FORMAT, true);
    };

    /**
     * Converts the API datetime to the date with milliseconds precision display format.
     */
    this.momentApiToDisplayWithTimeMillisec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MSEC, false);
    };

    /**
     * Converts the API datetime to the date with milliseconds precision display format.
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentApiToDisplayWithTimeMillisec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_API_FORMAT, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MSEC, true);
    };

    /**
     * Converts the date with milliseconds precision display format to API datetime
     */
    this.momentDisplayToApiWithTimeMillisec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MSEC, this.MOMENT_API_FORMAT, false);
    };

    /**
     * Converts the date with milliseconds precision display format to API datetime
     * Only use this strict version if you are going to handle the exceptions thrown. See: strictParse private method.
     */
    this.strictMomentDisplayToApiWithTimeMillisec = function (dateToConvert) {
        return convertDateStr(dateToConvert, this.MOMENT_DISPLAY_FORMAT_WITH_TIME_MSEC, this.MOMENT_API_FORMAT, true);
    };

    // [ Private Methods ] ====================

    /**
     * Ensures the dateToParse is not null and a matches the format string
     *
     * Throws object {msg: '', dateToParse: inputDate, format: formatExpected} when:
     * 1) dateToParse is null
     * 2) dateToParse does not match the format
     */
    var strictParse = function (dateToParse, format) {
        if (!dateToParse) {
            throw {
                msg: 'Null dateToParse',
                dateToParse: dateToParse,
                format: format
            };
        } else if (moment(dateToParse, format, true).isValid()) {
            return moment(dateToParse, format);
        } else {
            throw {
                msg: 'Invalid date format',
                dateToParse: dateToParse,
                format: format
            };
        }
    };

    /**
     * Allows all dateToConvert values, null will return as null.
     */
    var lenientParse = function (dateToParse, format) {
        if (!dateToParse) {
            return null;
        }
        return moment(dateToParse, format);
    };

    var parseDateStr = function (dateToConvert, format, isStrict) {
        if (isStrict) {
            return strictParse(dateToConvert, format);
        } else {
            return lenientParse(dateToConvert, format);
        }
    };

    var convertDateStr = function (dateToConvert, currFormat, newFormat, isStrict) {
        var formattedDate;
        if (isStrict) {
            formattedDate = strictParse(dateToConvert, currFormat);
        } else {
            formattedDate = lenientParse(dateToConvert, currFormat);
        }        
        return !!formattedDate ? formattedDate.format(newFormat) : null;
    };
});
