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
        const token = JSON.parse(localStorage.getItem("session"));
        const response = await fetch(
          process.env.BACKEND_URL + `/api/favorite`,
          options
        );
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        if (response.status === 200) {
          const payload = await response.json();
          setStore({ favorites: payload });
          console.log("this is incoming favorites" + payload);
        } else {
          console.log("Authorization failed!");
        }
      },

      addFav: (favoriteCard) => {
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
