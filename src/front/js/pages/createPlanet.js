import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const CreatePlanet = (props) => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({});

  return (
    <form
      onSubmit={(e) => {
        actions
          .addPlanet(
            formData.name,
            formData.climate,
            formData.rotation_period,
            formData.orbital_period,
            formData.diameter,
            formData.terrain,
            formData.population,
            formData.img_url
          )
          .then(() => history.push("/"));
        e.preventDefault();
      }}
      className="container"
    >
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          climate
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, climate: e.target.value })
          }
          value={formData.climate}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          rotation_period
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, rotation_period: e.target.value })
          }
          value={formData.rotation_period}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          orbital_period
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, orbital_period: e.target.value })
          }
          value={formData.orbital_period}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>

      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          diameter
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, diameter: e.target.value })
          }
          value={formData.diameter}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>

      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          terrain
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, terrain: e.target.value })
          }
          value={formData.terrain}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>

      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          population
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, population: e.target.value })
          }
          value={formData.population}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>

      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          img_url
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, img_url: e.target.value })
          }
          value={formData.img_url}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        ></input>
      </div>

      <button className="btn btn-primary">Login</button>
    </form>
  );
};
