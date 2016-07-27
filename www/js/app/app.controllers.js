angular.module('bookinApp.app.controllers', [])

.controller('AppCtrl', function($scope,
                                 $ionicModal,
                                 $timeout,
                                 $ionicPlatform,
                                 $ionicLoading,
                                 $cordovaToast,
                                 $window,
                                 $cordovaCamera,
                                 $state,$rootScope, $ionicUser, $ionicPush,
                                 UdatePictureAvatar,
                                 GetClientsById,
                                 ionicTimePicker) {
    
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    //$window.localStorage.clear();
    /*$ionicPlatform.onHardwareBackButton(function(){
        alert('Back');
        ionic.Platform.exitApp();
    });*/
    
    
    $scope.countries = JSON.parse($window.localStorage['countries']);
    $scope.languages = JSON.parse($window.localStorage['languages']);
    
    $scope.formRequestServices = {
        date: '',
        time:'',
        cantAdults: '',
        cantChildren: '',
        language: '',
        transport: '',
        reception: '',
        id_subcategoria: ''
    }
    
  // Form data for the login modal
    if($window.localStorage['client']){
        $scope.loginData = JSON.parse($window.localStorage['client']);
        console.log('$scope.loginData');
        console.log($scope.loginData);
    }
    
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('views/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  }

  // Open the login modal
  $scope.login = function(){
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    //console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }
    
    /*-----------------------------------------------------*/
    $scope.showLoadin = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="light"></ion-spinner><br /><span>Cargando...</span>',
            content: 'Cargando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        }).then(function(){
            //console.log("No se muestra el indicador de carga");
        });
    }
    $scope.hideLoadin = function(){
        $ionicLoading.hide().then(function(){
            //console.log("El indicador de carga está escondido");
        });
    }
    
    $scope.showToast = function(msg) {
        $cordovaToast.showLongBottom(msg).then(function(success) {
            console.log('Success');
        }, function (error) {
            console.log('Error');
        });
    }
    
    $scope.logout = function(){
        $window.localStorage.clear();
        console.log($window.localStorage['client']);
        $state.go('auth.welcome');
    }
    
    $scope.uploadAvatar = function(){
        
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        }
        $cordovaCamera.getPicture(options).then(function(imageData){
            //alert(imageData);
            var update = {
                id_cliente: $scope.loginData.id_cliente,
                picture: imageData
            }
            
            $scope.showLoadin();
            UdatePictureAvatar.update(update).$promise.then(function(data){

                if(data.error == 0){
                    //console.log('update data');
                    //console.log(data);
                    var id_cliente = data.clientUpdate[0].id_cliente;
                    GetClientsById.get({id:id_cliente}).$promise.then(function(data){
                        //console.log('get client by id data');
                        //console.log(data.clients[0]);
                        $window.localStorage['client'] = JSON.stringify(data.clients[0]);
                        $scope.loginData = JSON.parse($window.localStorage['client']);
                        $scope.hideLoadin();
                    });
                }else if(data.error == 1){
                    $scope.hideLoadin();
                    $scope.showToast('Error');
                }
            });
        },function(err){
            // An error occured. Show a message to the user
            console.log(err);
        });
    }
    
    /* ----------------------------- Modals ----------------------------- */
    $ionicModal.fromTemplateUrl('views/app/modals/modal-booking-conf.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalBooking = modal;
    });
    
    /* ----------------------------- Datepicker ----------------------------- */
    $scope.onezoneDatepicker = {
        date: new Date, // MANDATORY
        mondayFirst: false,
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviember', 'Diciembre'],
        daysOfTheWeek: ['Do', 'Lu', 'Mar', 'Mier', 'Ju', 'Vi', 'Sa'],
        startDate: new Date(1989, 1, 26),
        endDate: new Date(2024, 1, 26),
        disablePastDays: false,
        disableSwipe: false,
        disableWeekend: false,
        disableDates: [new Date (2016, 3, 19), new Date (2016, 6, 24)],
        disableDaysOfWeek: [0,6],
        showDatepicker: false,
        showTodayButton: true,
        calendarMode: false,
        hideCancelButton: false,
        hideSetButton: false,
        highlights: [
            {date:new Date (2016, 3, 19),color:'#8FD4D9',textColor: '#fff'},
            {date:new Date (2016, 6, 24),color:'#8FD4D9',textColor: '#fff'}
        ],
        callback: function(value){
            $scope.formRequestServices.date = value;
        }
    }
    
    /* ----------------------------- Timepicker ----------------------------- */
    $scope.ipObj = {
        inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),   //Optional
        format: 12,         //Optional
        step: 1,           //Optional
        setLabel: 'Seleccionar',    //Optional
        closeLabel: 'Cerrar',
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                $scope.selectedTime = new Date(val * 1000 );
                $scope.formRequestServices.time = $scope.selectedTime;
                console.log('Selected epoch is : ', val, 'and the time is ', $scope.selectedTime.getUTCHours(), 'H :', $scope.selectedTime.getUTCMinutes(), 'M');
                $scope.mind = 'am';
                $scope.hours = $scope.selectedTime.getUTCHours();
                $scope.minutes = $scope.selectedTime.getUTCMinutes();
                
                if($scope.hours == 0){
                    $scope.mind = 'am';
                    $scope.hours = $scope.selectedTime.getUTCHours() + 12;
                }
                
                if($scope.hours == 12){
                    $scope.mind = 'pm';
                }
                
                if($scope.minutes < 10){
                    $scope.minutes = '0' + $scope.selectedTime.getUTCMinutes();
                }
                
                if($scope.hours > 12){
                    $scope.hours = $scope.selectedTime.getUTCHours() - 12;
                    $scope.hours = '0' + $scope.hours;
                    $scope.mind = 'pm';
                }
            }
            
        }
    }
    
    $scope.openTimepicker = function(){
        ionicTimePicker.openTimePicker($scope.ipObj);
    }
    
    $scope.closeBookingConf = function(id_categoria){
        
        $scope.modalBooking.hide();
        $scope.formRequestServices = {
            date: '',
            time:'',
            cantAdults: '',
            cantChildren: '',
            language: '',
            transport: '',
            reception: ''
        }
    }
    
    
    
    $scope.goToAuction = function(){
        
        console.log($scope.formRequestServices);
        $scope.modalBooking.hide();
        $state.go('app.auction',{subCategoryId:$scope.formRequestServices.id_subcategoria});
    }
    
    
    
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope,
                                      $window,
                                      UpdateClient,
                                      GetClientsById) {
    /*$scope.countries = JSON.parse($window.localStorage['countries']);
    $scope.languages = JSON.parse($window.localStorage['languages']);*/
    
    $scope.setting = {id_cliente: $scope.loginData.id_cliente,
                      firstname: '',
                      lastname: '',
                      phone:  '',
                      language: '',
                      country: ''}
    
    $scope.postSetting = function(){
        console.log($scope.setting);
        $scope.showLoadin();
        UpdateClient.update($scope.setting).$promise.then(function(data){

                if(data.error == 0){
                    //console.log('update data');
                    //console.log(data);
                    var id_cliente = data.clientUpdate[0].id_cliente;
                    GetClientsById.get({id:id_cliente}).$promise.then(function(data){
                        //console.log('get client by id data');
                        //console.log(data.clients[0]);
                        $window.localStorage['client'] = JSON.stringify(data.clients[0]);
                        $scope.loginData = JSON.parse($window.localStorage['client']);
                        $scope.setting = {id_cliente: $scope.loginData.id_cliente,
                                          firstname: '',
                                          lastname: '',
                                          phone:  '',
                                          language: '',
                                          country: ''}
                        $scope.hideLoadin();
                        //$scope.showToast('Cliente Actualizado');
                    });
                }else if(data.error == 1){
                    $scope.hideLoadin();
                    $scope.showToast('Error');
                }
            })
    }
    
})

