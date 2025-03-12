import * as DOM from "../framework/dom.js";
import * as Events from "../framework/events.js";
import * as helpers from '../helper.js';
import * as State from '../framework/state.js';
import * as TodoList from './TodoList.js';

export const createTodoNode = (todo) => {
    console.log('CREATE NODE IS CALLED')
    let className = todo.isCompleted ? 'completed' : '';

    const node = DOM.createElement({ tag: 'li', attrs: { class: className } });

    const todoItem = DOM.createElement({
        tag: 'div',
        attrs: { class: 'view' },
        children: [
            {
                tag: 'input',
                attrs: {
                    class: 'toggle', type: 'checkbox',
                    ...(todo.isCompleted ? { checked: true } : {}),
                    onclick: () => {
                        helpers.toggleTodo(todo.id);
                        console.log('toggle todo:', State.getState().todos);
                        TodoList.Render_TodoList();
                    }
                }
            },
            {
                tag: 'label',
                children: [todo.text]
            },
            {
                tag: 'button',
                attrs: {
                    class: 'destroy',
                    onclick: () => {
                        helpers.removeTodo(todo.id);
                        console.log('remove todo:', State.getState().todos);
                        TodoList.Render_TodoList();
                    }
                }
            }
        ]
    });
    DOM.render(todoItem, node);

    const editInput = DOM.createElement({
        tag: 'input',
        attrs: { class: 'edit', value: todo.text }
    })
    DOM.render(editInput, node);

    Events.addEvent(todoItem.children[1], 'dblclick', () => {
        node.classList.add('editing');
        editInput.focus();
    }
    )

    Events.addEvent(editInput, 'keyup', (event) => {
        if (event.key === 'Enter') {
            let newtext = event.target.value;
            helpers.updateTodo(todo.id, newtext)
            console.log('update todo: ', State.getState().todos)
            TodoList.Render_TodoList()
        } else if (event.key === 'Escape') {
            event.target.value = todo.text;
            node.classList.remove('editing');
        }
    });

    // Add blur event listener (when the user clicks outside the input)
    Events.addEvent(editInput, 'blur', (event) => {
        event.target.value = todo.text;
        node.classList.remove('editing');
    });

    return node;
}

