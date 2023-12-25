import React from 'react';

import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

import {Space, Tooltip} from 'antd';

import moment from 'moment';
import {DolaIcon, LocationHomeIcon, SaveIconFill} from '@/icons';

interface IitemNewJob {
  item: {
    id: number;
    post_id: Number;
    title: string;
    company_name: string;
    image: string;
    ward: string;
    district: string;
    province: string;
    end_time: number;
    start_time: number;
    salary_max: number;
    salary_min: number;
    salary_type: string;
    resource: {
      company_icon: string;
    };
    job_type: {
      job_type_name: string;
    };
    created_at_text: string;
    created_at: number;
    status: number;
    bookmarked: boolean;
    money_type_text: string;
  };
  handleDeleteBookmark: (event: any, index: number, bookmarkId: number) => any;
  index: number;
  language: any;
  languageRedux: any;
}

const JobCardSaveHistory: React.FC<IitemNewJob> = (props) => {
  const {language, languageRedux} = props;
  const [error, setError] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/post-detail/${id}`, '_parent');
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
          padding: '12px',
          cursor: 'pointer',
          margin: '10px 0',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
        }}
        onClick={(e) => {
          handleClickItem(e, props.item.id);
        }}
      >
        <ul className="div-card-post-left">
          <ImageListItem key={props.item.image} sx={{flex: 1, display: 'flex'}}>
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
                    color: '#575757',
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
                  }}
                >
                  {new Intl.NumberFormat('en-US').format(props.item.salary_min)}{' '}
                  {props?.item?.money_type_text}-{' '}
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
                    color: '#AAAAAA',
                    fontSize: 12,
                    fontStyle: 'italic',
                    fontWeight: '400',
                  }}
                >
                  {props.item.created_at_text}
                </p>
              </div>
            </div>
          </ImageListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '12px',
            }}
          >
            <p
              style={{
                color: '#001424',
                fontSize: 12,
                fontStyle: 'italic',
              }}
            >
              {language?.posted_on}{' '}
              {props.item?.created_at != null
                ? moment(props.item?.created_at).format('DD/MM/YYYY') +
                  ' ' +
                  moment(new Date(props.item?.created_at)).format('HH:mm')
                : 'Chưa cập nhật'}
            </p>
            {props.item?.status === 1 ? (
              <p
                style={{
                  background: '#d4a650',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '100px',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                Đang tuyển
              </p>
            ) : props.item?.status === 3 ? (
              <p
                style={{
                  background: '#aaaaaa',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '100px',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                Bài đăng đã đóng
              </p>
            ) : (
              <p
                style={{
                  background: '#aaaaaa',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  color: '#ffffff',
                  marginLeft: '100px',
                  fontStyle: 'italic',
                  fontSize: '12px',
                }}
              >
                Không chấp nhận
              </p>
            )}
          </Box>
        </ul>

        <Space
          style={{justifyContent: 'space-between'}}
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
                e.stopPropagation();
                props.handleDeleteBookmark(e, props.index, props.item.id);
              }}
            >
              <SaveIconFill width={24} height={24} />
            </div>
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
          <p style={{fontSize: 12, color: '#d4a650', fontWeight: 500}}>
            {props.item.job_type.job_type_name}
          </p>
        </Space>
      </Card>
    </>
  );
};

export default JobCardSaveHistory;
