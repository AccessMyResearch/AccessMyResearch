/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
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
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
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
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
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
export const createUserFriend = /* GraphQL */ `
  mutation CreateUserFriend(
    $input: CreateUserFriendInput!
    $condition: ModelUserFriendConditionInput
  ) {
    createUserFriend(input: $input, condition: $condition) {
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
export const updateUserFriend = /* GraphQL */ `
  mutation UpdateUserFriend(
    $input: UpdateUserFriendInput!
    $condition: ModelUserFriendConditionInput
  ) {
    updateUserFriend(input: $input, condition: $condition) {
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
export const deleteUserFriend = /* GraphQL */ `
  mutation DeleteUserFriend(
    $input: DeleteUserFriendInput!
    $condition: ModelUserFriendConditionInput
  ) {
    deleteUserFriend(input: $input, condition: $condition) {
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
export const createRequests = /* GraphQL */ `
  mutation CreateRequests(
    $input: CreateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    createRequests(input: $input, condition: $condition) {
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
export const updateRequests = /* GraphQL */ `
  mutation UpdateRequests(
    $input: UpdateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    updateRequests(input: $input, condition: $condition) {
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
export const deleteRequests = /* GraphQL */ `
  mutation DeleteRequests(
    $input: DeleteRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    deleteRequests(input: $input, condition: $condition) {
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
export const createFollow = /* GraphQL */ `
  mutation CreateFollow(
    $input: CreateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    createFollow(input: $input, condition: $condition) {
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
export const updateFollow = /* GraphQL */ `
  mutation UpdateFollow(
    $input: UpdateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    updateFollow(input: $input, condition: $condition) {
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
export const deleteFollow = /* GraphQL */ `
  mutation DeleteFollow(
    $input: DeleteFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    deleteFollow(input: $input, condition: $condition) {
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
