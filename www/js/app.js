angular.module('underscore', ['ionic'])
.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bookinApp', ['ionic','ionic.service.core',
                             'bookinApp.app.controllers',
                             'bookinApp.app.services', 
                             'bookinApp.app.factories',
                             'bookinApp.auth.controllers',
                             'bookinApp.auth.factories',
                             'bookinApp.common.directives',
                             'underscore', 
                             'ngResource',
                             'ngCordova',
                             'ionic.service.core',
                             'ionic.service.push',
                             'ngCordovaOauth',
                             'onezone-datepicker',
                             'ngRangeFilter',
                             'ionic-timepicker'
                            ])

.constant('ApiEndpoint', {
  url: 'http://localhost:8100/api'
})
// For the real endpoint, we'd use this
/*.constant('ApiEndpoint', {
    url: 'http://subastas-appibara.rhcloud.com'
})*/



.run(function($ionicPlatform, $rootScope, $http, $cordovaPushV5) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        
        // register push notification and get local push token
        window.localStorage.myPush = ''; // I use a localStorage variable to persist the token
        $cordovaPushV5.initialize(  // important to initialize with the multidevice structure !!
            {
                android: {
                    senderID: "43470988899"
                },
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false',
                    clearBadge: true
                },
                windows: {}
            }
        ).then(function (result) {
            $cordovaPushV5.onNotification();
            $cordovaPushV5.onError();
            $cordovaPushV5.register().then(function (resultreg) {
                window.localStorage.myPush = resultreg;
                // SEND THE TOKEN TO THE SERVER, best associated with your device id and user
            }, function (err) {
                // handle error
            });
        });
    });
    
    
})

.config(function($stateProvider, $urlRouterProvider) {
    var rute = '/auth/welcome';
    if(window.localStorage['client']){
        rute = '/app/categories';
    }
    
    $stateProvider
    
    // AUTH ROUTES
        .state('auth', {
            url: "/auth",
            templateUrl: "views/auth/auth.html",
            controller: "AuthCtrl",
            abstract: true
        })
        
        .state('auth.welcome', {
            url: '/welcome',
            templateUrl: "views/auth/welcome.html",
            controller: 'WelcomeCtrl',
            resolve: {
                show_hidden_actions: function(){
                    return false;
                }
            }
        })
        
        .state('auth.signup', {
            url: '/signup',
            templateUrl: "views/auth/signup.html",
            controller: 'SignupCtrl'
        })
        
        .state('auth.login', {
            url: '/login',
            templateUrl: "views/auth/login.html",
            controller: 'LoginCtrl'
        })
    
    // END AUTH ROUTES
    
    // APP ROUTES
    
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/app/menu.html',
            controller: 'AppCtrl'
        })
        
        .state('app.categories', {
            url: '/categories',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/categories.html',
                    controller: "CategoriesCtrl"
                }
            }
        })
        
        .state('app.subcategorieslist', {
            url: "/subcategorieslist/:categoryId",
            views: {
                'menuContent': {
                    templateUrl: 'views/app/subcategories.html',
                    controller: "SubCategoriesListCtrl"
                }
            }
        })
        
        .state('app.auction', {
            url: '/auction/:subCategoryId',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/auction.html',
                    controller: "AuctionCtrl"
                }
            }
        })
        
        /*.state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/settings.html',
                    controller: "SettingsCtrl"
                }
            }
        })
        
        .state('app.playlists', {
            url: '/playlists',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/playlists.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })
        
        .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
                'menuContent': {
                    templateUrl: 'views/app/playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        })*/;
    
    // END APP ROUTES
    
    /*$stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        
        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search.html'
                }
            }
        })
        
        .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        
        .state('app.playlists', {
            url: '/playlists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlists.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })
        
        .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        });*/
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(rute);
});
