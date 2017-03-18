import React from 'react';

function getEvents(events) {
    return events.map((ev, idx) => {
        return (
            <li key={idx}>
                {ev.time}: {ev.title}
            </li>
        )
    });
}

const Calendar = props => {

    return (
        <table className="calendar-example">
            <tbody>
                {props.month.map((week, index) => {
                    return (
                        <tr key={index}>
                            {week.map((day, idx) => {
                                return (<td key={idx}><h3>{day.formattedDate}</h3>
                                    <ul>
                                    {getEvents(day.events)}
                                    </ul>
                                </td>);
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