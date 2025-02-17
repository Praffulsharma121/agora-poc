import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from "react-icons/fa";
import "./VideoContainer.css";

interface VideoContainerProps {
  name: string;
  channel: string;
  onLeave: () => void;
}

const APP_ID = "03cc47a2c2c74af4ac7a7f1a30a501ae";
const TOKEN = null;

const VideoContainer: React.FC<VideoContainerProps> = ({ name, channel, onLeave }) => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState([] as any);
  const [remoteUsers, setRemoteUsers] = useState({} as any);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAgora = async () => {
      try {
        const UID = name;
        await client.join(APP_ID, channel, TOKEN, UID);
        
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks([microphoneTrack, cameraTrack]);

        if (localVideoRef.current) {
          cameraTrack.play(localVideoRef.current);
        }

        await client.publish([microphoneTrack, cameraTrack]);
        
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          
          if (mediaType === "video") {
            setRemoteUsers((prev: any) => {
              const updatedUsers = { ...prev, [user.uid]: user };
              setTimeout(() => {
                if (remoteVideoRef.current) {
                  user.videoTrack?.play(remoteVideoRef.current);
                }
              }, 100);
              return updatedUsers;
            });
          }
          if (mediaType === "audio") {
            user.audioTrack?.play(); 
          }
        });
      } catch (error) {
        console.error("Error initializing Agora:", error);
      }
    };
    
    initAgora();

    return () => {
      localTracks.forEach((track: any) => track.close());
      client.leave();
    };
  }, []);

  const toggleMic = () => {
    localTracks[0]?.setEnabled(!isMicOn);
    setIsMicOn(!isMicOn);
  };

  const toggleCamera = () => {
    localTracks[1]?.setEnabled(!isCameraOn);
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="video-container">
      <div className="video-box">
        <div ref={localVideoRef} className="local-video"></div>
        <div className="user-label">{name}</div>
      </div>
      
      {Object.keys(remoteUsers).length > 0 && (
        <div className="remote-video-box">
          <div ref={remoteVideoRef} className="remote-video"></div>
          <div className="user-label">
            {(Object.values(remoteUsers)[0] as any)?.uid || "Guest"}
          </div>
        </div>
      )}

      <div className="controls">
        <button onClick={toggleMic} className="control-btn">
          {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button onClick={toggleCamera} className="control-btn">
          {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button onClick={onLeave} className="control-btn leave">
          <FaPhoneSlash />
        </button>
      </div>
    </div>
  );
};

export default VideoContainer;
