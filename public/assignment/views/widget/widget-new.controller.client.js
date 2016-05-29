
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController(WidgetService, $routeParams, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        var wid = $routeParams.wid;
        vm.websiteId = wid;
        var pid = $routeParams.pid;
        vm.pageId = pid;
        var type = $routeParams.type;
        vm.title = "New Widget";
        vm.widgetType = type.toLowerCase();
        vm.goBack = goBack;
        vm.createWidget = createWidget;

        function goBack() {
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/new")
        }
        
        function createWidget() {
            var unique = Date.now();
            unique = unique.toString();
            if (vm.widgetType == "HEADER") {
                createHeader(id);
            } else if (vm.widgetType == "IMAGE") {
                createImage(id);
            } else if (vm.widgetType == "YOUTUBE") {
                createYouTube(id);
            }
        }
        
        function createHeader(id) {
            var header = {"_id": id, "name": vm.widget.name, widgetType: "HEADER", 
                "text": vm.widget.text, "size": vm.widget.size};
            WidgetService.createWidget(pid, header);
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/")
        }

        function createImage(id) {
            var image = {"_id": id, "name": vm.widget.name, widgetType: "IMAGE", 
                "text": vm.widget.text, "width": vm.widget.width, "url": vm.widget.url};
            WidgetService.createWidget(pid, image);
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/")
        }

        function createYouTube(id) {
            var youtube = {"_id": id, "name": vm.widget.name, widgetType: "IMAGE", 
                "text": vm.widget.text, "width": vm.widget.width, "url": vm.widget.url};
            WidgetService.createWidget(pid, youtube);
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/")
        }


        function createWebsite(name, description) {
            if(name) {
                var unique = Date.now();
                unique = unique.toString();
                var website = {"_id": unique, "name": name};
                WebsiteService.createWebsite(uid, website);
                $location.url("/user/" + uid + "/website")
            } else {
                vm.missingName = "Name field must not be empty"
            }
        }


    }

})();