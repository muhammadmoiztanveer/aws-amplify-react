import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Modal,
  Upload,
  Select,
  Radio,
} from "antd";
import Highlighter from "react-highlight-words";
import { FaEdit, FaPen, FaTrash } from "react-icons/fa";

const Orders = () => {
  // product tags
  const productTags = [];
  for (let i = 10; i < 36; i++) {
    productTags.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleProductTags = (value) => {
    console.log(`Selected: ${value}`);
  };
  // product tags

  // product sizes
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleSizesTags = (value) => {
    console.log(`Selected: ${value}`);
  };
  // product sizes

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [],
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [placedOrdersEditModalOpen, setPlacedOrdersEditModalOpen] =
    useState(false);

  const handleCategoryForPlacedOrdersTable = (value) => {
    console.log(`selected ${value}`);
  };

  const placedOrdersData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  const placedOrdersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Tag",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Price",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Stock Keeping Unit",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Stock Status",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Date Added",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Actions",
      dataIndex: "address",
      key: "address",
      render: () => (
        <div className="flex gap-4">
          <FaPen
            className="text-black cursor-pointer"
            onClick={() => setPlacedOrdersEditModalOpen(true)}
          />
          <Modal
            title="Update Product"
            centered
            open={placedOrdersEditModalOpen}
            footer={[
              <button
                className="bg-white border border-black px-3 py-2 rounded-md text-black font-semibold mr-3"
                onClick={() => setPlacedOrdersEditModalOpen(false)}
              >
                Cancel
              </button>,

              <button className="bg-black border border-black px-3 py-2 rounded-md text-white font-semibold">
                Save
              </button>,
            ]}
            className="mt-10 px-4"
          >
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name">Product name</label>
                <input
                  type="text"
                  className="border rounded-md py-2 px-3"
                  id="product-name"
                  placeholder="Product name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-category">Product category</label>

                <select
                  name="product-category"
                  id="product-category"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select a category
                  </option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  for="product-size"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Tags
                </label>

                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags Mode"
                  onChange={handleProductTags}
                  options={productTags}
                />
              </div>

              <div class="w-full flex flex-col gap-2">
                <label
                  for="priceInput"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product price
                </label>

                <div class="flex border rounded-md">
                  <div className="rounded-s-md bg-slate-100 flex items-center justify-center px-2">
                    <span>PKR</span>
                  </div>

                  <input
                    type="number"
                    id="priceInput"
                    class="w-full px-3 py-2 rounded-e-md"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-sku">Stock Keeping Unit</label>

                <select
                  name="product-sku"
                  id="product-sku"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select a stock keeping unit
                  </option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-status">Status</label>

                <select
                  name="product-status"
                  id="product-status"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select product status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Block">Block</option>
                </select>
              </div>
            </div>
          </Modal>

          <FaTrash className="text-red-800 cursor-pointer" />
        </div>
      ),
    },
  ];

  const [cancelledProductsEditModalOpen, setCancelledProductsEditModalOpen] =
    useState(false);

  const handleCategoryForCancelledOrdersTable = (value) => {
    console.log(`selected ${value}`);
  };

  const cancelledOrdersData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  const cancelledOrdersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Tag",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Price",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Stock Keeping Unit",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Stock Status",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Date Added",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Actions",
      dataIndex: "address",
      key: "address",
      render: () => (
        <div className="flex gap-4">
          <FaPen
            className="text-black cursor-pointer"
            onClick={() => setCancelledProductsEditModalOpen(true)}
          />
          <Modal
            title="Update Product"
            centered
            open={cancelledProductsEditModalOpen}
            footer={[
              <button
                className="bg-white border border-black px-3 py-2 rounded-md text-black font-semibold mr-3"
                onClick={() => setCancelledProductsEditModalOpen(false)}
              >
                Cancel
              </button>,

              <button className="bg-black border border-black px-3 py-2 rounded-md text-white font-semibold">
                Save
              </button>,
            ]}
            className="mt-10 px-4"
          >
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name">Product name</label>
                <input
                  type="text"
                  className="border rounded-md py-2 px-3"
                  id="product-name"
                  placeholder="Product name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-category">Product category</label>

                <select
                  name="product-category"
                  id="product-category"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select a category
                  </option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  for="product-size"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Tags
                </label>

                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags Mode"
                  onChange={handleProductTags}
                  options={productTags}
                />
              </div>

              <div class="w-full flex flex-col gap-2">
                <label
                  for="priceInput"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product price
                </label>

                <div class="flex border rounded-md">
                  <div className="rounded-s-md bg-slate-100 flex items-center justify-center px-2">
                    <span>PKR</span>
                  </div>

                  <input
                    type="number"
                    id="priceInput"
                    class="w-full px-3 py-2 rounded-e-md"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-sku">Stock Keeping Unit</label>

                <select
                  name="product-sku"
                  id="product-sku"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select a stock keeping unit
                  </option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-status">Status</label>

                <select
                  name="product-status"
                  id="product-status"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select product status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Block">Block</option>
                </select>
              </div>
            </div>
          </Modal>

          <FaTrash className="text-red-800 cursor-pointer" />
        </div>
      ),
    },
  ];

  const [notDeliveredEditModalOpen, setNotDeliveredEditModalOpen] =
    useState(false);

  const handleCategoryForNotDeliveredOrdersTable = (value) => {
    console.log(`selected ${value}`);
  };

  const notDeliveredOrdersData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  const notDeliveredOrdersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Tag",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Price",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Stock Keeping Unit",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Stock Status",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Date Added",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Actions",
      dataIndex: "address",
      key: "address",
      render: () => (
        <div className="flex gap-4">
          <FaPen
            className="text-black cursor-pointer"
            onClick={() => setNotDeliveredEditModalOpen(true)}
          />
          <Modal
            title="Update Product"
            centered
            open={notDeliveredEditModalOpen}
            footer={[
              <button
                className="bg-white border border-black px-3 py-2 rounded-md text-black font-semibold mr-3"
                onClick={() => setNotDeliveredEditModalOpen(false)}
              >
                Cancel
              </button>,

              <button className="bg-black border border-black px-3 py-2 rounded-md text-white font-semibold">
                Save
              </button>,
            ]}
            className="mt-10 px-4"
          >
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name">Product name</label>
                <input
                  type="text"
                  className="border rounded-md py-2 px-3"
                  id="product-name"
                  placeholder="Product name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-category">Product category</label>

                <select
                  name="product-category"
                  id="product-category"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select a category
                  </option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  for="product-size"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Tags
                </label>

                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags Mode"
                  onChange={handleProductTags}
                  options={productTags}
                />
              </div>

              <div class="w-full flex flex-col gap-2">
                <label
                  for="priceInput"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product price
                </label>

                <div class="flex border rounded-md">
                  <div className="rounded-s-md bg-slate-100 flex items-center justify-center px-2">
                    <span>PKR</span>
                  </div>

                  <input
                    type="number"
                    id="priceInput"
                    class="w-full px-3 py-2 rounded-e-md"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-sku">Stock Keeping Unit</label>

                <select
                  name="product-sku"
                  id="product-sku"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select a stock keeping unit
                  </option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="product-status">Status</label>

                <select
                  name="product-status"
                  id="product-status"
                  className="border rounded-md py-2 px-3 bg-transparent"
                >
                  <option value="" default disabled>
                    Select product status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Block">Block</option>
                </select>
              </div>
            </div>
          </Modal>

          <FaTrash className="text-red-800 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 mt-10">
        <div className="flex justify-between">
          <span className="font-bold">Placed Orders</span>

          <div className="flex gap-3 justify-center items-center text-sm">
            <label htmlFor="category-for-placed-orders">
              Select a category
            </label>

            <Select
              id="category-for-placed-orders"
              defaultValue="All"
              style={{
                width: 120,
              }}
              onChange={() => handleCategoryForPlacedOrdersTable()}
              options={[
                {
                  value: "All",
                  label: "All",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
        </div>
        <div className="border rounded-lg ">
          <Table columns={placedOrdersColumns} dataSource={placedOrdersData} />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <div className="flex justify-between">
          <span className="font-bold">Cancelled Orders</span>

          <div className="flex gap-3 justify-center items-center text-sm">
            <label htmlFor="category-for-placed-orders">
              Select a category
            </label>

            <Select
              defaultValue="All"
              style={{
                width: 120,
              }}
              onChange={() => handleCategoryForCancelledOrdersTable()}
              options={[
                {
                  value: "All",
                  label: "All",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table
            columns={cancelledOrdersColumns}
            dataSource={cancelledOrdersData}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <div className="flex justify-between">
          <span className="font-bold">Not Delivered Orders</span>

          <div className="flex gap-3 justify-center items-center text-sm">
            <label htmlFor="category-for-placed-orders">
              Select a category
            </label>

            <Select
              defaultValue="All"
              style={{
                width: 120,
              }}
              onChange={() => handleCategoryForNotDeliveredOrdersTable()}
              options={[
                {
                  value: "All",
                  label: "All",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                  disabled: true,
                },
              ]}
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table
            columns={notDeliveredOrdersColumns}
            dataSource={notDeliveredOrdersData}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
