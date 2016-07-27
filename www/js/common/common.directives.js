angular.module('bookinApp.common.directives', [])

.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover',
                'background-repeat': 'no-repeat',
                'background-size':'100% 100%',
                'width':'100%',
                'height':'100%',
                'z-index': 1
            });
        });
    };
});
