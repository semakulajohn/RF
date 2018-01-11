function configState($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(false);
    
    // Set default state
    $urlRouterProvider

        .otherwise("/dashboard");  

    $stateProvider
          // Dashboard - Main page
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/app/views/dashboard.html",
            data: {
                pageTitle: 'Dashboard',
               
            }
        })
   
         .state('login', {
             url: "/login",
             templateUrl: "/app/views/adminAccount/login/login.html",
             data: {
                 //pageTitle: 'Profile'
             }
         })
              // User Profile page
    .state('profile', {
        url: "/profile",
        templateUrl: "/app/views/_common/profile.html",
        data: {
            pageTitle: 'Profile'
        }
    })
     

    

          // Modules section 


   //rentals
     .state('rentals', {
         abstract: true,
         url: "/rentals",
         templateUrl: "/app/views/_common/content_empty.html",
         data: {
             pageTitle: 'Rentals'
         }
     })

    .state('rentals.list', {
        url: "/rentals",
        templateUrl: "/app/views/rental/list.html",
        data: {
            pageTitle: 'Rentals',
        },
        controller: function ($scope, $stateParams) {

        }
    })

    .state('rental-edit', {
        url: "/rentals/:action/:rentalId",
        templateUrl: "/app/views/rental/edit.html",
        data: {
            pageTitle: 'Rental edit',
            pageDesc: ''
        },
        controller: function ($scope, $stateParams) {
            $scope.action = $stateParams.action;
            $scope.rentalId = $stateParams.rentalId;
            $scope.defaultTab = 'edit';
        }
    })
        

   
  
    
    //Search
    $stateProvider
    .state('search', {
        url: "/search/:q",
        templateUrl: "/app/views/search/index.html",
        data: {
            pageTitle: 'Search'
        },
        controller: function ($scope, $stateParams) {
            $scope.q = $stateParams.q;
        }
    })

}

angular
    .module('homer')
    .config(configState).run(function ($rootScope, $state) {
        $rootScope.$state = $state;
      
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            if (next.match("/UsersAdmin/")) {
                var parts = next.split('#');
                if (parts.length > 1) {
                    if (!next.match('#/dashboard')) {
                        window.location = '/#' + parts[1];
                    }
                }
            }
        });

    })
  