import React from 'react';
import './style.scss';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import { Space, Tooltip } from 'antd';
import moment from 'moment';
import { DolaIcon, LocationHomeIcon } from '@/icons';
import SubIcon from '../CardsPosted/SubIcon';


interface IitemNewJob {
  item: any;
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  dataCandidates: any;
  language: any;
  languageRedux: any;
}

const JobCardDetailPostedHistory: React.FC<IitemNewJob> = (props) => {
  const { language, languageRedux } = props;

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          gap: '15px',
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
      >
        <div className="detail-history-top">
          <ul className="div-card-post-left">
            <ImageListItem
              key={props.item?.image}
              sx={{ flex: 1, display: 'flex' }}
            >
              <img
                src={`${props.item?.image}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${props.item?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={props.item?.title}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: 10,
                }}
              />
              <div className="div-card-post-left_info">
                {' '}
                <Tooltip placement="top" title={props.item?.title}>
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
                <Tooltip
                  placement="top"
                  title={props.item?.postCompanyInformation?.name}
                >
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
                    {props?.item?.companyName}
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
                    {`${props.item?.location?.district?.fullName}, 
                    ${props.item?.location?.district?.province?.fullName}`}
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
                    {new Intl.NumberFormat('en-US').format(
                      props.item?.salaryMin,
                    )}{' '}
                    {/* {props.item?.money_type_text} */}-{' '}
                    {new Intl.NumberFormat('en-US').format(
                      props.item?.salaryMax,
                    ) + `/${props.item?.postSalaryType?.fullName}`}
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
                      fontSize: '12px',
                      fontStyle: 'italic',
                      fontWeight: '400',
                    }}
                  >
                    {props.item?.createdAtText}
                  </p>
                </div>
              </div>
            </ImageListItem>
          </ul>
          <Space direction="vertical" align="center">
            <SubIcon
              postId={props.item?.id}
              setStatus={props.setStatus}
              status={props.status}
              language={language}
              languageRedux={languageRedux}
            />
          </Space>
        </div>
        <Box
          className="detail-history-bottom"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: '#001424',
              fontSize: '12px',
              fontStyle: 'italic',
              fontWeight: '400',
            }}
          >
            {'Đã đăng vào:'}{' '}
            {props.item?.createdAt != null
              ? `${moment(props.item?.createdAt).format('DD/MM/YYYY') +
              moment(new Date(props.item?.createdAt)).format('HH:mm')
              }`
              : 'Chưa cập nhật'}
          </p>
          <p
            style={{
              margin: '0 24px',
              background: '#d4a650',
              padding: '4px 12px',
              borderRadius: '15px',
              color: '#ffffff',
              fontSize: '12px',
            }}
          >
            {`${props.dataCandidates?.applications.length}
            ${'Chưa có đơn ứng tuyển'}`}
          </p>

          {props.status === 1 ? (
            <p
              style={{
                background: '#5CB265',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
                fontSize: '12px',
              }}
            >
              {'Đang tuyển'}
            </p>
          ) : props.status === 3 ? (
            <p
              style={{
                background: '#aaaaaa',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
                fontSize: '12px',
              }}
            >
              {'Bài đăng đã đóng'}
            </p>
          ) : (
            <p
              style={{
                background: '#aaaaaa',
                padding: '4px 16px',
                borderRadius: '15px',
                color: '#ffffff',
                fontSize: '12px',
              }}
            >
              {'Không chấp nhận'}
            </p>
          )}
        </Box>
      </Card>
    </>
  );
};

export default JobCardDetailPostedHistory;
