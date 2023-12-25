import { RootState } from '@/redux/reducer';
import React from 'react';
import { useSelector } from 'react-redux';

const NoDataComponent: React.FC<any> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
 
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        flexDirection: 'column',
      }}
    >
      <img
        style={{ marginTop: '10rem' }}
        src={'https://res.cloudinary.com/ddwjnjssj/image/upload/v1698208727/images/loginLogo/ganfockpi03xoikcxdui.png'}
        alt="ảnh bị lỗi"
        width="208px"
        height="245px"
      />
      <p style={{ fontSize: 20, color: 'gray', marginBottom: 20 }}>
        {
          props.loading === true ?
            languageRedux === 1
              ? 'Đang tải dữ liệu'
              : 'Loading data...' :
            languageRedux === 1
              ? 'Không có thông tin hiển thị'
              : 'No display information'}
      </p>
    </div>
  );
};

export default NoDataComponent;
