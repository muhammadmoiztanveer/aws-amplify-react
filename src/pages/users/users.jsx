import React, { useState, useEffect } from "react";
import { Button, Input, Table, Select, Modal, Form } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { generateClient } from "aws-amplify/api";
import { updateUsers, deleteUsers } from "../../graphql/mutations";
import { getUsers, listUsers } from "../../graphql/queries";

const Users = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchStatus, setSearchStatus] = useState("All");
  const [searchType, setSearchType] = useState("All");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState([]);

  const client = generateClient();

  const fetchAllUsers = async () => {
    const users = await client.graphql({ query: listUsers });
    console.log("all fetched users", users.data.listUsers.items);
    setUserData(users.data.listUsers.items);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = () => {
    console.log("Search initiated:", {
      email: searchEmail,
      status: searchStatus,
      type: searchType,
    });
  };

  const showEditModal = (record) => {
    setCurrentUser(record);
    setIsEditModalVisible(true);
  };

  const updateUsersInState = (updatedUser) => {
    setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const deleteUserFromState = (userId) => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => user.id !== userId)
    );
  };

  const handleEditOk = async () => {
    await client.graphql({
      query: updateUsers,
      variables: {
        input: {
          id: `${currentUser.id}`,
          email: `${currentUser.email}`,
          phoneNumber: `${currentUser.phoneNumber}`,
          status: `${currentUser.status}`,
          type: `${currentUser.type}`,
        },
      },
    });

    const updatedUser = await client.graphql({
      query: getUsers,
      variables: {
        id: currentUser.id,
      },
    });

    updateUsersInState(updatedUser.data.getUsers);
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const showDeleteModal = (record) => {
    setCurrentUser(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = async () => {
    const deletedUser = await client.graphql({
      query: deleteUsers,
      variables: {
        input: {
          id: currentUser.id,
        },
      },
    });

    deleteUserFromState(deletedUser.data.deleteUsers.id);
    setIsDeleteModalVisible(false);
    console.log("User deleted:", deletedUser.data.deleteUsers);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const filteredData = userData.filter((user) => {
    return (
      (searchEmail
        ? user.email.toLowerCase().includes(searchEmail.toLowerCase())
        : true) &&
      (searchStatus !== "All"
        ? user.status.toLowerCase() === searchStatus.toLowerCase()
        : true) &&
      (searchType !== "All"
        ? user.type.toLowerCase() === searchType.toLowerCase()
        : true)
    );
  });

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "User Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "User Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-4">
          <FaPen
            className="text-black cursor-pointer"
            onClick={() => showEditModal(record)} // Open edit modal with specific user data
          />
          <FaTrash
            className="text-red-800 cursor-pointer"
            onClick={() => showDeleteModal(record)} // Open delete modal with specific user data
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 mt-10">
        <div className="flex flex-nowrap items-center space-x-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Search By Email
            </label>
            <Input
              id="email"
              placeholder="Search by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)} // Update the searchEmail state
              className="w-full"
            />
          </div>

          <div className="flex flex-col w-full ">
            <label htmlFor="user-status" className="text-sm font-medium mb-1">
              User Status
            </label>
            <Select
              id="user-status"
              value={searchStatus}
              onChange={(value) => setSearchStatus(value)} // Update the searchStatus state
              className="w-full"
              options={[
                { value: "All", label: "All" },
                { value: "Active", label: "Active" },
                { value: "Block", label: "Block" },
              ]}
            />
          </div>

          <div className="flex flex-col w-full ">
            <label htmlFor="user-type" className="text-sm font-medium mb-1">
              User Type
            </label>
            <Select
              id="user-type"
              value={searchType}
              onChange={(value) => setSearchType(value)} // Update the searchType state
              className="w-full"
              options={[
                { value: "All", label: "All" },
                { value: "User", label: "User" },
                { value: "Admin", label: "Admin" },
              ]}
            />
          </div>

          <Button
            type="primary"
            className="w-full md:w-auto flex self-end"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        <Table columns={columns} dataSource={filteredData} />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={[
          <Button key="save" type="primary" onClick={handleEditOk}>
            Save
          </Button>,
          <Button key="cancel" onClick={handleEditCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Email">
            <Input
              value={currentUser?.email || ""}
              onChange={(e) =>
                setCurrentUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="User Status">
            <Select
              value={currentUser?.status || ""}
              onChange={(value) =>
                setCurrentUser((prev) => ({ ...prev, status: value }))
              }
              options={[
                { value: "Active", label: "Active" },
                { value: "Block", label: "Block" },
              ]}
            />
          </Form.Item>
          <Form.Item label="User Type">
            <Select
              value={currentUser?.type || ""}
              onChange={(value) =>
                setCurrentUser((prev) => ({ ...prev, type: value }))
              }
              options={[
                { value: "User", label: "User" },
                { value: "Admin", label: "Admin" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input
              value={currentUser?.phoneNumber || ""}
              onChange={(e) =>
                setCurrentUser((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onCancel={handleDeleteCancel} // Keep the cancel functionality
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDeleteOk}>
            Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete the user{" "}
          <strong>{currentUser?.email}</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default Users;
