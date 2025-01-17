/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
export const onCreateTasks = /* GraphQL */ `
  subscription OnCreateTasks($filter: ModelSubscriptionTasksFilterInput) {
    onCreateTasks(filter: $filter) {
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
export const onUpdateTasks = /* GraphQL */ `
  subscription OnUpdateTasks($filter: ModelSubscriptionTasksFilterInput) {
    onUpdateTasks(filter: $filter) {
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
export const onDeleteTasks = /* GraphQL */ `
  subscription OnDeleteTasks($filter: ModelSubscriptionTasksFilterInput) {
    onDeleteTasks(filter: $filter) {
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
