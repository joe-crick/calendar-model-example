import cal from 'calendar-model/dist/bundle.js';

/**
 * @description Initializes the calendar
 * 
 * @export
 * @returns 
 */
export default function initCalendar(calendarData) {

    const getEvents = cal.event.makeEventFinder(calendarData);

    return function getMonth(date) {
        return cal.month.getNestedCalendarMonth({date, getEvents});
    }

}