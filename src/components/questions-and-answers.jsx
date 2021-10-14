import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { setTimer, disableButton, addScore } from "../action";
import Timer from "./timer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

let interval;

const QuestionAndAnswers = () => {
  const [index, setIndex] = React.useState(0);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isClickedOnce, setIsClickedOnce] = React.useState(false);

  const user = useSelector((state) => state.userReducer);
  const questions = useSelector((state) => state.questionsReducer);
  const timer = useSelector((state) => state.timerReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTimer(30));

    interval = setInterval(() => {
      dispatch(() => setTimer(-1));
    }, 1000);

    dispatch(disableButton(false));

    // take player out of player

    const player = {
      player: {
        name: user.name,
        assertions: 0,
        score: 0,
        gravatarEmail: user.email,
      },
    };

    localStorage.setItem("state", JSON.stringify(player));

    dispatch(addScore(player.player.score));

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClick = (e) => {
    setIndex((prevState) => prevState + 1);
    setIsClicked(false);
    setIsClickedOnce(false);

    dispatch(disableButton(false));

    if (index < 3) dispatch(setTimer(30));

    interval = setInterval(() => dispatch(setTimer(-1)), 1000);
  };

  const answerClick = (event) => {
    const timer = document.getElementById("timer").innerHTML;

    if (interval) {
      clearInterval(interval);
    }

    const localPlayer = localStorage.getItem("state");
    const parsedLocalPlayer = JSON.parse(localPlayer);

    let difficulty = 0;

    switch (questions[index].difficulty) {
      case "hard":
        difficulty = 3;
        break;
      case "medium":
        difficulty = 2;
        break;
      case "easy":
        difficulty = 1;
        break;
      default:
        difficulty = 0;
        break;
    }

    if (event.target.name === "correct-answer" && isClickedOnce === false) {
      parsedLocalPlayer.player.assertions += 1;
      parsedLocalPlayer.player.score += 10 + timer * difficulty;
    }

    setIsClickedOnce(true);

    localStorage.setItem("state", JSON.stringify(parsedLocalPlayer));

    dispatch(addScore(parsedLocalPlayer.player.score));

    return isClicked && !isClickedOnce
      ? false
      : setTimeout(() => setIsClicked(true), 5000);
  };

  return (
    <div className="game">
      {questions[index] && (
        <div className="questions">
          <Timer intervalo={interval} />
          <h3 data-testid="question-text" className="question">
            {questions[index].question}
          </h3>
          <p data-testid="question-category">{questions[index].category}</p>
          {questions[index].answer.map((answer) => (
            <div>
              <button
                disabled={timer.disabled}
                onClick={(event) => answerClick(event)}
                name={answer["data-testid"]}
                style={isClicked ? answer.style : null}
                key={Math.random() * 100}
                data-testid={answer["data-testid"]}
                className="btn btn-block btn-dark mb-2"
              >
                {answer.answer}
              </button>
            </div>
          ))}
        </div>
      )}
      {index === 5 && <Redirect to="/feedback" />}
      {(isClicked || timer.disabled) && (
        <button
          data-testid="btn-next"
          onClick={() => handleClick()}
          className="btn btn-success btn-block"
        >
          Próxima
        </button>
      )}
    </div>
  );
};

export default QuestionAndAnswers;
