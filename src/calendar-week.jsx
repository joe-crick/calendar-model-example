import React from 'react';
import {getTwentyFourHourTimeSlots, twentyFourToTwelveHourTime} from 'calendar-model/lib/hours';
import {getCalendarTitle} from './models/calendar';

const {array, number} = React.PropTypes;
const timeSlots = getTwentyFourHourTimeSlots();

const calendarWeek = props => {
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="cal-nav btn btn-primary right" onClick={props.prevWeek}>Prev</button>
            </div>
            <div className="col">
              <h1 className="month-title">{getCalendarTitle(props.month, props.year)}</h1>
            </div>
            <div className="col">
              <button className="cal-nav btn btn-primary" onClick={props.nextWeek}>Next</button>
            </div>
          </div>
        </div>
      </div>

      <table className="calendar-example">
        <thead>
        <tr>
          <th>&nbsp;</th>
          {props.weekdayNames.map((dayName, idx) =>
            <th key={idx}>{dayName} {props.calendarDays[idx].dayOfMonth}</th>)}
        </tr>
        </thead>
        <tbody className="week-calendar">
        {timeSlots.map(hour => {
          return (
            <tr key={hour} className="day">
              <td className="day-contents">{twentyFourToTwelveHourTime(hour)}</td>
              {props.calendarDays.map((day, index) => {
                return (
                  <td key={index} className="day-contents">
                    <ul>
                      {day.events.filter(ev => ev.time === hour)
                        .map(ev => {
                          return (<li key={ev.id}>{ev.title}</li>)
                        })}
                    </ul>
                  </td>
                )
              })}
            </tr>);
        })}
        </tbody>
      </table>
    </div>
  );
};

calendarWeek.propTypes = {
  month: number,
  year: number,
  calendarDays: array,
  weekdayNames: array
};

export default calendarWeek;