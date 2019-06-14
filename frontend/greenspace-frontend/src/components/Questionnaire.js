import React from 'react';
import {Question} from './Question';
import {Answer} from './Answer';
import './Questionnaire.css';

export class Questionnaire extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: 'What is your favourite Cheese',
            answerOptions: ['brie', 'cheddar', 'fromage'],
            userAnswers: [],
            questionCount: 0,
            endOfQuestionnaire: false
        };

        this.updateQuestion = this.updateQuestion.bind(this);
        this.updateAnswers = this.updateAnswers.bind(this);
        this.updateEndOfQuestionnaire = this.updateEndOfQuestionnaire.bind(this);
        this.onAnswerSelected = this.onAnswerSelected.bind(this);
        this.renderQuestionnaire = this.renderQuestionnaire.bind(this);

    }
    
    // invoked at start
    componentDidMount() {

        this.updateQuestion();
        this.updateAnswers();
        
    }

    updateAnswers() {
        // update answers user has submitted
        this.generateAnswerQuery()
        .then((qry) => {
            return this.getNextAnswerOptions(qry);
        })
        .then((newAnswerOptions) => {
            this.setState(
                {
                    answerOptions: newAnswerOptions
                }
            )
        })
        .catch((errorMessage) => {
            console.log(errorMessage);
        });
    }

    updateQuestion() {
        // update questions based on answers
        this.generateQuestionQuery()
        .then((qry) => {
            return this.getNextQuestion(qry);
        })
        .then((newQuestion) => {
            this.setState(
                {
                    question: newQuestion
                }
            )
        })
        .catch((errorMessage) => {
            console.log(errorMessage);
        })     
    }

    generateQuestionQuery() {
        //TODO: return query for question
        return new Promise((resolve, reject) => {
            let query = 'new query';
            resolve(query);
        })

    }

    generateAnswerQuery() {
        //TODO: return query for answer options
        return new Promise((resolve) => {
            let query = 'new query';
            resolve(query);
        })
    }

    getNextQuestion() {
        //TODO: connect with backend to return next question string
        return new Promise((resolve) => {
            resolve(this.state.question);
        })
    }

    getNextAnswerOptions() {
        //TODO: connect with backend to return array of answer options
        return new Promise((resolve) => {
            resolve(this.state.answerOptions);
        })
    }

    onAnswerSelected() {
        //TODO determine condition for end of questionnaire

        if (!(this.state.endOfQuestionnaire)){
            this.updateAnswers();
            this.updateQuestion();
        }

    }

    renderQuestionnaire(){
        return (
            <div class="questionnaire">
                <Question question={this.state.question} />
                <ul class="answerContainer">
                    {this.state.answerOptions.map((answer) => {
                            return (<Answer answer={answer} onClick={this.onAnswerSelected} />);
                            }
                        )
                    }
                </ul>
            </div>
        );
    }

    renderResult() {
        return (
            <div>
                <p>End</p>
            </div>
        );
    }

    updateEndOfQuestionnaire() {
        this.setState({
            endOfQuestionnaire : true
        });
    }

    render() {
        return (
            <div>
                {this.state.endOfQuestionnaire ? this.renderResult() : this.renderQuestionnaire()}
            </div>
        );
    }
}

