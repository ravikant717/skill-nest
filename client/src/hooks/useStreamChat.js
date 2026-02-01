import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "../context/useUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../api/stream";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// This hook is used to connect the current user to the Stream Chat API
// so that users can see each other's messages, send messages to each other, get realtime updates, etc.
// It also handles the disconnection when the user leaves the page

export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);

  // Fetch stream token using react-query
  const {
    data: tokenData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!user?.id,
  });

  // Init stream chat client
  useEffect(() => {
    if (!tokenData?.token || !user?.id || !STREAM_API_KEY) return;

    const client = StreamChat.getInstance(STREAM_API_KEY);
    let cancelled = false;
    let connected = false;

    const userName = user.fullName || user.name || user.email || user.id;
    const userImage = user.imageUrl || undefined;

    const connect = async () => {
      try {
        await client.connectUser(
          {
            id: user.id,
            name: userName,
            image: userImage,
          },
          tokenData.token,
        );
        if (!cancelled) {
          connected = true;
          setChatClient(client);
        }
      } catch (error) {
        console.log("Error connecting to stream chat", error);
      }
    };

    connect();

    // Cleanup
    return () => {
      cancelled = true;
      // Only disconnect if we successfully connected and set the client state
      if (connected) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, [
    tokenData?.token,
    user?.id,
    user?.fullName,
    user?.name,
    user?.email,
    user?.imageUrl,
  ]);

  return { chatClient, isLoading, error };
};
