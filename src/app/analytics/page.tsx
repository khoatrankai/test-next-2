'use client';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

//@ts-ignore
import styles from './style.module.scss';
import { DataLog, DataLogRecuiter } from './typeChart';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import profileApi from '@/api/profiles/profileApi';
import Chartjs from '@/components/LogChartComponent/Chartjs';
import ItemsChart from '@/components/LogChartComponent/ItemsChart';
import ItemsOtherChart from '@/components/LogChartComponent/ItemsOtherChart';
import CustomSkeleton, { ImageChangeSkeleton } from '@/components/CustomSkeleton';
import { useSrollContext } from '@/context/AppProvider';


const LogChart = () => {
  const [dataLog, setDataLog] = useState<DataLog | undefined>(undefined);
  const [dataLogRecruiter, setDataLogRecruiter] = useState<
    DataLogRecuiter | undefined
  >(undefined);
  const {handleLoadHrefPage} = useSrollContext();
  useEffect(() => {
    handleLoadHrefPage();
  }, []);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.profile.profile,
  );

  const elements: React.ReactNode[] = Array.from({ length: 3 }, (_, index) => (
    <React.Fragment key={index} />
  ));
  const dataChart = async () => {
    const result = await profileApi.activityLog();
    if (result) {
      setDataLog({ type: 'Normal', ...result.data });
      setDataLogRecruiter(undefined);
    }
  };

  const dataChartRecruiter = async () => {
    const result = await profileApi.activityLogRecruiter();
    if (result) {
      setDataLogRecruiter({ type: 'Recuiter', ...result.data });
      setDataLog(undefined);
    }
  };

  useEffect(() => {
    if (profileV3 && profileV3.typeRoleData === 0) {
      dataChart();
    } else {
      dataChartRecruiter();
    }
  }, []);

  return (
    <div className={styles.container_chart}>
      <div className={styles.chart}>
        <div className={styles.chart_itemsChart}>
          <h3 className={styles.title_chart}>
            {languageRedux === 1
              ? 'Tổng quan hoạt động'
              : languageRedux === 0
              ? 'Activity overview'
              : '활동 대시보드'}
          </h3>

          {dataLog === undefined ? (
            <ItemsChart dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : dataLogRecruiter ? (
            <ItemsChart dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : (
            <Row className={styles.row}>
              {elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
            </Row>
          )}
        </div>
        <div className={styles.chart}>
          {dataLog ? (
            <Chartjs dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : dataLogRecruiter ? (
            <Chartjs dataLog={dataLog} dataLogRecruiter={dataLogRecruiter} />
          ) : (
            <div
              style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #aaa',
                borderRadius: '12px',
                backgroundColor: '#edebeb',
              }}
            >
              <ImageChangeSkeleton />
            </div>
          )}
        </div>
        <div className={styles.chart_itemsCompanyCareChart}>
          <ItemsOtherChart
            dataLog={dataLog}
            dataLogRecruiter={dataLogRecruiter}
          />
        </div>
      </div>
    </div>
  );
};

export default LogChart;
