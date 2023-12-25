// import React from 'react'

import { RootState } from '@/redux/reducer';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

const RecuitApplication = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
  return (
    <>
      <Button
        type="text"
        style={{
          backgroundColor: '#aaaaaa',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
          cursor: 'pointer',
        }}
        name="RecuitApplication"
      >
        {
          languageRedux === 1 ?
            "Đã tuyển ứng viên này" :
            "Hired this candidate"
        }
      </Button>
    </>
  );
};

export default RecuitApplication;
