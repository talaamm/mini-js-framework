import * as State from './framework/state.js';

export const removeTodo = (todoid) => {
    let newtodo = State.getState().todos.filter((todo) => todo.id !== todoid)
    State.setState({ todos: newtodo });
}

export const toggleTodo = (todoid) => {
    let newtodo = State.getState().todos.map(todo => {
        if (todo.id === todoid) {
            return { ...todo, isCompleted: !todo.isCompleted }
        }
        return todo //if its not the targetted todo just return it as it is
    })
    State.setState({ todos: newtodo });
}

export const toggleAll = (isCompleted) => {
    let newmap = State.getState().todos.map(todo => {
        return { ...todo, isCompleted }
    })
    State.setState({ todos: newmap });
}

export const updateTodo = (todoid, newtext) => {
    let newtodo = State.getState().todos.map(todo => {
        if (todo.id === todoid) {
            return { ...todo, text: newtext }
        }
        return todo //if its not the targetted todo just return it as it is
    })
    State.setState({ todos: newtodo });
}

export function ClearCompleted() {
    let newtodo = State.getState().todos.filter(todo => !todo.isCompleted)
    State.setState({ todos: newtodo });
}