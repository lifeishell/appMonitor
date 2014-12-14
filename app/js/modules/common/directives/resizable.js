define(function(){
    return [Resizable];

    function Resizable(){
        var resizableConfig = {
            handles: 'e,n,ne',
            zIndex: 28,
            maxHeight: 600,
            maxWidth: 800
        };

        return {
            restrict: 'A',
            scope: {
                callback: '&onResize'
            },
            link: function postLink(scope, elem, attrs) {
                elem.resizable(resizableConfig);
                elem.on('resizestop', function (evt, ui) {
                    if (scope.callback) { scope.callback(); }
                });
            }
        };
    }
});