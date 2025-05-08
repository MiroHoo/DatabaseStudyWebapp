import {
    RouteConfig,
    index,
    layout,
    route,
  } from "@react-router/dev/routes";
  
  export default [
    index('./components/Start.jsx'),
    route("test","./components/TestCreator.jsx"),
    layout('./components/Header.jsx')
  ] satisfies RouteConfig;