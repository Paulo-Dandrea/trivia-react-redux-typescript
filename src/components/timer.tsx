import React from "react";
// import { interval } from './QuestionAndAnswers';
import { disableButton } from "../action";
import { RootState } from "src/types";
import { useSelector } from "react-redux";

interface TimerProps {
  intervalo: ReturnType<typeof setInterval>;
}

function Timer({ intervalo }: TimerProps) {
  const timer = useSelector((state: RootState) => state.timerReducer.timer);

  if (timer < 1 && timer !== null) {
    clearInterval(intervalo);
    disableButton(true);
  }

  return (
    <div>
      <h1
        id="timer"
        style={
          timer > 20
            ? { color: "#00DB05" }
            : timer > 10
            ? { color: "orange" }
            : { color: "red" }
        }
      >
        {timer}
      </h1>
    </div>
  );
}

export default Timer;
