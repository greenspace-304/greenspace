import React from 'react';
import './QuestionnairePage.css';

import {Questionnaire} from '../components/Questionnaire';

export class QuestionnairePage extends React.Component {
    render() {
        return (
            <div class="questionnaireContainer">
                <Questionnaire />
            </div>
        );
    }
}