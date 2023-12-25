import React from 'react';

import { Box, Typography, MenuItem, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { Button, message } from 'antd';
import './style.scss';
import moment from 'moment';
import { RootState } from '@/redux/reducer';
import communityApi from '@/api/community/apiCommunity';
import { setCookie } from '@/cookies';
import { CommentIcon, EditComunity, EysIcon, FilterComunity, LikeIcon, NewestIcon, SettingIcon } from '@/icons';
const CardListBlogCreate = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [openMenu, setOpenMenu] = React.useState(false);
  const [page, setPage] = React.useState<any>('0');
  const [sort, setSort] = React.useState('');
  const [createdPost, setCreatedPost] = React.useState<any>();
  const [isVisible, setIsVisible] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);

  const handleGetCreatedPost = async () => {
    try {
      const result = await communityApi.getCommunityByAccount(
        page,
        '10',
        sort,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setCreatedPost(result?.data?.communications);
        if (result?.data?.communications?.length < 10) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveToEdit = (id: any, e: any) => {
    e.stopPropagation();
    window.open(`/community-create?post-community=${id}`, '_parent');
  };

  const handleMoveToDetail = (id: any) => {
    window.open(`/detail-community?post-community=${id}&type=1`, '_parent');
    setCookie('fromHistory', '31', 365);
  };

  React.useEffect(() => {
    handleGetCreatedPost();
  }, [sort, languageRedux]);

  const footerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async () => {
    try {
      setUploading(true);
      const nextPage = (parseInt(page) + 1).toString();
      const result = await communityApi.getCommunityByAccount(
        nextPage,
        '10',
        sort,
        languageRedux === 1 ? 'vi' : 'en',
      );

      //
      if (result && result?.data?.communications?.length !== 0) {
        setUploading(false);
        setCreatedPost((prev: any) => [
          ...prev,
          ...result?.data?.communications,
        ]);
        setPage(nextPage);
      } else {
        setPage('0');
        message.error(
          languageRedux === 1
            ? 'Đã hết bài viết để hiển thị'
            : 'Out of posts to show',
        );
        setIsVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveToCreate = () => {
    window.open('/community-create', '_parent');
  };

  const handleSortBy = (sortString: string) => {
    //cm: comment, l: likes, v: views
    setPage('0');
    if (sort == sortString) {
      setSort('');
      // console.log(sort);
    } else {
      setUploading(false);
      setIsVisible(true);
      setSort(sortString);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="list-blog-create-box"
      >
        <div className="back-container">
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '24px',
            }}
          >
            {languageRedux === 1 ? 'Bài viết đã tạo' : 'Created posts'}
          </Typography>
        </div>
        <div className="title-comunity_icon">
          <div
            className="dropdown dropdown-4"
            ref={footerRef}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <FilterComunity />
            <ul className="dropdown_menu dropdown_menu-4">
              <li
                className={
                  sort === '' ? 'dropdown_item-1  active' : 'dropdown_item-1'
                }
                style={{ display: openMenu ? 'flex' : 'none' }}
                onClick={() => {
                  handleSortBy('');
                }}
              >
                <NewestIcon />
                <p>{languageRedux === 1 ? `Mới nhất` : 'Newest'}</p>
              </li>
              <li
                className={
                  sort !== '' && sort == 'l'
                    ? 'dropdown_item-2  active'
                    : 'dropdown_item-2'
                }
                style={{ display: openMenu ? 'flex' : 'none' }}
                onClick={() => {
                  handleSortBy('l');
                }}
              >
                <LikeIcon />
                <p>{languageRedux === 1 ? `Lượt thích`: `Likes`}</p>
              </li>
              <li
                className={
                  sort !== '' && sort == 'v'
                    ? 'dropdown_item-3  active'
                    : 'dropdown_item-3'
                }
                style={{ display: openMenu ? 'flex' : 'none' }}
                onClick={() => {
                  handleSortBy('v');
                }}
              >
                <EysIcon />
                <p>{languageRedux === 1 ? `Lượt xem` : `Views`}</p>
              </li>
              <li
                className={
                  sort !== '' && sort == 'cm'
                    ? 'dropdown_item-4  active'
                    : 'dropdown_item-4'
                }
                style={{ display: openMenu ? 'flex' : 'none' }}
                onClick={() => {
                  handleSortBy('cm');
                }}
              >
                <CommentIcon />
                <p>{languageRedux === 1 ? `Lượt bình luận` : `Comments`}</p>
              </li>
            </ul>
          </div>
          <div className="create-community-post" onClick={handleMoveToCreate}>
            <EditComunity />
          </div>
        </div>
      </Box>
      <div className="list-blog-create-data">
        {createdPost &&
          createdPost.map((item: any, index: any) => (
            <div
              className="community-content-body_item"
              key={index}
              onClick={() => handleMoveToDetail(item?.id)}
            >
              <div className="community-content-body-item_top">
                <div className="body-item-title">
                  <h3>{item?.title}</h3>
                  <div
                    className="title-icon"
                    onClick={(e) => handleMoveToEdit(item?.id, e)}
                  >
                    <SettingIcon />
                  </div>
                </div>
                <p>
                  {item?.createdAtText
                    ? item?.createdAtText
                    : new Date(item?.createdAt).toLocaleDateString('en-GB') +
                    ', ' +
                    moment(new Date(item?.createdAt)).format('HH:mm')}
                </p>
              </div>
              <div className="body-item-actions">
                <div className="action-item">
                  <EysIcon />
                  <p>{item?.totalViews}</p>
                </div>
                <div className="action-item">
                  <LikeIcon />
                  <p>{item?.totalLikes}</p>
                </div>
                <div className="action-item">
                  <CommentIcon />
                  <p>{item?.totalComments}</p>
                </div>
              </div>
            </div>
          ))}
        <Box
          sx={{
            margin: '12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{
              width: 130,
              height: 40,
              backgroundColor: `#d4a650`,
              marginBottom: '2rem',
              color: '#FFFFFF',
              fontWeight: 'bold',
              display: isVisible ? 'block' : 'none',
            }}
            loading={uploading}
            onClick={handleChange}
          >
            {languageRedux === 1 ? `Xem thêm` : `See more`}
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CardListBlogCreate;
