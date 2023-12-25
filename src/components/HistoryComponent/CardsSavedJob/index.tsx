'use client';
import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';

import {Box, Typography, MenuItem, TextField} from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss';
import {message, Button} from 'antd';
import {useDispatch} from 'react-redux';
import JobCardSaveHistory from './JobCardSaveHstory';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';
import historyBookmark from '@/api/historyBookmark';
import sortData from '@/util/SortDataHistory/sortData';
import bookMarkApi from '@/api/bookmarks/bookMarkApi';
import NoDataComponent from '@/util/NoDataPage';
import {setAlertCancleSave} from '@/redux/reducer/alertReducer';

interface ICardsApplied {
  activeChild: string;
}

const CardsSavedJob: React.FC<ICardsApplied> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [dataBookmarks, setDataBookmarks] = useState<any>(null);
  const [newOld, setnewOld] = React.useState('Mới nhất');
  const [uploading, setUploading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);

  const getAllPostToCheck = async () => {
    const result = await historyBookmark.getAllBookmark(
      lastPostId,
      11,
      languageRedux === 1 ? 'vi' : 'en',
    );
    if (result.data.length <= 10) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    getAllPostToCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyBookmark.getAllBookmark(
        newCount,
        10,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setLastPostId(result.data[result.data.length - 1].bookmark_id);
        setDataBookmarks(sortData.sortDataByDate(newOld, result.data));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getAllPosted(0).then(() => {
      if (isMounted) {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBookmarks?.length, languageRedux]);

  const handleChange = (event: any) => {
    setnewOld(event.target.value);

    setDataBookmarks(
      sortData.sortDataByDate(event.target.value, dataBookmarks),
    );
  };

  const handleClickAddItem = async () => {
    try {
      setUploading(true);
      const result = await historyBookmark.getAllBookmark(
        lastPostId,
        10,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setUploading(false);
        if (result.data.length === 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content:
              languageRedux === 1
                ? 'Đã hết công việc để hiển thị'
                : 'No more jobs to display',
          });
          return;
        }
        setLastPostId(result.data[result.data.length - 1].bookmark_id);
        setDataBookmarks((prev: any) => {
          const array = [...prev, ...result.data];
          return sortData.sortDataByDate(newOld, array);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBookmark = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    bookmarkId: number,
  ) => {
    const result = await bookMarkApi.deleteBookMark(bookmarkId);

    if (result) {
      setDataBookmarks((prev: any) => {
        const newData = [...prev];
        newData.splice(index, 1);
        if (newData.length === 0) {
          getAllPosted(0);
        }
        return newData;
      });
      dispatch<any>(setAlertCancleSave(true));
    }
  };

  return (
    <>
      {contextHolder}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
          }}
        >
          {languageRedux === 1 ? 'Các công việc đã lưu' : 'Saved jobs'}
        </Typography>
        <TextField
          select
          id="sex"
          value={newOld}
          onChange={handleChange}
          variant="outlined"
          placeholder="Giới tính"
          size="small"
          sx={{width: '120px'}}
        >
          <MenuItem value="Mới nhất">
            {languageRedux === 1 ? 'Mới nhất' : `Newest`}
          </MenuItem>
          <MenuItem value="Cũ nhất">
            {languageRedux === 1 ? `Cũ nhất` : `Oldest`}
          </MenuItem>
        </TextField>
      </Box>
      <Backdrop
        sx={{
          color: '#d4a650 ',
          backgroundColor: 'transparent',
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {dataBookmarks?.length > 0 ? (
        <div className="history-post">
          <Grid container columns={{xs: 6, sm: 4, md: 12}}>
            {dataBookmarks?.map((dataBookmark: any, i: number) => (
              <JobCardSaveHistory
                item={dataBookmark}
                handleDeleteBookmark={handleDeleteBookmark}
                index={i}
                key={i}
                language={languageRedux}
                languageRedux={languageRedux}
              />
            ))}
          </Grid>
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
                marginBottom: '2rem',
                backgroundColor: `#d4a650`,
                color: '#FFFFFF',
                fontWeight: 'bold',
                display: isVisible ? 'block' : 'none',
              }}
              loading={uploading}
              onClick={handleClickAddItem}
            >
              {languageRedux === 1 ? `Xem thêm` : `See more`}
            </Button>
          </Box>
        </div>
      ) : (
        <NoDataComponent />
      )}
    </>
  );
};

export default CardsSavedJob;
