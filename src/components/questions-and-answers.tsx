import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { setTimer, addScore } from "../action";
import Timer from "./timer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { extractDifficultyMultiplyer } from "src/lib/utils";
import { RootState } from "src/types";

const GAME_SIZE = 5;
let interval: NodeJS.Timer;

const QuestionAndAnswers = () => {
  const [index, setIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedOnce, setIsClickedOnce] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const user = useSelector((state: RootState) => state.userReducer);
  const questions = useSelector((state: RootState) => state.questionsReducer);
  const { timer } = useSelector((state: RootState) => state.timerReducer);

  const dispatch = useDispatch();

  const handleClick = () => {
    setIndex((prevState) => prevState + 1);
    setIsClicked(false);
    setIsClickedOnce(false);

    setDisableButton(false);

    if (index < 3) dispatch(setTimer(30));

    interval = setInterval(() => dispatch(setTimer(-1)), 1000);
  };

  const answerClick = (
    //   I've learned: HTML Input element because I need the 'name' attribute of the event target?
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const timer = document.getElementById("timer")?.innerHTML;

    if (interval) {
      clearInterval(interval);
    }

    const localPlayer = localStorage.getItem("player") || "";
    const parsedLocalPlayer = JSON.parse(localPlayer);

    const difficulty = extractDifficultyMultiplyer(questions[index].difficulty);

    if (
      event.currentTarget.name === "correct-answer" &&
      isClickedOnce === false
    ) {
      // TODO: I've learned:
      // https://stackoverflow.com/questions/55389447/property-name-does-not-exist-on-type-eventtarget-react-typescript
      parsedLocalPlayer.assertions += 1;
      parsedLocalPlayer.score += 10 + Number(timer) * difficulty;
    }

    setDisableButton(true);

    setIsClickedOnce(true);

    localStorage.setItem("player", JSON.stringify(parsedLocalPlayer));

    dispatch(addScore(parsedLocalPlayer.score));

    return isClicked && !isClickedOnce
      ? false
      : setTimeout(() => setIsClicked(true), 5000);
  };

  useEffect(() => {
    if (timer < 1) {
      setDisableButton(true);
    }
  }, [timer]);

  useEffect(() => {
    dispatch(setTimer(30));

    interval = setInterval(() => {
      dispatch(setTimer(-1));
    }, 1000);

    setDisableButton(false);

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

  return (
    <div className="game">
      {questions[index] && (
        <div className="questions">
          <Timer intervalo={interval} />
          <h3 data-testid="question-text" className="question">
            {questions[index].question}
          </h3>
          <p data-testid="question-category">{questions[index].category}</p>
          {/* TODO: Is it 'answers' instead of 'answer'
          My guess is: I've typed wrong */}
          {questions[index].answer.map((answer) => (
            <div>
              <button
                disabled={disableButton}
                onClick={(event) => answerClick(event)}
                name={answer["data-testid"]}
                style={isClicked ? answer.style : { border: "none" }}
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
      {(isClicked || timer < 1) && (
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
