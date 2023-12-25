import React from 'react';
import {Typography} from 'antd';
import {MessageOutlined} from '@ant-design/icons';
import './style.scss';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux';

const {Text, Title} = Typography;

const HeaderMessage = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  return (
    <>
      <div className="header-message_left">
        <MessageOutlined className="icon-message" />
      </div>

      <div className="header-message_right">
        <Title level={3} className="header-message_Title">
          {languageRedux === 1 ? 'Hộp thoại' : 'Dialog box'}
        </Title>
        <Text className="header-message_text">
          {languageRedux === 1 ? 'Tin nhắn' : 'Message'}
        </Text>
      </div>
    </>
  );
};

export default HeaderMessage;
