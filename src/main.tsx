import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import PostPage from './features/posts/PostPage';
import TagPostsList from './features/posts/TagPostsList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post/:postId",
    element: <PostPage/>,
  },
  {
    path: "/tag/:tag",
    element: <TagPostsList/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
