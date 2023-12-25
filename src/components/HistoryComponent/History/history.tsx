import React, { useMemo, useCallback } from 'react';
import queryString from 'query-string';
import { Collapse } from 'antd';
import { Box } from '@mui/material';
import { RightOutlined } from '@ant-design/icons';
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import CardsPosted from '../CardsPosted';
import CardsApplied from '../CardsApplied/CardsApplied';
import CardsSavedJob from '../CardsSavedJob';
import CardsListBlog from '../CardsListBlog';
import CardListCandidate from '../CardListCandidate';
import { setCookie } from '@/cookies';
import RollTop from '@/components/RollTop';
import ShowCancleSave from '../ShowCancelSave';
import { useSrollContext } from "@/context/AppProvider";
const { Panel } = Collapse;

const HistoryPost = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const profile = useSelector((state: RootState) => state.profile.profile);
  const queryParams = queryString.parse(window.location.search);
  const hotjobtype = Number(queryParams['post']);
  const community_post = Number(queryParams['community_post']);
  const saved_jobs = Number(queryParams['saved_jobs']);
  const recruitment_post = queryParams['recruitment_post'];
  const candidate = Number(queryParams['candidate']);
  const { handleLoadHrefPage } = useSrollContext();
  const [activeChild, setActiveChild] = React.useState(
    hotjobtype === 2
      ? '2-1'
      : candidate === 4
      ? '4-0'
      : community_post === 31
      ? '3-1'
      : community_post === 30
      ? '3-0'
      : saved_jobs === 1
      ? '1-0'
      : recruitment_post === 'opening'
      ? '2-1'
      : recruitment_post === 'closed'
      ? '2-2'
      : '0-0',
  );
  const [ItemLeft, setItemLeft] = React.useState<null | number>(
    hotjobtype === 2
      ? 2
      : community_post === 31
      ? 3
      : community_post === 30
      ? 3
      : candidate === 4
      ? 4
      : saved_jobs === 1
      ? 1
      : 0,
  );
  const [showDetailPosted, setShowDetailPosted] =
    React.useState<boolean>(false);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const dataItem = [
    {
      id: 0,
      title:
        languageRedux === 1 ? 'Các công việc đã ứng tuyển' : 'Applied jobs',
      childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
    },
    {
      id: 1,
      title: languageRedux === 1 ? 'Các công việc đã lưu' : 'Saved jobs',
      childs: [languageRedux === 1 ? 'Tất cả' : 'All'],
    },
    {
      id: 2,
      title:
        languageRedux === 1 ? 'Các công việc đã đăng tuyển' : 'Posted jobs',
      childs: [
        languageRedux === 1 ? 'Tất cả' : 'All',
        languageRedux === 1 ? 'Các công việc chưa đóng' : 'Unclosed jobs',
        languageRedux === 1 ? 'Các công việc đã đóng' : 'Closed jobs',
      ],
    },
    {
      id: 3,
      title: languageRedux === 1 ? 'Danh sách bài viết' : 'List of articles',
      childs: [
        languageRedux === 1 ? 'Đã lưu' : 'Saved',
        languageRedux === 1 ? 'Bài viết bạn đã tạo' : 'Posts',
      ],
    },
    {
      id: 4,
      title: languageRedux === 1 ? 'Danh sách ứng viên' : 'List of candidates',
      childs: [
        languageRedux === 1 ? 'Tất cả' : 'All',
      ],
    },
  ];

  React.useEffect(() => {
    document.title =
      languageRedux === 1
        ? 'Lịch sử ứng tuyển/đăng tuyển'
        : 'Job application/posting history';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, language]);

  const CardsPost = useMemo(() => {
    if (ItemLeft === 2) {
      return (
        <CardsPosted
          activeChild={activeChild}
          setShowDetailPosted={setShowDetailPosted}
          showDetailPosted={showDetailPosted}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemLeft, activeChild, showDetailPosted, setShowDetailPosted]);

  const CardsApply = useMemo(() => {
    if (ItemLeft === 0) {
      return <CardsApplied activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const CardsSave = useMemo(() => {
    if (ItemLeft === 1) {
      return <CardsSavedJob activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const CardListBlog = useMemo(() => {
    if (ItemLeft === 3) {
      return <CardsListBlog activeChild={activeChild} />;
    }
    return null;
  }, [ItemLeft, activeChild]);


  const CardListCandidates = useMemo(() => {
    if (ItemLeft === 4) {
      return <CardListCandidate />;
    }
    return null;
  }, [ItemLeft, activeChild]);

  const handleChildClick = useCallback((childKey: string) => {
    setActiveChild(childKey);

    if (childKey === '2-0') setShowDetailPosted(false);
    if (childKey === '2-1') setShowDetailPosted(false);
    if (childKey === '2-2') setShowDetailPosted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSubTitle = useCallback((index: number) => {

    setItemLeft(index);
    setActiveChild(`${index}-0`);
    setShowDetailPosted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setCookie('fromHistory', '0', 365);
    if (hotjobtype === 2) {
      setItemLeft(2);
      setActiveChild('2-1');
      return;
    }
    if (community_post === 31) {
      setItemLeft(3);
      setActiveChild('3-1');
      return;
    }
    if (community_post === 30) {
      setItemLeft(3);
      setActiveChild('3-0');
      return;
    }
    if (saved_jobs === 1) {
      setItemLeft(1);
      setActiveChild('1-0');
      return;
    }
    if (recruitment_post === 'opening') {
      setItemLeft(2);
      setActiveChild('2-1');
      return;
    }
    if (recruitment_post === 'closed') {
      setItemLeft(2);
      setActiveChild('2-2');
      return;
    }
    if (candidate === 4) {
      setItemLeft(4);
      setActiveChild('4-0');
      return;
    }
    if (profile?.typeRoleData === 0) {
      setItemLeft(0);
      setActiveChild('0-0');
      return;
    } else {
      setItemLeft(2);
      setActiveChild('2-0');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    handleLoadHrefPage();

    if (!localStorage.getItem('accessToken')) window.open(`/`, '_parent');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="post-history">
      <div className="post-history_main">
        <Box
          sx={{ display: 'flex', gap: '12px' }}
          className="history-post-content"
        >
          <Box className="history-post_left">
            <Collapse
              defaultActiveKey={
                hotjobtype && hotjobtype === 2
                  ? ['2', '1']
                  : community_post && community_post === 31
                  ? ['3', '1']
                  : community_post && community_post === 30
                  ? ['3', '0']
                  : saved_jobs === 1
                  ? ['1', '0']
                  : candidate === 4
                  ? ['4', '0']
                  : profile?.typeRoleData === 0
                  ? ['0', '0']
                  : ['2', '0']
              }
              accordion
              bordered={false}
              ghost={true}
              className="history-post_left__collapse"
            >
              {dataItem.map((item: any, index: number) => {
                return (
                  <Panel
                    header={
                      <div
                        onClick={() => handleClickSubTitle(index)}
                        className={`${
                          ItemLeft === index ? 'activeItem' : ''
                        } panel-title_text`}
                      >
                        <RightOutlined style={{ fontSize: '12px' }} />
                        <span style={{ marginLeft: '8px' }}>{item.title}</span>
                      </div>
                    }
                    key={index}
                    className={`history-left_item`}
                    style={{
                      display:
                        profile?.typeRoleData === 0
                          ? item?.id === 2 || item.id === 4
                            ? 'none'
                            : 'block'
                          : item?.id === 0
                          ? 'none'
                          : 'block',
                    }}
                  >
                    {item.childs.map((child: string, idx: number) => (
                      <div
                        key={idx}
                        className={
                          activeChild === `${index}-${idx}`
                            ? 'active-child child-item'
                            : 'child-item'
                        }
                        onClick={() => {
                          handleChildClick(`${index}-${idx}`);
                        }}
                      >
                        {child}
                      </div>
                    ))}
                  </Panel>
                );
              })}
            </Collapse>
          </Box>

          <Box className="history-post_right">
            {CardsPost}
            {CardsApply}
            {CardsSave}
            {CardListBlog}
            {CardListCandidates}
          </Box>
        </Box>
      </div>
      <ShowCancleSave />
      <RollTop />
    </div>
  );
};

export default HistoryPost;
