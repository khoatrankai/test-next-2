import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import {useSelector} from 'react-redux';
import {getAnalytics, logEvent} from '@firebase/analytics';
import {RootState} from '@/redux/reducer';
import {DataLog, DataLogRecuiter} from '@/app/analytics/typeChart';
interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor?: string;
  backgroundColor?: string;
  tension: number;
  borderWidth?: number;
  hoverBackgroundColor?: string;
}

interface Datasets {
  [key: number]: Dataset[];
}

const Chartjs: React.FC<{
  dataLog: DataLog | undefined;
  dataLogRecruiter: DataLogRecuiter | undefined;
}> = ({...props}) => {
  const {dataLog, dataLogRecruiter} = props;
  const mixedChartRef = useRef<Chart | null>(null);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.profile.profile);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const analytics: any = getAnalytics();
  React.useEffect(() => {
    document.title =
      languageRedux === 1
        ? 'Tổng quan hoạt động'
        : languageRedux === 0
        ? 'Activity overview'
        : '활동 대시보드';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_hotJob' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const createChart = (dataLog: DataLog | DataLogRecuiter) => {
    if (!chartRef.current) return;
    const context = chartRef.current.getContext('2d');
    if (!context) return;
    // Destroy the existing chart if it exists
    if (mixedChartRef.current) {
      mixedChartRef.current.destroy();
    }
    const month = [
      languageRedux === 1
        ? 'Tháng 1'
        : languageRedux === 0
        ? 'January'
        : '1 월',
      languageRedux === 1
        ? 'Tháng 2'
        : languageRedux === 0
        ? 'February'
        : '2 월',
      languageRedux === 1 ? 'Tháng 3' : languageRedux === 0 ? 'March' : '3 월',
      languageRedux === 1 ? 'Tháng 4' : languageRedux === 0 ? 'April' : '4 월',
      languageRedux === 1 ? 'Tháng 5' : languageRedux === 0 ? 'May' : '5 월',
      languageRedux === 1 ? 'Tháng 6' : languageRedux === 0 ? 'June' : '6 월',
      languageRedux === 1 ? 'Tháng 7' : languageRedux === 0 ? 'July' : '7 월',
      languageRedux === 1 ? 'Tháng 8' : languageRedux === 0 ? 'August' : '8 월',
      languageRedux === 1
        ? 'Tháng 9'
        : languageRedux === 0
        ? 'September'
        : '9 월',
      languageRedux === 1
        ? 'Tháng 10'
        : languageRedux === 0
        ? 'October'
        : '10 월',
      languageRedux === 1
        ? 'Tháng 11'
        : languageRedux === 0
        ? 'November'
        : '11 월',
      languageRedux === 1
        ? 'Tháng 12'
        : languageRedux === 0
        ? 'December'
        : '12 월',
    ];

    const datasets: Datasets = {
      2023: [
        {
          label:
            profileV3.roleData === 0
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
          data:
            dataLog.type === 'Normal' && dataLog
              ? dataLog.applyLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : dataLog.type === 'Recuiter' && dataLog
              ? dataLog.applyLogs.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : [],
          fill: false,
          borderColor: 'rgba(13, 153, 255, 1)',
          backgroundColor: 'rgba(13, 153, 255, 1)',
          tension: 0.5,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(13, 153, 255, 1)',
        },
        {
          label:
            profileV3.roleData === 0
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
          data:
            dataLog.type === 'Normal' && dataLog
              ? dataLog.viewPostLogs?.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : dataLog.type === 'Recuiter' && dataLog
              ? dataLog.viewCandidateLogs?.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : [],
          fill: false,
          borderColor: 'rgba(52, 168, 83, 1)',
          backgroundColor: 'rgba(52, 168, 83, 1)',
          tension: 0.5,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)',
        },
        {
          label:
            profileV3.roleData === 0
              ? languageRedux === 1
                ? 'Lượt công ty xem hồ sơ'
                : languageRedux === 0
                ? 'Number of companies that viewed the profile'
                : '내 이력서를 본 회사 조회 수'
              : languageRedux === 1
              ? 'Ứng viên đã lưu'
              : languageRedux === 0
              ? 'Saved candidates'
              : '저장한 구직자',
          data:
            dataLog.type === 'Normal' && dataLog
              ? dataLog.savePostLogs?.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : dataLog.type === 'Recuiter' && dataLog
              ? dataLog.saveCandidateLogs?.activities.map(
                  (applyLog: any) => applyLog.count,
                )
              : [],
          fill: false,
          borderColor: 'rgba(251, 188, 4, 1)',
          backgroundColor: 'rgba(251, 188, 4, 1)',
          tension: 0.5,
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(251, 188, 4, 1)',
        },
      ],
      2022: [
        {
          label: 'Dataset 2022',
          data: [30, 45, 20, 60, 40, 35, 80],
          fill: false,
          hoverBackgroundColor: 'rgba(13, 153, 255, 1)',
          borderColor: 'rgba(13, 153, 255, 1)',
          backgroundColor: 'rgba(13, 153, 255, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2022',
          data: [23, 31, 41, 15, 51, 23, 12],
          fill: false,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)',
          borderColor: 'rgba(52, 168, 83, 1)',
          backgroundColor: 'rgba(52, 168, 83, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2022',
          data: [12, 32, 43, 21, 22, 23, 11],
          fill: false,
          hoverBackgroundColor: 'rgba(251, 188, 4, 1)',
          borderColor: 'rgba(251, 188, 4, 1)',
          backgroundColor: 'rgba(251, 188, 4, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
      ],
      2024: [
        {
          label: 'Dataset 2023',
          data: [32, 32, 11, 33, 61, 23, 12],
          fill: false,
          hoverBackgroundColor: 'rgba(13, 153, 255, 1)',
          borderColor: 'rgba(13, 153, 255, 1)',
          backgroundColor: 'rgba(13, 153, 255, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: 'Dataset 2023',
          data: [32, 43, 23, 33, 21, 32, 32],
          fill: false,
          hoverBackgroundColor: 'rgba(52, 168, 83, 1)',
          borderColor: 'rgba(52, 168, 83, 1)',
          backgroundColor: 'rgba(52, 168, 83, 1)',
          borderWidth: 1,
          tension: 0.5,
        },
      ],
    };

    mixedChartRef.current = new Chart(context, {
      type: 'line',
      data: {
        datasets: datasets[selectedYear],
        labels: month,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: 'x',
        scales: {
          x: {
            stacked: true,
          },
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  return `${label}: ${context.parsed.y}`;
                }
                return '';
              },
              title: (tooltipItems: any) => {
                return `${
                  languageRedux === 1
                    ? 'Kết quả'
                    : languageRedux === 0
                    ? 'Result'
                    : '결과'
                } ${tooltipItems[0].label}`;
              },
            },
            titleAlign: 'center',
          },
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
              pointStyle: 'rect',
              pointStyleWidth: 68,
            },
            position: 'bottom',
          },
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
      },
    });
  };

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.width = 600;
    chartRef.current.height = 300;

    if (dataLog) {
      createChart(dataLog);
    } else if (dataLogRecruiter) {
      createChart(dataLogRecruiter);
    }
  }, [selectedYear, dataLog, languageRedux, dataLogRecruiter]);
  return (
    <>
      <canvas ref={chartRef} style={{maxHeight: '400px'}}></canvas>
    </>
  );
};

export default Chartjs;
