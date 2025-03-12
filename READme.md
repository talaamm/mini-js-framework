# Mini JavaScript Framework Documentation

## How to run the app locally?

make sure you've downloaded Node.js, then in your terminal:

```terminal
npm install
npm run dev
```

then go to <http://localhost:5173/> and enjoy!

---

## Overview

This mini JavaScript framework provides a simple way to manage the DOM, handle state, manage events, and implement routing in your web applications. The framework includes the following features:

- **Abstracting the DOM**: Simplifies the creation and manipulation of DOM elements.
- **State Management**: Provides a centralized state management system.
- **Event Handling**: Simplifies the process of adding and managing events.
- **Routing System**: Allows for easy client-side routing.

## Features

### Abstracting the DOM

The framework provides functions to create and render DOM elements, making it easier to build and update the UI.

### State Management

The framework includes a state management system that allows you to manage the application state in a centralized way.

### Event Handling

The framework simplifies the process of adding and managing events, making it easier to handle user interactions.

### Routing System

The framework includes a routing system that allows you to define and handle different routes in your application.

---

## Usage

### Creating an Element

To create an element, use the `createElement` function from the `dom.js` module:

```javascript
import { render, createElement } from './src/framework/dom.js';

const element = createElement({
    tag: 'div',
    attrs: { class: 'container' },
    children: [
        { tag: 'h1', attrs: {}, children: ['Hello World!'] },
        { tag: 'p', attrs: {}, children: ['This is a simple paragraph.'] }
    ]
});

render(element, document.getElementById('app'));
```

### Adding Attributes to an Element

To add attributes to an element, include them in the `attrs` property of the virtual DOM object:

```js
const input = createElement({
    tag: 'input',
    attrs: { type: 'text', placeholder: 'Enter text' }
});

render(input, document.getElementById('app'));
```

### Creating an Event

To create an event, use the `addEvent` function from the `events.js` module:

```js
import { addEvent } from './src/framework/events.js';

const button = document.querySelector('button');
addEvent(button, 'click', () => alert('Button clicked!'));
```

### Nesting Elements

To nest elements, include them in the `children` property of the virtual DOM object:

```js
const parent = createElement({
    tag: 'div',
    attrs: { class: 'parent' },
    children: [
        createElement({
            tag: 'div',
            attrs: { class: 'child' },
            children: ['Child Element']
        })
    ]
});

render(parent, document.getElementById('app'));
```

---

## How the Framework Works

- ### DOM Abstraction

  - The framework provides a createElement function that takes a virtual DOM object and returns a real DOM element. The render function is used to append the created element to a container in the actual DOM.

- ### State Management

  - The state management system includes functions to initialize the state (init), get the current state (getState), set a new state (setState), and subscribe to state changes (subscribe). The state is stored in a centralized object, and any changes to the state trigger updates to the subscribed components.

- ### Event Handling

  - The event handling system includes an addEvent function that takes an element, an event type, and a handler function. The function adds the event listener to the element and stores the event handler in an internal object for easy management.

- ### Routing System

  - The routing system includes an init function to initialize the routes and a navigate function to change the current route. The init function sets up an event listener for the hashchange event and calls the appropriate route handler based on the current URL hash.

---

### Example

Please checkout the `src/index.js` file on how to use the framework to create a simple Todo application.
