let routes = {};
let basePath = '';

export function init(routeConfig) {
    routes = { ...routeConfig, '/404': () => {
        console.error('No route found');
        document.body.innerHTML = '<h1>404 - Page Not Found</h1>';
    }};
    
    // Detect base path from current location
    const currentPath = window.location.pathname;
    if (currentPath.includes('/mini-js-framework')) {
        basePath = '/mini-js-framework';
    }
    
    window.addEventListener('popstate', onRouteChange);
    onRouteChange();
}

const onRouteChange = () => {
    let path = window.location.pathname;
    
    // Remove base path from the current path
    if (basePath && path.startsWith(basePath)) {
        path = path.substring(basePath.length) || '/';
    }
    
    const routeHandler = routes[path] || routes['/404'];
    if (routeHandler) {
        console.log(`Navigating to: ${path}`);
        routeHandler(path);
    } else {
        console.error(`No route found for: ${path}`);
    }
};

export function navigate(path) {
    const fullPath = basePath + path;
    history.pushState({}, '', fullPath);
    onRouteChange();
}
