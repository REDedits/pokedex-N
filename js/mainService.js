angular.module('pokedexN').service('mainService', function($http) {



		this.getPokemon = function(nameId) {
			return $http({
				method: 'GET',
				url: 'https://pokeapi.co/api/v2/pokemon/' + nameId + '/',
				cache: true
			}).then(function(response) {
				if(response.data.types) {
                    response.data.type = [];
					for(var i = 0; i < response.data.types.length; i++) {
						response.data.type.push(response.data.types[i].type.name.toUpperCase());
					}
				}
				return response.data;
			})
		}


		this.getYtubeVids = function(srcTerm) {
			var ytKey = 'AIzaSyCPsfxhF0l-T8m47088yGuu-FvtfPfNFrE';
			return $http({
				method: 'GET',
				url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=' + srcTerm + '&safeSearch=strict&type=video&videoCaption=any&key=' + ytKey,
				cache: true
			}).then(function(response) {
	 			this.ytTitle = response.data.items;

	 			return ytTitle;
	 		})
		}

		this.getVoice = function(words) {
		responsiveVoice.speak(words , 'UK English Male');
		};

})