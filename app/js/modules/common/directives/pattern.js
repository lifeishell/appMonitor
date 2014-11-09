define(function() {
    'use strict';

    // @name pattern
    //
    // @description
    // Validates input against certain regexp
    // HTML5 pattern validation doesn't work in Safari - that's why we have to use a directive
    //
    // @example
    // <span ng-show="formName.inputName.$error.format" class="required-field">Error message</span>
    // <input type="text" name="inputName" myx-pattern="pattern">
    // needs to be inside a form with formName
    //
    // Predefined patterns: datetime, phone number, phone number or empty field, post code (German only)

    return [pattern];

    function pattern() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function postLink(scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }
                var isValid;

                switch (attrs.myxPattern) {
                    case 'datetime':
                        isValid = function(value) {
                            return /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\d)$/.test(value);
                        };
                        break;
                    case 'phone-number':
                        isValid = function(value) {
                            return /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/.test(value);
                        };
                        break;
                    case 'phone-number-empty':
                        isValid = function(value) {
                            var isPhoneNumber = /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/.test(value);
                            var isEmpty = /^$/.test(value);
                            return (isPhoneNumber || isEmpty);
                        };
                        break;
                    case 'post-code':
                        //only German for the moment
                        isValid = function(value) {
                            return /^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/.test(value);
                        };
                        break;
                    case 'number':
                        isValid = function(value) {
                            var isEmpty = /^$/.test(value);
                            var isNumber = /^\d+$/.test(value);
                            return isEmpty || isNumber;
                        };
                        break;
                    case 'positive-number':
                        isValid = function(value) {
                            var isEmpty = /^$/.test(value);
                            var isPositiveNumber = /^(\d*\.?\d*[0-9]+\d*)$/.test(value);
                            return isEmpty || isPositiveNumber;
                        };
                        break;
                    case 'url':
                        isValid = function(value) {
                            var isEmpty = /^$/.test(value);
                            var isURL = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?$/.test(value);
                            return isEmpty || isURL;
                        };
                        break;
                    case 'email-address':
                        isValid = function(value) {
                            var isEmailAdress = /^([\w.+-])+@([\w-])+((\.[\w-]{2,6}){1,4})$/.test(value);
                            return isEmailAdress;
                        };
                        break;
                    default:
                        isValid = function(value) {
                            return new RegExp(attrs.myxPattern).test(value);
                        };
                }

                ngModel.$parsers.push(function(value) {
                    var valid = isValid(value);

                    ngModel.$setValidity('format', valid);

                    return valid ? value : undefined;
                });
            }
        };
    }
});
