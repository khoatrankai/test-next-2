import React from 'react';
import {useDispatch} from 'react-redux';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import {Space, Tooltip} from 'antd';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducer';
import {setDataCheckPost} from '@/redux/reducer/checkPost';
import {BackIcon, BagHomeIcon, ClockIcon, LocationHomeIcon} from '@/icons';

const AppliedPostedJobCard: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);
  const language = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleClickItem = async (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
    type: string,
  ) => {
    if (type === 'application') {
      window.open(`/post-detail/${id}`, '_blank');
    } else {
      window.open(`/history?post=2`, '_parent');
      await dispatch<any>(setDataCheckPost(props.item));
    }
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          cursor: 'pointer',
          gap: '8px',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
        }}
        className="applied-posted-card"
        onClick={(e) => {
          handleClickItem(e, props.item.post_id, props.type);
        }}
      >
        <div
          style={{display: props.type === 'post' ? 'block' : 'none'}}
          className="applied-posted-card_bag"
        >
          <BagHomeIcon width={24} height={24} />
        </div>
        <div className="applied-posted-card_top">
          <ImageListItem
            key={props.item.image}
            sx={{
              flex: 1,
              display: 'flex',
              width: '80px !important',
              height: '80px !important',
              minWidth: '80px',
              minHeight: '80px',
            }}
          >
            <img
              src={`${props.item.image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item.title}
              style={{
                width: '80px !important',
                height: '80px !important',
                borderRadius: 10,
              }}
            />
          </ImageListItem>
          <div className="div-card-post-info">
            <div className="div-card-post-info_left">
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
                  }}
                >
                  {props?.item?.company_name}
                </Typography>
              </Tooltip>
              <div
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
                  }}
                >
                  {`${props.item.district}, ${props.item.province}`}
                </Typography>
              </div>
              <div
                style={{
                  display: props.item.start_time ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <ClockIcon />
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
                  }}
                >
                  {new Date(props.item.start_time).toLocaleDateString('en-GB')}-
                  {new Date(props.item.end_time).toLocaleDateString('en-GB')}
                </Typography>
              </div>
            </div>
            <Space
              style={{
                justifyContent: 'space-between',
                display: props.type === 'application' ? 'flex' : 'none',
              }}
              direction="vertical"
              align="center"
              className="div-cardApplied-post-right"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div>
                  {!error && (
                    <img
                      className="img-resource-company"
                      src={
                        props.item.resource.company_icon
                          ? props.item.resource.company_icon
                          : ''
                      }
                      alt="ảnh"
                      onError={handleImageError}
                    />
                  )}
                </div>
              </div>
              <p style={{fontSize: 12, fontWeight: 500, color: '#d4a650'}}>
                {props.item.job_type.job_type_name}
              </p>
            </Space>
          </div>
        </div>
        <div className="applied-posted-card_bottom">
          <div className="applied-posted-card_date">
            <span
              style={{
                display: props.type === 'application' ? 'block' : 'none',
                fontSize: '12px',
              }}
            >
              {language === 1 ? 'Đã nộp vào' : 'Submitted in'}
              &nbsp;
              {new Date(props.item.created_at).toLocaleDateString('en-GB')}
              ,&nbsp;
              {moment(new Date(props.item.created_at)).format('HH:mm')}
            </span>
            <span
              style={{
                display: props.type === 'post' ? 'block' : 'none',
                fontSize: '12px',
              }}
            >
              <strong
                style={{
                  color: '#0d99ff',
                  fontSize: '12px',
                }}
              >
                {props.item.num_of_application}
              </strong>
              &nbsp;
              {language === 1 ? 'Ứng viên đã nộp hồ sơ' : 'Candidates applied'}
            </span>
          </div>
          <div
            style={{
              display: props.type === 'application' ? 'flex' : 'none',
              backgroundColor:
                props.item.application_status === 1
                  ? 'rgba(220, 220, 220, 1)'
                  : props.item.application_status === 2
                  ? '#d4a650'
                  : props.item.application_status === 3
                  ? 'rgba(189, 49, 49, 1)'
                  : '#d4a650',
              color:
                props.item.application_status === 1
                  ? '#575757'
                  : 'rgba(255, 255, 255, 1)',
              fontSize: '12px',
            }}
            className="button-approved"
          >
            {props.item.application_status === 1
              ? language
                ? 'Đã ứng tuyển'
                : 'Have applied'
              : props.item.application_status === 2
              ? language === 1
                ? 'Đã được duyệt'
                : 'Approved'
              : props.item.application_status === 3
              ? language === 1
                ? 'Từ chối'
                : 'Rejected'
              : language === 1
              ? 'Đã được tuyển'
              : 'Recruited'}
          </div>
          <div
            style={{display: props.type === 'post' ? 'flex' : 'none'}}
            className="button-check"
          >
            {(language === 1) ? 'Kiểm tra ngay': 'Check now'}
            <div className="icon">
              <BackIcon fill="white" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AppliedPostedJobCard;
