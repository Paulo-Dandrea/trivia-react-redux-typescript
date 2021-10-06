import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndAddQuestions } from '../action';

export default function GameButton({ isAvailable, click }) {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settingsReducer);
  console.log(settings);
  return (
    <div className="btn-block">
      <Link to="/game">
        <button
          data-testid="btn-play"
          disabled={isAvailable}
          onClick={() => {
            // Faz a requisição da API e salva dados do usuário na store
            dispatch(fetchAndAddQuestions(settings)); // thunk
            click();
          }}
          className="
          btn
          btn-success
          btn-block
          form-control
          m-*-1
          "
        >
          Jogar
        </button>
      </Link>
    </div>
  );
}

GameButton.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
};
