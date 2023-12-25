'use client';
import React, {useState, useEffect} from 'react';
import {ArrowUpOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import './styles.scss';
import { useRouter } from 'next/navigation';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const RollTop: React.FC = () => {
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();

  return (
    <div className="roll-top-container">
      {showButton && (
        <Button
          type="default"
          className="roll-chat-btn"
          shape="circle"
          icon={<SmartToyIcon />}
          onClick={() => {
            router.push('/chat-bot');
          }}
          style={{
            bottom: '130px',
          }}
        />
      )}
    </div>
  );
};

export default RollTop;
