import React from 'react';
import { Col, Row } from 'antd';
import styles from './style.module.scss';
import './style.scss';
import { useSelector } from 'react-redux';
import { PropItemValue } from '../typeChart';
import { Link } from 'react-router-dom';
import { RootState } from '@/redux/reducer';
import { BagChart, ChartCompanySave, ChartStar, EyeChart, RightChart } from '@/icons';
import { DataLog, DataLogRecuiter } from '@/app/analytics/typeChart';
import CustomSkeleton from '@/components/CustomSkeleton';


const Box: React.FC<{
  ItemValue: PropItemValue;
}> = ({ ...props }) => {
  const { ItemValue } = props;
  return (
    <Col span={4} className={styles.col}>
      <div className={`${styles.col_left} col_left__itemsChart`}>
        {ItemValue?.icon}
      </div>
      <div className={styles.col_right}>
        <div className={styles.col_right__top}>
          <span
            className={
              ItemValue?.id === 3
                ? styles.col_right__topValue3
                : ItemValue?.id === 2
                ? styles.col_right__topValue2
                : styles.col_right__topValue1
            }
          >
            {ItemValue ? ItemValue?.total : 0}
          </span>
          {/* {ItemValue.path !== '' ? (
            <Link
              className={styles.border_button__right}
              to={ItemValue?.path}
              target={`${ItemValue.path === '' ? '_self' : '_blank'}`}
            >
              <RightChart />
            </Link>
          ) : (
            <></>
          )} */}
        </div>
        <div className={styles.col_right__bottom}>
          <p className={styles.col_right__bottomText}>{ItemValue?.title}</p>
        </div>
      </div>
    </Col>
  );
};

const ItemsChart: React.FC<{
  dataLog: DataLog | undefined;
  dataLogRecruiter: DataLogRecuiter | undefined;
}> = (data) => {
  const { dataLog , dataLogRecruiter } = data;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const elements: React.ReactNode[] = Array.from({ length: 3 }, (_, index) => (
    <React.Fragment key={index} />
  ));

  const ItemValue: PropItemValue[] = [
    {
      id: 1,
      title: dataLog 
        ? languageRedux === 1
          ? 'Việc làm đã ứng tuyển'
          : languageRedux === 0
          ? 'Applied job'
          : '지원한 채용공고'
        : languageRedux === 1
        ? 'Ứng viên đã tuyển dụng'
        : languageRedux === 0
        ? 'Recruited candidates'
        : '지원한 구직자',
      icon: <BagChart />,
      total: dataLog
        ? dataLog?.applyLogs.total
        : dataLogRecruiter?.applyLogs.total,
      path: dataLog
        ? '/history'
        : 
          '',
    },
    {
      id: 2,
      title: dataLog
        ? languageRedux === 1
          ? 'Việc làm đã xem'
          : languageRedux === 0
          ? 'Viewed job'
          : '본 채용공고'
        : languageRedux === 1
        ? 'Ứng viên đã xem'
        : languageRedux === 0
        ? 'Viewed candidates'
        : '본 구지자',
      icon: <EyeChart />,
      total: dataLog
        ? dataLog?.viewPostLogs?.total
        : dataLogRecruiter?.viewCandidateLogs?.total,
      path: dataLog
        ? 
          ''
        : 
          '',
    },
    {
      id: 3,
      title: dataLog
        ? languageRedux === 1
          ? 'Việc làm đã lưu'
          : languageRedux === 0
          ? 'Saved jobs'
          : '저장된 작업'
        : languageRedux === 1
        ? 'Ứng viên đã lưu'
        : languageRedux === 0
        ? 'Saved candidates'
        : '저장한 구직자',
      icon: dataLog ? <ChartCompanySave /> : <ChartStar />,
      total: dataLog
        ? dataLog?.savePostLogs?.total
        : dataLogRecruiter?.saveCandidateLogs?.total,
      path: dataLog
        ? 
          '/history?saved_jobs=1'
        : '/history?candidate=4',
    },
  ];

  return (
    <Row className={styles.row} align="top">
      {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
        ? ItemValue.map((value, index) => {
            return <Box key={index} ItemValue={value} />;
          })
        : elements.map((value, index: number) => (
            <CustomSkeleton key={index} />
          ))}
    </Row>
  );
};

export default ItemsChart;
