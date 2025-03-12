
import * as DOM from "../framework/dom.js";
import * as State from "../framework/state.js";
import * as TodoItem from "./TodoItem.js";
import * as TodoApp from "./TodoApp.js";

export function Render_TodoList() {
    const TodoList = DOM.findDOMNode(".todo-list")
    // console.log('RENDER TODO LIST IS CALLED' , TodoList)
    
    DOM.emptyElement(TodoList);
    let Todos = State.filterTodos()
    // console.log('RENDER TODO LIST:' , Todos)
    // console.log(Todos)
    Todos.forEach(todo => {
        const todoNode = TodoItem.createTodoNode(todo);
        DOM.render(todoNode, TodoList);
    });
    TodoApp.updateUI()
}
