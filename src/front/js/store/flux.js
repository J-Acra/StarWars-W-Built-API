const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      favorites: [],
      characters: [],
      planets: [],
    },
    actions: {
      loadCharacters: async () => {
        const response = await fetch(
          process.env.BACKEND_URL + `/api/character`
        );
        if (response.status === 200) {
          const payload = await response.json();
          const myNewCharacters = payload.map((people, i) => {
            (people.detail = "/character/"), (people.favStatus = false);
            people.uid = i;
            return people;
          });
          setStore({ characters: myNewCharacters });
        }
      },
      loadPlanets: async () => {
        const response = await fetch(process.env.BACKEND_URL + `/api/planet`);
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
        const store = getStore();
        const session = JSON.parse(localStorage.getItem("session"));
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/favorite`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          setStore({ favorites: payload });
          console.log(store.favorites);
        } else {
          console.log("Authorization failed!");
        }
      },
      addPlanet: async (
        name,
        climate,
        rotation_period,
        orbital_period,
        diameter,
        terrain,
        population,
        img_url
      ) => {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            climate: climate,
            rotation_period: rotation_period,
            orbital_period: orbital_period,
            diameter: diameter,
            terrain: terrain,
            population: population,
            img_url: img_url,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/planet`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          console.log("planet created successfully!");
          return payload;
        }
      },
      addFavPlanet: async (favorite) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
          body: JSON.stringify({
            user: session.user_id,
            planet: favorite.id,
            character: null,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/favorite`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          console.log("planet favorited successfully!");
          return payload;
        }
      },
      addFavCharacter: async (favorite) => {
        const actions = getActions();
        const session = actions.getCurrentSession();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
          body: JSON.stringify({
            user: session.user_id,
            planet: null,
            character: favorite.id,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/favorite`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          console.log("character favorited successfully!");
          return payload;
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
        let clearedFavorites = favorites.map((i) => {
          i.isFav = false;
          return i;
        });
        setStore({ favorites: clearedFavorites });
        setStore({ favorites: [] });
      },
      createNewUser: async (email, password, gender) => {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            gender: gender,
          }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/user`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          console.log("Account Creation Succesful!");
          return payload; //this is gonna make the promise resolve
        }
      },
      createNewSession: async (email, password) => {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        };
        const response = await fetch(
          process.env.BACKEND_URL + `/api/token`,
          options
        );
        if (response.status === 200) {
          const payload = await response.json();
          localStorage.setItem("session", JSON.stringify(payload));
          setStore({ session: payload });
          return payload; //this is gonna make the promise resolve
          // return jsonify({ "token": access_token, "user_id": user.id })
        }
      },
      getCurrentSession: () => {
        const session = JSON.parse(localStorage.getItem("session"));
        return session;
      },
      clearSession: () => {
        localStorage.removeItem("session");
        setStore({ session: null });
      },
    },
  };
};

export default getState;
