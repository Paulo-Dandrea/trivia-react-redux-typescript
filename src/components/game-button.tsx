import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndAddQuestions } from "../action";
import { RootState } from "src/types";

interface PlayButtonProps {
  isAvailable: boolean;
  click: () => void;
}

export default function PlayButton({ isAvailable, click }: PlayButtonProps) {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settingsReducer);

  return (
    <div className="btn-block">
      <Link to="/game">
        <button
          data-testid="btn-play"
          disabled={isAvailable}
          onClick={() => {
            // THIS IS A THUNK
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
