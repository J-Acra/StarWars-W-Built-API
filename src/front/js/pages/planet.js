import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetDetails = (props) => {
  const params = useParams();
  const { store, actions } = useContext(Context);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="detailImage col">
            <img
              className="fillDetail mb-3"
              src={
                store.planets[params.theid].img_url ||
                "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"
              }
            ></img>
          </div>
          <div className="detailText col">
            <h1 className="mx-auto text-center">
              {store.planets[params.theid]?.name}
            </h1>
            <p className="text-center mx-4 p-5">
              {store.planets[params.theid]?.description ||
                "This is a generic description if information could not be fetched"}
            </p>
          </div>
          <div className="bottomInfo row border-top border-danger p-3">
            <div className="col">
              <div className="text-danger text-center">Name</div>
              <div className="mt-3 text-center">
                {store.planets[params.theid]?.name}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Climate</div>
              <div className="mt-3 text-center">
                {store.planets[params.theid]?.climate}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Population</div>
              <div className="mt-3 text-center">
                {store.planets[params.theid]?.population}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Orbital Period</div>
              <div className="mt-3 text-center">
                {store.planets[params.theid]?.orbital_period}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Rotation Period</div>
              <div className="mt-3 text-center">
                {store.planets[params.theid]?.rotation_period}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Diameter</div>
              <div className="mt-3 text-center">
                {store.planets[params.theid]?.diameter}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-5">
        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      </div>
    </>
  );
};

PlanetDetails.propTypes = {
  match: PropTypes.object,
};
