import { StreamChat } from "stream-chat";
import { env } from "./env.js";

const streamClient = StreamChat.getInstance(
  env.STREAM_API_KEY,
  env.STREAM_SECRET_KEY,
);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upsurted!", userData.name);
    return userData;
  } catch (err) {
    console.log("Error in upsertStreamUser @ config/stream.js");
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted successfully");
  } catch (err) {
    console.log("Error in deleteStreamUser @ config/stream.js");
  }
};

export const generateStreamToken = async (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (err) {
    console.log("Error in generateStreamToken @ config/stream.js");
    return null;
  }
};
