import { useState } from "react";

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const [username, setUsername] = useState("홍길동");
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>사용자 설정</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>이름: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          알림 받기
        </label>
      </div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};
