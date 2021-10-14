import React from "react";
import { Link } from "react-router-dom";
import { RankPlayer } from "src/types";

const Ranking = () => {
  const ranking = localStorage.getItem("ranking") || "[]";
  
  const parsedRanking: RankPlayer[] = JSON.parse(ranking);
  const sortedRanking = parsedRanking.sort((a, b) => b.score - a.score);

  return (
    <div className="game-divE">
      <Link to="/">
        <button data-testid="btn-go-home" className="btn btn-block btn-success">
          Go home
        </button>
      </Link>
      <div data-testid="ranking-title">
        {sortedRanking.map((player, i) => (
          <div className="game-header">
            <img src={player.picture} alt="player" />
            <div className="player-data">
              <p data-testid={`player-name-${i}`}>
                {i + 1}.{player.name}
              </p>
              <p data-testid={`player-score-${i}`}>{player.score}</p>
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
