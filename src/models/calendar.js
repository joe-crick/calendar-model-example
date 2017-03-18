import cal from 'calendar-model/dist/bundle.js';

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

    const getEvents = cal.event.makeEventFinder(calendarData);

    return function getMonth(date) {
        return cal.month.getNestedCalendarMonth({date, getEvents});
    }

}