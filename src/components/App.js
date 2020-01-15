import React from 'react';
import '../assets/css/style.css';
import quizService from "./quizBank"
import QusetionBox from "./questionBox"
import Result from "./result"

export default class quizGame extends React.Component {
  
  // ! Empty state declared:
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };

  // ! Function to getting the questions from the "questionBank" component
  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      })
    })
  }

  computeAnswer = (answer, correctAnswer) => {
    if(answer === correctAnswer) {
      this.setState({
        score: this.state.score +1 
      });
    }
    this.setState({

      responses: this.state.responses < 5 ? this.state.responses + 1 : 5  
    })
  }

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    })
  }
  // ! Mount the function
  componentDidMount(){
    this.getQuestions();
  }

  // ! Rendering the componenets into the DOM (view)
  render() {
    return (
      <div className="container">
        <div className="title">Quiz Game</div>
        { this.state.questionBank.length > 0 && 
          this.state.responses < 5 && 
          this.state.questionBank.map(({question, answers, correct, questionId}) => (
           <QusetionBox 
           question={question} 
           options={answers} 
           key={questionId}
           selected={answer => this.computeAnswer(answer, correct)} />  
         ))}

         {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />): null }  
      </div>
    );
  }
}

 