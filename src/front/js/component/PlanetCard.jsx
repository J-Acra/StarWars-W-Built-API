import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const PlanetCard = (props) => {
  const { store, actions } = useContext(Context);
  const [favStatus, setFavStatus] = useState();

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={props.img_url}></img>
      <ul className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <li className="list-group-item ">Population: {props.population}</li>
        <li className="list-group-item ">Terrain: {props.terrain}</li>
      </ul>
      <div className="cardButtons d-flex">
        <Link to={props.detail + props.uid}>
          <button type="button" className="btn btn-primary">
            Learn More!
          </button>
        </Link>
        <button
          onClick={() => {
            actions
              .addFavPlanet(props.data)
              .then(
                actions.loadFavorites(),
                actions.loadFavorites(),
                setFavStatus(true)
              );
          }}
          type="button"
          className="ms-auto btn btn-warning"
        >
          {favStatus === true ? (
            <i className="fas fa-heart"></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </button>
      </div>
    </div>
  );
};
export default PlanetCard;
