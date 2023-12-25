'use client'
import React from 'react';
import './styles.scss';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const RollTop: React.FC = () => {
  const [height, setHeight] = React.useState(0);

  const handleRollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return (
    <div className="roll-top-container">
      <Button
        type="default"
        className="roll-top-btn"
        shape="circle"
        icon={<ArrowUpOutlined />}
        onClick={handleRollTop}
        style={
          height > 200
            ? {
                bottom: '60px',
              }
            : {
                bottom: '-60px',
              }
        }
      />
    </div>
  );
};

export default RollTop;
