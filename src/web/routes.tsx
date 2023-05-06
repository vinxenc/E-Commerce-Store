// import * as React from 'react';
// import * as Loadable from 'react-loadable';

// import Loading from './components/loading';

// const delay = 2000;
// const timeout = 10000;

// interface RouteLoadable {
//   path: string;
//   exact: boolean;
//   name: string;
//   component: React.ComponentType<unknown> & Loadable.LoadableComponent;
// }

// const LoadableDefaultOptions = {
//   delay,
//   timeout,
// };
// // Pages
// const Home = Loadable({
//   ...LoadableDefaultOptions,
//   loader: () => import('./pages/home'),
//   loading: Loading,
// });
// const Login = Loadable({
//   ...LoadableDefaultOptions,
//   loader: () => import('./pages/login'),
//   loading: Loading,
// });
// const Error = Loadable({
//   ...LoadableDefaultOptions,
//   loader: () => import('./pages/error'),
//   loading: Loading,
// });

// const routes: RouteLoadable[] = [
//   { path: '/', exact: true, name: 'Home', component: Home },
//   { path: '/login', exact: true, name: 'Login', component: Login },
//   { path: '/error', exact: true, name: 'Error', component: Error },
// ];

// export default routes;

import * as React from 'react';
import {
  Outlet,
  Link,
  createBrowserRouter,
  useNavigation,
} from 'react-router-dom';
import { Home } from './pages/home';

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

const Layout = () => {
  const navigation = useNavigation();

  return (
    <div>
      <h1>Lazy Loading Example using RouterProvider</h1>

      <p>
        This example demonstrates how to lazily load route definitions using{' '}
        <code>route.lazy()</code>. To get the full effect of this demo, be sure
        to open your Network tab and watch the new bundles load dynamically as
        you navigate around.
      </p>

      <p>
        The "About" and "Dashboard" pages are not loaded until you click on the
        link. When you do, the code is loaded via a dynamic{' '}
        <code>import()</code> statement during the <code>loading</code> phase of
        the navigation. Once the code loads, the route loader executes, and then
        the element renders with the loader-provided data.
      </p>

      <p>
        This works for all data-loading/rendering related properties of a route,
        including <code>action</code>, <code>loader</code>, <code>element</code>
        , <code>errorElement</code>, and <code>shouldRevalidate</code>. You
        cannot return path-matching properties from <code>lazy()</code> such as{' '}
        <code>path</code>, <code>index</code>, <code>children</code>, and{' '}
        <code>caseSensitive</code>.
      </p>

      <div style={{ position: 'fixed', top: 0, right: 0 }}>
        {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/error">Messages Error</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        async lazy() {
          // Multiple routes in lazy file
          const { Login } = await import('./pages/login');
          return { Component: Login };
        },
      },
      {
        path: 'error',
        async lazy() {
          // Multiple routes in lazy file
          const { Error } = await import('./pages/error');

          return { Component: Error };
        },
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
]);

export default router;
