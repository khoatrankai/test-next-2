import React, {useEffect, useState} from 'react';
import './style.scss';
import Grid from '@mui/material/Grid';
import {Button} from 'antd';
import {message} from 'antd';
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

interface ICardsPostedAll {
  setShowDetailPosted: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailPosted: boolean;
}

const CardsPostedAll: React.FC<ICardsPostedAll> = (props) => {
  const {setShowDetailPosted, showDetailPosted} = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [detailPosted, setDetailPosted] = React.useState<any>(null);
  const [dataPosted, setDataPosted] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newOld, setnewOld] = React.useState('Mới nhất');

  const [uploading, setUploading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(true);

  //   getData
  const getAllPosted = async (postID: number) => {
    try {
      const result = await historyRecruiter.GetInformationAndCandidatesCount(
        postID,
        10,
      '-1',
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
    // setCount(5)
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
        '-1',
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setUploading(false);
        if (result.data.length === 0) {
          setIsVisible(false);
          messageApi.open({
            type: 'error',
            content: language === 1 ? 'Đã hết công việc để hiển thị' : 'No more jobs to display',
          });
          return;
        }
        setLastPostId(result.data[result.data.length - 1].id);
        setDataPosted((prev: any) => {
          const array = [...prev, ...result.data];
          return sortData.sortDataByDate(newOld, array);
        });
      }
    } catch (error) {
      console.log(error);
    }
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
            {language === 1 ? 'Các công việc đã đăng tuyển' : 'Posted jobs'}
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
          <MenuItem value='Mới nhất'>{language === 1 ? 'Mới nhất' : 'Newest'}</MenuItem>
          <MenuItem value='Cũ nhất'>{language === 1 ? 'Cũ nhất' : 'Oldest'}</MenuItem>
        </TextField>
      </Box>

      {!showDetailPosted ? (
        <>
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
          {dataPosted?.length > 0 ? (
            <div className="history-post">
              <Grid container columns={{xs: 6, sm: 4, md: 12}}>
                {dataPosted?.map((posted: any, i: number) => (
                  <JobCardPostHistory
                    key={i}
                    item={posted}
                    handleShowDetail={handleShowDetail}
                    isHide={false}
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
                 
                  {language === 1 ? 'Xem thêm' : 'See more'}
                </Button>
              </Box>
            </div>
          ) : (
            <NoDataComponent />
          )}
        </>
      ) : (
        <DetailPosted detailPosted={detailPosted} />
      )}
    </>
  );
};

export default CardsPostedAll;
