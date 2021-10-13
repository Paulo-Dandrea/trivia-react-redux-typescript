import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "src/types";

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
        src={`https://www.gravatar.com/avatar/${hash}`}
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
