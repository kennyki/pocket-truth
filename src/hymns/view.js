angular.module('pocket-truth.hymns.view', [])

.config(function($stateProvider) {
  $stateProvider.state('view', {
    url: '/view/:locale/:number/:numbercode/:title',
    templateUrl: 'hymns/view.tpl.html',
    controller: 'HymnController'
  });
})

.controller('HymnController', function($scope, $stateParams, Hymns, Notify) {
  var number = $stateParams.numbercode || $stateParams.number;
  var locale = $stateParams.locale;

  $scope.title =  $stateParams.number + ' ' + $stateParams.title;

  Hymns.load(locale, number).then(
    function success(results) {
      console.log(results);
    },
    Notify.error
  );
})

;