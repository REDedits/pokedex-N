const {
  HashRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  useNavigate,
  useParams
} = ReactRouterDOM;

const starters = [
  {
    name: 'Bulbasaur',
    id: 1,
    imageFront: 'images/sprites-master/sprites/pokemon/model/1.png',
    imageBack: 'images/sprites-master/sprites/pokemon/back/1.png',
    bio:
      "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger."
  },
  {
    name: 'Charmander',
    id: 4,
    imageFront: 'images/sprites-master/sprites/pokemon/model/4.png',
    imageBack: 'images/sprites-master/sprites/pokemon/back/4.png',
    bio:
      "The flame that burns at the tip of its tail is an indication of it's emotions. The flame wavers when Charmander is enjoying itself. If the Pokemon becomes enraged, the flame burns fiercely."
  },
  {
    name: 'Squirtle',
    id: 7,
    imageFront: 'images/sprites-master/sprites/pokemon/model/7.png',
    imageBack: 'images/sprites-master/sprites/pokemon/back/7.png',
    bio:
      "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistence in water, enabling this pokemon to swim at high speeds."
  },
  {
    name: 'Pikachu',
    id: 25,
    imageFront: 'images/sprites-master/sprites/pokemon/model/25.png',
    imageBack: 'images/sprites-master/sprites/pokemon/back/25.png',
    bio:
      "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokemon mistook the intensity of its charge."
  }
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const formatName = (name) => {
  if (!name) {
    return '';
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const useResponsiveVoice = () =>
  React.useCallback((words) => {
    if (words && window.responsiveVoice && typeof window.responsiveVoice.speak === 'function') {
      window.responsiveVoice.speak(words, 'UK English Male');
    }
  }, []);

const fetchPokemon = async (nameOrId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`);
  if (!response.ok) {
    throw new Error('Unable to load Pokémon.');
  }
  const data = await response.json();
  const stats = data.stats.map((entry) => ({
    name: entry.stat.name,
    base: entry.base_stat
  }));
  const statValue = (key) => {
    const match = stats.find((stat) => stat.name === key);
    return match ? match.base : 0;
  };

  return {
    id: data.id,
    name: data.name,
    types: data.types.map((type) => type.type.name.toUpperCase()),
    stats,
    abilities: data.abilities,
    height: data.height,
    weight: data.weight,
    attack: statValue('attack'),
    defense: statValue('defense'),
    speed: statValue('speed'),
    specialAttack: statValue('special-attack'),
    specialDefense: statValue('special-defense'),
    hp: statValue('hp'),
    imageFront: data.sprites.front_default,
    imageBack: data.sprites.back_default,
    imageModel: `images/sprites-master/sprites/pokemon/model/${data.id}.png`,
    imageBackLocal: `images/sprites-master/sprites/pokemon/back/${data.id}.png`,
    officialArtwork: `images/sprites-master/sprites/pokemon/other-sprites/official-artwork/${data.id}.png`
  };
};

const BattlePanel = ({
  name,
  types = [],
  attack = 0,
  defense = 0,
  speed = 0,
  specialAttack = 0,
  specialDefense = 0,
  healthPercent = 100
}) => {
  const normalized = Number.isFinite(healthPercent) ? Math.max(0, Math.min(healthPercent, 100)) : 0;

  return (
    <div className="healthBar">
      <div className="stat-container container-fluid">
        <div className="row">
          <div className="col-md-12">
            <p className="text-center text-capitalize">{formatName(name)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="progress">
              <div
                className="progress-bar progress-bar-danger"
                role="progressbar"
                aria-valuenow={normalized.toFixed(2)}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${normalized.toFixed(2)}%` }}
              >
                <span className="sr-only">{normalized.toFixed(0)}% Complete</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-xs-4">
              TYP:
              <span className="stat-value">
                {types.map((type) => (
                  <span key={type}>{type.charAt(0)}</span>
                ))}
              </span>
            </div>
            <div className="col-xs-4 text-center">
              ATK: <span className="stat-value">{attack}</span>
            </div>
            <div className="col-xs-4 text-right">
              DEF: <span className="stat-value">{defense}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              SPD: <span className="stat-value">{speed}</span>
            </div>
            <div className="col-xs-4 text-center">
              SAK: <span className="stat-value">{specialAttack}</span>
            </div>
            <div className="col-xs-4 text-right">
              SDF: <span className="stat-value">{specialDefense}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PokemonSprite = ({ className, image, children }) => (
  <div
    className={className}
    style={{
      backgroundImage: image ? `url(${image})` : undefined,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    }}
  >
    {children}
  </div>
);

const Layout = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="top-dex">
          <div className="row">
            <div className="col-md-4">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `pokedex-top nav-ui-top-left hidden-xs hidden-sm${isActive ? ' active' : ''}`
                }
              >
                Home
              </NavLink>
            </div>
            <div className="col-md-4">
              <NavLink
                to="/catch/1/bulbasaur"
                className={({ isActive }) =>
                  `pokedex-top nav-ui-top-middle hidden-xs hidden-sm${isActive ? ' active' : ''}`
                }
              >
                Scan for Pokemon
              </NavLink>
            </div>
            <div className="col-md-4">
              <NavLink
                to="/character/25/pikachu"
                className={({ isActive }) =>
                  `pokedex-top nav-ui-top-right hidden-xs hidden-sm${isActive ? ' active' : ''}`
                }
              >
                Pokedex
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="main-content-container">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/choose" element={<Choose />} />
            <Route path="/catch/:id/:name" element={<Catch />} />
            <Route path="/catch/:id/:name/:trainer" element={<Catch />} />
            <Route path="/character/:id/:name" element={<Character />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="bottom-dex" />
      </div>
    </div>
  </div>
);

const Home = () => (
  <div className="row">
    <div className="col-md-4 text-center alert-txt hidden-sm hidden-xs">
      <h3>ALERT!</h3>
      <h4>Wild Pokemon Discovered!</h4>
    </div>
    <div className="col-md-4 col-sm-12">
      <NavLink to="/choose">
        <img src="images/enter-btn.png" className="img-responsive open-btn" alt="Open Pokédex" />
      </NavLink>
    </div>
    <div className="col-md-4 text-center alert-txt hidden-sm hidden-xs">
      <h3>ALERT!</h3>
      <h4>Wild Pokemon Discovered!</h4>
    </div>
  </div>
);

const Choose = () => {
  const [trainerName, setTrainerName] = React.useState('');
  const [showForm, setShowForm] = React.useState(true);
  const [showBuddy, setShowBuddy] = React.useState(false);
  const [starter] = React.useState(() => starters[randomInt(0, starters.length - 1)]);
  const navigate = useNavigate();
  const speak = useResponsiveVoice();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      speak('hello pokemon trainer. Please type your name into the Pokedex.');
    }, 1000);
    return () => clearTimeout(timer);
  }, [speak]);

  const handleNameSubmit = () => {
    if (!trainerName.trim()) {
      speak('Please type your name before continuing.');
      return;
    }
    speak(`Welcome ${trainerName} to the Pokemon chamber. Here you may choose your starter Pokemon.`);
    setShowForm(false);
  };

  const handleChoice = () => {
    if (!trainerName.trim()) {
      speak('Please type your name into the Pokedex before choosing your Pokemon.');
      return;
    }
    speak(
      `Congratulations Pokemon Trainer ${trainerName}! You have chosen a ${starter.name} as your starter pokemon.`
    );
    setShowBuddy(true);
  };

  const handleDetails = () => {
    if (showBuddy) {
      speak(starter.bio);
    }
  };

  const handleBattle = () => {
    if (!trainerName.trim()) {
      speak('Please type your name before continuing.');
      return;
    }
    navigate(`/catch/${starter.id}/${starter.name}/${encodeURIComponent(trainerName.trim())}`);
  };

  return (
    <div className="row">
      <div className="col-md-12 catchBg">
        <div className="chooser1" onClick={handleChoice} role="button" aria-label="Choose starter" />
        <div className="chooser2" onClick={handleChoice} role="button" aria-label="Choose starter" />
        <div className="chooser3" onClick={handleChoice} role="button" aria-label="Choose starter" />
        <div className="trainer-form-container">
          {showForm ? (
            <form onSubmit={(event) => event.preventDefault()}>
              <input
                type="text"
                placeholder="Please type your name"
                value={trainerName}
                onChange={(event) => setTrainerName(event.target.value)}
              />
              <button type="button" className="btn btn-info" onClick={handleNameSubmit}>
                ENTER
              </button>
            </form>
          ) : null}
        </div>
        {showBuddy ? (
          <PokemonSprite className="chosen-pokemon" image={starter.imageFront}>
            <button type="button" className="btn btn-link" onClick={handleDetails}>
              Learn more
            </button>
          </PokemonSprite>
        ) : null}
        {showBuddy ? (
          <div className="battleBtn">
            <button type="button" className="btn btn-info" onClick={handleBattle}>
              BATTLE
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Catch = () => {
  const params = useParams();
  const buddyId = Number(params.id);
  const trainer = params.trainer ? decodeURIComponent(params.trainer) : '';
  const [buddy, setBuddy] = React.useState(null);
  const [wildPokemon, setWildPokemon] = React.useState(null);
  const [wildHealthPercent, setWildHealthPercent] = React.useState(100);
  const [trainerHealth, setTrainerHealth] = React.useState(500);
  const [isBallThrown, setIsBallThrown] = React.useState(false);
  const navigate = useNavigate();
  const speak = useResponsiveVoice();

  React.useEffect(() => {
    if (!Number.isNaN(buddyId)) {
      fetchPokemon(buddyId)
        .then((data) => {
          setBuddy({
            ...data,
            currentHp: data.hp,
            displayImage: data.imageBackLocal
          });
        })
        .catch(() => {
          // Buddy details failed to load; continue without them
        });
    }
  }, [buddyId]);

  const detectPokemon = React.useCallback(async () => {
    const attemptCapture = async () => {
      const randomId = randomInt(1, 811);
      const data = await fetchPokemon(randomId);
      return {
        ...data,
        currentHp: data.hp,
        displayImage: data.imageModel
      };
    };

    for (let tries = 0; tries < 5; tries += 1) {
      try {
        const pokemon = await attemptCapture();
        setWildPokemon(pokemon);
        setWildHealthPercent(100);
        speak(`Pokedex index ${pokemon.id} you have found a ${formatName(pokemon.name)} .. Be careful, trainer.`);
        return;
      } catch (error) {
        // try again
      }
    }

    setTimeout(() => {
      detectPokemon();
    }, 300);
  }, [speak]);

  React.useEffect(() => {
    detectPokemon();
  }, [detectPokemon]);

  const handleAttack = React.useCallback(() => {
    setWildPokemon((current) => {
      if (!current || current.currentHp <= 0) {
        return current;
      }
      const damage = randomInt(5, 15);
      const maxHp = current.hp || 1;
      const nextHp = Math.max(current.currentHp - damage, 0);
      const updated = { ...current, currentHp: nextHp };
      setWildHealthPercent((nextHp / maxHp) * 100);
      if (nextHp <= 0) {
        speak(`You caught ${formatName(current.name)}!`);
        setTimeout(() => {
          navigate(`/character/${current.id}/${current.name}`);
        }, 350);
      }
      return updated;
    });
  }, [navigate, speak]);

  const handleEnemyAttack = React.useCallback(() => {
    if (isBallThrown || !wildPokemon || wildPokemon.currentHp <= 0) {
      return;
    }
    setIsBallThrown(true);
    setTimeout(() => setIsBallThrown(false), 1800);

    const trainerRoll = randomInt(1, 6);
    const enemyRoll = randomInt(1, 6);
    if (enemyRoll >= trainerRoll) {
      const damage = Math.max(wildPokemon.attack - 30, 1);
      setTrainerHealth((health) => Math.max(health - damage, 0));
    }
  }, [isBallThrown, wildPokemon]);

  return (
    <div className="row">
      <div className="col-md-12 col-xs-12 catch-bg">
        <div id="stage">
          <div id="spawnPoint">
            {isBallThrown ? (
              <div id="throw-left">
                <div id="bouncer">
                  <div className="pokeball-sprite" />
                </div>
              </div>
            ) : null}
          </div>
          <div className="row">
            <div className="col-md-4 col-xs-4">
              {buddy ? (
                <>
                  <PokemonSprite className="myBuddy" image={buddy.displayImage}>
                    <BattlePanel
                      name={buddy.name}
                      types={buddy.types}
                      attack={buddy.attack}
                      defense={buddy.defense}
                      speed={buddy.speed}
                      specialAttack={buddy.specialAttack}
                      specialDefense={buddy.specialDefense}
                      healthPercent={100}
                    />
                  </PokemonSprite>
                  <div className="buddy-fight-btn" onClick={handleAttack} role="button" aria-label="Quick attack" />
                  <div className="buddy-power-btn" onClick={handleAttack} role="button" aria-label="Power attack" />
                </>
              ) : null}
            </div>
            <div className="col-md-4 col-xs-4">
              {wildPokemon ? (
                <div onClick={handleEnemyAttack} role="button" aria-label="Throw Pokeball">
                  <img src="images/pokeball-rand-bt.png" className="poke-ball img-responsive" alt="Throw Pokeball" />
                </div>
              ) : null}
              <div className="screen-color text-center" aria-live="polite">
                Trainer Health: {trainerHealth}
                {trainer ? ` | Trainer: ${trainer}` : ''}
              </div>
            </div>
            <div className="col-md-4 col-xs-4">
              {wildPokemon ? (
                <PokemonSprite className="battle-pokemon" image={wildPokemon.displayImage}>
                  <div id="trgArea" className="pos-pokemon">
                    <BattlePanel
                      name={wildPokemon.name}
                      types={wildPokemon.types}
                      attack={wildPokemon.attack}
                      defense={wildPokemon.defense}
                      speed={wildPokemon.speed}
                      specialAttack={wildPokemon.specialAttack}
                      specialDefense={wildPokemon.specialDefense}
                      healthPercent={wildHealthPercent}
                    />
                  </div>
                </PokemonSprite>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Character = () => {
  const params = useParams();
  const [pokemon, setPokemon] = React.useState(null);
  const [thumbnails, setThumbnails] = React.useState([]);
  const speak = useResponsiveVoice();

  React.useEffect(() => {
    if (!params.id) {
      return;
    }
    fetchPokemon(params.id)
      .then((data) => {
        setPokemon(data);
      })
      .catch(() => {
        setPokemon(null);
      });
  }, [params.id]);

  React.useEffect(() => {
    if (!params.name) {
      setThumbnails([]);
      return;
    }
    const query = encodeURIComponent(`Pokemon ${params.name} pokedex clip`);
    const apiKey = 'AIzaSyCPsfxhF0l-T8m47088yGuu-FvtfPfNFrE';
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=${query}&safeSearch=strict&type=video&videoCaption=any&key=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load recordings');
        }
        return response.json();
      })
      .then((json) => {
        const items = json.items || [];
        setThumbnails(
          items.slice(0, 3).map((item) => ({
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url
          }))
        );
      })
      .catch(() => {
        setThumbnails([]);
      });
  }, [params.name]);

  const handleVoice = () => {
    if (pokemon) {
      speak(`Well done Pokemon Trainer, You caught yourself a ${formatName(pokemon.name)}.`);
    }
  };

  if (!pokemon) {
    return (
      <div className="row">
        <div className="col-md-12">
          <p>Loading Pokédex entry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <PokemonSprite className="image-container" image={pokemon.officialArtwork} />
        <div className="panel panel-info details-container">
          <div className="panel-heading text-center">
            <h1>{formatName(pokemon.name)}</h1>
          </div>
          <div className="panel-body" onClick={handleVoice} role="button">
            <p>
              This Pokemon is a {pokemon.types.join(', ')} type, and has the following Special Abilities.
            </p>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{formatName(ability.ability.name.replace('-', ' '))}</li>
              ))}
            </ul>
            <p>{formatName(pokemon.name)} has been observed in action and is estimated to have these stat values.</p>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.name}>
                  {formatName(stat.name.replace('-', ' '))}: {stat.base}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="yt-container panel panel-info">
          <div className="panel-heading text-center">
            <h3>Recorded Files</h3>
          </div>
          <div className="panel-body">
            {thumbnails.length === 0 ? (
              <p className="text-center">No recordings available.</p>
            ) : (
              thumbnails.map((item) => (
                <div className="row" key={item.thumbnail}>
                  <div className="col-md-12">
                    <div
                      className="thumbnail youtubeImages"
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                      title={item.title}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <HashRouter>
    <Layout />
  </HashRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
