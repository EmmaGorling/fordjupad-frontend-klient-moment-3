import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PostPage from "./pages/PostPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <HomePage />
                )
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/createpost",
                element: (
                    <ProtectedRoute>
                        <CreatePostPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/post/:id",
                element: <PostPage />
            }
        ]
    }
])

export default router;