angular.module('bookinApp.auth.factories', [])

.factory('GetCountries', function($http, ApiEndpoint,$resource) {
    return $resource(ApiEndpoint.url + '/api/subasta/countries/countries.json',{},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('GetLanguages', function($http, ApiEndpoint,$resource) {
    return $resource(ApiEndpoint.url + '/api/subasta/languages/languages.json',{},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('GetClients', function($http, ApiEndpoint,$resource) {
    return $resource(ApiEndpoint.url + '/api/subasta/clients/clients.json',{},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('GetClientsById', function($http, ApiEndpoint,$resource) {
    return $resource(ApiEndpoint.url + '/api/subasta/clients/client-id/:id',{id: '@id'},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('GetClientsByEmail', function($http, ApiEndpoint,$resource) {
    return $resource(ApiEndpoint.url + '/api/subasta/clients/client-email/:email',{email: '@email'},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('GetClientsLogin', function($http, ApiEndpoint,$resource) {
    return $resource(ApiEndpoint.url + '/api/subasta/clients/client-login/:email&:password',{email: '@email',password:'@password'},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('AddClient', function (ApiEndpoint,$resource,$http) {
        
    return $resource(ApiEndpoint.url +'/api/subasta/clients/add_client', {},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
})

.factory('UpdateClient', function (ApiEndpoint,$resource,$http) {
        
    return $resource(ApiEndpoint.url +'/api/subasta/clients/update_client', {},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'},
		'update': {method:'PUT'}
	});
});

/*
/api/subasta/clients/clients.json   -- get
/api/subasta/clients/client/:id     -- get by id
/api/subasta/clients/add_client     -- post
/api/subasta/clients/update_client  -- put
/api/subasta/clients/delete_client  -- delete
*/