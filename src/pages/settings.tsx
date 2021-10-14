import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeSettings } from "../action";

export default function Settings() {
  const dispatch = useDispatch();
  return (
    <div className="questions">
      <h1 data-testid="settings-title">Settings</h1>
      <div>
        {/* TODO: dynamic category, difficulties and types */}
        {/* TODO: Same combobox components */}
        <select
          name="category"
          onChange={({ target: { name, value } }) =>
            dispatch(changeSettings(name, value))
          }
        >
          <option value="">Category</option>
          <option value="21">Sports</option>
          <option value="25">Art</option>
          <option value="27">Animals</option>
        </select>
      </div>
      <div>
        <select
          name="difficulty"
          onChange={({ target: { name, value } }) =>
            dispatch(changeSettings(name, value))
          }
        >
          <option value="">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <select
          name="type"
          onChange={({ target: { name, value } }) =>
            dispatch(changeSettings(name, value))
          }
        >
          <option value="">Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>
      <Link to="/">
        <button
          className="
          btn
          btn-success
          btn-block
          form-control
          m-*-1
          "
        >
          Home
        </button>
      </Link>
    </div>
  );
}
