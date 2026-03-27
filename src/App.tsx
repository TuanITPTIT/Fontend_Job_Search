import {
  createBrowserRouter,
  RouterProvider,
  Outlet, // Dùng để render con của Layout
} from "react-router-dom";
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchAccount } from '@/redux/slice/accountSlide';
import HomePage from '@/pages/home';
import Header from '@/components/header.client'; // Nhớ import Header de dung trong layout

// --- TẠO LAYOUT CHUNG ---
const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <div className='content-app' style={{ minHeight: 'calc(100vh - 100px)' }}>
        <Outlet /> {/* Đây là nơi các trang con như HomePage, JobPage sẽ hiện ra */}
      </div>
      <footer style={{ padding: 20, textAlign: 'center', background: '#f0f2f5' }}>
        Footer Dự Án Tìm Việc - Tuan IT ©2026
      </footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Bọc tất cả vào Layout để trang nào cũng có Header
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "job",
        element: <div style={{ padding: 20 }}>Trang danh sách công việc (Đang xây dựng...)</div>,
      },
      {
        path: "job/:slug",
        element: <div style={{ padding: 20 }}>Trang chi tiết công việc (Đang xây dựng...)</div>,
      },
      {
        path: "company",
        element: <div style={{ padding: 20 }}>Trang danh sách công ty (Đang xây dựng...)</div>,
      },
      {
        path: "company/:slug",
        element: <div style={{ padding: 20 }}>Trang chi tiết công ty (Đang xây dựng...)</div>,
      }
    ]
  },
]);

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Kích hoạt nạp data fake "Đã đăng nhập" vào Redux
    dispatch(fetchAccount());
  }, []);

  return <RouterProvider router={router} />;
}