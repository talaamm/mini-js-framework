let routes = {};

export function init(routeConfig) {
    routes = { ...routeConfig, '/404': () => {
        console.error('No route found');
        document.body.innerHTML = '<h1>404 - Page Not Found</h1>';
    }};
    window.addEventListener('popstate', onRouteChange);
    onRouteChange();
}

const onRouteChange = () => {
    let path = window.location.pathname;
    const routeHandler = routes[path] || routes['/404'];
    if (routeHandler) {
        console.log(`Navigating to: ${path}`);
        routeHandler(path);
    } else {
        console.error(`No route found for: ${path}`);
    }
};

export function navigate(path) {
    history.pushState({}, '', path);
    onRouteChange();
}
