/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTasks = /* GraphQL */ `
  query GetTasks($id: ID!) {
    getTasks(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTasksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getRooms = /* GraphQL */ `
  query GetRooms($id: ID!) {
    getRooms(id: $id) {
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
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const fetchTasksByRoomId = /* GraphQL */ `
  query FetchTasksByRoomId(
    $room_id: String!
    $sortDirection: ModelSortDirection
    $filter: ModelTasksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fetchTasksByRoomId(
      room_id: $room_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
