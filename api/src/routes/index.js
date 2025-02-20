const express = require('express');
const initiativesRoute = require('./initiative.route');
const badgesRoute = require('./badge.route');
const narrativeRoute = require('./narrative.route');
const config = require('../config/config');

const router = express.Router();

const routes = [
    {
        path: '/i',
        route: initiativesRoute
    },
    {
        path: '/n',
        route: narrativeRoute
    },
    {
        path: '/b',
        route: badgesRoute
    },

];

const devRoutes = []

// Default routes.
routes.forEach((route) => {
    router.use(route.path, route.route);
});

// Development routes.
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;
