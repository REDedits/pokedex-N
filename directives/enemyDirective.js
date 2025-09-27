angular.module('pokedexN')
.directive('enemyDirective', function() {
	return {
		restrict: 'AE',
		link: function(scope, element, attr) {
			scope.enemy = {
				speed: scope.pokemon[0].stats[0].base_value,
				sDef: scope.pokemon[0].stats[1].base_value,
				sAtt: scope.pokemon[0].stats[2].base_value,
				def: scope.pokemon[0].stats[3].base_value,
				att: scope.pokemon[0].stats[4].base_value,
				enemyHp: scope.pokemon[0].stats[5].base_value,
				fullHealth: scope.pokemon[0].stats[5].base_value,
				roll: function() {
					var result = Math.floor(Math.random() * 6 + 1);
					return result;
				},
				attack: function() {
					var damage = this.att - scope.trainer.def;
					return damage;
				}
			};
			


			
			element.on('click', function() {
				var trainerRoll = scope.trainer.roll();
				var enemyRoll = scope.enemy.roll();
				if(trainerRoll > enemyRoll) {
					console.log("Pokemon misses turn");

				} else {
					
					console.log("the Pokemon attacks");
					var eDamage = scope.enemy.attack();
					scope.trainer.health = scope.trainer.health - eDamage;
					console.log("trainer takes '" + eDamage + "' Damage");
					console.log("Trainers remaining health should be " + scope.trainer.health);
					return scope.trainer.health;
				}
			});
			 
		}
	}
})