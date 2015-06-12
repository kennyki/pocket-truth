angular.module('pocket-truth.hymns', [
  'pocket-truth.hymns.view'
])

.factory('Hymns', function($http, $q, $papa) {

  return {

    getInfo: function getInfo() {
      return $http.get('/assets/data/hymns.json').then(
        function(response) {
          return response.data;
        }
      );
    },

    list: function list(locale) {
      return $http.get('/assets/data/hymns/' + locale + '.json').then(
        function(response) {
          return response.data;
        }
      );
    },

    load: function load(locale, number) {
      return $http.get('/assets/data/hymns/' + locale + '/' + number + '.csv').then(
        function success(response) {
          return $papa.parse(response.data);
        }
      );
    }

  };

})

;