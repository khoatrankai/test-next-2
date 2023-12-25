import React, { memo, useRef } from 'react';
import { Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '@/redux/reducer';
import communityApi from '@/api/community/apiCommunity';
import { setCookie } from '@/cookies';
import { setAlertCancleSave, setAlertSave } from '@/redux/reducer/alertReducer';
import { CommentIcon, EysIcon, LikeIcon, SaveIconFill, SaveIconOutline, SettingIcon } from '@/icons';
import ShowCancleSave from '@/components/HistoryComponent/ShowCancelSave';

interface IWorkingStoryCard {
  item: any;
  index: any;
  setSaveListPost: React.Dispatch<React.SetStateAction<boolean>>;
  saveListPost: boolean;
}

const WorkingStoryCard: React.FC<IWorkingStoryCard> = (props) => {
  const { item, index, setSaveListPost, saveListPost } = props;
  const [like, setLike] = React.useState(item && item?.liked);
  const [bookmark, setBookmark] = React.useState(item?.bookmarked);
  const [totalLike, setTotalLike] = React.useState(
    item?.communicationLikesCount,
  );
  const [shouldShowMoreButton, setShouldShowMoreButton] = React.useState(false);
  const [showText, setShowText] = React.useState('');
  const contentRef = useRef<any>(null);
  const [owner, setOwner] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const dispatch = useDispatch();

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

  React.useEffect(() => {
    setTotalLike(item?.communicationLikesCount);
    if (item?.profileData?.id === localStorage.getItem('accountId')) {
      setOwner(true);
    } else {
      setOwner(false);
    }

    if (item?.liked) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [item]);

  const handleMoveToDetailPage = (id: any, e: any) => {
    e.stopPropagation();
    location?.pathname === '/history'
      ? setCookie('fromHistory', '30', 365)
      : setCookie('fromHistory', '0', 365);
    localStorage.setItem('reload', 'true');
    window.open(`/detail-community?post-community=${id}&type=1`, '_parent');
  };

  React.useEffect(() => {
    const content = document.querySelector('.text-content_postNew');
  }, []);

  const handleClickSave = async (e: any) => {
    e.stopPropagation();
    // console.log('handleClick save');
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    try {
      const result = await communityApi.postCommunityBookmarked(item.id);
      if (result) {
        //create bookmark
        if (result.status === 201) {
          setSaveListPost(!saveListPost);
          dispatch<any>(setAlertSave(true));
          setBookmark(true);
        } else {
          setSaveListPost(!saveListPost);
          dispatch<any>(setAlertCancleSave(true));
          setBookmark(false);
        }
      } else {
        message.error('Vui lòng đăng nhập để thực hiện chức năng');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleMoveToEdit = (id: any, e: any) => {
    e.stopPropagation();
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    } else {
      window.open(`/comunity-create?post-community=${id}`, '_parent');
    }
  };

  // console.log('item', item);

  return (
    <>
      <div
        className="comunitypostNew-card-wrap_content"
        id={item?.id}
        key={index}
        onClick={(e) => handleMoveToDetailPage(item?.id, e)}
      >

        <div className="comunityPostNew-card-content">
          <div className="comunityPostNew-card-content-title">
            <h3>{item?.title}</h3>
            <div
              className="bookmark"
              onClick={(e) => {
                e.stopPropagation();

                if (!localStorage.getItem('accessToken')) {
                  setOpenModalLogin(true);
                  return;
                } else {
                  owner ? handleMoveToEdit(item?.id, e) : handleClickSave(e);
                }
              }}
            >
              {owner ? (
                <SettingIcon />
              ) : bookmark === true ? (
                <SaveIconFill width={24} height={24} />
              ) : (
                <SaveIconOutline width={24} height={24} />
              )}
            </div>
          </div>
          <div className="comunitypostNew-wrap_actor">
            <div className="comunitypostNew-wrap">
              <Avatar
                size={50}
                src={item?.profileData?.avatarPath}
                icon={<UserOutlined />}
              />
              <div className="info-actor_comunity">
                <p>Tác giả</p>
                <p>{item?.profileData?.name.slice(0, 2) + '...'}</p>
              </div>
            </div>
            <p>{item?.createdAtText}</p>
          </div>
          <div className="comunityPostNew-card-content_info">
            <ul className={`text-content_postNew ${showText}`} ref={contentRef}>
              {item?.content}
            </ul>
            {shouldShowMoreButton ? (
              <span onClick={(e) => handleAddText(e)}>
                {!showText ? 'Xem thêm...' : 'Xem ít...'}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="comunitypostNew-wrap_status">
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
      <ShowCancleSave />
      {/* <ShowNotificativeSave />
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      /> */}
    </>
  );
};

export default memo(WorkingStoryCard);
