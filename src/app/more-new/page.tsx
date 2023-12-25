/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import NavbarComponent from "@/components/NavbarComponent/NavbarComponent";
import {
  Box,
  Breadcrumbs,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./style.scss";
import categoryApi from "@/api/category/categoryApi";
import { getCookie } from "@/cookies";
import postsApi from "@/api/posts/postsApi";
import {
  FilterIcon,
  LightFilterIcon,
  SaveIconFill,
  SaveIconOutline,
} from "@/icons";
import Link from "next/link";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Select, SelectProps, Space } from "antd";
import locationApi from "@/api/location/locationApi";
import ModalLogin from "@/components/ModalLogin/ModalLogin";
import ShortText from "@/util/ShortText";
type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

const Page = () => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const [open, setOpen] = React.useState(false);
  const [valueJobChild, setValueJobChild] = React.useState<any>([]);
  const [arrayChild, setArrayChild] = useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [childCatelories, setChildCatelories] = React.useState<any>(null);
  const [checkItemsCount, setCheckItemsCount] = React.useState<number>(0);
  const [nameCategory, setNameCategory] = useState<any>("");
  const [listJob, setListJob] = useState<any>([]);
  const accountId = localStorage.getItem("accountId");
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [arrayTotal, setArrayTotal] = useState<any>([]);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const categoryId = useSelector((state: any) => state.categoryId);
  const [idFilterProvinces, setIdFilterProvinces] = React.useState("");
  const [optionsProvinces, setOptionsProvinces] = React.useState<
    SelectProps["options"]
  >([]);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [provincesData, setProvincesData] = React.useState<
    [
      {
        id: string;
        name: string;
        name_en: string;
        full_name: string;
        full_name_en: string;
        code_name: string;
        administrative_unit_id: number;
        administrative_region_id: number;
      }
    ]
  >();

  const MAX_CHECKED_ITEMS = 3;
  const language = useSelector((state: any) => state.changeLaguage.language);

  useEffect(() => {
    setValueJobChild(categoryId);
    setNameCategory(getCookie("categoryName"));
  }, [categoryId, getCookie("categoryName"), language]);

  const getAllChildCategoriesById = async () => {
    try {
      const result = await categoryApi.getAllChildCategories(
        valueJobChild,
        language === 1 ? "vi" : "en"
      );

      if (result) {
        const newData = result.data.map((item: any) => {
          return {
            ...item,
            checked: false,
          };
        });
        setChildCatelories(newData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllChildCategoriesById();
  }, [valueJobChild, language]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.isPropagationStopped();
    setOpen(!open);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setChildCatelories((prevState: any) => {
      const newData = prevState.map((item: any) => {
        if (item.id === Number(name)) {
          return {
            ...item,
            checked: checked,
          };
        }
        return item;
      });
      setCheckItemsCount(
        newData.filter((item: any) => item.checked === true).length
      );

      return newData;
    });
  };

  const handleClickChoose = async () => {
    setOpen(false);
    const arrayTotalFUC: any[] = [];

    const newData = childCatelories.filter(
      (item: any) => item.checked === true
    );
    const newChildCatelories = newData.map((item: any) => {
      arrayTotalFUC.push(item.id);
    });
    setCheckedItems(newChildCatelories);
    setArrayChild(newData);
    setArrayTotal(arrayTotalFUC);
    setCheckItemsCount(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = (await postsApi.getPostNewestV3(
        arrayTotal,
        valueJobChild ? Number(valueJobChild) : null,
        null,
        idFilterProvinces ? Number(idFilterProvinces) : null,
        10,
        thresholdNewJob,
        language === 1 ? "vi" : "en"
      )) as unknown as any;

      if (res && res.status === 200) {
        setListJob(res.data);
        setThresholdNewJob(res.data[res.data.length - 1]?.id);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [arrayTotal, valueJobChild, idFilterProvinces, language]);

  React.useEffect(() => {
    if (provincesData) {
      const newOptionsProvinces = provincesData.map((provinces: any) => {
        return {
          value: provinces.id,
          label: language === 1 ? provinces.full_name : provinces.full_name_en,
        };
      });
      setOptionsProvinces(newOptionsProvinces);
    }
  }, [provincesData, language]);

  const getProvinces = async () => {
    try {
      const result = await locationApi.getAllProvinces(
        language === 1 ? "vi" : "en"
      );

      if (result) {
        setProvincesData(result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProvinces();
  }, [language]);

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  const breadcrumbs = [
    <Typography
      key="2"
      color="text.primary"
      sx={{
        cursor: "pointer",
        padding: "4px 12px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        border: "1px solid #d4a650",
        color: "#d4a650",
        background: "#ffffff",
        fontSize: "12px",
        lineHeight: "2",
      }}
    >
      {nameCategory}
    </Typography>,
    valueJobChild?.id === 1 ? (
      <React.Fragment key="3"></React.Fragment>
    ) : (
      <div
        key="3"
        style={{
          position: "relative",
        }}
        className="button-breadcrumb"
        onClick={(e) => handleClick(e)}
      >
        <Typography
          color="text.primary"
          sx={{
            cursor: "pointer",
            padding: "4px 12px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #d4a650",
            color: "#d4a650",
            background: "#ffffff",
            fontSize: "12px",
            lineHeight: "2",
          }}
        >
          {arrayChild?.length === 0 || arrayChild?.length === undefined
            ? language === 1
              ? `Tất cả`
              : `All`
            : arrayChild?.map(
                (value: { id: number; name: string }, index: number) => (
                  <div key={index}>
                    {value.name} {index !== arrayChild.length - 1 ? "/ " : ""}
                  </div>
                )
              )}
          {open ? (
            <ExpandLess className="icon-breadcrumb" />
          ) : (
            <ExpandMore className="icon-breadcrumb" />
          )}
        </Typography>
      </div>
    ),
  ];

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success("Save post success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: true } : item
            )
          );
        } else {
          // toast.warning('Vui lòng đăng nhập trước khi lưu bài', {
          //   position: 'bottom-center',
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: 'colored',
          // });
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot bookmark your own post", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.deleteBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success("Unsave post success", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: false } : item
            )
          );
        }
      };

      fetchData();
    } catch (error) {
      toast.error("You cannot delete your own post", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const loadMore = async () => {
    if (!loading && hasMoreData) {
      setLoading(true);

      setTimeout(async () => {
        const res = await postsApi.getPostNewestV3(
          arrayTotal,
          null,
          null,
          null,
          10,
          thresholdNewJob,
          language === 1 ? "vi" : "en"
        );

        if (res && res.status === 200) {
          setListJob([...listJob, ...res.data]);
          setThresholdNewJob(listJob[listJob.length - 1]?.id);

          if (res.data?.length === 0) {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      }, 0);
    }
  };

  const handleClickFilterJob = () => {};

  const handleChangeFilterJob = (value: string) => {
    setIdFilterProvinces(value);
  };

  return (
    <div className="flex flex-col items-center">
      <Box>
        <NavbarComponent />
      </Box>
      <Stack
        className="bread-crumb-container"
        spacing={2}
        sx={{
          maxWidth: "1080px",
          zIndex: "1",
          background: "#ffffff",
          padding: "16px 0px ",
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          borderBottom: "1px solid #e5e5e5",
          "@media (max-width: 767px)": {},
          boxShadow:
            "10px 0px 0px rgb(255, 255, 255), -10px 0px 0px rgb(255, 255, 255)",
        }}
      >
        {isLoading ? (
          <Skeleton variant="rounded" width="100%" height={34} />
        ) : (
          <Breadcrumbs separator="" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        )}
        <Collapse in={open} unmountOnExit className="collapse-breadcrumbs">
          <Typography className="header-breabcrumb_text">
            {language === 1 ? `Danh sách` : `Menu`}
          </Typography>
          <Box padding={0} className="box-breadcrumbs">
            <FormGroup>
              {childCatelories?.map((childCatelorie: any, index: number) => (
                <FormControlLabel
                  key={index}
                  sx={{
                    padding: "4px 24px",
                  }}
                  control={
                    <Checkbox
                      key={index}
                      checked={childCatelorie?.checked}
                      onChange={handleCheckboxChange}
                      name={childCatelorie?.id.toString()}
                      value={childCatelorie?.name.toString()}
                      disabled={
                        checkItemsCount >= MAX_CHECKED_ITEMS &&
                        !checkedItems[index]?.checked
                      }
                    />
                  }
                  label={childCatelorie?.name}
                />
              ))}
            </FormGroup>
          </Box>
          <div className="wrapBtn-breadcrumb_nav">
            <button
              type="submit"
              className="btn-breadcrumb_nav"
              onClick={handleClickChoose}
            >
              {language === 1 ? `Chọn` : "Select"}
            </button>
          </div>
        </Collapse>
      </Stack>

      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <div className="flex justify-between flex-wrap px-4">
          <h1 className="font-bold text-2xl mb-3 px-2">
            {language === 1 ? `Tất cả công việc mới nhất` : `All latest jobs`}
          </h1>

          <div className="filter-hotjob" onClick={handleClickFilterJob}>
            <div className="filter-provinces mb-3">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Select
                  size={"large"}
                  onChange={handleChangeFilterJob}
                  style={{ width: "220px" }}
                  options={optionsProvinces}
                  suffixIcon={
                    idFilterProvinces ? (
                      <LightFilterIcon width={20} height={20} />
                    ) : (
                      <FilterIcon width={20} height={20} />
                    )
                  }
                  placeholder={
                    language === 1 ? "Lọc theo khu vực" : `Filter by region`
                  }
                />
              </Space>
            </div>
          </div>
        </div>

        <div>
          <InfiniteScroll
            style={{ display: "flex", flexWrap: "wrap" }}
            dataLength={listJob.length}
            next={loadMore}
            hasMore={true}
            loader={<></>}
          >
            <ul className="inline-flex flex-wrap list-job justify-center">
              {listJob &&
                listJob.length > 0 &&
                listJob.map((item: any, index: any) => (
                  <li key={index} className="relative p-2">
                    <Link
                      href={`/post-detail/${item.id}`}
                      className="w-[360px] h-[220px]  bg-gray-300/40 rounded-md px-4 py-6 flex justify-between items-center item-job"
                    >
                      <div className="w-2/12 rounded-sm overflow-hidden">
                        <Image
                          className="w-16 h-16 object-cover"
                          src={item.image ? item.image : "/logo/logo.png"}
                          alt="anh"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="w-7/12 h-full flex flex-col justify-between capitalize">
                        <h2 className="text-sm font-bold  drop-shadow-xl">
                          {handleShortTextHome(item.title, 40)}
                        </h2>
                        <div className="my-2 flex flex-col gap-y-1 font-medium">
                          <div className="flex items-start">
                            <Image
                              className="w-4 mr-1"
                              src={"/iconcompany.svg"}
                              alt="anh"
                              width={200}
                              height={200}
                            />
                            <p className="text-[9px]  drop-shadow-xl">
                              {item.companyName}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <Image
                              className="w-4 mr-1"
                              src={"/icontime.svg"}
                              alt="anh"
                              width={200}
                              height={200}
                            />
                            <p className="text-[9px]">{item?.address}</p>
                          </div>
                          <div className="flex items-center">
                            <Image
                              className="w-4 mr-1"
                              src={"/iconlocation.svg"}
                              alt="anh"
                              width={200}
                              height={200}
                            />
                            <p className="text-[9px]">{item.createdAtText}</p>
                          </div>
                        </div>
                        <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold ">
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                            {handleShortValueNumber(item.salaryMin)} -{" "}
                            {handleShortValueNumber(item.salaryMax)}{" "}
                            {item.moneyType}
                          </h3>
                          <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                            {item?.jobType?.name}
                          </h3>
                        </div>
                      </div>

                      <div className="w-1/12 flex justify-center h-full">
                        <div
                          className="h-fit"
                          onClick={(e) => {
                            e.preventDefault();
                            if (item.bookmarked === false) {
                              handleBookmarked(item.id);
                            } else {
                              handleDeleteBookmarked(item.id);
                            }
                          }}
                        >
                          {item.accountId !== accountId &&
                            (item.bookmarked === true ? (
                              <SaveIconFill width={24} height={24} />
                            ) : (
                              <SaveIconOutline width={24} height={24} />
                            ))}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
      <ToastContainer />
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={handleToggleModal}
      />
    </div>
  );
};

export default Page;
