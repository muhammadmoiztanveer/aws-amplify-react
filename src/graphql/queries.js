/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      email
      phoneNumber
      type
      status
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
      title
      decription
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
        title
        decription
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
