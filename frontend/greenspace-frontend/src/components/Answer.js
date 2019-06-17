import React from 'react';
import './Answer.css';

export class Answer extends React.Component {
    render() {
        return (
            <li class="answerContainer">
                <input
                    class="answerButton"
                    type="radio"
                    name="answer"
                    value={this.props.answer}
                    onClick={this.props.onClick}
                />
                <label class="answerText">
                    {this.props.answer}
                </label>
            </li>
        );
    }

}
