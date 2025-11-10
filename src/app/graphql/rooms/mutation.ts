import { gql } from 'apollo-angular';

export const ADD_ROOM = gql`
  mutation AddRoom(
    $number: String!
    $floorNumber: String!
    $capacity: Int!
    $hasAttachedWashroom: Boolean!
    $hasHotColdWater: Boolean!
  ) {
    addRoom(
      number: $number
      floorNumber: $floorNumber
      capacity: $capacity
      hasAttachedWashroom: $hasAttachedWashroom
      hasHotColdWater: $hasHotColdWater
    ) {
      status
      message
    }
  }
`;
export const UPDATE_ROOM = gql`
  mutation UpdateRoom(
    $id: ID!
    $number: String!
    $floorNumber: String!
    $capacity: Int!
    $hasAttachedWashroom: Boolean!
    $hasHotColdWater: Boolean!
  ) {
    updateRoom(
      id: $id
      number: $number
      floorNumber: $floorNumber
      capacity: $capacity
      hasAttachedWashroom: $hasAttachedWashroom
      hasHotColdWater: $hasHotColdWater
    ) {
      status
      message
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation DeleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      status
      message
    }
  }
`;
