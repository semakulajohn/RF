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


   //estates
     .state('estates', {
         abstract: true,
         url: "/estates",
         templateUrl: "/app/views/_common/content_empty.html",
         data: {
             pageTitle: 'Estates'
         }
     })

    .state('estates.list', {
        url: "/estates",
        templateUrl: "/app/views/estate/list.html",
        data: {
            pageTitle: 'Estates',
        },
        controller: function ($scope, $stateParams) {

        }
    })

    .state('estate-edit', {
        url: "/estates/:action/:estateId",
        templateUrl: "/app/views/estate/edit.html",
        data: {
            pageTitle: 'Estate edit',
            pageDesc: ''
        },
        controller: function ($scope, $stateParams) {
            $scope.action = $stateParams.action;
            $scope.estateId = $stateParams.estateId;
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
  