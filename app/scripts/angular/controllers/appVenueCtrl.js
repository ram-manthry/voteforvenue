

(function () {

    angular.module('app.venue').controller('appVenueCtrl', appController);

    //appController.$inject = ['$scope', '$location'];

    function appController($scope) {

        var vm = this;
        vm.title = 'Vote for Venue';
        vm.eventTemplateUrl = 'views/event.html';
        vm.placesTemplateUrl = 'views/places.html'

        $scope.mainViewModel = vm;

    };

})();
