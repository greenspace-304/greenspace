import React from 'react';
import {GridCell} from './GridCell';
import './QueryGrid.css';
import {Popup} from './Popup';
import {PlantForm} from './PlantForm';

/* 
* Customizable Query Grid, can be used for various queries
* will take in props of headings and rows
*/


export class QueryGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showPopup: false, rows: [] };  
        

        this.createHeaders = this.createHeaders.bind(this);
        this.createGridCell = this.createGridCell.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log("WILL UPDATE");
        console.log(nextProps.userID);
        this.setState({
            rows: nextProps.rows
        });

    }

    createHeaders(_header, headerIndex) {

        return (
            <GridCell
                key={`C-${headerIndex}`}
                data={_header}
                header={true}
            />
        );

    }


    createGridCell(_row, rowIndex) {

        const rows = this.props.rows;

        return (
            <tr key={`row-${rowIndex}`}>
                {rows[rowIndex].map((_gridCell, columnIndex) => {
                    return (
                        <GridCell
                            key={`R-${rowIndex} C-${columnIndex}`}
                            data={rows[rowIndex][columnIndex]}
                            header={false}
                        />
                    );

                })}
            </tr>
        );

    }

    render() {
        console.log(this.props);
        return (
            <div>
                <table class="queryGrid">
                    <thead><tr>{this.props && this.props.headings && this.props.headings.map(this.createHeaders)}</tr></thead>
                    <tbody>{this.props && this.props.rows && this.props.rows.map(this.createGridCell)}</tbody>
                </table>
            </div>
        );
    }
}
