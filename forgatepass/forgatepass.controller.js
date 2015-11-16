(function () {
    'use strict';

    angular
        .module('app')
        .controller('forgatepassController', forgatepassController);

    forgatepassController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function forgatepassController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.forgatepass = forgatepass;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function forgatepass() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
