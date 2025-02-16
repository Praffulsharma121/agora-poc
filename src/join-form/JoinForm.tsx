import React, { useState } from "react";

interface JoinFormProps {
  onJoin: (name: string, channel: string) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ onJoin }) => {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("");

  const handleJoin = () => {
    if (name.trim() && channel.trim()) {
      onJoin(name, channel);
    } else {
      alert("Please enter both name and channel!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Enter Your Name & Channel</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      />
      <input
        type="text"
        placeholder="Channel Name"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      />
      <button onClick={handleJoin} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Join Call
      </button>
    </div>
  );
};

export default JoinForm;
