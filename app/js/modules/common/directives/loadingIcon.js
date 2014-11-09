define(function() {
    'use strict';

    // @name loadingIcon
    //
    // @description
    // make the element to be a loading icon
    //
    // @example
    // <div loading-icon></div>

    function loadingIcon() {
        return {
            link: function postLink(scope, element) {
                element.addClass('myx-common-spin-container').html('<div></div>');
            }
        };
    }
    return [loadingIcon];
});
