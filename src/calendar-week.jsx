import React from 'react';
import {getTwentyFourHourTimeSlots, twentyFourToTwelveHourTime} from 'calendar-model/lib/hours'

const {array, number} = React.PropTypes;
const timeSlots = getTwentyFourHourTimeSlots();

const calendarWeek = props => {
  return (
    <div>
      <table className="calendar-example">
        <thead>
        <tr>
          <th>&nbsp;</th>
          {props.weekdayNames.map((dayName, idx) =>
            <th key={idx}>{dayName} {props.calendarDays[idx].dayOfMonth}</th>)}
        </tr>
        </thead>
        <tbody>
        {timeSlots.map((hour, idx) => {
          return (
            <tr key={idx} className="day">
              <td className="day-contents">{twentyFourToTwelveHourTime(hour)}</td>
              {props.calendarDays.map((day, index) => {
                return (
                  <td key={index} className="day-contents">
                    <ul>
                      {day.events.filter(ev => ev.time === hour)
                        .map((ev, idx) => {
                          return (<li key={idx}>{ev.title}</li>)
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