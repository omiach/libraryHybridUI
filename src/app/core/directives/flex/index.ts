import { mainModule } from '../../main.module';

mainModule.directive('flexFill', function(){
    return {
        link: function(scope, element){
            element.addClass('flex-fill')
        }
    }
})
.directive('dFlex', function(){
    return {
        link: function(scope, element){
            element.addClass('d-flex')
        }
    }
})
.directive('alignItemsStretch', function(){
    return {
        link: function(scope, element){
            element.addClass('align-items-stretch');
        }
    }
})
.directive('flexFillChild', function(){
    return {
        link: function(scope, element){
            let child = element.children().eq(0);
            child.addClass('flex-fill')
        }
    }
})
.directive('dFlexChild', function(){
    return {
        link: function(scope, element){
            let child = element.children().eq(0);
            child.addClass('d-flex')
        }
    }
})
.directive('alignItemsStretchChild', function(){
    return {
        link: function(scope, element){
            let child = element.children().eq(0);
            child.addClass('align-items-stretch');
        }
    }
});
