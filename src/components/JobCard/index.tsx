import React from 'react';
import{ useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './style.scss';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import { Space, Tooltip } from 'antd';
import { DolaIcon, LocationHomeIcon, SaveIconFill, SaveIconOutline } from '@/icons';
import bookMarkApi from '@/api/bookmarks/bookMarkApi';
import { setAlertCancleSave, setAlertSave } from '@/redux/reducer/alertReducer';

interface Iprops {
  item?: any;
}

const JobCard: React.FC<Iprops> = (props) => {

  const dispatch = useDispatch();
  const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (location.pathname === '/post-detail') {
      window.open(`/post-detail/${id}`, '_parent');
    } else {
      window.open(`/post-detail/${id}`, '_blank');
    }
  };

  const handleImageError = () => {
    setError(true);
  };

  if (props) {
    return (
      <>
        {/* <ModalLogin
          openModalLogin={openModalLogin}
          setOpenModalLogin={setOpenModalLogin}
        /> */}
        <Card
          sx={{
            position: 'relative',
            minWidth: '100%',
            display: 'flex',
            padding: '12px',
            cursor: 'pointer',
            '&:hover': {
              background: '#E7E7ED',
              transition: 'all 0.3s linear',
            },
            borderRadius: '12px',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            background: '#ffffff',
            overlow: 'unset',
            boxShadow:
              '0px 2px 1px -1px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0)',
          }}
          onClick={(e) => {
            handleClickItem(e, props.item.id);
          }}
        >
          <ul className="div-card-post-left">
            <ImageListItem
              key={props.item.image}
              sx={{ flex: 1, display: 'flex' }}
            >
              <img
                src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${props.item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={props.item.title}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: 10,
                }}
              />
              <div className="div-card-post-left_info">
                {' '}
                <Tooltip placement="top" title={props.item.title}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: '16px',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontWeight: '700',
                      lineheight: '20px',
                      color: '#000000',
                      fontFamily: "'Roboto', -apple-system, sans-serif",
                    }}
                  >
                    {props?.item?.title}
                  </Typography>
                </Tooltip>
                <Tooltip placement="top" title={props.item.company_name}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontWeight: '400',
                      lineheight: '16px',
                      color: '#575757',
                      fontFamily: "'Roboto', -apple-system, sans-serif",
                    }}
                  >
                    {props?.item?.company_name}
                  </Typography>
                </Tooltip>
                <div
                  className="text-card-post-left_info"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <LocationHomeIcon />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      marginLeft: '4px',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#000000',
                      fontFamily: "'Roboto', -apple-system, sans-serif",
                    }}
                  >
                    {`${props.item.district}, ${props.item.province}`}
                  </Typography>
                </div>
                <div
                  className="text-card-post-left_info"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <DolaIcon />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'nowrap',
                      width: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      marginLeft: '4px',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#000000',
                      fontFamily: "'Roboto', -apple-system, sans-serif",
                    }}
                  >
                    {new Intl.NumberFormat('en-US').format(
                      props.item.salary_min,
                    )}{' '}
                    {props?.item?.money_type_text} -{' '}
                    {new Intl.NumberFormat('en-US').format(
                      props.item.salary_max,
                    ) +
                      ` ${props?.item?.money_type_text}` +
                      `/${props.item.salary_type}`}
                  </Typography>
                </div>
                <div
                  style={{
                    marginTop: 5,
                  }}
                >
                  <p
                    style={{
                      color: '#575757',
                      fontSize: 12,
                      fontStyle: 'italic',
                      fontWeight: '400',
                      fontFamily: "'Roboto', -apple-system, sans-serif",
                    }}
                  >
                    {props.item.created_at_text}
                  </p>
                </div>
              </div>
            </ImageListItem>
          </ul>

          <Space
            style={{ justifyContent: 'space-between' }}
            direction="vertical"
            align="center"
            className="div-card-post-right"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <div
                onClick={async (e) => {
                  try {
                    e.stopPropagation();
                    // console.log('props.item, ', props.item);

                    if (!localStorage.getItem('accessToken')) {
                      setOpenModalLogin(true);
                      return;
                    }
                    if (props.item.bookmarked) {
                      const result = await bookMarkApi.deleteBookMark(
                        props.item.id,
                      );
                      props.item.bookmarked = false;
                      if (result) {
                        setCheckBookMark(!checkBookMark);
                        dispatch<any>(setAlertCancleSave(true));
                      }
                    } else {
                      const result = await bookMarkApi.createBookMark(
                        props.item.id,
                      );
                      props.item.bookmarked = true;
                      if (result) {
                        dispatch<any>(setAlertSave(true));
                        setCheckBookMark(!checkBookMark);
                      }
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {props.item.bookmarked ? (
                  <SaveIconFill width={24} height={24} />
                ) : (
                  <SaveIconOutline width={24} height={24} />
                )}
              </div>
              <div>
                {props.item.resource.company_icon ? (
                  <img
                    className="img-resource-company"
                    src={
                      props.item.resource.company_icon
                        ? props.item.resource.company_icon
                        : ''
                    }
                    alt="ảnh"
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <p
              style={{
                fontSize: 12,
                color: '#d4a650',
                fontWeight: 500,
                fontFamily: "'Roboto', -apple-system, sans-serif",
              }}
            >
              {props.item.job_type.job_type_name}
            </p>
          </Space>
        </Card>
      </>
    );
  } else {
    return <></>;
  }
};

export default JobCard;
