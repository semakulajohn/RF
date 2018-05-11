angular
    .module('homer')
    .controller('RentalViewController', ['$scope', 'ngTableParams', '$http', '$filter', '$location', '$log', '$interval', '$timeout', 'resizeService', 'FileUploader', 'appSettingsService',
    function ($scope, ngTableParams, $http, $filter, $location, $log, $interval, $timeout, resizeService, FileUploader, appSettingsService) {
        var rentalId = $scope.rentalId;
        var action = $scope.action;

        var uploader = $scope.uploader = new FileUploader({
            url: '/upload/?parentId=' + $scope.mediaFolderId
        });

        $scope.mediaTypes = 2;

        var promise = $http.get('/webapi/RentalApi/GetRental?rentalId=' + rentalId, {});
        promise.then(
            function (payload) {
                var m = payload.data;

                $scope.rental = {
                    RentalId: m.RentalId,
                    Occupied: m.Occupied,
                    Description: m.Description,
                    Location: m.Location,
                    CategoryId: m.CategoryId,
                    RentFee: m.RentFee,
                    MediaFolderId: m.MediaFolderId,
                    Timestamp: m.Timestamp,
                    ContactNumber : m.ContactNumber,
                    NumberOfRooms: m.NumberOfRooms,
                    RentalImages : m.RentalImages,
                    CreatedOn: m.CreatedOn,
                    CreatedBy: m.CreatedBy,
                    UpdatedBy: m.UpdatedBy,


                };

            });




        //Images section
        $scope.showUploadFiles = true;

        var promise = $http.get('/webapi/MediaApi/GetFilesInFolder?folderId=' + $scope.mediaFolderId + '&mediaTypes=' + $scope.mediaTypes, {});
        promise.then(
            function (payload) {
                $scope.showFileProperties = false;
                // $scope.data = payload.data;
                $scope.rentalImages = payload.data;

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



    }
    ]);