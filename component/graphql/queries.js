import { gql } from "@apollo/client";

export const GET_PROFILE_BYADDRESS = gql`
  query ($address: String!) {
    getProfileByAddress(address: $address) {
      address
      username
      email
      bio
      externalLink
      profilePicture
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation ($address: String!, $network: String!) {
    createProfile(address: $address, network: $network) {
      address
      network
      email
      bio
      externalLink
    }
  }
`;
export const REQUEST_TOKEN = gql`
  mutation ($address: String!) {
    requestToken(address: $address)
  }
`;

export const UPDATE_USERNAME = gql`
  mutation ($address: String!, $username: String!) {
    updateUsername(address: $address, username: $username) {
      username
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation ($address: String!, $email: String!) {
    updateEmail(address: $address, email: $email) {
      email
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation ($address: String!, $body: ProfileUpdateDto!) {
    updateProfile(address: $address, body: $body) {
      bio
      profilePicture
      coverPicture
      externalLink
    }
  }
`;
