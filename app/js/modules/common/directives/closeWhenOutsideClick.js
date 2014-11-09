define(function(){
    'use strict';

    // @name myx-close-when-outside-click
    //
    // @description
    // Close the element when click outside the element
    //
    // @example
    // <div myx-close-when-outside-click show-property="openResults">
    //   <select chosen ng-model="selectedCompany" ng-show="openResulte" ng-options="company as company for company in companies"></select>
    // </div>

    function myxCloseWhenOutsideClick($document) {
        return {
            restrict: 'A',
            scope: {
                showProperty: '='
            },
            link: function (scope, element, attr) {
                $document.bind('click', function (event) {
                    var isClickedElementChildOfBox = element.find(event.target).length > 0;
                    if (isClickedElementChildOfBox)
                        return;
                    scope.showProperty = false;
                    scope.$apply();
                });
            }
        };
    }

    return ['$document', myxCloseWhenOutsideClick];
});