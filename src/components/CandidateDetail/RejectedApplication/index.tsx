import React from 'react';
import {Button} from 'antd';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';
const RejectedApplication: React.FC = () => {
  // const [language, setLanguageState] = React.useState<any>();
  // const languageRedux = useSelector(
  //   (state: RootState) => state.changeLaguage.language,
  // );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  return (
    <>
      <Button
        name="RejectedApplication"
        type="default"
        style={{
          backgroundColor: '#bd3131',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
          cursor: 'default',
        }}
      >
        Đã từ chối{' '}
      </Button>
    </>
  );
};

export default RejectedApplication;
