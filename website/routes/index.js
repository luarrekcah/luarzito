const express = require("express");
const config = require("../config");
const router = express.Router();

// Default
const indexRoute = require("./default/index.route");
const authRoute = require("./default/auth.route");
const dashboardRoute = require("./default/dashboard.route");
// API
// const apiRoute = require("./api/api.route");
// DEV
// const docsRoute = require("./dev/docs.route");

const defaultRoutes = [
  {
    path: "/",
    route: indexRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/dashboard",
    route: dashboardRoute,
  },
];/*

const apiRoutes = [
  {
    path: "/v1",
    route: apiRoute,
  },
];*/
/*
const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];*/

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
/*
apiRoute.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}*/

module.exports = router;
