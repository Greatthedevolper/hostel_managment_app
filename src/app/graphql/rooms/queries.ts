import { gql } from 'apollo-angular';

export const GET_ROOMS = gql`
  query GetRooms($search: String) {
    rooms(search: $search) {
      id
      roomNumber
      floorNumber
      seatCapacity
      hasAttachedWashroom
      hasHotColdWater
    }
  }
`;
