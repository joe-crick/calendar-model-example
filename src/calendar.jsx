import React from 'react';
import cal from 'calendar-model/dist/bundle.js';
import './calendar.css';

const monthNameFinder = cal.month.monthNameFinder();
const weekDayNameFinder = cal.week.weekDayNameFinder();

function getAdjustedMonth(month) {
    return parseInt(month, 10) - 1;
}

function getCalendarTitle(props) {
    return `${monthNameFinder(getAdjustedMonth(props.month))}: ${props.year}`;
}

function getDayClassName(day, month) {
    return `day ${(day.date.getMonth() === getAdjustedMonth(month)) ? 'current' : 'outside'}`
}

function getWeekDayNames() {
    const names = [];
    for(let x = 0; x< 7; x++) {
        names.push(<th key={x}>{weekDayNameFinder(x)}</th>)
    }
    return names;
}

const Calendar = props => {

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <button className="cal-nav btn btn-primary right" onClick={props.prevMonth}>Prev</button>
                        </div>
                        <div className="col">
                            <h1 className="month-title">{getCalendarTitle(props)}</h1>
                        </div>
                        <div className="col">
                            <button className="cal-nav btn btn-primary" onClick={props.nextMonth}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="calendar-example">
                <thead>
                    <tr>
                        {getWeekDayNames()}
                    </tr>
                </thead>
                <tbody>
                    {props.calendarDays.map((week, index) => {
                        return (
                            <tr key={index} className="week">
                                {week.map((day, idx) => {
                                    return (
                                    <td key={idx} className={getDayClassName(day, props.month)}>
                                        <div className="day-contents">
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
                                        </div >
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
    month: React.PropTypes.number,
    year: React.PropTypes.number,
    calendarDays: React.PropTypes.array
};

export default Calendar;