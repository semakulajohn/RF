angular
    .module('homer')
    .controller('RentalEditController', ['$scope', '$http', '$filter', '$location', '$log', '$timeout', '$modal', '$state', 'uiGridConstants', '$interval', 
    function ($scope, $http, $filter, $location, $log, $timeout, $modal, $state, uiGridConstants, $interval) {

        $scope.tab = {};
        if ($scope.defaultTab == 'dashboard') {
            $scope.tab.dashboard = true;
        }

        var rentalId = $scope.rentalId;
        var action = $scope.action;
        
       
        if (action == 'create') {
            rentalId = 0;

            var promise = $http.get('/webapi/UserApi/GetLoggedInUser', {});
            promise.then(
                function (payload) {
                    var c = payload.data;

                    $scope.user = {
                        UserName: c.UserName,
                        Id: c.Id,
                        FirstName: c.FirstName,
                        LastName: c.LastName,
                        UserRoles: c.UserRoles,
                    };
                }

            );
        }

        if (action == 'edit') {

        

            var promise = $http.get('/webapi/RentalApi/GetRental?rentalId=' + rentalId, {});
            promise.then(
                function (payload) {
                    var m = payload.data;

                    $scope.rental = {
                        RentalId: m.rentalId,
                        Occupied:m.Occupied,
                        Description: m.Description,
                        Location: m.Location,
                        CategoryId : m.CategoryId,
                        RentFee:m.RentFee,
                        Timestamp: m.Timestamp,
                        NumberOfRooms: m.NumberOfRooms,
                        CreatedOn: m.CreatedOn,
                        CreatedBy: m.CreatedBy,
                        UpdatedBy: m.UpdatedBy,
                        

                    };

                });


        }
      
        $scope.Save = function (rental) {
            
                $scope.showMessageSave = false;
                if ($scope.form.$valid) {
                    var promise = $http.post('/webapi/RentalApi/Save', {
                        RentalId: rentalId,
                        Description: rental.Description,
                        CreatedBy: rental.CreatedBy,
                        CreatedOn: rental.CreatedOn,
                        Location: rental.Location,
                        NumberOfRooms: rental.NumberOfRooms,
                        RentFee: rental.RentFee,
                        CategoryId: rental.CategoryId,
                        Occupied : rental.Occupied,


                    });

                    promise.then(
                        function (payload) {

                            rentalId = payload.data;

                            $scope.showMessageSave = true;
                            
                            $timeout(function () {
                                $scope.showMessageSave = false;
                               

                                if (action == "create") {
                                    $state.go('rental-edit', { 'action': 'edit', 'rentalId': rentalId });
                                }

                            }, 1500);


                        });
                }

            }
        


        $scope.Cancel = function () {
            $state.go('rentals.list');

        };

        $scope.Delete = function (rentalId) {
            $scope.showMessageDeleted = false;
            var promise = $http.get('/webapi/RentalApi/Delete?rentalId=' + rentalId, {});
            promise.then(
                function (payload) {
                    $scope.showMessageDeleted = true;
                    $timeout(function () {
                        $scope.showMessageDeleted = false;
                        $scope.Cancel();
                    }, 2500);
                    $scope.showMessageDeleteFailed = false;
                },
                function (errorPayload) {
                    $scope.showMessageDeleteFailed = true;
                    $timeout(function () {
                        $scope.showMessageDeleteFailed = false;
                        $scope.Cancel();
                    }, 1500);
                });
        }

       
    }
    ]);


angular
    .module('homer').controller('RentalController', ['$scope', 'ngTableParams', '$http', '$filter', '$location', 'Utils', 'uiGridConstants',
        function ($scope, ngTableParams, $http, $filter, $location, Utils, uiGridConstants) {
            $scope.loadingSpinner = true;
            var promise = $http.get('/webapi/RentalApi/GetAllrentals');
            promise.then(
                function (payload) {
                    $scope.gridData.data = payload.data;
                    $scope.loadingSpinner = false;
                }
            );

            $scope.gridData = {
                enableFiltering: true,
                columnDefs: $scope.columns,
                enableRowSelection: true
            };

            $scope.gridData.multiSelect = true;

            $scope.gridData.columnDefs = [

                {
                    name: 'Description', cellTemplate: '<div class="ui-grid-cell-contents"> <a href="#/rentals/edit/{{row.entity.rentalId}}">{{row.entity.Description}}</a> </div>',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 1
                    }
                },
                  { name: 'Type', field: 'CategoryName' },

                { name: 'Rent Fee', field: 'RentFee' },

                 { name: 'Location', field: 'Location' },


                { name: 'Number Of Rooms', field: 'NumberOfRooms'   },

                  { name: 'Occupied', field: 'Occupied' },




            ];




        }]);


