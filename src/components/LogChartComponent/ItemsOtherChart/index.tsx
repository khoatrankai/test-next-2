"use client";
import React from "react";
import { Col, Row } from "antd";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { PropItemOther, PropItemValue } from "../typeChart";
import { Link } from "react-router-dom";
import { RootState } from "@/redux/reducer";
import { DataLog, DataLogRecuiter } from "@/app/analytics/typeChart";
import {
  ChartCompanySave,
  ChartCompanyView,
  ChartPerson,
  ChartPostCreate,
  ChartPostSave,
  RightChart,
  SearchedChart,
} from "@/icons";
import CustomSkeleton from "@/components/CustomSkeleton";

const ItemsOtherChart: React.FC<{
  dataLog: DataLog | undefined;
  dataLogRecruiter: DataLogRecuiter | undefined;
}> = ({ ...props }) => {
  const { dataLog, dataLogRecruiter } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );

  const elements: React.ReactNode[] = Array.from({ length: 2 }, (_, index) => (
    <React.Fragment key={index} />
  ));

  const itemsOther: PropItemOther = {
    otherTop: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? "Lượt công ty lưu hồ sơ"
            : "Number of companies saved the profile"
          : languageRedux === 1
          ? "Lượt ứng viên xem công ty"
          : "Number of candidates viewed the company",
        icon: dataLog ? <ChartCompanyView /> : <ChartPerson />,
        total: dataLog
          ? dataLog?.saveYourProfileLogs
          : dataLogRecruiter?.viewYourCompanyLogs,
        path: dataLog ? "" : "",
      },
      {
        id: 2,
        title: dataLog
          ? languageRedux === 1
            ? "Lượt công ty xem hồ sơ"
            : "Number of companies that viewed the profile"
          : languageRedux === 1
          ? "Lượt ứng viên theo dõi công ty"
          : "Number of candidates following the company",

        icon: dataLog ? <SearchedChart /> : <ChartCompanySave />,
        total: dataLog
          ? dataLog?.viewProfileLogs
          : dataLogRecruiter?.saveYourCompanyLogs,
        path: dataLog ? "" : "",
      },
    ],
    otherMid: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? "Việc làm đã tìm kiếm"
            : "Job searched"
          : "",
        icon: <SearchedChart />,
        total: dataLog?.searchLogs,
        path: "",
      },
    ],
    otherBottom: [
      {
        id: 1,
        title: dataLog
          ? languageRedux === 1
            ? "Bài viết đã lưu"
            : "Saved article"
          : languageRedux === 1
          ? "Bài viết đã lưu"
          : "Saved article",
        icon: <ChartPostSave />,
        total: dataLog
          ? dataLog?.saveCommunityLogs
          : dataLogRecruiter?.saveCommunityLogs,
        path: dataLog
          ? "/history?community_post=30"
          : "/history?community_post=30",
      },
      {
        id: 2,
        title: dataLog
          ? languageRedux === 1
            ? "Bài viết đã tạo"
            : "Article created"
          : languageRedux === 1
          ? "Bài viết đã tạo"
          : "Article created",
        icon: <ChartPostCreate />,
        total: dataLog
          ? dataLog?.createCommunityLogs
          : dataLogRecruiter?.createCommunityLogs,
        path: dataLog
          ? "/history?community_post=31"
          : "/history?community_post=31",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap_row}>
        <h3 className={styles.title_chart}>
          {dataLog
            ? languageRedux === 1
              ? "Công ty quan tâm đến bạn"
              : "The company cares about you"
            : languageRedux === 1
            ? "Ứng viên theo dõi công ty của bạn"
            : "Candidates follow your company"}
        </h3>
        <Row className={styles.row} align="top">
          {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
            ? itemsOther.otherTop.map((other: PropItemValue) => (
                <Col span={6} className={styles.col} key={""}>
                  <div className={`${styles.col_left} col_left__itemsChart`}>
                    {other.icon}
                  </div>
                  <div className={styles.col_right}>
                    <div className={styles.col_right__top}>
                      <span className={styles.col_right__topValue1}>
                        {other.total}
                      </span>
                    </div>
                    <div className={styles.col_right__bottom}>
                      <p className={styles.col_right__bottomText}>
                        {other.title}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            : elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
        </Row>
      </div>
      {dataLog && (
        <div className={styles.wrap_row}>
          <h3 className={styles.title_chart}>
            {languageRedux === 1 ? "Tìm kiếm công việc" : "Job Search"}
          </h3>
          <Row className={styles.row} align="top">
            {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
              ? itemsOther.otherMid.map(
                  (other: PropItemValue, index: number) => (
                    <Col
                      key={""}
                      span={6}
                      className={styles.col}
                      pull={index === 1 ? 0 : 12}
                      offset={index === 1 ? 0 : 12}
                    >
                      <div
                        className={`${styles.col_left} col_left__itemsChart`}
                      >
                        {other.icon}
                      </div>
                      <div className={styles.col_right}>
                        <div className={styles.col_right__top}>
                          <span className={styles.col_right__topValue1}>
                            {other.total}
                          </span>
                        </div>
                        <div className={styles.col_right__bottom}>
                          <p className={styles.col_right__bottomText}>
                            {other.title}
                          </p>
                        </div>
                      </div>
                    </Col>
                  )
                )
              : elements.map((value, index: number) => (
                  <CustomSkeleton key={index} />
                ))}
          </Row>
        </div>
      )}
      <div className={styles.wrap_row}>
        <h3 className={styles.title_chart}>
          {languageRedux === 1 ? "Câu chuyện việc làm" : "Job story"}
        </h3>
        <Row className={styles.row} align="top">
          {(dataLog && !dataLogRecruiter) || (!dataLog && dataLogRecruiter)
            ? itemsOther.otherBottom.map((other: PropItemValue) => (
                <Col span={6} className={styles.col} key={""}>
                  <div className={`${styles.col_left} col_left__itemsChart`}>
                    {other.icon}
                  </div>
                  <div className={styles.col_right}>
                    <div className={styles.col_right__top}>
                      <span className={styles.col_right__topValue1}>
                        {other.total}
                      </span>
                      {/* <Link
                        className={styles.border_button__right}
                        to={other.path}
                        target={`${other.path === '' ? '_self' : '_blank'}`}
                      >
                        <RightChart />
                      </Link> */}
                    </div>
                    <div className={styles.col_right__bottom}>
                      <p className={styles.col_right__bottomText}>
                        {other.title}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            : elements.map((value, index: number) => (
                <CustomSkeleton key={index} />
              ))}
        </Row>
      </div>
    </div>
  );
};

export default ItemsOtherChart;
