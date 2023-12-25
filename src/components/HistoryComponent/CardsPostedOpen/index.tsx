import React, {useEffect, useState, useMemo} from 'react';
import Grid from '@mui/material/Grid';

import {message, Button} from 'antd';

import {Box, Typography, MenuItem, TextField} from '@mui/material';
import {LeftOutlined} from '@ant-design/icons';

import {useSelector} from 'react-redux';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {RootState} from '@/redux/reducer';
import historyRecruiter from '@/api/history/historyRecruiter';
import sortData from '@/util/SortDataHistory/sortData';
import JobCardPostHistory from '../JobCardPostHistoryComponent';
import NoDataComponent from '@/util/NoDataPage';
import DetailPosted from '../DetailPosted';

interface CardsPostedOpen {
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailPosted: boolean;
}
const CardsPostedOpen: React.FC<CardsPostedOpen> = (props) => {
  const {setShowDetailPosted, showDetailPosted} = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [detailPosted, setDetailPosted] = React.useState<any>(null);
  const [dataPosted, setDataPosted] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newOld, setnewOld] = React.useState('Mới nhất');
  const [lastPostId, setLastPostId] = useState(0);

  const [uploading, setUploading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);

  //   getData
  const getAllPosted = async (newCount: number) => {
    try {
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        newCount,
        10,
        '1',
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setDataPosted(result.data);
        setLastPostId(result.data[result.data.length - 1].id);
        if (result.data.length < 10) {
          setIsVisible(false);
        }
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
        setLoading(false);
      }
    });

    return () => {
      isMounted = false; // Đặt biến cờ thành false khi component unmounts để tránh lỗi
    };
  }, [showDetailPosted, languageRedux]);

  // click Button
  const handleAddItem = async () => {
    try {
      setUploading(true);
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        lastPostId,
        5,
        '1',
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
                : `No more jobs to display`,
          });
          return;
        }
        setLastPostId(result.data[result.data.length - 1].id);
        setDataPosted((prev: any) => {
          const array = [...prev, ...result.data];
          return sortData.sortDataByDate(newOld, array);
        });
      }
    } catch (error) {}
  };

  const handleShowDetail = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    posted: any,
  ) => {
    event.stopPropagation();

    setShowDetailPosted(true);
    setDetailPosted(posted);
  };

  const handleChange = (event: any) => {
    setnewOld(event.target.value);
    setDataPosted(sortData.sortDataByDate(event.target.value, dataPosted));
  };

  const handleHideDetail = () => {
    setShowDetailPosted(false);
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
        <div className="back-container">
          <Button
            className="back-button"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={handleHideDetail}
            style={{
              display: showDetailPosted ? 'block' : 'none',
            }}
          />
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '24px',
            }}
          >
            {languageRedux === 1
              ? 'Các công việc chưa đóng'
              : `Jobs haven't closed`}
          </Typography>
        </div>

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
            {languageRedux === 1 ? `Mới nhất` : `Newest`}
          </MenuItem>
          <MenuItem value="Cũ nhất">
            {languageRedux === 1 ? `Cũ nhất` : `Oldest`}
          </MenuItem>
        </TextField>
      </Box>

      {!showDetailPosted ? (
        <>
          {/* <Skeleton loading={loading} active> */}
          <Backdrop
            sx={{
              color: '#d4a650 ',
              backgroundColor: 'transparent',
              zIndex: (theme: any) => theme.zIndex.drawer + 1,
            }}
            open={loading}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {dataPosted?.length > 0 ? (
            <div className="history-post">
              <Grid container columns={{xs: 6, sm: 4, md: 12}}>
                {dataPosted?.map((posted: any, i: number) => (
                  <JobCardPostHistory
                    item={posted}
                    handleShowDetail={handleShowDetail}
                    isHide={true}
                    language={language}
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
                    backgroundColor: `#d4a650`,
                    marginBottom: '2rem',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    display: isVisible ? 'block' : 'none',
                  }}
                  loading={uploading}
                  onClick={handleAddItem}
                >
                  {languageRedux === 1 ? `Xem thêm` : `See more`}
                </Button>
              </Box>
            </div>
          ) : (
            <NoDataComponent />
          )}
          {/* </Skeleton> */}
        </>
      ) : (
        <DetailPosted detailPosted={detailPosted} />
      )}
    </>
  );
};

export default CardsPostedOpen;
