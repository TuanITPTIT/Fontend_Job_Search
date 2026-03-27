import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from '@/pages/home';

// layout đơn giản
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/job",
    element: <div style={{ padding: 20 }}>Trang danh sách công việc (Đang xây dựng...)</div>,
  },
  {
    path: "/job/:slug",
    element: <div style={{ padding: 20 }}>Trang chi tiết công việc (Đang xây dựng...)</div>,
  },
  {
    path: "/company",
    element: <div style={{ padding: 20 }}>Trang danh sách công ty (Đang xây dựng...)</div>,
  },
  {
    path: "/company/:slug",
    element: <div style={{ padding: 20 }}>Trang chi tiết công ty (Đang xây dựng...)</div>,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}