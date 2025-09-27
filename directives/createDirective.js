angular.module('pokedexN')
.directive('createAnimate', function($compile) {
	return {
		restrict: 'AE',
		link: function(scope, element, attrs){

			var html = '<div id="throw-left"><div id="bouncer"><div class="pokeball-sprite"></div></div></div>',
			compileElem = $compile(html)(scope);
			console.log(compileElem);
			element.on('click', function(event) {
				if(!scope.isDisabled) {
					scope.isDisabled = true;
					var spawnElement = angular.element(document.getElementById("spawnPoint"));
					var targetArea = angular.element(document.getElementById("trgArea"));
					
						spawnElement.append(compileElem);
						console.log(element);
						setTimeout(function() {

							compileElem.remove();
							scope.isDisabled = false;
						
					}, 1800);
				}
			
				
			})
		}
	}
})