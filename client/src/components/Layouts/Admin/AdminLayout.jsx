import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

import {
  UserOutlined,
  LaptopOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Categories",
      path: "/admin/categories",
      children: [
        {
          key: "3",
          label: "Create new category",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
      onClick: () => {
        navigate(`/admin/categories`);
      },
    },
    {
      key: "4",
      icon: <LaptopOutlined />,
      label: "Products",
      path: "/",
      children: [
        {
          key: "5",
          label: "Products list",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "6",
          label: "Create new product",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "7",
      icon: <BarcodeOutlined />,
      label: "Coupons",
      path: "/admin/coupons",
      onClick: () => {
        navigate(`/admin/coupons`);
      },
    },
    {
      key: "8",
      icon: <UserOutlined />,
      label: "User List",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "9",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      path: "/admin/orders",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
  ];
  return (
    <div className="admin-layout">
      <Layout>
        <Menu
          mode="horizontal"
          style={{
            height: "100%",
            backgroundColor: "transparent",
            margin: "2rem auto",
          }}
          items={menuItems}
          defaultSelectedKeys={[getActiveKey()]}
        />
        <Layout>
          <Content>
            <div
              className="site-layout-background"
              style={{
                padding: "24px 50px",
                minHeight: 350,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
