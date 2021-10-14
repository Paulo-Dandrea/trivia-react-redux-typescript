import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { setTimer, disableButton, addScore } from "../action";
import Timer from "./timer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { extractDifficultyMultiplyer } from "src/lib/utils";

const GAME_SIZE = 2;
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
      dispatch(setTimer(-1));
    }, 1000);

    dispatch(disableButton(false));

    const player = {
      name: user.name,
      assertions: 0,
      score: 0,
      gravatarEmail: user.email,
    };

    localStorage.setItem("player", JSON.stringify(player));

    dispatch(addScore(player.score));

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

    const localPlayer = localStorage.getItem("player");
    const parsedLocalPlayer = JSON.parse(localPlayer);

    const difficulty = extractDifficultyMultiplyer(questions[index].difficulty);

    if (event.target.name === "correct-answer" && isClickedOnce === false) {
      parsedLocalPlayer.assertions += 1;
      parsedLocalPlayer.score += 10 + timer * difficulty;
    }

    setIsClickedOnce(true);

    localStorage.setItem("player", JSON.stringify(parsedLocalPlayer));

    dispatch(addScore(parsedLocalPlayer.score));

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
                key={answer.answer}
                data-testid={answer["data-testid"]}
                className="btn btn-block btn-dark mb-2"
              >
                {answer.answer}
              </button>
            </div>
          ))}
        </div>
      )}
      {index === GAME_SIZE && <Redirect to="/feedback" />}
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
