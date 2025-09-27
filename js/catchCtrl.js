angular.module('pokedexN').controller('catchCtrl', function($scope, mainService, $state, $stateParams, $compile) {
	$scope.pokemon = [];
	$scope.health = '100%';
	$scope.bHealth = '100%';
	$scope.myBuddy = {
		id: $stateParams.id,
		name: $stateParams.name,
		trainer: $stateParams.trainer,
		image: 'images/sprites-master/sprites/pokemon/back/' + $stateParams.id + '.png'
	};
	$scope.trainer = {
				health: 500,
				att: 30,
				def: 30,
				roll: function() {
					var result = Math.floor(Math.random() * 6 + 1);
					return result;
				}
			}; 
	$scope.myPokemon = mainService.getPokemon($stateParams.id).then(function(response) {
		$scope.myBuddy.buddyStats = {
            stats: [
                {name: 'speed', base_value: response.stats[0].base_stat},
                {name: 'Special Def', base_value: response.stats[1].base_stat},
                {name: 'Special Att', base_value: response.stats[2].base_stat},
                {name: 'Defense', base_value: response.stats[3].base_stat},
                {name: 'Attack', base_value: response.stats[4].base_stat},
                {name: 'HP', base_value: response.stats[5].base_stat},
                {name: 'id', base_value: response.id}
            ],
            types: response.type
		}
		console.log($scope.myBuddy);
	})
	var randomNumberGenerator = function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	$scope.detectPokemon = function() {

		var pokeIndexNum = randomNumberGenerator(1, 811);
		var pokePromise = mainService.getPokemon(pokeIndexNum);
		pokePromise.then(function(response) {
			var pokemonStats = {
				stats: [
					{name: 'speed', base_value: response.stats[0].base_stat},
					{name: 'Special Def', base_value: response.stats[1].base_stat},
					{name: 'Special Att', base_value: response.stats[2].base_stat},
					{name: 'Defense', base_value: response.stats[3].base_stat},
					{name: 'Attack', base_value: response.stats[4].base_stat},
					{name: 'HP', base_value: response.stats[5].base_stat},
					{name: 'id', base_value: response.id}
				],
				types: response.type,
				name: response.name,
				image: 'images/sprites-master/sprites/pokemon/model/' + response.id + '.png'
				};

			$scope.fullHealth = response.stats[5];
			$scope.pokemon.push(pokemonStats);
			console.log($scope.pokemon);
			$scope.voice = function(words) {
				words = 'Pokedex index ' + response.id + ' you have found a ' + response.name + ' .. Be careful, trainer.';
				responsiveVoice.speak(words , 'UK English Male');
			}
			$scope.voice();
		})
		.catch(function(response) {
			$scope.detectPokemon();
		})
	}

	$scope.detectPokemon();

	$scope.isDisabled = false;
	
	$scope.battle = function(stat, fullHealth) {
		//generates random attack power for player to subtract against pokemon health
		console.log($scope.isDisabled);
		if(!$scope.isDisabled) {
			var myAttackPower = randomNumberGenerator(5, 15);
			var pokemonHp = stat.base_value -= myAttackPower;
			var pokemonId = $scope.pokemon[0].stats[6].base_value;
			var pokemonName = $scope.pokemon[0].name;

			console.log(pokemonHp);
	
		//converts to a percentage to be interpeted by the directive and update the health meter
			$scope.health = ((stat.base_value / fullHealth.base_stat) * 100).toFixed(2) + '%';

			if (pokemonHp <= 0) {

				console.log('You Caught ' + $scope.pokemon[0].name + '!!');
				$state.go('character', {id: pokemonId, name: pokemonName});
			}
		}
		
	}

	$scope.quickAttack = function(stat, fullHealth) {
		$scope.battle(stat, fullHealth);
		console.log("quick attack");
	}

	$scope.powerAttack = function(stat, fullHealth) {
        $scope.battle(stat, fullHealth);
		console.log("power attack");
	}

	// $scope.pokemonAI = function(statArr) {
	// 	var arrLength = statArr.length;
	// 	var hightestStat = 0;

	// 	for(var i = 0; i < arrLength; i++) {
	// 		if(statArr[i] > hightestStat) {
	// 			hightestStat = statArr[i];
	// 		}
	// 	}
	// 	console.log(statArr);
		// take an array of stats, will focus actions based on highest stat.
		// [[speed, special def, special att, defence, attack, hp]]
		// if highest stat is 
			// speed pokemon hits with basic attack 2 times between everyone 1 of yours.
			// and when health is 25% pokemon has chance to run 
				// if pokemon run, alert box should show that pokemon got away. and button to go back to home.
		// if highest stat is
			//special defence. this pokemon will use his special abilities to block lesson damage from you
			//and use basic attack moves
		// if highest stat is 
			//special attack pokemon uses special abilities on you that can have various effects on you, like poison
			//or make you sleepy. 
		// if highest stat is defence
			//this pokemon focuses on blocking and deflecting your attacks.
		// if highest stat is attack
			//this pokemon focuses on the attack and is pretty aggresive, able to score critical hits.
		// if highest stat is HP
			//This pokemon does not want to fight, their focus is on trying to dodge and escape.
			//they will switch modes when their HP gets low enough.
		// stat that pokemon is using should highlight in the UI when used. optional voice narriation
		// option sound bites and music.

	// }
	
	
});