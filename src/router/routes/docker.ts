export default {
    path: '/docker',
    name: 'Docker',
    layout: 'layouts/ThemeLayout',
    routes: [
        {
            path: '/image',
            component: 'docker/image/index'
        }
    ]
};
