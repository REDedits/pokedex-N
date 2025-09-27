angular.module('pokedexN').controller('mainCtrl', function($scope, mainService) {



	$scope.getPokemon = function(testPokemon) {
		var pokePromise = mainService.getPokemon(testPokemon);
		pokePromise.then(function(response) {
			$scope.pokemon = {
				name: response.name,
				image: response.sprites.front_default,
				height: response.height,
				type: response.types
			}
			console.log($scope.pokemon);
		})
	}




})