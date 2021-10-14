import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "src/types";
import { GRAVATAR_PICTURE } from "src/lib/constants";

const FeedbackHeader = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const { hash, name, score } = user;

  return (
    <header>
      <p>
        Player:
        <span data-testid="header-player-name">{name}</span>
      </p>
      <img
        data-testid="header-profile-picture"
        src={GRAVATAR_PICTURE + hash}
        alt="jogador"
      />
      <p>
        Score:
        <span data-testid="header-score">{score}</span>
      </p>
    </header>
  );
};

export default FeedbackHeader;
