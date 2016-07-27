angular.module('bookinApp.app.factories', [])
.factory('Service', function($resource) {
    return $resource('data/services.json',{id:'@id'}, {
        'get': {method:'GET', isArray: false}
    });
})

.factory('Categories', function($resource,ApiEndpoint) {
    return $resource(ApiEndpoint.url + '/api/subasta/categories/categories.json',{id:'@id'}, {
        'get': {method:'GET', isArray: false}
    });
})

.factory('SubCategories', function($resource,ApiEndpoint) {
    return $resource(ApiEndpoint.url + '/api/subasta/categories/subcategories/:id_categoria',{id_categoria:'id_categoria'}, {
        'get': {method:'GET', isArray: false},
        'query':  {method:'GET', isArray:true},
    });
})

.factory('UdatePictureAvatar', function($http, ApiEndpoint,$resource) {
    return $resource(ApiEndpoint.url + '/api/subasta/update/update-avatar-picture',{},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('Auction', function($resource,ApiEndpoint) {
    return $resource(ApiEndpoint.url + '/api/subasta/services/services-id/:id_subcategoria',{id_subcategoria:'@id_subcategoria'}, {
        'get': {method:'GET', isArray: false},
        'query':  {method:'GET', isArray:true},
    });
});