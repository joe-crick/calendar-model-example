import makeEventFinder from 'calendar-model/lib/event';
import {getNestedCalendarMonth, monthNameFinder} from 'calendar-model/lib/month';
import {getWeekForDate, weekDayNameFinder} from 'calendar-model/lib/week';

/**
 * @description Initializes the calendar
 *
 * @export
 * @returns {Object} An object with two methods:
 *
 *  - getMonth: Returns a nested month of Days.  A two-dimensional array. The first dimension contains arrays of weeks.
 * The second dimension of each week array is an array of Days. This type of set is useful
 * for template systems like JSX, where tags must be specified as they are in HTML. In a more
 * free-form template environment, you can use a one-dimensional array.
 *  - getWeek: Returns a single week of Days.
 */
export default function initCalendar(calendarData) {

  // Creates a stateful function that maps events to days
  const getEvents = makeEventFinder(calendarData);

  return {
    getMonth(startDate) {
      return getNestedCalendarMonth({startDate, getEvents});
    },
    getWeek(startDate) {
      return getWeekForDate({startDate, getEvents});
    }
  }

}

const getWeekDayName = weekDayNameFinder();
const getMonthName = monthNameFinder();



/**
 * @desc Returns the appropriate text month name
 * @return {string}
 * @param month
 * @param year
 */
export function getCalendarTitle(month, year) {
  return `${getMonthName(month)}: ${year}`;
}

/**
 * @desc returns an array of weekday names
 * @return {Array}
 */
export function getWeekDayNames() {
  const names = [];
  for(let x = 0; x< 7; x++) {
    names.push(getWeekDayName(x))
  }
  return names;
}