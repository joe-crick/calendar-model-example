import {monthNameFinder} from 'calendar-model/lib/month';

/**
 * NOTE: Because you can write your onw event processor, the format of event data
 * is only limited by the constraints of being able to correctly map events to a specific date.
 * See how these events are mapped to their dates in calendar-month.jsx.
 */
const getMonthName = monthNameFinder();
const year = new Date().getFullYear();
const eventData = {};
const stringDate = (day, month, year) => `${day}/${month}/${year}`;
let mos = 13;
/**
* The following produces data in the format of:
* { 
*    '01/02/2017': [{time: '9:00', title: 'My Event' }]
* }
*/
for(let x = 1; x < mos; x++) {
    eventData[stringDate('01', x > 9 ? x : `0${x}`, year)] = [
        {time: '09:00', title: getMonthName(x), id: Math.random()},
        {time: '12:00', title:  'Eat Burritos', id: Math.random()},
        {time: '18:00', title:  'Dinner with The Wife', id: Math.random()}
    ]
}

export default eventData;