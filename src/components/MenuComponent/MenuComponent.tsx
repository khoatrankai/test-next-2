"use client";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import "./MenuComponent.scss";
import { useState, useEffect } from "react";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { useSrollContext } from "@/context/AppProvider";
import FilterComponent from "../FilterComponent/FilterComponent";
import { getCookie, setCookie } from "@/cookies";
import jobApi from "../../api/job/jobApi";
import numeral from "numeral";
import ModalLogin from "../ModalLogin/ModalLogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, FormControlLabel, Typography } from "@mui/material";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BusinessIcon from "@mui/icons-material/Business";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import {
  BellIcon,
  BlackSearchIcon,
  ChatIcon,
  FilterIcon,
  IconMenu,
} from "@/icons";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import notificationApi from "@/api/notification/notificationApi";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { toast } from "react-toastify";
import profileAPi from "@/api/profiles/profileApi";
import { Button, Modal } from "antd";
import historyRecruiter from "@/api/history/historyRecruiter";
import { fetchSearchResult } from "@/redux/reducer/searchReducer";
import { setLanguage } from "@/redux/reducer/changeLanguageReducer/changeLanguage";
import { analytics } from "../../configs/firebase";
import { logEvent } from "firebase/analytics";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { io } from "socket.io-client";
import ModalNoteCreateCompany from "../ModalNoteCreateCompany";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import searchApi from "@/api/search/apiSearch";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
type Props = {
  // scrollPosition: Number;
};

interface INotification {
  code: number;
  message: string;
  success: boolean;
  data: any;
}

interface INotification {
  code: number;
  data: any;
}

