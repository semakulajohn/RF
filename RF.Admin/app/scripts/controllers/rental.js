angular
    .module('homer')
    .controller('RentalEditController', ['$scope', 'ngTableParams', '$http', '$filter', '$location', '$log', '$timeout', '$modal', '$state', 'uiGridConstants', '$interval', 'resizeService', 'FileUploader', 'appSettingsService',
    function ($scope,ngTableParams, $http, $filter, $location, $log, $timeout, $modal, $state, uiGridConstants, $interval,resizeService, FileUploader, appSettingsService) {

        $scope.tab = {};
        if ($scope.defaultTab == 'dashboard') {
            $scope.tab.dashboard = true;
        }

        var rentalId = $scope.rentalId;
        var action = $scope.action;
        var uploader = $scope.uploader = new FileUploader({
            url: '/upload/?parentId=' + $scope.mediaFolderId
        });

        $scope.mediaTypes = 2;
        
        $http.get('/webapi/RentalApi/GetAllCategories').success(function (data, status) {
            $scope.categories = data;
        });
       
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
                        RentalId: m.RentalId,
                        Occupied:m.Occupied,
                        Description: m.Description,
                        Location: m.Location,
                        CategoryId : m.CategoryId,
                        RentFee: m.RentFee,
                        MediaFolderId:m.MediaFolderId,
                        Timestamp: m.Timestamp,
                        ContactNumber : m.ContactNumber,
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
                        ContactNumber:rental.ContactNumber,
                        NumberOfRooms: rental.NumberOfRooms,
                        RentFee: rental.RentFee,
                        CategoryId: rental.CategoryId,
                        Occupied: rental.Occupied,
                        MediaFolderId : rental.MediaFolderId,


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


        //Images section
        $scope.showUploadFiles = true;

        //Load files and display in table
        var promise = $http.get('/webapi/MediaApi/GetFilesInFolder?folderId=' + $scope.mediaFolderId + '&mediaTypes=' + $scope.mediaTypes, {});
        promise.then(
            function (payload) {
                //$scope.folder.Files = payload.data;
                $scope.showFileProperties = false;
                $scope.data = payload.data;

                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 20,          // count per page
                    sorting: {
                        Name: 'asc'     // initial sorting
                    }
                }, {
                    getData: function ($defer, params) {
                        var filteredData = $filter('filter')($scope.data, $scope.filter);
                        var orderedData = params.sorting() ?
                                            $filter('orderBy')(filteredData, params.orderBy()) :
                                            filteredData;
                        if (orderedData != null) {
                            params.total(orderedData.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    }
                });

            }
        );


        $scope.Preview = function (media) {
            appSettingsService.getAppSettingsAsync(function (data) {
                $window.open(data.SharedMediaFolder + '\\' + media.MediaId + '\\' + media.Name);
            });
        };

        $scope.basicResize = function (mediaId, src) {
            resizeService.resizeImage(src, { width: 100 }, function (err, image) {
                if (err) {
                    return;
                }
                var basicImgResizedWidth = document.createElement('img');
                basicImgResizedWidth.src = image;
                document.getElementById('img' + mediaId).appendChild(basicImgResizedWidth);
            });
        };

        $scope.CancelFileUpload = function () {
            $scope.showUploadFiles = false;
            uploader.clearQueue();
        }

        $scope.DeleteFile = function (media) {
            var promise = $http.get('/webapi/MediaApi/MarkAsDeleted?mediaId=' + media.MediaId + '&rnd=' + new Date().getTime(), {});
            promise.then(
                function (payload) {

                    var index = $scope.data.indexOf(media)
                    $scope.data.splice(index, 1);
                    $scope.tableParams.reload();

                    $scope.showFileDeleted = true;
                    $scope.showWarningDeleteFile = false;
                    $scope.showFileProperties = false;

                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.showFileDeleted = false;
                        });
                    }, 3000);


                }
            );
        }

        $scope.UploadFiles = function () {
            $scope.showUploadFiles = true;
        }

        var validFileTypes = '|jpg|jpeg|png|gif|bmp|';
        var validFileExtentions = ["bmp", "gif", "png", "jpg", "jpeg"];
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                var ext = item.name.substring(item.name.lastIndexOf(".") + 1, item.name.length).toLowerCase();
                if (validFileTypes.indexOf(type) !== -1 && validFileExtentions.indexOf(ext) !== -1)
                    return true;
                else
                    return false
            }
        });
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
        uploader.onCompleteAll = function () {

            //Load files and display in table
            var promise = $http.get('/webapi/MediaApi/GetFilesInFolder?folderId=' + $scope.mediaFolderId + '&mediaTypes=' + $scope.mediaTypes, {});
            promise.then(
                function (payload) {

                    $scope.data = payload.data; //$scope.data
                    $scope.showFileProperties = false;
                    $scope.tableParams.reload();
                }
            );
        };
       
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
                    name: 'Description', cellTemplate: '<div class="ui-grid-cell-contents"> <a href="#/rentals/edit/{{row.entity.RentalId}}/{{row.entity.MediaFolderId}}">{{row.entity.Description}}</a> </div>',
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 1
                    }
                },
                  { name: 'Type', field: 'CategoryName' },

                { name: 'Rent Fee', field: 'RentFee' },

                 { name: 'Location', field: 'Location' },

                 {name : 'Contact',field:'ContactNumber'},


                { name: 'Number Of Rooms', field: 'NumberOfRooms'   },

                  { name: 'Occupied', field: 'Occupied',
                    cellTemplate: '<div ng-if="row.entity.Occupied == 0" style="color:red"> Not Occupied</div><div ng-if="row.entity.Occupied == 1" style="color:green; font-size:17px">Occupied</div>'},




            ];




        }]);




