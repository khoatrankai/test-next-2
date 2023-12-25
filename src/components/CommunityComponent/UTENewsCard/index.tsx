import React from 'react';
import {Avatar, message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './style.scss';
import {Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
//@ts-ignore
import ModalLogin from '#components/Home/ModalLogin';
import {useLocation} from 'react-router-dom';
import {RootState} from '@/redux/reducer';
import communityApi from '@/api/community/apiCommunity';
import {setAlertCancleSave, setAlertSave} from '@/redux/reducer/alertReducer';
import {setCookie} from '@/cookies';
import { CommentIcon, EysIcon, LikeIcon, SaveIconFill, SaveIconOutline } from '@/icons';
import ShowCancleSave from '@/components/HistoryComponent/ShowCancelSave';

const UTENewsCard: React.FC<any> = (props) => {
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {item, index, setSaveListPost, saveListPost} = props;
  const [like, setLike] = React.useState(item?.liked);
  const [bookmark, setBookmark] = React.useState(item?.bookmarked);
  const [totalLike, setTotalLike] = React.useState(
    item?.communicationLikesCount,
  );
  const [shouldShowMoreButton, setShouldShowMoreButton] = React.useState(false);
  const [showText, setShowText] = React.useState('');
  const contentRef = React.useRef<any>(null);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setTotalLike(item?.communicationLikesCount);
    if (item?.liked) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [item]);

  const handleLikeCommunity = async (communicationId: number, e: any) => {
    e.stopPropagation();
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    try {
      const result = await communityApi.postCommunityLike(communicationId);
      if (result) {
        setLike(!like);
        if (result?.data?.communicationId) {
          setTotalLike(totalLike + 1);
        } else {
          setTotalLike(totalLike - 1);
        }
      } else {
        message.error('Vui lòng đăng nhập để thực hiện chức năng');
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {}, [like]);

  const handleClickSave = async (e: any) => {
    e.stopPropagation();
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }

    try {
      const result = await communityApi.postCommunityBookmarked(item.id);
      if (result) {
        //create bookmark
        if (result.status === 201) {
          dispatch<any>(setAlertSave(true));
          setSaveListPost(!saveListPost);
          setBookmark(true);
        } else {
          dispatch<any>(setAlertCancleSave(true));
          setSaveListPost(!saveListPost);
          setBookmark(false);
        }
      } else {
        setOpenModalLogin(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleMoveToDetailPage = (id: any, e: any) => {
    e.stopPropagation();
    location?.pathname === '/history'
      ? setCookie('fromHistory', '30', 365)
      : setCookie('fromHistory', '0', 365);
    window.open(`/detail-community?post-community=${id}&type=0`, '_parent');
  };

  React.useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight,
      );

      const numLines = Math.floor(contentHeight / lineHeight);
      setShouldShowMoreButton(numLines >= 2);
    }
  }, [item?.content]);

  const handleAddText = (e: any) => {
    e.stopPropagation();
    if (showText === '') {
      setShowText('showText');
      setShouldShowMoreButton(!shouldShowMoreButton);
    } else {
      setShowText('');
      setShouldShowMoreButton(!shouldShowMoreButton);
    }
  };

  return (
    <>
      <div
        className="comunitypostNews-card-wrap_content"
        id={item.id}
        key={index}
        onClick={(e) => handleMoveToDetailPage(item?.id, e)}
      >
        <div className="comunitypostNews-card-wrap_content__left">
          {item?.images.length !== 0 ? (
            <Avatar
              shape="square"
              src={item?.images[0]?.image}
              icon={<UserOutlined />}
            />
          ) : (
            <Avatar
              shape="square"
              size={88}
              src="https://static.vecteezy.com/system/resources/thumbnails/005/720/387/small/newspaper-line-icon-on-white-background-outline-sign-of-newspaper-news-symbol-linear-pictogram-free-vector.jpg"
            />
          )}
        </div>
        <div className="comunitypostNews-card-wrap_content__right">
          <div className="comunityPostNews-card-content">
            <div className="comunityPostNews-card-content-title">
              <h3>{item?.title}</h3>
              <div className="bookmark" onClick={(e) => handleClickSave(e)}>
                {bookmark === true ? (
                  <SaveIconFill width={24} height={24} />
                ) : (
                  <SaveIconOutline width={24} height={24} />
                )}
              </div>
            </div>
            <div className="comunityPostNews-card-content_info">
              <ul
                className={`text-content_postNew ${showText}`}
                ref={contentRef}
              >
                {item?.content}
              </ul>
              {shouldShowMoreButton ? (
                <span onClick={(e) => handleAddText(e)}>
                  {!showText ? `${language?.more}...` : 'Xem ít...'}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="comunityPostNews-card-interaction">
            <div className="comunitypostNew-card-wrap_actor">
              <div className="comunitypostNew-wrap">
                <Avatar
                  size={42}
                  src="./images/logoHijobCommunity.jpg"
                  icon={<UserOutlined />}
                />
                <div className="info-actor_comunity">
                  <p>{language?.community_page?.author}</p>
                  <p>Hijob</p>
                </div>
              </div>
              <p>{new Date(item?.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="comunitypostNew-card-wrap_status">
              <div className="status-item">
                <EysIcon />
                <p>{item?.communicationViewsCount}</p>
              </div>
              <div
                className={like ? 'status-item liked' : 'status-item'}
                onClick={(e) => handleLikeCommunity(item?.id, e)}
              >
                <LikeIcon />
                <p>{totalLike}</p>
              </div>
              <div
                className="status-item"
                onClick={(e) => handleMoveToDetailPage(item?.id, e)}
              >
                <CommentIcon />
                <p>{item?.communicationCommentsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShowCancleSave />
      {/* <ShowNotificativeSave />
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      /> */}
    </>
  );
};

export default UTENewsCard;
