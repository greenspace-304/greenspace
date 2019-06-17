import React from 'react';

export class GridCell extends React.Component {
    render() {

        const style = this.props.header ? "gridCell gridHeader" : "gridCell";

            return (
                <th class={style}>
                    {this.props.data}
                </th>
            );

    }
}