import React from 'react';

const Calendar = props => {

    return (
        <table className="calendar-example">
            <tbody>
                {props.month.map((week, index) => {
                    return (
                        <tr>
                            {week.map((day, idx) => {
                                return (<td><h3>{day.formattedDate}</h3></td>);
                            })}                                             
                    </tr>);
                })}
            </tbody>
        </table>
    );
};

Calendar.propTypes = {
    month: React.PropTypes.array
};

export default Calendar;