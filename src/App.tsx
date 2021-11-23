import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './Services/quizz_services';
import { QuizType } from './Types/quiztype';
import QuestionCard from './components/QuestionCard';
import logo from "./loading.gif";


function App() {

  let [quiz, setQuiz] = useState<QuizType[]>([])
  let [currentStep, setcurrentStep] = useState(0)
  let [score, setscore] = useState(0)
  let [showResult, setShowResult] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const questions: QuizType[] = await getQuizDetails(5, 'easy');
      setQuiz(questions)

    }

    fetchData();
  }, [])
  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {

    e.preventDefault();

    const currentQuestion: QuizType = quiz[currentStep];
    console.log("correct And :  " + currentQuestion.correct_answer + "--user Selection  " + userAns);

    if (userAns === currentQuestion.correct_answer) {
      setscore(++score);
    }
    if (currentStep !== quiz.length - 1)

      setcurrentStep(++currentStep);
    else {


      setShowResult(true);

    }
  }
  if (!quiz.length)

    return <h1 style={{textAlign:"center"}}> 
       <img src={logo} alt="Logo" />
           </h1>

  if (showResult) {
    return (<div className="question-container">
      <h2 style={{fontSize:'70px'}}>Result</h2>

      <p className="result-text">
        You final score is
        <b> {score}</b> out of <b>{quiz.length}</b>
      </p>
    </div>)

  }

  return (
    <div className='main'>
      <div style={{marginTop:"30px", fontWeight:'bold',fontSize:'60px',borderRadius:"10px",backgroundColor:"pink"}}>
        Quiz App With TypeScript
      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
    </div>
  );
}

export default App;
