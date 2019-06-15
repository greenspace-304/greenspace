import React from 'react';


export class Question extends React.Component {
    render() {
        return <h1 class="question">{this.props.question}</h1>;
    }
}

