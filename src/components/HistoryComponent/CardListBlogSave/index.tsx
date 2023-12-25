import React from 'react';
import { Box, Typography } from '@mui/material';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import './style.scss';
import { RootState } from '@/redux/reducer';
import communityApi from '@/api/community/apiCommunity';
import UTENewsCard from '@/components/CommunityComponent/UTENewsCard';
import WorkingStoryCard from '@/components/CommunityComponent/WorkingStoryCard';

const CardListBlogSave = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [openMenu, setOpenMenu] = React.useState(false);

  const [stories, setStories] = React.useState<any>();
  const [page, setPage] = React.useState<any>(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [saveListPost, setSaveListPost] = React.useState(false);

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

  const handleGetAllWorkingStory = async () => {
    try {
      const result = await communityApi.getCommunityBookmarked(page);
      if (result) {
        setStories(result?.data?.communications);
        if (result?.data?.communications?.length < 10) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetAllWorkingStory();
  }, [saveListPost, languageRedux]);

  // more
  const handleChange = async () => {
    try {
      setUploading(true);
      const nextPage = parseInt(page) + 1;
      const result = await communityApi.getCommunityBookmarked(nextPage);

      if (result && result?.data?.communications?.length !== 0) {
        setUploading(false);
        setStories((prev: any) => [...prev, ...result?.data?.communications]);
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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="list-blog-save-box"
      >
        <div className="back-container">
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '24px',
            }}
          >
            {languageRedux === 1 ? 'Bài viết đã lưu' : 'Saved posts'}
          </Typography>
        </div>
      </Box>
      <div className="list-blog-create-data">
        {stories ? (
          stories.map((item: any, index: any) =>
            item?.communicationData?.type === 1 ? (
              <WorkingStoryCard
                item={item.communicationData}
                index={index}
                setSaveListPost={setSaveListPost}
                saveListPost={saveListPost}
              />
            ) : (
              <UTENewsCard
                item={item.communicationData}
                index={index}
                setSaveListPost={setSaveListPost}
                saveListPost={saveListPost}
              />
            ),
          )
        ) : (
          <></>
        )}
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
            Xem thêm
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CardListBlogSave;
