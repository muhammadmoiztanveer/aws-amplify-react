/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      email
      phoneNumber
      type
      status
      room_id
      createdAt
      updatedAt
      id
      __typename
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      email
      phoneNumber
      type
      status
      room_id
      createdAt
      updatedAt
      id
      __typename
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      email
      phoneNumber
      type
      status
      room_id
      createdAt
      updatedAt
      id
      __typename
    }
  }
`;
export const createTasks = /* GraphQL */ `
  mutation CreateTasks(
    $input: CreateTasksInput!
    $condition: ModelTasksConditionInput
  ) {
    createTasks(input: $input, condition: $condition) {
      user_id
      room_id
      title
      description
      file_paths
      status
      notes
      reacts
      createdAt
      updatedAt
      id
      __typename
    }
  }
`;
export const updateTasks = /* GraphQL */ `
  mutation UpdateTasks(
    $input: UpdateTasksInput!
    $condition: ModelTasksConditionInput
  ) {
    updateTasks(input: $input, condition: $condition) {
      user_id
      room_id
      title
      description
      file_paths
      status
      notes
      reacts
      createdAt
      updatedAt
      id
      __typename
    }
  }
`;
export const deleteTasks = /* GraphQL */ `
  mutation DeleteTasks(
    $input: DeleteTasksInput!
    $condition: ModelTasksConditionInput
  ) {
    deleteTasks(input: $input, condition: $condition) {
      user_id
      room_id
      title
      description
      file_paths
      status
      notes
      reacts
      createdAt
      updatedAt
      id
      __typename
    }
  }
`;
export const createRooms = /* GraphQL */ `
  mutation CreateRooms(
    $input: CreateRoomsInput!
    $condition: ModelRoomsConditionInput
  ) {
    createRooms(input: $input, condition: $condition) {
      user_1
      user_2
      user_3
      user_4
      user_5
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRooms = /* GraphQL */ `
  mutation UpdateRooms(
    $input: UpdateRoomsInput!
    $condition: ModelRoomsConditionInput
  ) {
    updateRooms(input: $input, condition: $condition) {
      user_1
      user_2
      user_3
      user_4
      user_5
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRooms = /* GraphQL */ `
  mutation DeleteRooms(
    $input: DeleteRoomsInput!
    $condition: ModelRoomsConditionInput
  ) {
    deleteRooms(input: $input, condition: $condition) {
      user_1
      user_2
      user_3
      user_4
      user_5
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
