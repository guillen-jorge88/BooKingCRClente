angular.module('bookinApp.auth.controllers', [])

.controller('AuthCtrl', function($scope,
                                  $rootScope,
                                  $ionicLoading,
                                  $cordovaToast,
                                  $window,
                                  $state,
                                  GetCountries,
                                  GetLanguages){    
    
    
    $scope.showLoadin = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="light"></ion-spinner><br /><span>Cargando...</span>',
            content: 'Cargando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        }).then(function(){
            console.log("No se muestra el indicador de carga");
        });
    };
    $scope.hideLoadin = function(){
        $ionicLoading.hide().then(function(){
            console.log("El indicador de carga está escondido");
        });
    };
    
    $scope.showToast = function(msg) {
        $cordovaToast.showLongBottom(msg).then(function(success) {
            console.log('Success');
        }, function (error) {
            console.log('Error');
        });
    };
    
})

.controller('WelcomeCtrl', function($scope,
                                     $ionicModal,
                                     show_hidden_actions,
                                     $state,
                                     $cordovaOauth,
                                     $window,
                                     $cordovaNetwork,
                                     GetClients,
                                     AddClient,
                                     GetCountries,
                                     GetLanguages){
    
    //$window.localStorage.clear();
    /*if($window.localStorage['client']){
        $state.go('app.categories');
        
    }*/
    
    //$window.localStorage['access_token'] = JSON.stringify(result.access_token);
    if(!$window.localStorage['countries']){
        GetCountries.get().$promise.then(function(data){
            $window.localStorage['countries'] = JSON.stringify(data.countries);
        });
    }else{
        
    }
    
    if(!$window.localStorage['languages']){
        GetLanguages.get().$promise.then(function(data){
            $window.localStorage['languages'] = JSON.stringify(data.languages);
        });
    }else{
        
    }
    
        
    
    
    $scope.goSignup = function(){
        // Usar En el dispositivo real
        /*var isOnline = $cordovaNetwork.isOnline();
        if(isOnline){
            $state.go('auth.signup');
        }else{
            $scope.showToast('Fallo la Conexión a Internet');
        }*/
        
        // Usar Ripple 
        $state.go('auth.signup');
    };   
    
    
    $scope.show_hidden_actions = show_hidden_actions;
    
    $scope.toggleHiddenActions = function(){
        $scope.show_hidden_actions = !$scope.show_hidden_actions;
    };
    
    $scope.facebookSignIn = function(){
		/*console.log("doing facebbok sign in");
		$state.go('app.shop.home');*/
        
        var CLIENT_ID_HERE = "1067235183327653";
        $cordovaOauth.facebook(CLIENT_ID_HERE, ["email",
												  "public_profile",
												  "user_friends"]).then(function(result) {
			alert(JSON.stringify(result));
			console.log(JSON.stringify(result));
            //$window.localStorage['access_token'] = JSON.stringify(result.access_token);
            
            $state.go('app.shop.home');
			
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        }); 
	};
    
    $scope.googleSignIn = function(){
		/*console.log("doing google sign in");
		$state.go('app.shop.home');*/
        
        $cordovaOauth.google("25002918116-n4l4sjhuip2sp9goke32pnr40pijkbu0.apps.googleusercontent.com", ['https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/urlshortener', 'https://www.googleapis.com/auth/userinfo.email']).then(function(result) {
            
			$window.localStorage['access_token'] = JSON.stringify(result.access_token);
            alert(JSON.stringify(result));
            $state.go('auth.welcome');
            
        }, function(error) {
            alert('Erroooor:'+error);
        });
	};
    
    
    /*$ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.privacy_policy_modal = modal;
    });
    
    $ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.terms_of_service_modal = modal;
    });
    
    $scope.showPrivacyPolicy = function() {
        $scope.privacy_policy_modal.show();
    };
    
    $scope.showTerms = function() {
        $scope.terms_of_service_modal.show();
    };*/
})

.controller('SignupCtrl', function($scope,
                                    $state,
                                    $cordovaDevice,
                                    $cordovaNetwork,
                                    $window,
                                    GetCountries,
                                    GetLanguages,
                                    GetClientsByEmail,
                                    AddClient){
    
        
    
    $scope.signup = {firstname:'', lastname:'', email:'', phone:'', language:'', country:'', password:''};
    
    $scope.countries = JSON.parse($window.localStorage['countries']);
    $scope.languages = JSON.parse($window.localStorage['languages']);
    
    $scope.postSignup = function(){
        console.log('$scope.signup');
        console.log($scope.signup);
        // Usar En el dispositivo real
        /*var isOnline = $cordovaNetwork.isOnline();
        if(isOnline){
            $scope.showLoadin();
            GetClientsByEmail.get({email: $scope.signup.email}).$promise.then(function(value){
                //$scope.likeService
                if(value.error == 1){
                    console.log('Get Clients By Email');
                    console.log(value);
                    AddClient.save($scope.signup).$promise.then(function(data){
                        console.log('add client');
                        console.log(data);
                        $scope.hideLoadin();
                        $scope.showToast('Usuario Agregado');
                        $state.go('auth.login');
                    });
                }
            });
        }else{
            $scope.showToast('Fallo la Conexión a Internet');
        }*/
        
        // Usar Ripple
        $scope.showLoadin();
        GetClientsByEmail.get({email: $scope.signup.email}).$promise.then(function(value){
            if(value.error == 1){
                console.log('Get Clients By Email');
                console.log(value);
                AddClient.save($scope.signup).$promise.then(function(data){
                    console.log('add client');
                    console.log(data);
                    $scope.hideLoadin();
                    $state.go('auth.login');
                });
            }
        });
    }
    
})

.controller('LoginCtrl', function($scope,
                                   $state,
                                   $window,
                                   $cordovaNetwork,
                                   GetClientsLogin){
    //$state.go('app.services');
    $scope.user = {
        email: '',
        password: ''
    }
    
    $scope.login = function(){
        console.log($scope.user);
        // Usar En el dispositivo real
        /*var isOnline = $cordovaNetwork.isOnline();
        if(isOnline){
            $scope.showLoadin();
            GetClientsLogin.get($scope.user).$promise.then(function(data){
                //console.log(data);

                if(data.error == 0){
                    $window.localStorage['client'] = JSON.stringify(data.clients);
                    console.log('access_token');
                    console.log($window.localStorage['access_token']);
                    $scope.hideLoadin();
                    $state.go('app.categories');

                }else if(data.error == 1){
                    $scope.hideLoadin();
                    $scope.showToast('Email ó Contraseña invalido');
                }
            });
        }else{
            $scope.showToast('Fallo la Conexión a Internet');
        }*/
        
        // Usar Ripple
        GetClientsLogin.get($scope.user).$promise.then(function(data){
            /*console.log('data.client');
            console.log(data);*/
            if(data.error == 0){
                $window.localStorage['client'] = JSON.stringify(data.clients);
                console.log('$window.localStorage[client]');
                console.log(JSON.parse($window.localStorage['client']));
                $scope.hideLoadin();
                $state.go('app.categories');
            }else if(data.error == 1){
                $scope.hideLoadin();
            }
        });
    }
});