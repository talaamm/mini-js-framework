import * as DOM from '../framework/dom.js';
import * as todoList from './TodoList.js';
import * as helpers from '../helper.js';
import * as State from '../framework/state.js';
import * as Router from '../framework/router.js';
import * as Events from '../framework/events.js';

const appdiv = DOM.findDOMNode('#app');
let main, footer;

export function Render_TodoApp() {
    const app = DOM.createElement({
        tag: 'section',
        attrs: { class: 'todoapp' },
        children: [
            {
                tag: 'header',
                attrs: { class: 'header' },
                children: [
                    { tag: 'h1', children: ['todoMVC'] },
                    {
                        tag: 'input', //    <input class="new-todo" placeholder="What needs to be done?" autofocus />
                        attrs: { class: 'new-todo', placeholder: 'What needs to be done?', autofocus: true }
                    }
                ]
            }]
    });
    DOM.render(app, appdiv);

    main = DOM.createElement({
        tag: 'section',
        attrs: { class: 'main' },
        children: [
            {
                tag: 'input',
                attrs: {
                    id: 'toggle-all', class: 'toggle-all', type: 'checkbox',
                    onclick: (event) => {
                        helpers.toggleAll(event.target.checked);
                        todoList.Render_TodoList();
                    }
                }
            },
            {
                tag: 'label',
                attrs: { for: 'toggle-all' },
                children: ['Mark all as complete']
            },
            {
                tag: 'ul',
                attrs: { class: 'todo-list' },
            },
        ]
    });
    DOM.render(main, app);

    footer = DOM.createElement({
        tag: 'footer',
        attrs: { class: 'footer' },
        children: [
            { tag: 'span', attrs: { class: 'todo-count' }, children: ['0 items left'] }, //children: `${state.todos.length} items left` }
            {
                tag: 'ul',
                attrs: { class: 'filters' },
                children: [
                    { tag: 'li', attrs: { filter: 'all', onclick: () => Router.navigate('/') }, children: [{ tag: 'a', children: ['All'] }] },
                    { tag: 'li', attrs: { filter: 'active', onclick: () => Router.navigate('/active') }, children: [{ tag: 'a', children: ['Active'] }] },
                    { tag: 'li', attrs: { filter: 'completed', onclick: () => Router.navigate('/completed') }, children: [{ tag: 'a', children: ['Completed'] }] }
                ]
            },
            {
                tag: 'button',
                attrs: {
                    class: 'clear-completed',
                    onclick: () => {
                        helpers.ClearCompleted();
                        todoList.Render_TodoList();
                    }
                },
                children: ['Clear completed']
            }
        ]
    });
    DOM.render(footer, app);
    updateUI()
}

export function updateUI() {
    let Todos = State.getState().todos;
    main.style.display = footer.style.display = Todos.length > 0 ? 'block' : 'none'
    
    DOM.findDOMNode('.clear-completed').style.display = Todos.some(todo => todo.isCompleted) ? 'block' : 'none';

    const activeCount = Todos.filter(todo => !todo.isCompleted).length;
    const count = DOM.findDOMNode('.todo-count');
    DOM.updateDOMNode(count, `<strong>${activeCount}</strong> item${activeCount === 1 ? '' : 's'} left`);

    let filter = State.getState().filter;
    console.log('filter', filter)
    DOM.findDOMNode('.filters').querySelectorAll('a').forEach(a => a.classList.remove('selected'));
    DOM.findDOMNode(`.filters [filter="${filter}"] a`).classList.add('selected');
}