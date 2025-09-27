angular.module('pokedexN').controller('characterCtrl', function($scope, mainService, $state, $stateParams) {
	
	var currentPokemon = $stateParams.name;
	
	$scope.getPokemon = function(testPokemon) {
		var pokePromise = mainService.getPokemon(testPokemon);
		pokePromise.then(function(response) {
			$scope.pokemon = {
				name: response.name,
				image: response.sprites.front_default,
				height: response.height,
				type: response.types,
				forms: response.forms,
				moves: response.moves
			};

			$scope.abilities = response.abilities;
			$scope.stats = response.stats;
			$scope.pTitle = response.name.toUpperCase();
			$scope.name = response.name;
			
		})
	}

	$scope.getPokemon($stateParams.id);

	$scope.bgImage = 'images/sprites-master/sprites/pokemon/other-sprites/official-artwork/'+ $stateParams.id + '.png';
	$scope.pmodel = 'images/sprites-master/sprites/pokemon/model/'+ $stateParams.id + '.png';


	$scope.getYtubeVids = function(ytPokeId) {
		var ytubePromise = mainService.getYtubeVids(ytPokeId);
		ytubePromise.then(function(response) {
			$scope.results = response;
			$scope.ytTitle1 = response[0].snippet.title;
			$scope.ytThumb1 = response[0].snippet.thumbnails.high.url;
			$scope.ytTitle2 = response[1].snippet.title;
			$scope.ytThumb2 = response[1].snippet.thumbnails.high.url;
			$scope.ytThumb3 = response[2].snippet.thumbnails.high.url;
			$scope.ytTitle3 = response[2].snippet.title;
			console.log(response);
		})

	}
	var srcYtTerm = 'Pokemon ' + currentPokemon + ' pokedex ' + 'clip';
	console.log(srcYtTerm);

	$scope.theVoice = 'Well done Pokemon Trainer, You caught yourself a ' + $scope.pTitle;
	$scope.voice = function(words) {
		words = $scope.theVoice = 'Well done Pokemon Trainer, You caught yourself a ' + $scope.name;
		responsiveVoice.speak(words , 'UK English Male')
	}

	$scope.getYtubeVids(srcYtTerm);

});