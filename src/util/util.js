angular.module('pocket-truth.util', [])

.factory('Notify', function($ionicLoading, $ionicPopup) {

  return {

    toast: function toast(msg, duration, position) {
      $ionicLoading.hide();

      if (!window.plugins.toast) {
        return alert(msg);
      }

      window.plugins.toast.show(msg, duration || 'short', position || 'bottom');
    },

    error: function error(reason) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Error',
        template: angular.isString(reason) ? reason : JSON.stringify(reason),
        okType: 'button-assertive'
      });
    },

    loading: function loading(show) {
      if (!show) {
        return $ionicLoading.hide();
      }

      return $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner>'
      });
    }

  };

})

;