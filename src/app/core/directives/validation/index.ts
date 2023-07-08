import { mainModule } from '../../main.module';

mainModule.directive('yearOfPublishing', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.yearOfPublishing = function(modelValue, viewValue) {  
          if(viewValue < 1900 || viewValue > (new Date()).getFullYear) {
            return false
          }
          return true;
        };
      }
    };
  });
