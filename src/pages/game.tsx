import React from "react";
import ConfigButton from "src/components/config-button";
import Header from "src/components/header";
import QuestionAndAnswers from "src/components/questions-and-answers";

const Game = () => {
  return (
    <div className="game-div">
      <div>
        <Header />
        <QuestionAndAnswers />
        <ConfigButton />
      </div>

      {/* {error?.length > 1 ? (
        <div>
          <Header  />
          <QuestionAndAnswers/>
          <ConfigButton />
        </div>
      ) : (
        <h1>{error[0]}</h1>
      )} */}
    </div>
  );
};

export default Game;