.controller('CategoriesCtrl', function($scope,
                                        Service,
                                        Categories,
                                        $window,
                                        ionicTimePicker) {
    
    
    if($window.localStorage['categories']){
        //console.log('local storage definisdo');
        $scope.categories = JSON.parse($window.localStorage['categories']);
    }else{
        //console.log('local storage NO definisdo');
        $scope.showLoadin();
        Categories.get(function(data){
            console.log('data.categories');
            console.log(data.categories);
            $window.localStorage['categories'] = JSON.stringify(data.categories);
            $scope.categories = JSON.parse($window.localStorage['categories']);
            console.log('$scope.categories');
            console.log($scope.categories);
            $scope.hideLoadin()
        });
    }
        
    
    
})

.controller('SubCategoriesListCtrl', function($scope,
                                               $stateParams,
                                               $state,
                                               Service,
                                               SubCategories) {
    var id = $stateParams.categoryId;
    /*console.log('id');
    console.log(id);*/
    
    $scope.showLoadin();
    SubCategories.get({id_categoria: id}).$promise.then(function(data){
        $scope.subcategories = data.subcategories;
        console.log('$scope.subcategories');
        console.log($scope.subcategories);
        $scope.hideLoadin();
    });
    
    $scope.openBookingConf = function(id_subcategoria){
        $scope.formRequestServices.id_subcategoria = id_subcategoria;
        console.log('id_subcategoria');
        console.log($scope.formRequestServices);
        $scope.modalBooking.show();
    }
    
    
    
})

.controller('AuctionCtrl', function($scope, $ionicNavBarDelegate, $stateParams, $ionicPopup, Auction) {
    //$ionicNavBarDelegate.showBackButton(false);
    console.log('$stateParams.subCategoryId');
    console.log($stateParams.subCategoryId);
    console.log($scope.formRequestServices);
    
    var id = $stateParams.subCategoryId;
    
    $scope.showLoadin();
    Auction.get({id_subcategoria: id}).$promise.then(function(data){
        $scope.auctionList = data.services;
        console.log('$scope.auctionList');
        console.log($scope.auctionList);
        $scope.hideLoadin();
    });
    
    /*$scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    }
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    }*/
    
})

.controller('ServiceCtrl', function($scope, $stateParams) {
    $scope.serviceslist = [
        { id:1, title: '',list:[{titulo:"titulo"},{title:"Montaña"}] },
        { id:2, title: 'Volcanes' },
        { id:3, title: 'Rios' },
        { id:4, title: 'Extremo' }
    ];
    /*console.log($stateParams);
    console.log($scope.serviceslist);*/
    
});
