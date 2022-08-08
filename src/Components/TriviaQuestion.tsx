import { useEffect, useState } from "react";
import {
  GiCrossMark,
  GiCrossedAxes,
  GiCheckMark,
  GiCheckeredFlag,
} from "react-icons/gi";
import "./TriviaQuestion.css";
import axios from "axios";

const TriviaQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [flag, setFlag] = useState(-1);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    getQuestionFromApi();
  }, []);

  //to get new question's data from api
  const getQuestionFromApi = () => {
    setNumber(number + 1);
    axios(`https://opentdb.com/api.php?amount=1`).then(
      (response) => {
        // console.log(response.data.results[0].correct_answer);
        // setCorrectAnswer("sdfsfg   sdfsfsfsdf  s df sfs fsd sdf sdf sdfsdfdfssdf");
        setQuestion(response.data.results[0].question);
        setCorrectAnswer(response.data.results[0].correct_answer);
      },
      (error) => {
        //in case of error
      }
    );
  };

  //to validate the answer when the user clicks on submit button
  const validateAnswer = () => {
    if (answer === "") {
      alert("Answer should not be empty");
      return;
    } else if (correctAnswer === answer) {
      setFlag(1);
    } else {
      setFlag(0);
    }
    setTimeout(() => {
      getQuestionFromApi();
      setFlag(-1);
      setAnswer("");
    }, 2000);
  };

  return (
    <div className="container">
      <div className="TriviaQuestion">
        <h1>TRIVIA</h1>
        <div className="question">
          {question === "" ? (
            <h3 style={{ textAlign: "center" }}>Loading...</h3>
          ) : (
            <h3>
              Q{number}.&nbsp;
              {question.replace(/\&[#?a-z0-9]*\;/g, "")}
            </h3>
          )}
          <input
            className="answer"
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />
          <div className="submit">
            <div className="options">
              {flag === 1 && (
                <>
                  <GiCheckMark style={{ color: "green" }} />
                  <p>
                    <b>Answer Is- {correctAnswer}</b>
                  </p>
                </>
              )}
              {flag === 0 && (
                <>
                  <GiCrossMark style={{ color: "red" }} />
                  <p>
                    <b>Answer Is- {correctAnswer}</b>
                  </p>
                </>
              )}
            </div>
            <button onClick={validateAnswer}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriviaQuestion;
