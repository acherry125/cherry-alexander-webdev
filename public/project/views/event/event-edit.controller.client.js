(function() {
    angular
        .module("EventHorizon")
        .controller("EventEditController", EventEditController);


    function EventEditController($routeParams, $location, $rootScope, EventService) {
        vm = this;
        var eventId = $routeParams.eid;
        vm.eid = eventId;
        vm.user = $rootScope.currentUser;
        vm.updateEvent = updateEvent;
        vm.deleteEvent = deleteEvent;
        var verifyEvent = verifyEvent;



        function init() {
            EventService
                .findEventById(eventId)
                .then(
                    function(response) {
                        response.data.date = new Date(response.data.date);
                        vm.event = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        init();
        
        function updateEvent() {
            if(verifyEvent(vm.event)) {
                EventService
                    .updateEvent(eventId, vm.event)
                    .then(
                        function(response) {
                            $location.url("/event/" + eventId);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }
        
        function deleteEvent() {
            EventService
                .removeEvent(eventId)
                .then(
                    function(response) {
                        $location.url("/organization/" + vm.event._organization);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function verifyEvent(event) {
            if(!event || !event.name) {
                vm.error = "Name field is required";
                return false;
            } else {
                vm.error = "";
                return true;
            }
        }

        

    }

})();