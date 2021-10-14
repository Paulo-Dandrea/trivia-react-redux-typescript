import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "src/types";

const Header = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const { hash, name, score } = user;

  return (
    <header className="game-header">
      <div>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${hash}`}
          alt="jogador"
        />
      </div>
      <div className="player-data">
        <h4>
          <span data-testid="header-player-name">{name}</span>
        </h4>
        <h4>
          <span data-testid="header-score"> {score}</span>
        </h4>
      </div>
    </header>
  );
};

export default Header;
