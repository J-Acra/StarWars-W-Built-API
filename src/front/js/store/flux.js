const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		favorites: [],
		characters: [],
		planets: [],

	  },
	  actions: {
		loadCharacters: async () => {
		  const response = await fetch(process.env.BACKEND_URL +`/api/character`);
		  if (response.status === 200) {
			const payload = await response.json();
			const myNewCharacters = payload.map((people, i) => {
			  (people.detail = "/character/"), (people.favStatus = false);
			  people.uid = i;
			  return people;
			});
			setStore({ characters: myNewCharacters });
			console.log(payload);
		  }
		},
		loadPlanets: async () => {
		  const response = await fetch(process.env.BACKEND_URL +`/api/planet`);
		  if (response.status === 200) {
			const payload = await response.json();
			const myNewPlanets = payload.map((planets, i) => {
			  (planets.detail = "/planet/"), (planets.favStatus = false);
			  planets.uid = i;
			  return planets;
			});
			setStore({ planets: myNewPlanets });
		  }
		},

		loadFavorites: async () => {
			const response = await fetch(process.env.BACKEND_URL +`/api/favorite`);
			if (response.status === 200) {
			  const payload = await response.json();
			  setStore({ favorites: payload });
			  console.log(payload)
			}
		},

		checkFav: (favoriteCard) => {
		  const { favorites } = getStore();
		  if (favoriteCard.isFav === true) {
			favoriteCard.isFav = false;
			setStore({
			  favorites: favorites.filter(
				(favoriteItem) =>
				  favoriteItem.uid + favoriteItem.name !==
				  favoriteCard.uid + favoriteCard.name
			  ),
			});
		  } else {
			favoriteCard.isFav = true;
			setStore({ favorites: favorites.concat(favoriteCard) });
		  }
		},
		remFav: (position) => {
		  const { favorites } = getStore();
		  let newFavorites = favorites.map((item, index) => {
			if (index === position) {
			  item["isFav"] = false;
			  return item;
			} else {
			  return item;
			}
		  });
		  console.log(newFavorites);
		  setStore({
			favorites: newFavorites.filter((f, favId) => favId !== position),
		  });
		},
		clearFavorites: () => {
		  const { favorites } = getStore();
		  let clearedFavorites = favorites.map(i=>{
			i.isFav=false;
			return i
		  })
		  setStore({ favorites: clearedFavorites});
		  setStore({ favorites: [] })
		},
	  },
	};
  };
  
  export default getState;
  