/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
export const onCreateTasks = /* GraphQL */ `
  subscription OnCreateTasks($filter: ModelSubscriptionTasksFilterInput) {
    onCreateTasks(filter: $filter) {
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
export const onUpdateTasks = /* GraphQL */ `
  subscription OnUpdateTasks($filter: ModelSubscriptionTasksFilterInput) {
    onUpdateTasks(filter: $filter) {
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
export const onDeleteTasks = /* GraphQL */ `
  subscription OnDeleteTasks($filter: ModelSubscriptionTasksFilterInput) {
    onDeleteTasks(filter: $filter) {
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
export const onCreateRooms = /* GraphQL */ `
  subscription OnCreateRooms($filter: ModelSubscriptionRoomsFilterInput) {
    onCreateRooms(filter: $filter) {
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
export const onUpdateRooms = /* GraphQL */ `
  subscription OnUpdateRooms($filter: ModelSubscriptionRoomsFilterInput) {
    onUpdateRooms(filter: $filter) {
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
export const onDeleteRooms = /* GraphQL */ `
  subscription OnDeleteRooms($filter: ModelSubscriptionRoomsFilterInput) {
    onDeleteRooms(filter: $filter) {
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
