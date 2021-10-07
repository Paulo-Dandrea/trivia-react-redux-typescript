import { decodeEntities, randomizeArray } from "../utils";

const QUESTIONS_URL = "https://opentdb.com/api.php?amount=5";

function fetchToken() {
    return fetch(TOKEN_URL)
      .then((response) => response.json())
      .then(
        (data) => {
          localStorage.setItem("token", data.token);
          return data.token;
        },
        (error) => console.log("fetchToken", error)
      );
  }
  

function answers(questions) {
  const allQuestionsRandomized = questions.map((question) => {
    const { correct_answer, incorrect_answers } = question;
    const correct = {
      answer: decodeEntities(correct_answer),
      "data-testid": "correct-answer",
      style: {
        border: "3px solid rgb(6, 240, 15)",
      },
    };
    const incorrect = incorrect_answers.map((answer, i) => ({
      answer: decodeEntities(answer),
      "data-testid": `wrong-answer-${i}`,
      style: {
        border: "3px solid rgb(255, 0, 0)",
      },
    }));

    const allAnswers = [...incorrect, correct];

    return {
      question: decodeEntities(question.question),
      category: question.category,
      answer: randomizeArray(allAnswers),
      difficulty: question.difficulty,
      type: question.type,
    };
  });
  return allQuestionsRandomized;
}

function fetchQuestions({ category, difficulty, type }) {
  return fetchToken().then((token) =>
    fetch(
      `${QUESTIONS_URL}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`
    )
      .then((response) => response.json())
      .then((data) => answers(data.results))
  );
}

const TOKEN_URL = "https://opentdb.com/api_token.php?command=request";

export default fetchQuestions
