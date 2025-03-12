export const createElement = (vnode) => {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    const element = document.createElement(vnode.tag);

    // Set attributes
    if (vnode.attrs) {
        Object.entries(vnode.attrs).forEach(([key, value]) => {
            if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.substring(2).toLowerCase(), value);
            } else {
                element.setAttribute(key, value);
            }
        });
    }

    // Append children efficiently
    const fragment = document.createDocumentFragment();
    (vnode.children || []).forEach(child => fragment.appendChild(createElement(child)));
    element.appendChild(fragment);

    return element;
};


export function render(vdom, container) {
  if (vdom instanceof HTMLElement) {
        container.appendChild(vdom);
    } else {
        container.appendChild(createElement(vdom));
    }
}

export function emptyElement(vdom) {
    if (vdom instanceof HTMLElement) {
        vdom.innerHTML = "";
    } else {
        throw new Error('Invalid vdom type. Expected an HTMLElement.');
    }
}

export function findDOMNode(node) {
    if (node instanceof HTMLElement) {
        return node;
    } else if (typeof node === 'string') {
        return document.querySelector(node);
    } else {
        throw new Error('Invalid node type. Expected an HTMLElement or a string.');
    }
}

export function updateDOMNode(node, newVdom) {
    if (node instanceof HTMLElement) {
        node.innerHTML = newVdom;
    } else {
        throw new Error('Invalid node type. Expected an HTMLElement or a string.');
    }
}

