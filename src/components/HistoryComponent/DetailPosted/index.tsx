import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Card from '@mui/material/Card';
import { Box, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './styles.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import postsApi from '@/api/posts/postsApi';
import historyRecruiter from '@/api/history/historyRecruiter';
import JobCardDetailPostedHistory from '../JobCardDetailedHistory';

interface IDetailPosted {
  detailPosted: any;
}

const DetailPosted: React.FC<IDetailPosted> = (props) => {
  const { detailPosted } = props;
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const language = useSelector((state: RootState) => state.dataLanguage.languages);
  const [dataCandidates, setDadaCandidates] = useState<any>(null);
  const [status, setStatus] = useState(detailPosted?.status);
  const [post, setPost] = React.useState<any>();

  const getPostById = async () => {
    try {
      const result = await postsApi.getPostV3(
        detailPosted?.id,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setPost(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostById()
  }, [languageRedux])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statusCandidates = [
    {
      id: 1,
      statusId: 0,
      statusName: '',
      background: '#d4a650',
      position: '0%',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      padding: '0px',
    },
    {
      id: 2,
      statusId: 1,
      statusName: 'Đã xem',
      background: '#aaaaaa',
      position: '60%',
      borderRadius: '15px',
      width: 'unset',
      height: 'unset',
      padding: '4px 16px',
    },
    {
      id: 3,
      statusId: 2,
      statusName: 'Đã được duyệt',
      background: '#5cb265',
      position: '60%',
      borderRadius: '15px',
      width: 'unset',
      height: 'unset',
      padding: '4px 16px',
    },
    {
      id: 4,
      statusId: 3,
      statusName: 'Đã từ chối',
      background: '#BD3131',
      position: '60%',
      borderRadius: '15px',
      width: 'unset',
      height: 'unset',
      padding: '4px 16px',
    },
    {
      id: 5,
      statusId: 4,
      statusName: 'Đã tuyển ứng viên này',
      background: '#d4a650',
      position: '60%',
      borderRadius: '15px',
      width: 'unset',
      height: 'unset',
      padding: '4px 16px',
    },
  ];

  const getAllCandidates = async () => {
    try {
      const result = await historyRecruiter.GetAllApplicationsOfAJob(
        detailPosted?.post_id,
        5,
        null,
        languageRedux === 1 ? "vi" : "en",
      );

      if (result) {
        setDadaCandidates(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllCandidates();
  }, [languageRedux]);

  const handleClickCandidate = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    applicationId: number,
    postId: number,
    accountId: string,
  ) => {
    window.open(
      `/history-detail-candidate?post-id=${postId}&application_id=${applicationId}&accountId=${accountId}`,
    );
  };

  return (
    <div className="history-post">
      <JobCardDetailPostedHistory
        item={post}
        status={status}
        setStatus={setStatus}
        dataCandidates={dataCandidates}
        language={language}
        languageRedux={languageRedux}
      />
      <Box>
        <h3 style={{ margin: '12px 0' }}>
          {
            'Danh sách ứng viên'
          }
        </h3>
        {dataCandidates?.applications.map((candidate: any, index: number) => (
          <Card
            key={index}
            sx={{
              minWidth: '100%',
              display: 'flex',
              padding: '12px',
              cursor: 'pointer',
              '&:hover': {
                background: '#e5e5fb',
                transition: 'all 0.3s linear',
              },
              boxShadow: 'none',
              borderRadius: '5px',
              margin: '8px 0',
              background: `${candidate.application_status === 0 ? '#F3F8FB' : '#ffffff'
                }`,
            }}
            onClick={(e) =>
              handleClickCandidate(e, candidate.id, detailPosted?.id, candidate.account_id)
            }
          >
            <div className="image-cadidate_wrap">
              {candidate.avatar ? (
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="image-cadidate"
                />
              ) : (
                <div className="image-cadidate"></div>
              )}
            </div>
            <Box sx={{ marginLeft: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ marginLeft: '12px' }}
                >
                  {candidate.name}
                </Typography>

                {statusCandidates.map((statusCandidate, index) => {
                  if (
                    candidate?.application_status === statusCandidate.statusId
                  ) {
                    return (
                      <p
                        key={index}
                        style={{
                          background: `${statusCandidate.background}`,
                          padding: `${statusCandidate.padding}`,
                          borderRadius: `${statusCandidate.borderRadius}`,
                          color: '#ffffff',
                          right: `${statusCandidate.position}`,
                          width: `${statusCandidate.width}`,
                          height: `${statusCandidate.height}`,
                          marginLeft: '60px',
                          fontStyle: 'italic  ',
                        }}
                      >
                        {statusCandidate.statusName}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="item-candidate">
                <PersonIcon fontSize="small" className="icon-candidate" />
                <p>
                  {candidate.gender === 0 ?
                    'Nữ'
                    : 'Nam'} -{' '}
                  {moment(candidate.birthday).format('DD/MM/YYYY')}
                </p>
              </div>
              <div className="item-candidate">
                <LocationOnIcon fontSize="small" className="icon-candidate" />
                <p>{candidate.province_name}</p>
              </div>
              <div className="item-candidate">
                <BusinessCenterIcon
                  fontSize="small"
                  className="icon-candidate"
                />
                <p>
                  {
                    'Lĩnh vực quan tâm'
                  }{' '}
                  {candidate.categories.map((candid: any, index: number) => (
                    <span key={index}> {candid.child_category}, </span>
                  ))}
                </p>
              </div>
            </Box>
          </Card>
        ))}
        <Box
          sx={{
            margin: '12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dataCandidates?.length > 0 ? (
            <Button variant="contained">
              {
                language?.more
              }
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default DetailPosted;
