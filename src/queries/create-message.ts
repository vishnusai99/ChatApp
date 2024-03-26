import { gql } from "@apollo/client";

export const MESSAGE_CREATED = gql`
subscription messageCreated($uid:String!){
    messageCreated(uid:$uid){
      timestamp,
      content,
      chatId,
      content,
      senderId,
      type
    }
  }`