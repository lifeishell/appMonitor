define(function() {
    function dialogService($document, $compile, $rootScope) {

        var body = $document.find('body');

        function createModalElement(templateUrl, scope) {
            function handleEscPressed() {
                if (event.keyCode === 27) {
                    scope.$close();
                }
            }

            var modalElement = angular.element('<div><div ng-include="\'' + templateUrl + '\'"></div></div>');

            body.bind('keydown', handleEscPressed);

            scope.$fireCallback = function(callbackName, params) {
                if (typeof(scope.callbacks[callbackName]) === 'function') {
                    scope.callbacks[callbackName](params);
                }
            };
            scope.$close = function() {
                body.unbind('keydown', handleEscPressed);
                modalElement.remove();
            };

            $compile(modalElement)(scope);
            body.append(modalElement);
        }

        return {
            // DialogService.showConfirm('Print Test Drive','Do you want to print?',function(){
            //     console.log("Yes Click!");
            // },function(){
            //     console.log("No Click!");
            // });
            showConfirm: function(title, message, yesCallback, noCallback) {
                this.showDialog(title, message, [{
                    name: '是',
                    'class': 'btn-primary',
                    callback: yesCallback
                }, {
                    name: '否',
                    'class': 'btn-default',
                    callback: noCallback
                }]);
            },

            showPrompt: function(title, message, input, yesCallback, noCallback) {
                this.showDialog(title, message, [{
                    name: '提交',
                    'class': 'btn-primary',
                    callback: yesCallback
                }, {
                    name: '取消',
                    'class': 'btn-default',
                    callback: noCallback
                }], 
                null, input);
            },

            // refer showConfirm
            showDialog: function(title, message, buttons, radioButtons, input) {
                var templateUrl = 'js/modules/common/templates/myxDialogBox.html';

                var scope = $rootScope.$new();
                scope.title = title;
                scope.message = message;
                scope.buttons = buttons;
                scope.radioButtons = radioButtons;
                scope.input = input;
                
                createModalElement(templateUrl, scope);
            },
            showModal: createModalElement
        };
    }

    return ['$document', '$compile', '$rootScope', dialogService];
});
