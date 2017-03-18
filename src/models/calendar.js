import makeEventFinder from 'calendar-model/lib/event';
import {getNestedCalendarMonth} from 'calendar-model/lib/month';

/**
 * @description Initializes the calendar
 * 
 * @export
 * @returns {Array} A two-dimensional array. The first dimension contains arrays of weeks. 
 * The second dimension of each week array is an array of Days. This type of set is useful
 * for template systems like JSX, where tags must be specified as they are in HTML. In a more
 * free-form template environment, you can use a one-dimensional array.
 */
export default function initCalendar(calendarData) {

    // Creates a stateful function that maps events to days
    const getEvents = makeEventFinder(calendarData);

    return function getMonth(date) {
        return getNestedCalendarMonth({date, getEvents});
    }

}