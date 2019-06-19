import React from 'react';
import './Questionnaire.css';

import {Question} from './Question';
import {Answer} from './Answer';
import {Collection} from './Collection';


export class Questionnaire extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currQuestionIndex: 0,
            questions: [],
            answers: [],
            
            currQuestion: '',
            currAnswerOptions: [],
            currColumn: '',
            userAnswers: [],
            questionCount: 0,
            endOfQuestionnaire: false
        };

        this.initializeQuestionsWithAnswers = this.initializeQuestionsWithAnswers.bind(this);
        this.updateQuestionAnswers = this.updateQuestionAnswers.bind(this);
        this.updateQuestionIndex = this.updateQuestionIndex.bind(this);
        this.onAnswerSelected = this.onAnswerSelected.bind(this);
        this.renderQuestionnaire = this.renderQuestionnaire.bind(this);
    }

    
    // invoked at start
    componentDidMount() {

        this.getQuestionsAnswers();

        
    }

    getQuestionsAnswers(){
        fetch(`http://localhost:9000/questionaire`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.questions);
            let temp = data.questions;
            temp.forEach((question) => {question.answerOptions = data.answers.filter((answer) => {
                
                if(question.QuestionID === answer.QuestionID) {
                    return answer;
                }

            })}
            );

            this.setState({
                questions: temp,
                answers: data.answers
            }, this.initializeQuestionsWithAnswers)
        })
        .catch(err => console.error(err));
    }

    initializeQuestionsWithAnswers(){

        this.updateQuestionAnswers();
    }

    updateQuestionAnswers() {
        // update questions based on answers
        this.setState({
            currQuestion: this.state.questions[this.state.currQuestionIndex].Description,
            currAnswerOptions: this.state.questions[this.state.currQuestionIndex].answerOptions,
            currAttribute : this.state.questions[this.state.currQuestionIndex].Attribute
        }); 


    }

    updateQuestionIndex(answerState) {
        let nextQuestionIndex = (answerState.nextQuestionID % 2000) - 1;
        console.log(nextQuestionIndex)
        this.setState({
            currQuestionIndex: nextQuestionIndex
        }, this.updateQuestionAnswers);
        
    }

    onAnswerSelected(answerState) {
        //TODO determine condition for end of questionnaire
        const newAnswer = {attribute: this.state.currAttribute, answer: answerState.answer};
        this.setState(prevState => ({
            userAnswers: [...prevState.userAnswers, newAnswer]
        }))
        console.log(answerState);
        if (!answerState.nextQuestionID){
            this.setState({
                endOfQuestionnaire: true
            });
        }
        else {
            setTimeout(() => this.updateQuestionIndex(answerState), 300);
        }

    }

    renderQuestionnaire(){
        return (
            <div class="questionnaire">
                <Question question={this.state.currQuestion} />
                <ul class="answerContainer">
                    {this.state.currAnswerOptions && this.state.currAnswerOptions.map((answer) => {
                            return (<Answer answer={answer.Description} questionID={answer.QuestionID} nextQuestionID={answer.NextQuestion} onClick={this.onAnswerSelected} />);
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

    render() {
        console.log(this.state.userAnswers);
        return (
            <div>
                {this.state.endOfQuestionnaire ? this.renderResult() : this.renderQuestionnaire()}
            </div>
        );
    }
}

