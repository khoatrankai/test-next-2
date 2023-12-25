import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Skeleton } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Pagination, Autoplay, A11y } from "swiper";
import AppliedPostedJobCard from "./Components/AppliedPostedJobCard";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import bannersApi from "@/api/banner/apiBanner";
import historyApplicator from "@/api/history/historyApplicator";
import historyRecruiter from "@/api/history/historyRecruiter";
import ModalLogin from "../ModalLogin/ModalLogin";

const AppliedPostedJob: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [isLogined, setIslogined] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [appliedPostedJob, setAppliedPostedJob] = React.useState<any>([]);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [cvHijob, setCvHijob] = React.useState<any>([1]);
  const [banner, setBanner] = React.useState<any>([]);

  const getBannerRoleUser = async () => {
    try {
      const result = await bannersApi.getBannersApi(
        languageRedux === 1 ? "vi" : "en",
        null
      );
      if (result) {
        setBanner(result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBannerRoleUser();
  }, []);

  const handleClickItem = (
    event: any,
    id: number,
    type: number,
    total: number,
    api: string,
    query: any
  ) => {
    // const queyObj = query ? query[0] : undefined;
    // let keyOfQuery = Object && Object.keys(queyObj)[0];
    // let url =
    //   api.replace('/api', '') + '?' + keyOfQuery + '=' + queyObj[keyOfQuery];
    // localStorage.setItem('hotjobApi', url);
    // window.open(
    //   `/hotjobs?appliedPostedJob-id=${id}&appliedPostedJob-type=${type}&appliedPostedJob-total=${total}`,
    //   '_parent',
    // );
  };

  // handle close backdrop
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  const getAppliedPostedJobs = async () => {
    try {
      setLoading(true);
      const result =
        profile?.typeRoleData === 0
          ? await historyApplicator.getAllSubmitedApplied(
              null,
              10,
              1,
              languageRedux === 1 ? "vi" : "en"
            )
          : await historyRecruiter.GetInformationAndCandidatesCount(
              0,
              10,
              "1",
              languageRedux === 1 ? "vi" : "en"
            );
      if (result) {
        localStorage.setItem("numberAppliedPostedJobs", result.data.length);
        setLoading(false);
        console.log(result);
        setAppliedPostedJob(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    localStorage.getItem("accessToken") && getAppliedPostedJobs();
    localStorage.getItem("accessToken") && setIslogined(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, profile?.roleData]);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const slidesPerView = windowWidth <= 576 ? 1 : "auto";

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickHelpSearch = () => {};

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  if (localStorage.getItem("accessToken")) {
    return (
      <div className="flex justify-center w-full">
        <div className="max-w-6xl w-full overflow-hidden">
          <Box
            sx={{
              maxWidth: "fit",
              bgcolor: "background.paper",
              position: "relative",
              flexDirection: "column",
              justifyContent: "center",
              padding:
                profile?.roleData === 0 && appliedPostedJob.length !== 0
                  ? "1px 0 0 0"
                  : "1px 0 0 0",
            }}
            className="applied-posted-jobs-container"
            id="applied-posted-jobs-container"
          >
            <div
              className="advertisement-job-not-loging "
              style={{
                display: cvHijob.length !== 0 ? "flex" : "none",
                marginBottom: appliedPostedJob.length !== 0 ? "24px" : "0",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <div className="advertisement-job-not-loging-content">
                {profile.length !== 0 ? (
                  profile?.roleData === 0 ? (
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                      }}
                      pagination={{ clickable: true }}
                      modules={[Autoplay, Navigation, Pagination, A11y]}
                      className="banner-rescruit-swiper"
                      loop={true}
                      style={{ height: "100%" }}
                    >
                      {banner?.map((value: any, index: number) => {
                        if (value?.order === 1) {
                          return (
                            <SwiperSlide key={index}>
                              <img
                                onClick={() => {
                                  window.open(value?.redirect_url, "_parent");
                                }}
                                src={value?.image}
                                alt=""
                              />
                            </SwiperSlide>
                          );
                        } else {
                          return <React.Fragment key={index}></React.Fragment>;
                        }
                      })}
                    </Swiper>
                  ) : (
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                      }}
                      pagination={true}
                      modules={[Autoplay, Navigation, Pagination]}
                      className="banner-rescruit-swiper"
                      loop={true}
                    >
                      {banner?.map((value: any, index: number) => {
                        if (value?.order === 2) {
                          return (
                            <SwiperSlide key={index}>
                              <img
                                onClick={() => {
                                  window.open(value?.redirect_url, "_parent");
                                }}
                                src={value?.image}
                                alt=""
                              />
                            </SwiperSlide>
                          );
                        } else {
                          return <React.Fragment key={index}></React.Fragment>;
                        }
                      })}
                    </Swiper>
                  )
                ) : (
                  <Skeleton.Button
                    style={{ height: "301px" }}
                    active={true}
                    block={true}
                  />
                )}
              </div>
            </div>
            <Skeleton loading={loading} active>
              {appliedPostedJob.length !== 0 &&
              localStorage.getItem("accessToken") ? (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                  }}
                  className="font-bold text-2xl"
                >
                  <h2>
                    {profile?.typeRoleData === 0
                      ? languageRedux === 1
                        ? "Công việc đã ứng tuyển"
                        : "Applied Job"
                      : languageRedux === 1
                      ? "Công việc đã tuyển"
                      : "Posted Job"}
                  </h2>
                  <div className="help-search" onClick={handleClickHelpSearch}>
                    {/* <QuestionMarkIcon /> */}
                    {/* <div className="login__hover__container">
                      <div className="login__hover">
                        <div className="login__hover__p">
                          <p>
                            {languageRedux === 1
                              ? `Công việc đã ứng tuyển/Đăng tuyển sẽ hiển thị trạng thái
                        trong vòng 30 ngày, sau 30 ngày bạn có thể kiểm tra các
                        công việc đã Ứng tuyển/Đăng tuyển trong lịch sử.`
                              : `Applied/Posted Jobs will show the status within 30 days, after 30 days you can check the applied/Posted jobs status in History.`}
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <Swiper
                navigation={true}
                slidesPerView={slidesPerView}
                spaceBetween={24}
                modules={[Mousewheel, Navigation, Pagination]}
                className="applied-posted-jobs_swiper"
                style={{
                  display:
                    isLogined && appliedPostedJob.length > 0 ? "flex" : "none",
                }}
              >
                {appliedPostedJob?.map((item: any, index: number) => (
                  <SwiperSlide
                    key={index}
                    onClick={(event) => {
                      handleClickItem(
                        event,
                        item.id,
                        item.type,
                        item.count,
                        item.api,
                        item.query
                      );
                    }}
                  >
                    <AppliedPostedJobCard
                      item={item}
                      type={
                        profile?.typeRoleData === 0 ? "application" : "post"
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Skeleton>

            <Backdrop
              sx={{
                color: "#0d99ff ",
                backgroundColor: "transparent",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={openBackdrop}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <ModalLogin
              isOpen={openModalLogin}
              handleToggleModal={handleToggleModal}
            />
          </Box>
        </div>
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 480 },
          bgcolor: "background.paper",
          position: "relative",
          paddingBottom: "24px",
          flexDirection: "column",
        }}
        className="applied-posted-jobs-container"
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="banner-rescruit-swiper"
          loop={true}
        >
          {banner?.map((value: any, index: number) => {
            if (value?.order === 1) {
              return (
                <SwiperSlide key={index}>
                  <img
                    onClick={() => {
                      window.open(value?.redirect_url, "_parent");
                    }}
                    src={value?.image}
                    alt=""
                  />
                </SwiperSlide>
              );
            } else {
              return <React.Fragment key={index}></React.Fragment>;
            }
          })}
        </Swiper>
        <ModalLogin
          isOpen={openModalLogin}
          handleToggleModal={handleToggleModal}
        />
      </Box>
    );
  }
};

export default AppliedPostedJob;
