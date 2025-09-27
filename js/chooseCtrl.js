angular.module('pokedexN').controller('chooseCtrl', function($scope, mainService, $timeout, $state, $stateParams) {
	var num = Math.floor(Math.random() * 4);

	$scope.starters = [
			{
				name: 'Bulbasaur',
				id: 1,
				image_front: 'images/sprites-master/sprites/pokemon/model/1.png',
				image_back: 'images/sprites-master/sprites/pokemon/back/1.png',
				bio: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger."
			}, {
				name: 'Charmander',
				id: 4,
				image_front: 'images/sprites-master/sprites/pokemon/model/4.png',
				image_back: 'images/sprites-master/sprites/pokemon/back/4.png',
				bio: "The flame that burns at the tip of its tail is an indication of it's emotions. The flame wavers when Charmander is enjoying itself. If the Pokemon becomes enraged, the flame burns fiercely."
			}, {
				name: 'Squirtle',
				id: 7,
				image_front: 'images/sprites-master/sprites/pokemon/model/7.png',
				image_back: 'images/sprites-master/sprites/pokemon/back/7.png',
				bio: "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistence in water, enabling this pokemon to swim at high speeds."
			}, { 
				name: 'Pikachu',
				id: 25,
				image_front: 'images/sprites-master/sprites/pokemon/model/25.png',
				image_back: 'images/sprites-master/sprites/pokemon/back/25.png',
				bio: "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokemon mistook the intensity of its charge."
			}
		];

	$scope.hidePokemon = true;
	$scope.hideForm = false;
	$scope.hideBattleBtn = true;
	$scope.secretPikachu = true;
	$scope.secretMewtwo = true;
	$scope.words = {
		greeting: "hello pokemon trainer. Please type your name into the Pokedex.",
		trainer: ""
	};

	$scope.pokemonBuddy = $scope.starters[num];
	

	$scope.bgImage = $scope.pokemonBuddy.image_front;
	$scope.words.details = $scope.pokemonBuddy.bio;
	
	$scope.voice = function() {
		var speak = mainService.getVoice;

			if($scope.words.trainer === "") {
				speak($scope.words.greeting);
			} 
			else if($scope.words.trainer !== "") {
				speak("Welcome " + $scope.words.trainer + " to the Pokemon chamber. Here you may choose your starter Pokemon");
				$scope.hideForm = true;
			}

		console.log(speak);
		
	}

	$timeout($scope.voice, 1000);

	$scope.update = function(user) {
		$scope.words.trainer = user;
		console.log(user);
		$scope.voice();
	}

	$scope.choice = function() {

		if($scope.words.trainer !== "") {
			$scope.hidePokemon = false;
			$scope.hideBattleBtn = false;
			$scope.words.madeChoice = "Congradulations Pokemon Trainer " + $scope.words.trainer + "! You have chosen a " + $scope.pokemonBuddy.name + " as your starter pokemon.";
			var speak = mainService.getVoice;
			speak($scope.words.madeChoice);
		}

	}

	$scope.updateDetails = function() {
		var speak = mainService.getVoice;
		speak($scope.words.details);
	}

	$scope.battle = function() {
		$state.go('catch', {id: $scope.pokemonBuddy.id, name: $scope.pokemonBuddy.name, trainer: $scope.words.trainer});
	}
	// on enter voice ask the pokemon trainer for his name, please type in input field

	//on enter or button press voice confirms name and asks the trainer to choose a starter pokemon
		//input field disappears

		//pokeballs become active links

	// on click choosen pokemon appears in center of stage

	// voice tells trainer about his starter pokemon
		//floating window containing all the information voice is saying in case no volume

});