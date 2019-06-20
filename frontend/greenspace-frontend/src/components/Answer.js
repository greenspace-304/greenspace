import React from 'react';
import './Answer.css';

export class Answer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionID: this.props.questionID,
            nextQuestionID: this.props.nextQuestionID,
            answer: this.props.answer,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("ANSWER CHANGE");
        this.setState({
            questionID: nextProps.questionID,
            nextQuestionID: nextProps.nextQuestionID,
            answer: nextProps.answer
        });
    }

    onClick(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        
        this.props.onClick(this.state);
    }
    render() {
        return (
            <li key={this.props.questionID} class="answerContainer">
                <input
                    class="answerButton"
                    type="radio"
                    name="answer"
                    value={this.props.answer}
                    onClick={e => this.onClick(e)}
                />
                <label class="answerText">
                    {this.props.answer}
                </label>
            </li>
        );
    }

}
