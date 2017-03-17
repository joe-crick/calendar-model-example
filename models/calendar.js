var cal = require('calendar-model/dist/bundle.js');

/**
 * @description Initializes the calendar
 * 
 * @export
 * @returns 
 */
module.exports = function initCalendar(calendarData) {

    const getEvents = cal.event.makeEventFinder(calendarData);

    return function getMonth(date) {
        return cal.month.getNestedCalendarMonth({date, getEvents, isNested: true});
    }

}