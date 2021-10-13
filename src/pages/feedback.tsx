import React, { useEffect } from "react";
import FeedbackHeader from "../components/feedback-header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/types";

const Feedback = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const { hash, name, score } = user;

  useEffect(() => {
    const previousRank = localStorage.getItem("rank");

    if (previousRank) {
      const previousRankParsed = JSON.parse(previousRank) || [];

      localStorage.setItem(
        "ranking",
        JSON.stringify([
          ...previousRankParsed,
          {
            name,
            score,
            // TODO: put constants in a separate file
            picture: `https://www.gravatar.com/avatar/${hash}`,
          },
        ])
      );
    }
  }, []);

  const previousState = localStorage.getItem("state") || "";

  const previousRankParsed = JSON.parse(previousState) || [];

  const assertions = previousRankParsed?.player?.assertions;

  return (
    <div className="Game-div">
      <div className="questions">
        <FeedbackHeader />
        <div>
          {assertions < 3 && (
            <div data-testid="feedback-text">Podia ser melhor...</div>
          )}
          {assertions >= 3 && (
            <div data-testid="feedback-text">Mandou bem!</div>
          )}
          <p>
            Você acertou{" "}
            <span data-testid="feedback-total-question">{assertions} </span>
            questões!
          </p>
          <p>
            Um total de <span data-testid="feedback-total-score">{score} </span>
            pontos!
          </p>
        </div>
        <div className="botoes-retornar">
          <Link to="/">
            <button
            // TODO: use a stable pattern for class names
              data-testid="btn-play-again"
              className="btn-block btn btn-success"
            >
              Jogar Novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button data-testid="btn-ranking" className="btn btn-block">
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
