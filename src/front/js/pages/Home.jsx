import React, { useState, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import CharacterCard from "../component/CharacterCard.jsx";
import propTypes from "prop-types";
import PlanetCard from "../component/PlanetCard.jsx";
import { Context } from "../store/appContext";

const Home = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <>
      <h1 className="text-danger ms-3">Characters</h1>
      <div className="characterDisplay d-flex flex-row text-center mt-5">
        {store.characters.map((c, id) => (
          <div className="col mx-3">
            {" "}
            <CharacterCard
              name={store.characters[id].name}
              gender={store.characters[id].gender}
              hair_color={store.characters[id].hair_color}
              eye_color={store.characters[id].eye_color}
              detail={store.characters[id].detail}
              favStatus={store.characters[id].isFav}
              uid={store.characters[id].uid}
              data={c}
            />{" "}
          </div>
        ))}
      </div>
      <h1 className="text-danger ms-3 mt-3">Planets</h1>
      <div className="planetDisplay d-flex flex-row text-center mt-5">
        {store.planets.map((c, id) => (
          <div className="col mx-3">
            {" "}
            <PlanetCard
              name={store.planets[id].name}
              population={store.planets[id].population}
              terrain={store.planets[id].terrain}
              detail={store.planets[id].detail}
              favStatus={store.planets[id].isFav}
              uid={store.planets[id].uid}
              data={c}
            />{" "}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
