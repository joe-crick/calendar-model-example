import React from 'react';
import cal from 'calendar-model/dist/bundle.js';
import './calendar.css';

const monthNameFinder = cal.month.monthNameFinder();

function getAdjustedMonth(month) {
    return parseInt(month, 10) - 1;
}

function getCalendarTitle(props) {
    return `${monthNameFinder(getAdjustedMonth(props.month))}: ${props.year}`;
}

function getDayClassName(day, month) {
    return `day ${(day.date.getMonth() === getAdjustedMonth(month)) ? 'current' : 'outside'}`
}

const Calendar = props => {

    return (
        <div className="calendar-container">
            <h1>{getCalendarTitle(props)}</h1>
            <table className="calendar-example">
                <tbody>
                    {props.calendarDays.map((week, index) => {
                        return (
                            <tr key={index} className="week">
                                {week.map((day, idx) => {
                                    return (
                                    <td key={idx} className={getDayClassName(day, props.month)}>
                                        <h3>{day.dayOfMonth}</h3>
                                        <ul className="events">
                                        {day.events.map((ev, idx) => {
                                            return (
                                                <li key={idx}>
                                                    {ev.time}: {ev.title}
                                                </li>
                                            )
                                        })}
                                        </ul>
                                    </td>);
                                })}                                             
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
};

Calendar.propTypes = {
    month: React.PropTypes.string,
    year: React.PropTypes.string,
    calendarDays: React.PropTypes.array
};

export default Calendar;