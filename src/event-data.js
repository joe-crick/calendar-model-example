import cal from 'calendar-model/dist/bundle.js';

/**
 * NOTE: Because you can write your onw event processor, the format of event data
 * is only limited by the constraints of being able to correctly map events to a specific date.
 * See how these events are mapped to their dates in calendar.jsx.
 */
const monthNameFinder = cal.month.monthNameFinder();
const year = new Date().getFullYear();
const eventData = {};
const stringDate = (day, month, year) => `${day}/${month}/${year}`;
let mos = 12;
/**
* The following produces data in the format of:
* { 
*    '01/02/2017': [{time: '9:00', title: 'My Event' }]
* }
*/
while(mos--) {
    eventData[stringDate('01', mos > 9 ? mos : `0${mos}`, year)] = [
        {time: '9:00', title: monthNameFinder(mos-1)},
        {time: '12:00', title:  'Eat Burritos'},
        {time: '18:00', title:  'Dinner with The Wife'}
    ]
}

export default eventData;