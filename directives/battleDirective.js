angular.module('pokedexN')
.directive('battleDirective', function() {
	return {
		restrict: 'EA',
		scope: {
			health: '=',
			name: '=',
            types: '=',
            atk: '=',
			def: '=',
            speed: '=',
            spAttack: '=',
            spDefense: '='
		},
		templateUrl: 'directives/templates/battle.html'
	}
})