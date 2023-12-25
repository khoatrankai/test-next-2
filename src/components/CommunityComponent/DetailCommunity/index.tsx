import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Avatar, message} from 'antd';
// @ts-ignore
import {Modal} from 'antd';
import './style.scss';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from 'antd';
import {RootState} from '@/redux/reducer';
import communityApi from '@/api/community/apiCommunity';
import {getCookie, setCookie} from '@/cookies';
import {setAlertCancleSave, setAlertSave} from '@/redux/reducer/alertReducer';
import {
  BackIcon,
  CommentIcon,
  DeleteCmtIcon,
  EysIcon,
  LikeIcon,
  SaveIconFill,
  SaveIconOutline,
  SendComunityIcon,
  LikeIconWhite,
} from '@/icons';
import ShowCancleSave from '@/components/HistoryComponent/ShowCancelSave';
import {useSearchParams} from 'next/navigation';
const {TextArea} = Input;

const Comunity = () => {
  const language = useSelector((state: RootState) => {
    return state.dataLanguage.languages;
  });
  const languageRedux = useSelector((state: RootState) => {
    return state.changeLaguage.language;
  });
  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  const [detail, setDetail] = React.useState<any>();
  const searchParams: any = useSearchParams();
  const POST_COMMUNITY_ID = searchParams.get('post-community');
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [cmtContent, setCmtContent] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState('');
  const [like, setLike] = React.useState(false);
  const [bookmark, setBookmark] = React.useState(false);
  const [cmt, setCmt] = React.useState(false);
  const [deleteCmt, setDeleteCmt] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [fromHistory, setFromHistory] = React.useState<any>('0');
  const {confirm} = Modal;
  const dispatch = useDispatch();

  const handelChangeCmt = (event: any) => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    setCmtContent(event.target.value);
  };

  const handleDeleteCmt = async (postId: any, cmtId: any) => {
    try {
      const result = await communityApi.deleteComent(postId, cmtId);
      if (result.status === 200) {
        setDeleteCmt(!deleteCmt);
      }
    } catch (error) {}
  };

  const handleGetDetailCommunityById = async () => {
    try {
      if (POST_COMMUNITY_ID) {
        const result = await communityApi.getCommunityDetailId(
          POST_COMMUNITY_ID,
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (result && result.status !== 400) {
          setLike(result?.data?.liked);
          setDetail(result?.data);
          setBookmark(result?.data?.bookmarked);

          if (result.data.type === 0) {
            setCookie('hijobId', result.data.id, 365);
          } else {
            setCookie('workingId', result.data.id, 365);
          }
        } else {
          POST_COMMUNITY_ID === '1'
            ? window.open('/blog', '_parent')
            : window.open('/blog', '_parent');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setFromHistory(getCookie('fromHistory'));
  }, []);

  React.useEffect(() => {
    handleGetDetailCommunityById();
  }, [
    POST_COMMUNITY_ID,
    like,
    bookmark,
    cmt,
    languageRedux,
    language,
    deleteCmt,
  ]);

  const showDeleteConfirm = (postId: any, cmtId: any) => {
    confirm({
      centered: true,
      closable: true,
      title:
        languageRedux === 1
          ? 'Bạn có chắc muốn xóa bình luận này'
          : 'Are you sure delete this comment',
      content:
        languageRedux === 1
          ? 'Sau khi xóa, bình luận này sẽ không còn xuất hiện nữa'
          : 'Once deleted, this comment will no longer appear',
      okText: languageRedux === 1 ? 'Có' : 'Yes',
      okType: 'danger',
      cancelText: languageRedux === 1 ? 'Không' : 'No',
      onOk() {
        handleDeleteCmt(postId, cmtId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleLikeCommunity = async (communicationId: number) => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }

    try {
      const result = await communityApi.postCommunityLike(communicationId);
      if (result) {
        result.status === 201 ? setLike(true) : setLike(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (detail && detail.liked) {
      setLike(true);
    } else if (detail && !detail.liked) {
      setLike(false);
    }

    if (detail && detail.bookmarked) {
      setBookmark(true);
    } else if (detail && !detail.bookmarked) {
      setBookmark(false);
    }
  }, [detail]);

  const handleSaveCommunity = async (communicationId: number) => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }

    try {
      const result = await communityApi.postCommunityBookmarked(
        communicationId,
      );
      if (result) {
        if (result.status === 201) {
          dispatch<any>(setAlertSave(true));
          setBookmark(true);
        } else {
          dispatch<any>(setAlertCancleSave(true));
          setBookmark(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentCommunity = async () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }

    if (cmtContent.trim() == '') {
      message.error(
        languageRedux === 1
          ? 'Bạn chưa nhập bình luận'
          : 'You have not entered a comment',
      );
      setCmtContent('');
      return;
    }
    const form = {
      communicationId: detail?.id,
      content: cmtContent.trim(),
      images: [],
    };
    try {
      const result = await communityApi.postCommunityComment(form);
      if (result) {
        setCmt(!cmt);
        setCmtContent('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = (img: any) => {
    setPreviewImage(img);
    setPreviewOpen(true);
  };

  const handleKeyPress = (e: any) => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }

    if (!e.shiftKey) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCommentCommunity();
      }
    }
  };

  const handleMoveToList = () => {
    setCookie('fromHistory', '0', 365);
    fromHistory === '31'
      ? window.open('/history?community_post=31', '_parent')
      : fromHistory === '30'
      ? window.open('/history?community_post=30', '_parent')
      : window.open(detail?.type === 1 ? '/blog' : '/blog', '_parent');
  };

  const hanleClickComment = () => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
    }
  };

  return (
    <div className="comunity-container">
      <div className="comunity-content">
        <div className="comunity-detail_post">
          <div className="back" onClick={handleMoveToList}>
            <div className="icon-back">
              <BackIcon width={15} height={15} fill="white" />
            </div>
            <h3>
              {fromHistory === '31' || fromHistory === '30'
                ? language?.history
                : detail?.type === 1
                ? languageRedux === 1
                  ? 'Câu chuyện việc làm'
                  : 'Working story'
                : languageRedux === 1
                ? 'Tin tức'
                : 'Recruitment news'}
            </h3>
          </div>
          <div className="title-comunity">
            <h3>{detail?.title}</h3>
            <div className="title-comunity_icon">
              <span onClick={() => handleSaveCommunity(detail?.id)}>
                {bookmark ? (
                  <SaveIconFill width={24} height={24} />
                ) : (
                  <SaveIconOutline width={24} height={24} />
                )}
                {language?.save}
              </span>
            </div>
          </div>
          <div className="comunityDetail-wrap_actor">
            <div className="comunityDetail-wrap">
              <Avatar
                size={50}
                src={
                  detail?.type === 1
                    ? detail?.profileData?.avatarPath
                    : './images/logoHijobCommunity.jpg'
                }
                icon={<UserOutlined />}
                style={{
                  filter: detail?.type === 1 ? 'blur(3px)' : 'none',
                }}
              />
              <div className="info-actor_comunityDetail">
                <p>{language?.community_page?.author}</p>
                <p>
                  {detail?.type === 1
                    ? detail?.profileData?.name.slice(0, 2) + '...'
                    : 'HCMUTEJob'}
                </p>
              </div>
            </div>
            <p>{detail?.createdAtText}</p>
          </div>
          <div className="comunityDetail-wrap_content">
            <div className="comunityDetail-content">
              <div
                dangerouslySetInnerHTML={{__html: detail?.content}}
                style={{color: 'blue', fontSize: '16px'}}
              />
            </div>
          </div>
          <div className="comunityDetail-wrap_img">
            {detail?.image.map((item: any, index: any) => (
              <img
                onClick={() => {
                  handlePreview(item.image);
                }}
                src={item.image}
                alt={item.image}
              />
            ))}
          </div>
          <div className="comunityDetail-wrap_status">
            <div className="comunitypostNew-status_item">
              <EysIcon />
              <p>{detail?.communicationViewsCount}</p>
            </div>
            <div
              className={
                like
                  ? `comunitypostNew-status_item liked`
                  : `comunitypostNew-status_item`
              }
              onClick={() => handleLikeCommunity(detail?.id)}
            >
              <LikeIconWhite />
              <p>{detail?.communicationLikesCount}</p>
            </div>
            <div className="comunitypostNew-status_item">
              <CommentIcon />
              <p>{detail?.communicationCommentsCount}</p>
            </div>
          </div>
          <div className="comunityDetail-wrap_comment">
            <div className="comunityDetail-comment_chater">
              <Avatar
                size={50}
                src={dataProfile?.avatar}
                icon={<UserOutlined />}
              />
              <div className="comunityDetail-comment_chaterInput">
                <TextArea
                  value={cmtContent}
                  onKeyDown={(e: any) => handleKeyPress(e)}
                  onChange={handelChangeCmt}
                  onClick={hanleClickComment}
                  placeholder={
                    languageRedux === 1
                      ? 'Nhập bình luận của bạn ...'
                      : 'Enter your comment ...'
                  }
                  autoSize
                />
                <div className="comment-interaction">
                  <div
                    className={
                      cmtContent.trim() != ''
                        ? 'comment-chaterInput_send active'
                        : 'comment-chaterInput_send'
                    }
                    onClick={handleCommentCommunity}
                  >
                    <SendComunityIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="comunityDetail-list_comment">
              {detail?.communicationCommentsData &&
                detail?.communicationCommentsData.map(
                  (cmtData: any, index: any) => {
                    return (
                      <div
                        className="comunityDetail-list_comment__item"
                        key={index}
                      >
                        <Avatar
                          size={50}
                          src={cmtData?.profile?.avatar}
                          icon={<UserOutlined />}
                        />
                        <div className="comunityDetail-comment">
                          <div className="comunityDetail-comment_top">
                            <div className="comunityDetail-comment_top__left">
                              <h3>
                                {cmtData.profile.name ? cmtData?.profile?.name?.slice(0, 2) + '...' : 'Anonymous'}
                              </h3>
                              <h3>|</h3>
                              <p>{cmtData?.createdAtText}</p>
                            </div>
                            <div
                              className="comunityDetail-comment_top__right"
                              style={{
                                display:
                                  detail?.profileData?.id ===
                                    localStorage.getItem('accountId') ||
                                  cmtData?.profile?.id ===
                                    localStorage.getItem('accountId')
                                    ? 'block'
                                    : 'none',
                              }}
                              onClick={() =>
                                showDeleteConfirm(detail?.id, cmtData?.id)
                              }
                            >
                              <DeleteCmtIcon />
                            </div>
                          </div>
                          <div className="comunityDetail-comment_bottom">
                            <TextArea value={cmtData?.content} autoSize />
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={previewOpen}
        title="Image"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{width: '100%'}} src={previewImage} />
      </Modal>
      <ShowCancleSave />
      {/* <ShowNotificativeSave /> */}
      {/* <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      /> */}
    </div>
  );
};

export default Comunity;
