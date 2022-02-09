import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDetails = (props) => {
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
                store.images["/CharacterDetails/" + params.theid] ||
                "https://snr.unl.edu/images/portrait-large/staff/whiteblank.gif"
              }
            ></img>
          </div>
          <div className="detailText col">
            <h1 className="mx-auto text-center">
              {store.characters[params.theid]?.name}
            </h1>
            <p className="text-center mx-4 p-5">
              {store.characters[params.theid]?.description||"This is a generic description if information could not be fetched"}
            </p>
          </div>
          <div className="bottomInfo row border-top border-danger p-3">
            <div className="col">
              <div className="text-danger text-center">Name</div>
              <div className="mt-3 text-center">
                {store.characters[params.theid]?.name}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Birth Year</div>
              <div className="mt-3 text-center">
                {store.characters[params.theid]?.birth_year}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Gender</div>
              <div className="mt-3 text-center">
                {store.characters[params.theid]?.gender}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Height</div>
              <div className="mt-3 text-center">
                {store.characters[params.theid]?.height}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Hair Color</div>
              <div className="mt-3 text-center">
                {store.characters[params.theid]?.hair_color}
              </div>
            </div>
            <div className="col">
              <div className="text-danger text-center">Skin Color</div>
              <div className="mt-3 text-center">
                {store.characters[params.theid]?.skin_color}
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

CharacterDetails.propTypes = {
  match: PropTypes.object,
};
