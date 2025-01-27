import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Table,
  Select,
  Modal,
  Form,
  Upload,
  message,
} from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { generateClient } from "aws-amplify/api";
import {
  updateTasks,
  deleteTasks,
  createTasks,
  createRooms,
} from "../../graphql/mutations";
import {
  fetchTasksByRoomId,
  getTasks,
  listRooms,
  listTasks,
} from "../../graphql/queries";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { uploadData, getProperties, list } from "aws-amplify/storage";
import { boolean } from "yup";

const TaskManager = () => {
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [isLoadingUserList, setIsLoadingUserList] = useState(false);
  const [userListData, setUserListData] = useState([]);
  const [hasExistingRoomData, setHasExistingRoomData] = useState(false);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [rooms, setRooms] = useState({});
  const [roomMemberAssignments, setRoomMemberAssignments] = useState({
    user_1: "",
    user_2: "",
    user_3: "",
    user_4: "",
    user_5: "",
  });
  const [searchTitle, setSearchTitle] = useState("");
  const [searchStatus, setSearchStatus] = useState("All");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [s3UploadedFilePath, setS3UploadedFilePath] = useState("");
  const [defaultOption, setDefaultOption] = useState({});

  const [newTask, setNewTask] = useState({
    user_id: "",
    title: "",
    description: "",
    file_paths: "",
    room_id: `${rooms.id}`,
    status: "Pending",
    notes: "",
    reacts: "1",
  });

  useEffect(() => {
    console.log("Room participants updated", roomMemberAssignments);
    updateFilteredUserList();
  }, [roomMemberAssignments]);

  const fetchedUsersResponse = useSelector(
    (state) => state.users.fetchAllUsersResponse.response
  );
  const isFetchingUsers = useSelector(
    (state) => state.users.fetchAllUsersResponse.isLoading
  );
  const fetchUsersError = useSelector(
    (state) => state.users.fetchAllUsersResponse.error
  );

  useEffect(() => {
    if (!isFetchingUsers && !fetchUsersError) {
      console.log("Fetched users:", fetchedUsersResponse);
    }
    if (fetchUsersError) {
      console.error("Error fetching users:", fetchUsersError);
    }
    const validUserList = Array.isArray(fetchedUsersResponse)
      ? fetchedUsersResponse
      : [];
    setUserListData(validUserList);
    setFilteredUserList(validUserList);
  }, [fetchedUsersResponse]);

  const updateFilteredUserList = () => {
    const assignedUserIds = Object.values(roomMemberAssignments).filter(
      Boolean
    );
    console.log("Assigned User IDs:", assignedUserIds);
    const remainingUsers = userListData.filter(
      (user) => !assignedUserIds.includes(user.id)
    );
    setFilteredUserList(remainingUsers);
  };

  const fetchRoomData = async () => {
    const roomResponse = await client.graphql({ query: listRooms });
    console.log("Fetched rooms:", roomResponse.data.listRooms.items);

    console.log(
      "first rooom is THISSSSSSS",
      roomResponse.data.listRooms.items[0]
    );

    setRooms(roomResponse.data.listRooms.items[0]);

    if (roomResponse.data.listRooms.items.length > 0) {
      setHasExistingRoomData(true);
    }
  };

  useEffect(() => {
    setNewTask((prev) => ({ ...prev, room_id: `${rooms.id}` }));
    fetchTaskData();
  }, [rooms]);

  useEffect(() => {
    fetchRoomData();
  }, []);

  const { TextArea } = Input;
  const client = generateClient();

  const fetchTaskData = async () => {
    console.log("isnide the fetch tasks functions", rooms.id);

    const taskResponse = await client.graphql({
      query: fetchTasksByRoomId,
      variables: {
        room_id: rooms.id,
      },
    });

    console.log(
      "Fetched tasks by room IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD:",
      taskResponse.data.fetchTasksByRoomId.items
    );

    setTaskData(taskResponse.data.fetchTasksByRoomId.items);
  };

  const handleRoomCreateConfirm = async () => {
    // Room creation logic
  };

  const handleRoomCreateCancel = () => {
    setRoomMemberAssignments({
      user_1: "",
      user_2: "",
      user_3: "",
      user_4: "",
      user_5: "",
    });
    setIsRoomModalVisible(false);
  };

  // =======================================================================================================

  // const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  // useEffect(() => {
  //   console.log("cuerrwnt task requested to be editedddd", currentTask);

  //   const fetchFileUrl = async () => {
  //     if (isEditModalVisible && currentTask?.file_paths) {
  //       try {
  //         // Fetch file URL from S3
  //         const url = await Storage.get(`${currentTask.file_paths}`, {
  //           level: "public",
  //         });

  //         console.log("file url fetche din the state", url);

  //         setFilePreviewUrl(url);
  //       } catch (error) {
  //         console.error("Error fetching file URL:", error);
  //       }
  //     }
  //   };

  //   fetchFileUrl();
  // }, [isEditModalVisible, newTask]);

  const renderPreview = () => {
    if (!filePreviewUrl) return null;

    if (filePreviewUrl.match(/\.(jpeg|jpg|png|gif|bmp)$/i)) {
      return (
        <img src={filePreviewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
      );
    } else if (filePreviewUrl.endsWith(".pdf")) {
      return (
        <iframe
          src={filePreviewUrl}
          title="PDF Preview"
          style={{ width: "100%", height: "500px" }}
        ></iframe>
      );
    } else {
      return (
        <a href={filePreviewUrl} target="_blank" rel="noopener noreferrer">
          Download File
        </a>
      );
    }
  };

  const fetchAllTasks = async () => {
    const tasks = await client.graphql({ query: listTasks });
    console.log("All fetched tasks", tasks.data.listTasks.items);
    setTaskData(tasks.data.listTasks.items);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const uploadFileToS3 = async (file) => {
    console.log("this file is being uploaded", file);

    try {
      const result = await uploadData({
        path: ({ identityId }) =>
          `private/${identityId}/album/2024/${file.name}`,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )} %`
              );
            }
          },
        },
      }).result;

      console.log("Succeeded uploading file to S3 : ", result);

      try {
        const result = await getProperties({
          path: ({ identityId }) =>
            `private/${identityId}/album/2024/${file.name}`,
        });
        console.log("File Properties ", result);

        console.log("filee pathhhhh", result.path);

        if (isEditModalVisible) {
          setCurrentTask((prev) => ({ ...prev, file_paths: result.path }));
        } else {
          setNewTask((prev) => ({ ...prev, file_paths: result.path }));
        }

        // console.log("getFilRL FROM S#", filesss);
      } catch (error) {
        console.log("Error ", error);
      }

      try {
        const listingResponse = await list({
          path: ({ identityId }) =>
            `private/${identityId}/album/2024/${file.name}`,
        });

        console.log("LISTING RESPONSEEEEEE OF FILEE", listingResponse);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("Error uploading file to S3 : ", error);
    }
  };

  // Fetch users when the modal opens
  // useEffect(() => {
  //   if (isAddModalVisible) {
  //     setLoadingUsers(true);
  //     fetchUsers()
  //       .then((data) => {
  //         setUsers(data); // Populate users into the state
  //       })
  //       .catch((error) => {
  //         message.error("Failed to fetch users.");
  //         console.error(error);
  //       })
  //       .finally(() => {
  //         setLoadingUsers(false);
  //       });
  //   }
  // }, [isAddModalVisible, fetchUsers]);

  const handleSearch = () => {
    console.log("Search initiated:", {
      title: searchTitle,
      status: searchStatus,
    });
  };

  const showEditModal = (record) => {
    console.log("recorddssss", record);

    setCurrentTask(record);
    setDefaultOption({
      value: record.user_id,
      label: (userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.email : "N/A";
      },
    });
    setIsEditModalVisible(true);
  };

  const updateTasksInState = (updatedTask) => {
    setTaskData((prevTaskData) =>
      prevTaskData.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTaskFromState = (taskId) => {
    setTaskData((prevTaskData) =>
      prevTaskData.filter((task) => task.id !== taskId)
    );
  };

  const handleEditOk = async () => {
    console.log("thsi si sent to save", currentTask);

    await client.graphql({
      query: updateTasks,
      variables: {
        input: {
          id: `${currentTask.id}`,
          title: `${currentTask.title}`,
          description: `${currentTask.description}`,
          user_id: `${currentTask.user_id.value}`,
          room_id: `${rooms.id}`,
          file_paths: `${currentTask.file_paths}`,
          status: `${currentTask.status}`,
          notes: `${currentTask.notes}`,
          reacts: `${currentTask.reacts}`,
        },
      },
    });

    const updatedTask = await client.graphql({
      query: getTasks,
      variables: {
        id: currentTask.id,
      },
    });

    updateTasksInState(updatedTask.data.getTasks);

    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const showDeleteModal = (record) => {
    setCurrentTask(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = async () => {
    const deletedTask = await client.graphql({
      query: deleteTasks,
      variables: {
        input: {
          id: currentTask.id,
        },
      },
    });

    deleteTaskFromState(deletedTask.data.deleteTasks.id);
    setIsDeleteModalVisible(false);
    console.log("Task deleted:", deletedTask.data.deleteTasks);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleAddOk = async () => {
    console.log("this si the task that needs to be uploaded", newTask);

    setNewTask((prev) => ({ ...prev, room_id: `${rooms.id}` }));

    try {
      const createdTask = await client.graphql({
        query: createTasks,
        variables: {
          input: newTask,
        },
      });

      console.log("task assigned", createTasks);

      setTaskData((prevTaskData) => [
        createdTask.data.createTasks,
        ...prevTaskData,
      ]);
      setIsAddModalVisible(false);
      setNewTask({
        title: "",
        description: "",
        file_paths: s3UploadedFilePath,
        room_id: `${rooms.id}`,
        status: "Pending",
        notes: "",
        reacts: "",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const filteredData = taskData.filter((task) => {
    return (
      (searchTitle
        ? task.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true) &&
      (searchStatus !== "All"
        ? task.status.toLowerCase() === searchStatus.toLowerCase()
        : true)
    );
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "File Shared",
      dataIndex: "file_paths",
      key: "file_paths",
    },
    {
      title: "Assigned To",
      dataIndex: "user_id",
      key: "user_id",
      render: (userId) => {
        const user = userListData.find((u) => u.id === userId); // Find user by id
        return user ? user.email : "N/A"; // Return the email or a fallback value if not found
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
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
            onClick={() => showEditModal(record)}
          />
          <FaTrash
            className="text-red-800 cursor-pointer"
            onClick={() => showDeleteModal(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 mt-10">
        <div className="flex flex-nowrap justify-end space-x-4">
          <Button
            type="primary"
            className="w-full md:w-auto flex self-end"
            onClick={() => setIsRoomModalVisible(true)}
          >
            Create Room
          </Button>
        </div>

        {hasExistingRoomData ? (
          <div className="mt-8 border shadow bg-white rounded-xl p-4">
            <div className="w-full flex justify-between my-4 space-x-4">
              <h3>Room ID: {rooms.id}</h3>

              <div className="flex space-x-4">
                <Button
                  type="primary"
                  className="w-full md:w-auto flex self-end"
                  onClick={() => setIsAddModalVisible(true)}
                >
                  Assign Task
                </Button>

                <Button
                  type="primary"
                  className="w-full md:w-auto"
                  onClick={() => setIsRoomModalVisible(true)}
                >
                  Delete Room
                </Button>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-3 mt-10">
                <div className="flex flex-nowrap items-center space-x-4">
                  <div className="flex flex-col w-full ">
                    <label htmlFor="title" className="text-sm font-medium mb-1">
                      Search By Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Search by Title"
                      value={searchTitle}
                      onChange={(e) => setSearchTitle(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col w-full ">
                    <label
                      htmlFor="task-status"
                      className="text-sm font-medium mb-1"
                    >
                      Task Status
                    </label>
                    <Select
                      id="task-status"
                      value={searchStatus}
                      onChange={(value) => setSearchStatus(value)}
                      className="w-full"
                      options={[
                        { value: "All", label: "All" },
                        { value: "Pending", label: "Pending" },
                        { value: "Completed", label: "Completed" },
                      ]}
                    />
                  </div>

                  {/* <Button
                    type="primary"
                    className="w-full md:w-auto flex self-end"
                    onClick={handleSearch}
                  >
                    Search
                  </Button> */}
                </div>

                <Table columns={columns} dataSource={filteredData} />
              </div>

              {/* Edit Modal */}
              <Modal
                title="Edit Task"
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
                  <Form.Item label="Title">
                    <Input
                      value={currentTask?.title || ""}
                      onChange={(e) =>
                        setCurrentTask((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Description">
                    <TextArea
                      value={currentTask?.description || ""}
                      onChange={(e) =>
                        setCurrentTask((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Assign to User">
                    <Select
                      allowClear
                      showSearch
                      placeholder="Select user"
                      optionFilterProp="children"
                      loading={loadingUsers}
                      onChange={(value) =>
                        setCurrentTask((prev) => ({ ...prev, user_id: value }))
                      }
                      defaultValue={defaultOption?.value}
                      labelInValue
                      filterOption={(input, option) =>
                        option?.label
                          ?.toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={userListData.map((user) => ({
                        value: user.id,
                        label: user.email || "No Name",
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Status">
                    <Select
                      value={currentTask?.status || ""}
                      onChange={(value) =>
                        setCurrentTask((prev) => ({ ...prev, status: value }))
                      }
                      options={[
                        { value: "Pending", label: "Pending" },
                        { value: "In Progress", label: "In Progress" },
                        { value: "Completed", label: "Completed" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="Notes">
                    <TextArea
                      value={currentTask?.notes || ""}
                      onChange={(e) =>
                        setCurrentTask((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Attachment">
                    <Input value={currentTask?.file_paths || ""} disabled />
                  </Form.Item>
                  <Form.Item label="Change Attachement (This will overwrite the prev attachment)">
                    <Upload
                      beforeUpload={async (file) => {
                        await uploadFileToS3(file);

                        return false; // Prevents automatic upload
                      }}
                      onRemove={() => {
                        setCurrentTask((prev) => ({
                          ...prev,
                          files_path: "",
                        }));
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Select Files</Button>
                    </Upload>

                    {/* <div className={`modal ${isEditModalVisible ? "is-active" : ""}`}>
              <div className="modal-background" onClick={onClose}></div>
              <div className="modal-content">
                <h3>Edit Task</h3>

                {renderPreview()}
              </div>
              <button
                className="modal-close is-large"
                onClick={handleEditCancel}
              ></button>
            </div> */}
                  </Form.Item>
                </Form>
              </Modal>

              {/* Add Task Modal */}
              <Modal
                title="Assign Task"
                open={isAddModalVisible}
                onCancel={handleAddCancel}
                footer={[
                  <Button
                    key="add"
                    type="primary"
                    onClick={() => handleAddOk(newTask)}
                  >
                    Assign
                  </Button>,
                  <Button key="cancel" onClick={handleAddCancel}>
                    Cancel
                  </Button>,
                ]}
              >
                <Form layout="vertical">
                  <Form.Item label="Title">
                    <Input
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Description">
                    <TextArea
                      rows={4}
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Status">
                    <Select
                      value={newTask.status}
                      onChange={(value) =>
                        setNewTask((prev) => ({ ...prev, status: value }))
                      }
                      options={[
                        { value: "Pending", label: "Pending" },
                        { value: "In Progress", label: "In Progress" },
                        { value: "Completed", label: "Completed" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="Notes">
                    <TextArea
                      value={newTask.notes}
                      onChange={(e) =>
                        setNewTask((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Assign to User">
                    <Select
                      allowClear
                      showSearch
                      placeholder="Select user"
                      optionFilterProp="children"
                      loading={loadingUsers}
                      onChange={(value) =>
                        setNewTask((prev) => ({ ...prev, user_id: value }))
                      }
                      filterOption={(input, option) =>
                        option?.label
                          ?.toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={userListData.map((user) => ({
                        value: user.id,
                        label: user.email || "No Name",
                      }))}
                    />
                  </Form.Item>
                  <Form.Item label="Upload Files">
                    <Upload
                      beforeUpload={async (file) => {
                        await uploadFileToS3(file);

                        return false; // Prevents automatic upload
                      }}
                      onRemove={() => {
                        setNewTask((prev) => ({
                          ...prev,
                          files_path: "",
                        }));
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Select Files</Button>
                    </Upload>
                  </Form.Item>
                </Form>
              </Modal>

              {/* Delete Task Modal */}
              <Modal
                title="Delete Task"
                open={isDeleteModalVisible}
                onCancel={handleDeleteCancel}
                footer={[
                  <Button
                    key="delete"
                    type="primary"
                    danger
                    onClick={handleDeleteOk}
                  >
                    Delete
                  </Button>,
                  <Button key="cancel" onClick={handleDeleteCancel}>
                    Cancel
                  </Button>,
                ]}
              >
                <p>Are you sure you want to delete this task?</p>
              </Modal>
            </div>{" "}
          </div>
        ) : (
          <div>No Room Found</div>
        )}
      </div>

      {/* Create Room Modal */}
      <Modal
        title="Add Members to the Room"
        open={isRoomModalVisible}
        onCancel={handleRoomCreateCancel}
        footer={[
          <Button
            key="create"
            type="primary"
            onClick={() => handleRoomCreateConfirm(roomMemberAssignments)}
          >
            Create Room
          </Button>,
          <Button key="cancel" onClick={handleRoomCreateCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form layout="vertical">
          {Object.keys(roomMemberAssignments).map((key, index) => (
            <Form.Item key={key} label={`Member ${index + 1}`}>
              <Select
                allowClear
                showSearch
                placeholder="Select user"
                optionFilterProp="children"
                loading={isLoadingUserList}
                onChange={(value) =>
                  setRoomMemberAssignments((prev) => ({
                    ...prev,
                    [key]: value,
                  }))
                }
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().includes(input.toLowerCase())
                }
                options={filteredUserList.map((user) => ({
                  value: user.id,
                  label: user.email || "No Name",
                }))}
              />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManager;
