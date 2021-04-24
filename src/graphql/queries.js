/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      name
      friends {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      requests {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      follows {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      articles
      friendsCount
      comments
      education
      city
      state
      country
      university
      expertise
      bio
      first_name
      middle_name
      last_name
      zipcode
      address
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        name
        friends {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriend = /* GraphQL */ `
  query GetFriend($id: ID!) {
    getFriend(id: $id) {
      id
      username
      name
      user {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      requests {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      follows {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      articles
      friendsCount
      comments
      education
      city
      state
      country
      university
      expertise
      bio
      first_name
      middle_name
      last_name
      zipcode
      address
      createdAt
      updatedAt
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        name
        user {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserFriend = /* GraphQL */ `
  query GetUserFriend($id: ID!) {
    getUserFriend(id: $id) {
      id
      user {
        id
        username
        name
        friends {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      friend {
        id
        username
        name
        user {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserFriends = /* GraphQL */ `
  query ListUserFriends(
    $filter: ModelUserFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          username
          name
          articles
          friendsCount
          comments
          education
          city
          state
          country
          university
          expertise
          bio
          first_name
          middle_name
          last_name
          zipcode
          address
          createdAt
          updatedAt
        }
        friend {
          id
          username
          name
          articles
          friendsCount
          comments
          education
          city
          state
          country
          university
          expertise
          bio
          first_name
          middle_name
          last_name
          zipcode
          address
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRequests = /* GraphQL */ `
  query GetRequests($id: ID!) {
    getRequests(id: $id) {
      id
      user {
        id
        username
        name
        friends {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      friend {
        id
        username
        name
        user {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRequestss = /* GraphQL */ `
  query ListRequestss(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          username
          name
          articles
          friendsCount
          comments
          education
          city
          state
          country
          university
          expertise
          bio
          first_name
          middle_name
          last_name
          zipcode
          address
          createdAt
          updatedAt
        }
        friend {
          id
          username
          name
          articles
          friendsCount
          comments
          education
          city
          state
          country
          university
          expertise
          bio
          first_name
          middle_name
          last_name
          zipcode
          address
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFollow = /* GraphQL */ `
  query GetFollow($id: ID!) {
    getFollow(id: $id) {
      id
      user {
        id
        username
        name
        friends {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      friend {
        id
        username
        name
        user {
          nextToken
        }
        requests {
          nextToken
        }
        follows {
          nextToken
        }
        articles
        friendsCount
        comments
        education
        city
        state
        country
        university
        expertise
        bio
        first_name
        middle_name
        last_name
        zipcode
        address
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFollows = /* GraphQL */ `
  query ListFollows(
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          username
          name
          articles
          friendsCount
          comments
          education
          city
          state
          country
          university
          expertise
          bio
          first_name
          middle_name
          last_name
          zipcode
          address
          createdAt
          updatedAt
        }
        friend {
          id
          username
          name
          articles
          friendsCount
          comments
          education
          city
          state
          country
          university
          expertise
          bio
          first_name
          middle_name
          last_name
          zipcode
          address
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
