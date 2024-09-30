import { Table, Button, Spin, Popconfirm, message, Switch, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminUsersPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/user`, {
        credentials: "include", // Include credentials for any authentication
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/user/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        message.success("User deleted successfully");
        fetchUsers(); // Refresh user list after deletion
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      message.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle admin status change
  const handleAdminToggle = async (userId, isAdmin) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !isAdmin }),
        credentials: "include",
      });

      if (response.ok) {
        message.success("User admin status updated successfully");
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isAdmin: !isAdmin } : user
          )
        );
      } else {
        throw new Error("Failed to update admin status");
      }
    } catch (error) {
      message.error("Error updating admin status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin Status",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Display a label (Admin or Not Admin) */}
          <Tag color={isAdmin ? "green" : "red"} style={{ marginRight: 10 }}>
            {isAdmin ? "Admin" : "Not Admin"}
          </Tag>

          {/* Toggle switch to change admin status */}
          {record._id !== currentUser._id ? (
            <Switch
              checked={isAdmin}
              onChange={() => handleAdminToggle(record._id, isAdmin)}
            />
          ) : (
            // For the current admin, only show the status, no toggle
            <span style={{ color: isAdmin ? "green" : "red" }}>
              (Your Account)
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) =>
        record._id !== currentUser._id ? (
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        ) : (
          <Button danger disabled style={{ marginLeft: 8 }}>
            Delete
          </Button>
        ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>User List</h2>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </Spin>
  );
};

export default AdminUsersPage;
