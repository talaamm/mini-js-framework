const events = {};

export function addEvent(element, event, handler) {
    if (!events[element]) {
        events[element] = {};
    }
    if (!events[element][event]) {
        events[element][event] = [];
    }
    events[element][event].push(handler);
    console.log('events:', events)
    element.addEventListener(event, handler);
}

// export function removeEvent(element, event, handler) {
//     if (events[element] && events[element][event]) {
//         const index = events[element][event].indexOf(handler);
//         if (index > -1) {
//             events[element][event].splice(index, 1);
//             element.removeEventListener(event, handler);
//         }
//     }
// }