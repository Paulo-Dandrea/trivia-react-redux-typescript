import React, { useEffect } from "react";
import FeedbackHeader from "../components/feedback-header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/types";
import { GRAVATAR_PICTURE } from "src/lib/constants";

const Feedback = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const { hash, name, score } = user;

  useEffect(() => {
    const previousRank = localStorage.getItem("ranking");
    let previousRankParsed = [];

    if (previousRank) {
      previousRankParsed = JSON.parse(previousRank);
    }

    localStorage.setItem(
      "ranking",
      JSON.stringify([
        ...previousRankParsed,
        {
          name,
          score,
          picture: GRAVATAR_PICTURE + hash,
        },
      ])
    );
  }, []);

  const previousState = localStorage.getItem("player") || "";

  const previousStateParsed = JSON.parse(previousState) || [];

  const assertions = previousStateParsed?.assertions;

  return (
    <div className="game-div">
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
