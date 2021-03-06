angular.module('pocket-truth', [
  'ionic',
  'ngCordova',
  'papaparse',
  // our compiled templates
  'templates',
  'pocket-truth.util',
  'pocket-truth.hymns'
])

.run(function($ionicPlatform, $rootScope, $ionicHistory, Notify) {
  Notify.loading(true);
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // https://github.com/angular-ui/ui-router/wiki#state-change-events
    // It's important to note that if you have any errors in your resolve functions
    // (javascript errors, non-existent services, etc) they will not throw traditionally.
    // You must listen for this $stateChangeError event to catch ALL errors.
    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
      Notify.error(error);
    });

    $rootScope.$on('$stateChangeStart', function(e, toState) {
      var toStateName = toState.name;

      if (toStateName === 'main') {
        // these 2 states should be the starting point
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }
    });

    Notify.loading(false);

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app.tpl.html',
    controller: 'AppController'
  });

  $urlRouterProvider.otherwise('/');
  
})

.controller('AppController', function($scope, Notify, Hymns, $state) {
  $scope.hymns = [];
  $scope.locale = 'zh-TW';

  Hymns.list($scope.locale).then(
    function success(list) {
      $scope.hymns = list;
    },
    Notify.error
  );

  $scope.viewHymn = function viewHymn(hymn) {
    $state.go('view', {
      locale: $scope.locale,
      number: hymn.number,
      numbercode: hymn.numbercode,
      title: hymn.title
    });
  };
})

;