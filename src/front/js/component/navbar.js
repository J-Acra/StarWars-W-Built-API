import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = (props) => {
  let [cursor, setCursor] = useState("pointer");
  const { store, actions } = useContext(Context);

  const changeCursor = () => {
    setCursor((prevState) => {
      if (prevState === "pointer") {
        return "default";
      }
      return "pointer";
    });
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light mb-2 pb-5 px-3">
        <Link to="/">
          <div className="homeIcon">
            <img
              src="https://w7.pngwing.com/pngs/614/790/png-transparent-anakin-skywalker-star-wars-day-computer-icons-star-wars-icon-text-logo-war.png"
              className="fillIcon mb-0 h1"
            ></img>
          </div>
        </Link>
        <div className="ml-auto">
          <div class="dropdown">
            <button
              class="btn btn-lg btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              aria-expanded="false"
            >
              Favorites
              <span className="badge bg-secondary">
                {store.favorites.length}
              </span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {store.favorites.length === 0 ? (
                <li>Empty!</li>
              ) : (
                store.favorites.map((f, i) => {
                  const fav = f.character ? f.character : f.planet;
                  const type = f.character ? "character" : "planet";
                  <li className="dropdown-item">
                    <Link className="noStyle" to={ type +"/" + fav.id}>
                      {fav.name}
                    </Link>
                    <i
                      style={{ cursor: cursor }}
                      onMouseEnter={() => changeCursor}
                      onClick={() => actions.remFav(i)}
                      className="fas fa-trash mx-1"
                    ></i>
                  </li>
                  })
              )}
              {store.favorites.length !== 0 ? (
                <li
                  style={{ cursor: cursor }}
                  onMouseEnter={() => changeCursor}
                  onClick={() => actions.clearFavorites()}
                  className="text-center border-top bg-light"
                >
                  Clear Favorites
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
      <div className="inputDiv mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Search the Galaxy"
        ></input>
      </div>
    </>
  );
};
