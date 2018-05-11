angular
    .module('homer').controller('RentalController', ['$scope', 'ngTableParams', '$http', '$filter', '$location', 'Utils', '$interval',
    function ($scope, ngTableParams, $http, $filter, $location, Utils, $interval) {
        var rentalId = $scope.rentalId;
        $scope.rentalId = rentalId;
        $scope.latestRentals = [];
        $scope.data = [];
        $scope.featuredRentals = [];
        
        var promise = $http.get('/webapi/RentalApi/GetAllRentals', {});
        promise.then(
            function (payload) {
                $scope.data = payload.data;
                $scope.tableParams = new ngTableParams({
                    page: 1,
                    count: 20,
                    sorting: { CreatedOn: 'desc' }
                }, {
                    getData: function ($defer, params) {
                        var filteredData = $filter('filter')($scope.data, $scope.filter);
                        var orderedData = params.sorting() ?
                                            $filter('orderBy')(filteredData, params.orderBy()) :
                                            filteredData;

                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    },
                    $scope: $scope
                });
            }
        );

        $scope.$watch("filter.$", function () {
            if (!Utils.isUndefinedOrNull($scope.tableParams)) {
                $scope.tableParams.reload();
            }
        });

        var latestRentalsPromise = $http.get('/webapi/RentalApi/GetLatestTenRentals', {});
        latestRentalsPromise.then(
            function (payload) {
                $scope.latestRentals = payload.data;
            }
        );

        var featuredRentalsPromise = $http.get('/webapi/RentalApi/GetFeaturedRentals', {});
        featuredRentalsPromise.then(
            function (payload) {
                $scope.featuredRentals = payload.data;
            }
        );


       

       

      
    }
    ]);


