import React from "react";
import { Link } from "react-router-dom";
import { RankPlayer } from "src/types";

const Ranking = () => {
  const ranking = localStorage.getItem("ranking") || "[]";

  const parsedRanking: RankPlayer[] = JSON.parse(ranking);
  const sortedRanking = parsedRanking.sort((a, b) => b.score - a.score);
  const firstFivePlayers = sortedRanking.slice(0, 5);

  return (
    <div className="game-divE">
      <div data-testid="ranking-title">
        {firstFivePlayers.map((player, i) => (
          <div className="game-header">
            <img src={player.picture} alt="player" />
              <h1>{i + 1}</h1>
            <div className="player-data">
              <h4 data-testid={`player-name-${i}`}>{player.name}</h4>
              <div className="header-score">
                <h4 data-testid={`player-score-${i}`}>{player.score}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/">
        <button data-testid="btn-go-home" className="btn btn-block btn-success">
          Go home
        </button>
      </Link>
    </div>
  );
};

export default Ranking;
