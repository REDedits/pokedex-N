angular.module('pokedexN')
.directive('bgImgDirective', function() {
	return function(scope, element, attrs) {
		var url = attrs.bgImgDirective;
		element.css({
			'background-image': 'url(' + url + ')',
			'background-repeat': 'no-repeat',
            'background-size': 'contain',
			'background-position': 'center'
		});
	};
});