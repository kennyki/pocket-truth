angular.module('papaparse', [])

.factory('$papa', function($q) {

  return {

    /**
     * Wraps `Papa.parse(stringOrFileOrUrl, config)` in 
     */
    parse: function parse() {
      var stringOrFileOrUrl = arguments[0];
      // it's optional, but we might need it
      var config = arguments[1] = arguments[1] || {};
      var useCallbacks = stringOrFileOrUrl instanceof File || config.download;
      var deferred = $q.defer();

      if (useCallbacks) {
        // respect user-configured callbacks
        var customStep = angular.isFunction(config.step) ? config.step : angular.noop;
        var customComplete = angular.isFunction(config.complete) ? config.complete : angular.noop;
        var customError = angular.isFunction(config.error) ? config.error : angular.noop;

        config.step = function step() {
          customStep(arguments);
          deferred.notify(arguments);
        };
        config.complete = function complete() {
          customComplete(arguments);
          deferred.resolve(arguments);
        };
        config.error = function error() {
          customError(arguments);
          deferred.reject(arguments);
        };
      }

      // if the first param is csv string, it ignores the callbacks
      // so wrap it this way
      try {
        var results = Papa.parse.apply(Papa, arguments);

        if (!useCallbacks) {
          if (results.errors && results.errors.length !== 0) {
            deferred.reject(results);
          } else {
            deferred.resolve(results);
          }
        }
      } catch (ex) {
        deferred.reject(ex);
      }

      return deferred.promise;
    }

  };

})

;