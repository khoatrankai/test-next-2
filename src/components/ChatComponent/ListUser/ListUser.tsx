import React, {useEffect, useState, useContext} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss';
import moment from 'moment';
import {ChatContext} from '@/context/ChatProvider';
import postsApi from '@/api/posts/postsApi';
import messageApi from '@/api/messageApi';
import {SeenIcon} from '@/icons';
import {useSearchParams} from 'next/navigation';

interface IOpenListChat {
  setOpenListChat: (params: any) => any;
  openListChat: boolean;
  language: any;
  languageRedux: any;
}

const ListUserChat: React.FC<IOpenListChat> = (props) => {
  const {language, languageRedux} = props;
  const searchParams: any = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(false);
  const [openBackDrop, setBackDrop] = useState(false);
  const [listUserChat, setStateUserChat] = useState<any>([]);
  const [userId, setUserId] = useState<any>('');

  const {
    setUserInfoChat,
    setReceivedMessages,
    setSendMessages,
    sendMessages,
    receivedMessages,
    apply,
  } = useContext(ChatContext);

  const getPostById = async () => {
    try {
      const result = await postsApi.getPostV3(
        Number(searchParams.get('post_id')),
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result.data !== null) {
        setUserInfoChat({
          avatar: result?.data?.image,
          image: result?.data?.image,
          company_name: result?.data?.companyResourceData?.name,
          is_online: false,
          name: result?.data?.companyResourceData?.name,
          post_title: result?.data?.title,
          salary_min: result?.data?.salaryMin,
          salary_max: result?.data?.salaryMax,
          money_type_text: result?.data?.moneyTypeText,
          salary_type_id: result?.data?.postSalaryType?.id,
          post_status: result?.data?.status,
          is_owner: false,
          post_id: result?.data?.id,
          applied: result?.data?.applied,
          user_id: result?.data?.accountId,
          message: '',
          status: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostById();
  }, [apply]);

  const getAllUserChat = async () => {
    try {
      const result = await messageApi.getUserChated(
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setStateUserChat(result?.data?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllUserChat();
  }, [sendMessages, receivedMessages, languageRedux]);

  const updateWindowWidth = () => {
    if (window.innerWidth <= 555) {
      setWindowWidth(true);
    } else {
      setWindowWidth(false);
    }
  };

  useEffect(() => {
    updateWindowWidth();
  }, [windowWidth]);

  const handleClickUserInfo = (user: any) => {
    // how to use params in nextjs to url

    setUserInfoChat(user);
    setBackDrop(true);
    window.history.pushState(
      {},
      '',
      `/chat?post_id=${user.post_id}&user_id=${user.user_id}`,
    );

    const currentURL = window.location.href;

    const url = new URL(currentURL);

    setUserId(url.searchParams.get('user_id'));

    getAllUserChat();
    setReceivedMessages([
      {
        receiverId: url.searchParams.get('user_id'),
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(url.searchParams.get('post_id')),
      },
    ]);
    setSendMessages([
      {
        receiverId: url.searchParams.get('user_id'),
        message: '',
        createdAt: 0,
        type: '',
        postId: Number(url.searchParams.get('post_id')),
      },
    ]);

    setTimeout(() => {
      setBackDrop(false);
    }, 500);
    windowWidth && props.setOpenListChat(true);

    if (props.openListChat === true && windowWidth) {
      let listChatElement = document.querySelector('.list_userChat');
      listChatElement?.classList.add('.hide-list-userChat');
    }
  };

  if (listUserChat.length !== 0) {
    return (
      <div
        className={`list_userChat ${
          props.openListChat === true && windowWidth ? 'hide-list-userChat' : ''
        }`}
      >
        <div className="header-list_userChat">
          <h4 className="title-header_listUserChat">
            {languageRedux === 1 ? `Tin nhắn` : `Message`}
          </h4>
          <div className="header-listSearch_userChat"></div>
        </div>

        <div className="list-infoUser">
          <Backdrop
            sx={{
              color: '#d4a650 ',
              backgroundColor: 'transparent',
              zIndex: (theme: any) => theme.zIndex.drawer + 1,
            }}
            open={openBackDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {listUserChat &&
            listUserChat.length > 0 &&
            listUserChat.map((user: any, index: number) => (
              <div
                className={`wrap-userInfo ${
                  userId === user?.user_id ? 'readed-message' : ''
                } `}
                key={index}
                onClick={() => handleClickUserInfo(user)}
              >
                <div className="wrap-avatar_userChat">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt="" />
                  ) : (
                    <div>AVT</div>
                  )}
                  <span
                    className={`user-online ${
                      user?.is_online ? 'user-online_true' : ''
                    }`}
                  ></span>
                </div>
                <div className="info-user_chat">
                  <h4>{user?.name ? user?.name : user?.company_name}</h4>
                  <h5>{user?.name ? '' : user?.post_title}</h5>
                  <p>{user?.message}</p>
                </div>
                <div className="info-chat_icon">
                  <small>
                    {user?.created_at
                      ? new Date(user?.created_at).toLocaleString('en-GB')
                      : moment(new Date()).format('DD/MM/YYYY') +
                        ' ' +
                        moment(new Date()).format('HH:mm:ss')}
                  </small>
                  {user?.status === 1 ? (
                    <span className="count-message_readed">
                      <SeenIcon />
                    </span>
                  ) : (
                    <span className="count-message_receive"></span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } else if (listUserChat.length === 0) {
    return (
      <div className="list_userChat">
        <div className="wrap-img_chat">
          <img src="./images/imageListChatBegin.png" alt="" />
          <div>
            {languageRedux === 1
              ? `Bạn chưa có cuộc trò chuyện nào`
              : `You don't have any conversations yet`}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="list_userChat">
        <div className="wrap-img_chat">
          <img src="./images/imageListChatBegin.png" alt="" />
          <div>
            {languageRedux === 1
              ? `Bạn chưa có cuộc trò chuyện nào`
              : `You don't have any conversations yet`}
          </div>
        </div>
      </div>
    );
  }
};

export default ListUserChat;