interface ITurnOffSerach {
  statusCode: number;
  message: string;
}
const MenuComponent = (props: Props) => {
  const { scrollPosition, checkPage, handleLoadHrefPage } = useSrollContext();
  const ref_btn_notify = useRef<any>();
  const ref_btn_profile = useRef<any>();
  const ref_btn_menu = useRef<any>();
  const ref_menu = useRef<any>();
  const ref_input = useRef<any>();
  const [dataRequest, setDataRequest] = useState<any>({
    is_working_weekend: 0,
    is_date_period: 0,
    money_type: 1,
    salary_min: 0,
    salary_max: 0,
  });
  const [tabNotify, setTabNotify] = useState<boolean>(false);
  const [tabSuggest, setTabSuggest] = useState<boolean>(false);
  const [bg_language, set_bg_language] = useState(false);
  const [checkNav, setNav] = useState(false);
  const [checkScroll, setCheckScroll] = useState(true);
  const [positionScroll, setPositionScroll] = useState(0);
  const [tabFilter, setTabFilter] = useState<Boolean>(false);
  const [checkPageLoad, setCheckPageLoad] = useState<boolean>(false);
  const [checkReponsive, setCheckReponsive] = useState<boolean>(false);
  const [reponsiveMobile, setReponsiveMobile] = useState<boolean>(false);
  const [totalJob, setTotalJob] = useState<number>(0);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({});
  const { profile } = useSelector((state: any) => state.profile);
  const [imageError, setImageError] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const dispatch = useDispatch();
  const [tabMenu, setTabMenu] = useState<boolean>(false);
  const router = useRouter();
  const [openModalTurnOffStatus, setOpenModalTurnOffStatus] = useState(false);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [openModalNoteCreateCompany, setOpenModalNoteCreateCompany] =
    React.useState(false);
  useEffect(() => {
    handleLoadHrefPage();
  }, [location.pathname]);
  useEffect(() => {
    dispatch(fetchProfile(language === 1 ? "vi" : "en") as any);
  }, [language]);
  const [dataSuggest, setDataSuggest] = React.useState<any>([]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (
        !ref_menu.current.contains(e.target) &&
        e.target.parentElement?.name !== "btn_close_filter"
      ) {
        setTabFilter(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, []);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabNotify && !ref_btn_notify.current.contains(e.target)) {
        setTabNotify(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabNotify]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabMenu && !ref_btn_menu.current?.contains(e.target)) {
        setTabMenu(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabMenu]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabSuggest && !ref_input.current?.contains(e.target)) {
        setTabSuggest(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabSuggest]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (openModalProfile && !ref_btn_profile.current.contains(e.target)) {
        setOpenModalProfile(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [openModalProfile]);
  useEffect(() => {
    setProfileData(profile);
  }, [profile]);
  useEffect(() => {
    if (checkPage === "/") {
      setCheckPageLoad(true);
    } else {
      setCheckPageLoad(false);
    }
  }, [checkPage]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setCheckReponsive(true);
      } else {
        setCheckReponsive(false);
      }
      if (window.innerWidth < 480) {
        setReponsiveMobile(true);
      } else {
        setReponsiveMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (scrollPosition != -1) {
      setNav(true);
    } else {
      setNav(true);
    }
  }, [scrollPosition]);
  const handleScroll = () => {
    const scroll = window.pageYOffset;
    if (scroll > positionScroll) {
      setCheckScroll(false);
    } else {
      setCheckScroll(true);
    }
    setPositionScroll(scroll);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [positionScroll, checkScroll, handleScroll]);
  useEffect(() => {
    set_bg_language(getCookie("languageId") === "2" ? false : true);
  }, []);

  const handleOnChangeBackgroundLanguage = () => {
    setCookie("languageId", bg_language ? "2" : "1", 1);

    if (bg_language === true) {
      dispatch(setLanguage(0));
    } else {
      dispatch(setLanguage(1));
    }

    set_bg_language(!bg_language);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await jobApi.getTotalJob("vi");

      if (res) {
        setTotalJob(res.data?.total);
      }
    };

    fetchData();
  }, []);

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("accountId");
    socket.current.disconnect();
    window.location.href = "/";
  };

  useEffect(() => {
    const dataObj = JSON.parse(localStorage.getItem("dataRequest") || "{}");
    setDataRequest({ ...dataRequest, q: dataObj.q || "" });
    const fetchData = async () => {
      const res = (await notificationApi.getNotification(
        language === 1 ? "vi" : "en"
      )) as unknown as INotification;

      if (res && res.code === 200) {
        setDataNotification(res.data.notifications);
      }
    };

    fetchData();
  }, [language]);

  const handleClickNoty = (
    postId: number,
    commentId: number,
    applicationId: number,
    typeText: string
  ) => {
    if (typeText === "recruiter") {
      let res;
      const fetchData = async () => {
        res = (await historyRecruiter.GetAJobApplication(
          postId,
          applicationId.toString(),
          "vi"
        )) as unknown as INotification;

        if (res && res.code === 200) {
          window.open(
            `candidate-detail/${res?.data?.applicationProfile.account_id}?post-id=${postId}&application_id=${applicationId}`,
            "_parent"
          );
        }
      };

      fetchData();
    }
    if (typeText === "applicator") {
      window.open(`post-detail/${postId}`, "_parent");
    }
    if (typeText === "communicationComment") {
      window.open(`detail-community?post-community=${commentId}`, "_parent");
    }
  };

  const handleRedirect = () => {
    if (!profile?.companyInfomation) {
      setTabMenu(false);
      setOpenModalNoteCreateCompany(true);
      return;
    }
    if (profile && profile.roleData === 3) {
      logEvent(analytics, "select_post_recruitment");
      setTabMenu(false);
      router.push("/banner-recruiter");
    } else {
      toast.warning("Vui lòng đăng nhập bằng tài khoản tuyển dụng", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setOpenModalLogin(true);
    }
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const handleOnchangeSearch = async (e: any) => {
    if (profile.isSearch === 1) {
      setOpenModalTurnOffStatus(true);
    } else {
      await profileAPi.putProfileJobV3(null, 1);
      dispatch(fetchProfile("vi") as any);
    }
  };

  const handleCancel = () => {
    setOpenModalTurnOffStatus(false);
  };

  const handleTurnOff = async () => {
    const res = (await profileAPi.putProfileJobV3(
      null,
      0
    )) as unknown as ITurnOffSerach;
    if (res && res.statusCode === 200) {
      setOpenModalTurnOffStatus(false);
      dispatch(fetchProfile("vi") as any);
    }
  };

  const handleSearch = (keyword?: string) => {
    localStorage.setItem("dataRequest", JSON.stringify(dataRequest));
    dispatch(
      fetchSearchResult({
        q: keyword ? keyword : dataRequest.q ? dataRequest.q.trim() : null,
        page: 0,
        moneyType: dataRequest.money_type ? dataRequest.money_type : null,
        isWorkingWeekend: dataRequest.is_working_weekend
          ? dataRequest.is_working_weekend
          : null,
        isDatePeriod: dataRequest.is_date_period
          ? dataRequest.is_date_period
          : null,
        salaryMin: dataRequest.salary_min ? dataRequest.salary_min : 0,
        salaryMax: dataRequest.salary_max ? dataRequest.salary_max : 1000000,
        jobTypeId: dataRequest.jobTypeId ? [dataRequest.jobTypeId] : [],
        categoryIds: dataRequest.category_ids ? dataRequest.category_ids : null,
        districtIds: dataRequest.district_ids ? dataRequest.district_ids : null,
        salaryType: dataRequest.salary_type ? dataRequest.salary_type : null,
        lang: "vi",
      }) as unknown as any
    ).then(() => {
      router.push("/search-result");
    });
  };

  const handleModifyPassword = () => {
    setOpenModalProfile(false);
    router.push("/update-password");
  };

  let socket = useRef<any>();

  React.useEffect(() => {
    if (socket.current === undefined && localStorage.getItem("accessToken")) {
      socket.current = io("https://web-service-tkv.onrender.com", {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      socket.current.on("connect", () => {
        // console.log('ket noi thanh cong');
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await searchApi.getSuggestKeyWord(
        10,
        language === 1 ? "vi" : "en"
      );

      setDataSuggest(res && res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="h-20 relative" ref={ref_menu}>
        <div className="fixed z-50 w-full bg-white border-b-2 flex flex-col items-center justify-center">
          <nav className="w-full max-w-6xl h-20 flex items-center justify-between z-30">
            <div
              className={`flex justify-start ${reponsiveMobile ? "w-10" : ""}`}
            >
              <Image
                onClick={() => (window.location.href = "/")}
                style={{ cursor: "pointer" }}
                alt="logo"
                className="w-24"
                width="500"
                height="500"
                src="/logo/2023.png"
              />
            </div>

            <div
              className={`flex items-center justify-end max-w-2xl ${
                reponsiveMobile ? "" : "flex-1 "
              }`}
            >
              {checkReponsive ? (
                <button
                  className={`ml-4 bg-neutral-200 rounded-md hover:bg-neutral-300/80 ${
                    reponsiveMobile ? "p-2" : "p-3 "
                  }`}
                  onClick={() => setTabFilter(!tabFilter)}
                >
                  <BlackSearchIcon width={24} height={24} />
                </button>
              ) : (
                <div className="relative flex flex-1 mr-4 h-12 border-gray-300 shadow-gray-300 shadow-2xl border-2 border-opacity-40 rounded-full pr-4 focus-within:transition-all focus-within:shadow-gray-300 focus-within:border-opacity-70">
                  <button className="p-2">
                    <BlackSearchIcon width={24} height={24} />
                  </button>
                  <input
                    value={dataRequest?.q ?? ""}
                    onChange={(e: any) => {
                      setDataRequest({ ...dataRequest, q: e.target.value });
                    }}
                    className="text-xs flex-1 outline-none bg-transparent"
                    placeholder={`Tìm kiếm hơn ${numeral(totalJob).format(
                      "0,0"
                    )} công việc`}
                    type="text"
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter") {
                        handleSearch();
                        setTabSuggest(false);
                      }
                    }}
                    onClick={() => {
                      setTabSuggest(true);
                    }}
                  />
                  <button
                    className="p-2"
                    onClick={() => setTabFilter(!tabFilter)}
                  >
                    <FilterIcon width={20} height={20} />
                  </button>

                  {tabSuggest && (
                    <div
                      className="absolute right-0 top-10 bg-white border-2 rounded-md w-full h-fit overflow-hidden z-40"
                      ref={ref_input}
                    >
                      <div className="flex flex-col">
                        <div className="text-center text-sm m-2 font-bold">
                          Từ khoá gợi ý
                        </div>
                        <div className="wrap-items-history wrap-items-search">
                          {dataSuggest?.map((suggest: any, index: number) => (
                            <div
                              className="item-history item-search"
                              key={index}
                              onClick={(e) => {
                                handleSearch(suggest.keyword);
                                setTabSuggest(false);
                              }}
                            >
                              <span className="item-search_text">
                                {suggest.keyword}
                              </span>
                              {/* <CloseOutlined onClick={handleDeleteKeyword}/> */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {
                <div className="relative">
                  <button
                    className={`mx-4 bg-neutral-200 rounded-md hover:bg-neutral-300/80 ${
                      reponsiveMobile ? "p-2" : "p-3 "
                    }`}
                    onClick={() => {
                      if (
                        profile?.roleData === undefined ||
                        profile?.roleData === null
                      ) {
                        setOpenModalLogin(true);
                      } else {
                        router.push("/chat");
                      }
                    }}
                  >
                    <ChatIcon width={19} height={18} />
                  </button>
                </div>
              }

              {
                <div className="relative">
                  <button
                    className={` bg-neutral-200 rounded-md hover:bg-neutral-300/80 ${
                      reponsiveMobile ? "p-2" : "p-3"
                    }`}
                    onClick={() => {
                      if (
                        profile?.roleData === undefined ||
                        profile?.roleData === null
                      ) {
                        setOpenModalLogin(true);
                      } else {
                        setTabNotify(true);
                      }
                    }}
                  >
                    <BellIcon width={19} height={18} />
                  </button>
                  {tabNotify && (
                    <div
                      className={` right-0 bg-white border-2 rounded-md h-96 overflow-auto ${
                        checkReponsive
                          ? "fixed top-20 w-full"
                          : "w-96 absolute top-11"
                      }`}
                      ref={ref_btn_notify}
                    >
                      {dataNotification &&
                        dataNotification?.map(
                          (notificate: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className={`wrap-notificate_system ${
                                  notificate.data.isRead === false
                                    ? `bg-orange-100`
                                    : ""
                                }`}
                                onClick={() => {
                                  handleClickNoty(
                                    notificate.data.postId,
                                    notificate.data.communicationId,
                                    notificate.data.applicationId,
                                    notificate.data.typeText
                                  );
                                }}
                              >
                                <h3>{notificate.content_app.title}</h3>
                                <h5
                                  dangerouslySetInnerHTML={{
                                    __html: notificate.content_app.body,
                                  }}
                                />
                                <div className="wrap-time">
                                  <p>
                                    {new Date(
                                      notificate.data.createdAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                  <p>
                                    {new Date(
                                      notificate.data.createdAt
                                    ).toLocaleDateString("en-GB")}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  )}
                </div>
              }

              {
                <div className="relative">
                  <button
                    onClick={() => {
                      if (
                        profile?.roleData === undefined ||
                        profile?.roleData === null
                      ) {
                        setOpenModalLogin(true);
                      } else {
                        setTabMenu(true);
                      }
                    }}
                    className={`mx-4 bg-neutral-200 rounded-md hover:bg-neutral-300/80 ${
                      reponsiveMobile ? "p-2" : "p-3 "
                    }`}
                  >
                    <IconMenu width={19} height={18} />
                  </button>
                  {tabMenu && (
                    <div
                      className={` right-0  bg-white border-2 rounded-md  h-fit overflow-hidden ${
                        checkReponsive
                          ? "top-20 fixed w-full"
                          : "absolute top-11 w-80"
                      }`}
                      ref={ref_btn_menu}
                    >
                      {profile.roleData !== 3 && (
                        <div className="w-full h-full overflow-hidden flex flex-col p-4 gap-3">
                          <div className="flex flex-col gap-2">
                            <Typography className="font-bold text-orange-400 italic ">
                              CV
                            </Typography>
                            <div
                              onClick={() => {
                                logEvent(analytics, "create_cv");
                                router.push("/cv-all");
                                setTabMenu(false);
                              }}
                              className="basis-1/3 flex gap-2 bg-gray-200 items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <AddCircleIcon />
                              <div>
                                {language === 1 ? `Tạo CV` : `Create CV`}
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                router.push("/manage-cv");
                                setTabMenu(false);
                              }}
                              className="basis-1/3 flex gap-2 bg-gray-200 items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <ManageSearchIcon />
                              <div>
                                {language === 1 ? `Quản lý CV` : `Manage CV`}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Typography className="font-bold text-orange-400 italic">
                              Blog
                            </Typography>
                            <div
                              onClick={() => {
                                router.push("/blog");
                                setTabMenu(false);
                              }}
                              className="basis-1/3 flex gap-2 bg-gray-200  items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <RemoveRedEyeIcon />
                              <div>
                                {language === 1 ? `Xem bài Blog` : `View Blog`}
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                router.push("/community-create");
                                setTabMenu(false);
                              }}
                              className="basis-1/3 flex gap-2 bg-gray-200  items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <BorderColorIcon />
                              <div>
                                {language === 1
                                  ? `Tạo bài Blog`
                                  : `Create Blog`}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {profile.roleData === 3 && (
                        <div className="w-full h-full overflow-hidden flex flex-col p-4 gap-3">
                          <div className="flex flex-col gap-2">
                            <Typography className="font-bold text-orange-400 italic">
                              {language === 1 ? "Quản lý" : "Manage"}
                            </Typography>
                            <div
                              onClick={() => {
                                router.push("/analytics");
                                setTabMenu(false);
                              }}
                              className="basis-1/5 flex gap-2 bg-gray-200  items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <AnalyticsIcon />
                              <div>
                                {language === 1 ? `Thống kê` : `Statistical`}
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                router.push("/suggest");
                                setTabMenu(false);
                              }}
                              className="basis-1/5 flex gap-2 bg-gray-200  items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <AssistantPhotoIcon />
                              <div>{language === 1 ? `Gợi ý` : `Suggest`}</div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Typography className="font-bold text-orange-400 italic">
                              Blog
                            </Typography>
                            <div
                              onClick={() => {
                                router.push("/community-create");
                                setTabMenu(false);
                              }}
                              className="basis-1/5 flex gap-2 bg-gray-200  items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <BorderColorIcon />
                              <div>
                                {language === 1
                                  ? `Tạo bài Blog`
                                  : `Create Blog`}
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                router.push("/blog");
                                setTabMenu(false);
                              }}
                              className="basis-1/5 flex gap-2 bg-gray-200  items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <RemoveRedEyeIcon />
                              <div>
                                {language === 1 ? `Xem bài Blog` : `View Blog`}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Typography className="font-bold text-orange-400 italic">
                              {language === 1 ? `Tuyển dụng` : `Recruitment`}
                            </Typography>
                            <div
                              onClick={() => handleRedirect()}
                              className="basis-1/5 flex gap-2 bg-gray-200 items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <AddCircleIcon />
                              <div>
                                {language === 1
                                  ? `Đăng bài tuyển dụng`
                                  : `Post recruitment posts`}
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                if (
                                  profile?.roleData !== 3 ||
                                  !profile?.companyInfomation
                                ) {
                                  setTabMenu(false);
                                  setOpenModalNoteCreateCompany(true);
                                  return;
                                } else {
                                  router.push("/candidate");
                                  setTabMenu(false);
                                }
                              }}
                              className="basis-1/5 flex gap-2 bg-gray-200 items-center rounded-lg p-3 hover:text-orange-400 cursor-pointer font-bold"
                            >
                              <AddCommentIcon />
                              <div>
                                {language === 1
                                  ? `Quản lý ứng viên`
                                  : `Manage candidates`}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              }
            </div>
            <div className="px-4 flex items-center">
              <Image
                className="w-8 h-8"
                src={
                  bg_language
                    ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697737787/images/icon-language/vi.png"
                    : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697737787/images/icon-language/en.png"
                }
                onClick={() => handleOnChangeBackgroundLanguage()}
                alt="anh"
                width={1920}
                height={1080}
              />

              <div className="ml-4 relative">
                <div
                  className={` flex rounded-3xl justify-center bg-neutral-200 hover:bg-neutral-300/80 cursor-pointer ${
                    reponsiveMobile ? "w-6" : "p-3"
                  }`}
                >
                  {profileData && profileData?.accountId ? (
                    <Box
                      onClick={() => {
                        setOpenModalProfile(true);
                      }}
                      sx={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <Image
                        className="w-6 rounded-full"
                        src={
                          imageError
                            ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697830499/images/avatar/default.png"
                            : profileData.avatarPath
                            ? profileData.avatarPath
                            : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697830499/images/avatar/default.png"
                        }
                        alt="user"
                        width={"400"}
                        height={"400"}
                        style={{ marginRight: "5px" }}
                        onError={() => setImageError(true)}
                      />
                      <p className="name-profile">
                        {profileData.name ? profileData.name : ""}
                      </p>
                    </Box>
                  ) : (
                    <>
                      <Image
                        onClick={() => {
                          if (localStorage.getItem("accessToken") === null) {
                            setOpenModalLogin(true);
                          }
                        }}
                        className="w-6"
                        src="/iconuser.svg"
                        alt="user"
                        width={"200"}
                        height={"200"}
                      />
                      <Image
                        className="w-6 ml-1"
                        src="/iconright.svg"
                        alt="user"
                        width={"200"}
                        height={"200"}
                      />
                    </>
                  )}
                </div>
                <div
                  className={`${
                    openModalProfile ? "absolute" : "hidden"
                  } z-40 top-16 right-0 w-full h-full flex max-w-2xl`}
                  // onClick={() => {
                  //   setOpenModalProfile(false);
                  // }}
                  ref={ref_btn_profile}
                >
                  <div
                    className={`   h-fit  right-0 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${
                      reponsiveMobile ? "fixed w-full" : "absolute w-96"
                    }`}
                  >
                    <div className="absolute top-0 right-0">
                      <button
                        className="p-2"
                        onClick={() => {
                          setOpenModalProfile(false);
                        }}
                      >
                        <Image
                          className="w-5"
                          src="/iconclose.svg"
                          width={"200"}
                          height={"200"}
                          alt="close"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col items-start justify-center p-5">
                      <div className="flex items-end gap-2">
                        <div className="w-20 h-100 rounded-full bg-neutral-200 flex justify-center items-end">
                          <Image
                            className="w-20 rounded-full"
                            src={
                              imageError
                                ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697830499/images/avatar/default.png"
                                : profileData.avatarPath
                                ? profileData.avatarPath
                                : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697830499/images/avatar/default.png"
                            }
                            alt="user"
                            width={"400"}
                            height={"400"}
                            onError={() => setImageError(true)}
                          />
                        </div>
                        <div>
                          <p className="mt-4 text-xl font-bold">
                            {profileData?.name}
                          </p>
                          <p className="mt-2 text-sm text-neutral-400">
                            {profileData?.email}
                          </p>
                          <p className="mt-2 text-sm text-neutral-400">
                            {profileData?.phone}
                          </p>
                        </div>
                      </div>

                      {profile.roleData !== 3 && (
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <FormControlLabel
                              control={
                                <IOSSwitch
                                  sx={{ m: 1 }}
                                  checked={profile.isSearch}
                                  onChange={(e) => handleOnchangeSearch(e)}
                                />
                              }
                              label=""
                            />

                            <Typography
                              sx={{
                                color: "#7f878f!important",
                              }}
                            >
                              {profile.isSearch
                                ? language === 1
                                  ? `Đang bật tìm việc`
                                  : `Looking for a job`
                                : language === 1
                                ? `Đang Tắt tìm việc`
                                : `Currently looking for a job`}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                color: "#7f878f",
                                fontSize: "12px",
                              }}
                            >
                              {language === 1
                                ? `Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và
                              được chú ý nhiều hơn trong danh sách tìm kiếm của
                              NTD.`
                                : `Turning on job search helps your profile stand out more and
                              get more attention in your search listings
                              NTD.`}
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      <Box>
                        <div className="mt-4 flex items-center justify-start">
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              cursor: "pointer",
                              alignItems: "center",
                            }}
                          >
                            {profileData.roleData !== 3 &&
                              profileData?.profileLocations?.length > 0 && (
                                <BusinessIcon
                                  sx={{
                                    width: "16px",
                                    height: "16px",
                                    color: "#1b87f5",
                                  }}
                                />
                              )}

                            <span
                              style={{
                                fontFamily:
                                  "Roboto,-apple-system,sans-serif!important",
                                fontSize: "15px",
                                color: "#1b87f5",
                              }}
                            >
                              {profileData &&
                                profileData?.profileLocations &&
                                profileData?.profileLocations?.map(
                                  (item: any) => {
                                    return item.fullName + " ";
                                  }
                                )}
                            </span>
                          </Box>
                        </div>
                      </Box>
                      <Box>
                        <div className="mt-4 flex items-center justify-start">
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              cursor: "pointer",
                              alignItems: "center",
                            }}
                          >
                            {profileData.roleData !== 3 &&
                              profileData?.profileCategories?.length > 0 && (
                                <CardGiftcardIcon
                                  sx={{
                                    width: "16px",
                                    height: "16px",
                                    color: "#1b87f5",
                                  }}
                                />
                              )}
                            <span
                              style={{
                                fontFamily:
                                  "Roboto,-apple-system,sans-serif!important",
                                fontSize: "15px",
                                color: "#1b87f5",
                              }}
                            >
                              {profileData &&
                                profileData.roleData !== 3 &&
                                profileData?.profileCategories &&
                                profileData?.profileCategories?.map(
                                  (item: any) => {
                                    return item.fullName + " ";
                                  }
                                )}
                            </span>
                          </Box>
                        </div>
                      </Box>

                      <Box>
                        <div className="mt-4 flex items-center justify-start">
                          <Box
                            onClick={() => {
                              if (profileData.roleData !== 3) {
                                router.push("/profile");
                              } else {
                                router.push("/company-infor");
                              }
                              setOpenModalProfile(false);
                            }}
                            sx={{
                              display: "flex",
                              gap: "10px",
                              cursor: "pointer",
                              alignItems: "center",
                            }}
                          >
                            <SystemUpdateAltIcon
                              sx={{ width: "16px", height: "16px" }}
                            />
                            <span
                              style={{
                                fontFamily:
                                  "Roboto,-apple-system,sans-serif!important",
                              }}
                            >
                              {profile.roleData === 1 ||
                              profile.roleData === 2 ||
                              profile.roleData === 0 ? (
                                <span>
                                  {language === 1
                                    ? `Cập nhật thông tin`
                                    : `Update information`}
                                </span>
                              ) : (
                                <span>
                                  {language === 1
                                    ? `Cập nhật công ty`
                                    : `Company updates`}
                                </span>
                              )}
                            </span>
                          </Box>
                        </div>
                        {profileData.roleData === 3 && (
                          <div className="mt-4 flex items-center justify-start">
                            <Box
                              onClick={() => handleModifyPassword()}
                              sx={{
                                display: "flex",
                                gap: "10px",
                                cursor: "pointer",
                                alignItems: "center",
                              }}
                            >
                              <LogoutIcon
                                sx={{ width: "16px", height: "16px" }}
                              />
                              <span
                                style={{
                                  fontFamily:
                                    "Roboto,-apple-system,sans-serif!important",
                                }}
                              >
                                {language === 1
                                  ? `Đổi mật khẩu`
                                  : `Change Password`}
                              </span>
                            </Box>
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-start">
                          <Box
                            onClick={() => {
                              router.push("/history");
                              setOpenModalProfile(false);
                            }}
                            sx={{
                              display: "flex",
                              gap: "10px",
                              cursor: "pointer",
                              alignItems: "center",
                            }}
                          >
                            <ManageSearchIcon
                              sx={{ width: "16px", height: "16px" }}
                            />
                            <span
                              style={{
                                fontFamily:
                                  "Roboto,-apple-system,sans-serif!important",
                              }}
                            >
                              {language === 1 ? `Lịch sử` : `History`}
                            </span>
                          </Box>
                        </div>

                        <div className="mt-4 flex items-center justify-start">
                          <Box
                            onClick={() => handleLogOut()}
                            sx={{
                              display: "flex",
                              gap: "10px",
                              cursor: "pointer",
                              alignItems: "center",
                            }}
                          >
                            <LogoutIcon
                              sx={{ width: "16px", height: "16px" }}
                            />
                            <span
                              style={{
                                fontFamily:
                                  "Roboto,-apple-system,sans-serif!important",
                              }}
                            >
                              {language === 1 ? `Đăng xuất` : `Logout`}
                            </span>
                          </Box>
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <FilterComponent
            dataRequest={dataRequest}
            setDataRequest={setDataRequest}
            checkReponsive={checkReponsive}
            tabSearchFilter={tabFilter}
            setTabFilter={setTabFilter}
          />
        </div>
        {/* {checkNav && checkPageLoad && (
          <div className="flex">
          <div className="relative max-w-6xl">
            <div
              className={`w-full bg-white z-20 flex h-8 fixed top-20 border-b-2 transition-all duration-700 ${
                !checkScroll && '-translate-y-28'
              }`}
            >
              TRANG CHỦ
            </div>
          </div>
        </div>
        
        )} */}
        {checkNav && checkPageLoad && (
          <div
            className={`w-full bg-white z-20 flex justify-center fixed top-20 border-b-2 transition-all duration-700 ${
              !checkScroll && "-translate-y-28"
            }`}
          >
            <NavbarComponent />
          </div>
        )}

        <Modal
          width={614}
          centered
          title={
            <h3
              style={{
                fontFamily: "Roboto",
                fontSize: "24px",
                lineHeight: "24px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
            >
              {language === 1
                ? `Tắt trạng thái tìm việc`
                : `Turn off job search status`}
            </h3>
          }
          footer={null}
          open={openModalTurnOffStatus}
          // onOk={handleOk}
          onCancel={handleCancel}
        >
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              letterSpacing: "0.5px",
              textAlign: "left",
            }}
          >
            {language === 1
              ? `Sau khi tắt tìm kiếm việc làm, Nhà tuyển dụng có thể không tìm thấy
            bạn và cơ hội tìm được công việc phù hợp với bạn sẽ giảm đi.`
              : `After turning off job search, Employers may not be found
            you and your chances of finding the right job for you will decrease.`}
          </p>
          <div className="share-buttons-choose-cv-modal">
            <Button
              type="default"
              style={{
                backgroundColor: "#d4a650",
                marginRight: "10px",
              }}
              shape="round"
              onClick={handleTurnOff}
            >
              {language === 1 ? `Tắt` : `Off`}
            </Button>
            <Button type="default" shape="round" onClick={handleCancel}>
              {language === 1 ? `Hủy` : `Cancel`}
            </Button>
          </div>
        </Modal>

        <ModalLogin
          isOpen={openModalLogin}
          handleToggleModal={handleToggleModal}
        />

        {/* create modal profile */}
      </div>
      <ModalNoteCreateCompany
        openModalNoteCreateCompany={openModalNoteCreateCompany}
        setOpenModalNoteCreateCompany={setOpenModalNoteCreateCompany}
      />
    </>
  );
};

export default MenuComponent;
