'use client';
import React, {useState, useEffect, useContext} from 'react';
import './style.scss';
import {useSelector} from 'react-redux';
import {useSearchParams} from 'next/navigation';
import {RootState} from '@/redux/reducer';
import {ChatContext} from '@/context/ChatProvider';
import ListUserChat from './ListUser/ListUser';
import ListChat from './ListChat/ListChat';
import RollTop from '../RollTop';
import {useSrollContext} from '@/context/AppProvider';

const Message = () => {
  const {handleLoadHrefPage} = useSrollContext();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const {setApply} = useContext(ChatContext);
  const [openListChat, setOpenListChat] = useState(false);
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [innerHeight, setInnerHeight] = useState<string>('100vh');

  const searchParams: any = useSearchParams();

  useEffect(() => {
    document.title = languageRedux === 1 ? 'Nhắn tin' : 'Messaging';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    handleLoadHrefPage();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const actualHeight = window.innerHeight;

    setInnerHeight(`${actualHeight}px`);

    // Đăng ký sự kiện resize khi component được render
    window.addEventListener('resize', handleResize);

    // Loại bỏ sự kiện resize khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (searchParams.get('post_id') && windowWidth < 555) {
      setOpenListChat(true);
    } else {
      setOpenListChat(false);
    }
  }, []);

  return (
    <div className="message-page max-h-fit overflow-hidden">
      {windowWidth >= 555 ? (
        <div className="message-page_main">
          <div className="wrap-content_message">
            <div className="message-page_left">
              <ListUserChat
                setOpenListChat={setOpenListChat}
                openListChat={openListChat}
                language={language}
                languageRedux={languageRedux}
              />
            </div>

            <div className="message-page_right">
              <ListChat
                setOpenListChat={setOpenListChat}
                openListChat={openListChat}
                setApply={setApply}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="message-page-main_responsive">
          <div className="wrap-content-message_responsive">
            <ListUserChat
              setOpenListChat={setOpenListChat}
              openListChat={openListChat}
              language={language}
              languageRedux={languageRedux}
            />
            <ListChat
              setOpenListChat={setOpenListChat}
              openListChat={openListChat}
              setApply={setApply}
            />
          </div>
        </div>
      )}

      <RollTop />
      {windowWidth > 784 ? <></> : <></>}
    </div>
  );
};

export default Message;
