(function() {
    angular
        .module("EventHorizon")
        .controller("EventAddController", EventAddController);


    function EventAddController($routeParams, $location, $rootScope, EventService) {
        var vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;
        vm.createEvent = createEvent;
        var googleSearchInit = googleSearchInit;

        vm.user = $rootScope.currentUser;
        vm.event = {};


        function init() {
            googleSearchInit();
        }

        init();

        function googleSearchInit() {

            var input = /** @type {HTMLInputElement} */(
                document.getElementById('event-location'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                var place_id = place.place_id;
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                var address = place.formatted_address;
                vm.event.location = {'address': address, 'place_id': place_id, 'lat': lat, 'lng': lng};
            });
        }

        function createEvent() {
            if(verifyEvent(vm.event)) {
                EventService
                    .createEvent(organizationId, vm.event)
                    .then(
                        function(response) {
                            $location.url("/event/" + response.data._id);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function verifyEvent(event) {
            if(!event) {
                vm.error = "Name, location, and date are required";
                return false;
            } else if (!event.name) {
                vm.error = "Name field is required";
                return false;
            } else if(!event.location && !event.date) {
                vm.error = "Location and Date are required";
                return false;
            } else if(!event.location) {
                vm.error = "Location is required";
                return false;
            } else if(!event.date) {
                vm.error = "Date is required";
                return false;
            } else {
                vm.error = "";
                return true;
            }
        }



    }

})();