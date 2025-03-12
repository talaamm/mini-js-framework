let state = {
    todos: [],
    filter: 'all'
};

export function setState(newState) {
    state = { ...state, ...newState };
}

export function getState() {
    return state;
}

export function filterTodos() {
    console.log('filterTodos:' , state.filter)
    switch (state.filter) {
        case 'active':
            return state.todos.filter(todo => !todo.isCompleted);
        case 'completed':
            return state.todos.filter(todo => todo.isCompleted);
        default:
            return state.todos;
    }
}
