define(function(){
    return LayoutContainer;

    function LayoutContainer(){
        // Base container that can be locked and resized
        function BaseContainer() {
            this.size = 0;
            this.maxSize = null;
            this.minSize = 0;
            this.resizable = true;
            this.locked = false;
            this.element = null;
            this.collapsed = false;
        }
        // Splitbar container
        function SplitbarContainer() {
            this.size = 10;
            this.left = 0;
            this.top = 0;
            this.element = null;
        }
        return {
            Container: function (initialSize) {
                return new BaseContainer(initialSize);
            },
            Splitbar: function () {
                return new SplitbarContainer();
            },
            isSplitbar: function (container) {
                return container instanceof SplitbarContainer;
            }
        };
    }
});