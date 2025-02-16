import React, { useState } from 'react';
import './App.css';
import JoinForm from './join-form/JoinForm';
import VideoContainer from './video-container/VideoContainer';

const App = () =>  {
  const [userName, setUserName] = useState<string | null>(null);
  const [channelName, setChannelName] = useState<string | null>(null);

  const handleJoin = (name: string, channel: string) => {
    setUserName(name);
    setChannelName(channel);
  };

  const handleLeave = () => {
    setUserName(null);
    setChannelName(null);
  };

  return (
    <div>
      {!userName || !channelName ? (
        <JoinForm onJoin={handleJoin} />
      ) : (
        <VideoContainer name={userName} channel={channelName} onLeave={handleLeave} />
      )}
    </div>
  );
};

export default App;
