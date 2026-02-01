import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/useUser";
import toast from "react-hot-toast";

import { getStreamToken } from "../api/stream.js";
import { useStreamChat } from "../hooks/useStreamChat";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import "../styles/stream-chat.css";

import StreamChatSidebar from "../components/stream/StreamChatSidebar";
import StreamChatToggle from "../components/stream/StreamChatToggle";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// Lazy load DebugInfo only in development to exclude from production bundle
const DebugInfoWrapper = ({ callId, user, client, call, chatClient, chatChannel, isConnecting, streamKey }) => {
  const [DebugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      import("../components/stream/DebugInfo").then((module) => {
        setDebugInfo(() => module.default);
      });
    }
  }, []);

  if (!DebugInfo) return null;

  return (
    <DebugInfo 
      title="StreamPage State" 
      data={{
        callId,
        hasUser: !!user,
        hasClient: !!client,
        hasCall: !!call,
        hasChatClient: !!chatClient,
        hasChatChannel: !!chatChannel,
        isConnecting,
        hasStreamKey: !!streamKey
      }}
    />
  );
};

const StreamPage = () => {
  const { id: callId } = useParams();
  const { user, isLoaded } = useUser();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatChannel, setChatChannel] = useState(null);

  const { chatClient, error: chatError } = useStreamChat();

  useEffect(() => {
    if (!chatError) return;

    console.error("Error initializing chat client:", chatError);
    toast.error("Unable to initialize chat. Chat will be unavailable.");
  }, [chatError]);
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!user,
  });

  // Initialize chat channel for this stream
  useEffect(() => {
    if (!chatClient || !callId) return;

    const channel = chatClient.channel("livestream", callId, {
      name: `Stream ${callId}`,
    });
    
    channel.watch().catch((err) => console.log("Error watching channel:", err));
    setChatChannel(channel);

    return () => {
      channel.stopWatching().catch((err) => console.log("Error stopping watch:", err));
    };
  }, [chatClient, callId]);

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !user || !callId) return;

      try {
        const videoClient = StreamVideoClient.getOrCreateInstance({
          apiKey: STREAM_API_KEY,
          user: {
            id: user.id,
            name: user.fullName || user.name,
            image: user.imageUrl,
          },
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.log("Error init call:", error);
        toast.error("Cannot connect to the call.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, user, callId]);

  // Cleanup call on unmount
  useEffect(() => {
    return () => {
      if (call) {
        call.leave().catch(console.error);
      }
    };
  }, [call]);

  if (isConnecting || !isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Connecting to call...</p>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Could not initialize call</p>
          <p className="text-gray-400">Please refresh or try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stream-page-container">
      {import.meta.env.DEV && (
        <DebugInfoWrapper 
          callId={callId}
          user={user}
          client={client}
          call={call}
          chatClient={chatClient}
          chatChannel={chatChannel}
          isConnecting={isConnecting}
          streamKey={STREAM_API_KEY}
        />
      )}
      
      <div className="stream-video-wrapper">
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
            
            {/* Chat Toggle Button */}
            {chatClient && chatChannel && (
              <div className="stream-chat-toggle-wrapper">
                <StreamChatToggle onClick={() => setIsChatOpen(!isChatOpen)} />
              </div>
            )}
          </StreamCall>
        </StreamVideo>
      </div>

      {/* Chat Sidebar */}
      {isChatOpen && chatClient && chatChannel && (
        <Chat client={chatClient}>
          <StreamChatSidebar onClose={() => setIsChatOpen(false)}>
            <Channel channel={chatChannel}>
              <Window>
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </StreamChatSidebar>
        </Chat>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/dashboard");
    }
  }, [callingState, navigate]);

  if (callingState === CallingState.LEFT) return null;

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default StreamPage;