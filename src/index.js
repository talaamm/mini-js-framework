import * as TodoApp from "./components/TodoApp.js";
import * as DOM from "./framework/dom.js";
import * as Events from "./framework/events.js";
import * as State from './framework/state.js';
import * as TodoList from './components/TodoList.js';
import * as Router from './framework/router.js';

TodoApp.Render_TodoApp(); //creates the main todo app page

const addTodo = (textnew) => {
    const newTodo = {
        id: crypto.randomUUID(), //  id: Date.now(),
        text: textnew,
        isCompleted: false,
    }

    const updatedTodos = [newTodo, ...State.getState().todos];
    State.setState({ todos: updatedTodos });
    return updatedTodos;
}

const handleNewTodo = () => {
    const newTodo = DOM.findDOMNode(".new-todo"); //will be our input where we type what needs to be done

    Events.addEvent(newTodo, 'keyup', (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            //  console.log('submit', event.target.value) //event.target.value is the value written in the box
            addTodo(event.target.value);
            TodoList.Render_TodoList()
            event.target.value = ''
        }
    })
}

const updateTodoList = (route) => {
    console.log('route: ' , route);
    State.setState({ filter: route });
    TodoList.Render_TodoList();
};

Router.init({
    "/": () => updateTodoList("all"),
    "/active": () => updateTodoList("active"),
    "/completed": () => updateTodoList("completed"),
});

handleNewTodo()
