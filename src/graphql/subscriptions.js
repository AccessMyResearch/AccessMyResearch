/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend {
    onCreateFriend {
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
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend {
    onUpdateFriend {
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
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend {
    onDeleteFriend {
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
export const onCreateUserFriend = /* GraphQL */ `
  subscription OnCreateUserFriend {
    onCreateUserFriend {
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
export const onUpdateUserFriend = /* GraphQL */ `
  subscription OnUpdateUserFriend {
    onUpdateUserFriend {
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
export const onDeleteUserFriend = /* GraphQL */ `
  subscription OnDeleteUserFriend {
    onDeleteUserFriend {
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
export const onCreateRequests = /* GraphQL */ `
  subscription OnCreateRequests {
    onCreateRequests {
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
export const onUpdateRequests = /* GraphQL */ `
  subscription OnUpdateRequests {
    onUpdateRequests {
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
export const onDeleteRequests = /* GraphQL */ `
  subscription OnDeleteRequests {
    onDeleteRequests {
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
export const onCreateFollow = /* GraphQL */ `
  subscription OnCreateFollow {
    onCreateFollow {
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
export const onUpdateFollow = /* GraphQL */ `
  subscription OnUpdateFollow {
    onUpdateFollow {
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
export const onDeleteFollow = /* GraphQL */ `
  subscription OnDeleteFollow {
    onDeleteFollow {
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
