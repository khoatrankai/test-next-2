/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import postsApi from "@/api/posts/postsApi";
import PositionPost from "@/components/NewPostComponent/PositionPost/PositionPost";
import TypeJob from "@/components/NewPostComponent/TypeJob/TypeJob";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import Salary from "@/components/NewPostComponent/Salary/Salary";
import CategoryPost from "@/components/NewPostComponent/CategoryPost/CategoryPost";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EmailIcon from "@mui/icons-material/Email";
import moment from "moment";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
import EncodingDescription from "@/util/EncodingDescription/EncodingDescription";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValidationPost } from "../new-post/validation/validation-post";
import { useSelector } from "react-redux";

type Props = {};

interface IUpdatePost {
  code: number;
  success: boolean;
  message: string;
}

interface IPost {
  code: number;
  data: {
    address: string;
    ward_id: number;
    is_remotely: boolean;
    is_working_weekend: boolean;
    categories: {
      map(arg0: (dt: any) => any): unknown;
      child_category_id: number;
    };
    company_name: string;
    email: string;
    end_date: string;
    end_time: string;
    expired_date: string;
    title: string;
    is_date_period: boolean;
    start_date: string;
    start_time: string;
    salary_min: number;
    salary_max: number;
    money_type: number;
    description: string;
    job_type: {
      job_type_id: number;
    };
    images: string[];
    phoneNumber: string;
  };
}

const EditPostedPage: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const {
    handleEncodingDescription,
    handleDecodingDescription,
    handleUpdateDescription,
  } = EncodingDescription();
  const { handleConvertToTimestamp } = TimeStamp();
  const [dataPost, setDataPost] = useState<any>({});
  const [countImg, setCountImg] = useState<number>(0);
  const ref_image = useRef<any>();
  const [checkResize, setCheckResize] = useState<boolean>(false);
  const [dataImage, setDataImage] = useState<any>([]);
  const [description, setDescription] = useState<any>({
    detail: "",
    req: "",
    right: "",
  });
  const [dataReq, setDataReq] = useState<any>({});
  const [indexImage, setIndexImage] = useState<any>({ index: 0, count: 0 });
  const [typeTimeJob, setTypeTimeJob] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const profile = useSelector((state: any) => state.profile.profile);
  useEffect(() => {
    const getPost = async () => {
      const response = (await postsApi.getPostbyId(
        Number(searchParams.get("postId")),
        "vi"
      )) as unknown as IPost;

      if (response && response.code === 200) {
        const dataPost = response.data;
        setDataPost(dataPost);
        setDataReq({
          address: dataPost?.address,
          wardId: dataPost?.ward_id,
          isRemotely: dataPost?.is_remotely,
          isWorkingWeekend: dataPost?.is_working_weekend,
          categoryIds: dataPost?.categories?.map((dt: any) => {
            return dt.child_category_id;
          }),
          description: dataPost?.description,
          salaryType: 1,
          images: [],
          deletedImages: [],
          companyName: dataPost?.company_name,
          email: dataPost?.email,
          endDate: dataPost?.end_date,
          endTime: dataPost?.end_time,
          expiredDate: dataPost?.expired_date,
          title: dataPost?.title,
          isDatePeriod: dataPost?.is_date_period,
          startDate: dataPost?.start_date,
          startTime: dataPost?.start_time,
          salaryMin: dataPost?.salary_min,
          salaryMax: dataPost?.salary_max,
          moneyType: dataPost?.money_type,
          jobTypeId: dataPost?.job_type?.job_type_id,
          latitude: "10.761955",
          longitude: "106.70183",
          phoneNumber: (dataPost as any)?.phone_contact,
        });
        setDataImage(
          dataPost.images.map((dt: any) => {
            return dt.image;
          })
        );

        setCountImg(dataPost.images.length);
        setIndexImage({ ...indexImage, count: dataPost.images.length });

        if (Number(dataPost?.start_date) > 0) {
          setTypeTimeJob(true);
        }
      }
    };

    getPost();
  }, []);

  const handleUpdateDes = (e: any, index: any) => {
    setDescription({
      ...description,
      [e.target.name]: handleUpdateDescription(
        handleDecodingDescription(dataReq.description),
        e.target.value,
        index
      ),
    });
  };
  useEffect(() => {
    setDataReq({
      ...dataReq,
      description: handleEncodingDescription([
        description.detail,
        description.req,
        description.right,
      ]),
    });
  }, [description]);
  const handleUpdateData = (e: any, value: any = null) => {
    if (value) {
      setDataReq({ ...dataReq, [e.target.name]: value });
    } else {
      switch (e.target.name) {
        case "isDatePeriod":
          setDataReq({ ...dataReq, [e.target.name]: 0 });
          break;
        case "startTime":
        case "endTime":
          setDataReq({
            ...dataReq,
            [e.target.name]: handleConvertToTimestamp(e.target.value),
          });
          break;
        case "startDate":
        case "endDate":
        case "expiredDate":
          setDataReq({
            ...dataReq,
            [e.target.name]: new Date(e.target.value).getTime(),
          });
          break;
        default:
          setDataReq({ ...dataReq, [e.target.name]: e.target.value });
      }
    }
  };
  const handleClickBtnUpload = () => {
    ref_image.current.click();
  };

  const handleChangeIndex = (index: any) => {
    setIndexImage({ ...indexImage, index: index });
  };
  const handleRemoveImage = (index: any) => {
    setIndexImage({ index: 0, count: indexImage.count - 1 });
    if (index >= countImg) {
      setDataReq({
        ...dataReq,
        images: dataReq.images.filter((dt: any, i: number) => {
          return i != index - countImg;
        }),
      });
      setDataImage(
        dataImage.filter((dt: any, i: number) => {
          return i != index;
        })
      );
    } else {
      setDataImage(
        dataImage.filter((dt: any, i: number) => {
          return i != index;
        })
      );
      setDataPost({
        ...dataPost,
        images: dataPost.images.filter((dt: any, i: number) => {
          return i != index;
        }),
      });
      setCountImg(countImg - 1);
      setDataReq({
        ...dataReq,
        deletedImages: [
          ...dataReq.deletedImages,
          {
            id: dataPost.images.filter((dt: any, i: number) => {
              return i === index;
            })[0].id,
          },
        ],
      });
    }
  };
  const handlePost = () => {
    const formData = new FormData();
    for (let i in dataReq) {
      if (i === "categoryIds" || i === "images") {
        dataReq[i].forEach((category: any) => {
          formData.append(i, category);
        });
      } else if (i === "deletedImages") {
        dataReq[i].forEach((category: any) => {
          formData.append(i, JSON.stringify(category));
        });
      } else {
        if (i === "expiredDate" || i === "startDate" || i === "endDate") {
          if (dataReq[i] !== null) {
            formData.append(i, dataReq[i]);
          }
        } else {
          formData.append(i, dataReq[i]);
        }
      }
    }

    formData.append("id", dataPost.id);

    const fetchData = async () => {
      const checkPost = new ValidationPost(
        dataReq.address,
        dataReq.wardId,
        dataReq.salaryMin,
        dataReq.salaryMax,
        dataReq.moneyType,
        dataReq.jobTypeId,
        dataReq.expiredDate,
        dataReq.startDate,
        dataReq.endDate,
        dataReq.companyName,
        dataReq.email,
        dataReq.phoneNumber,
        dataReq.title,
        dataReq.description,
        dataReq.startTime,
        dataReq.endTime,
        dataReq.categoryIds,
        dataReq.images
      );

      console.log(checkPost);

      const validation = checkPost.validateAllFields();

      if (validation && validation.status === false) {
        toast.warning(validation.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      } else {
        const res = (await postsApi.updatePostedInfo(
          formData
        )) as unknown as IUpdatePost;

        if (res && res.code === 200) {
          toast.success("Cập nhật bài đăng thành công", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("Cập nhật bài đăng thất bại", {
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
      }
    };
    fetchData();
  };
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1152) {
        setCheckResize(true);
      } else {
        setCheckResize(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleUploadImage = (e: any) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 840,
    };

    const file = e.target.files[0];
    const reader = new FileReader();
    const readerImg = new FileReader();
    if (e.target.files[0]) {
      reader.readAsArrayBuffer(file);
      readerImg.readAsDataURL(file);
    }
    readerImg.addEventListener("load", function () {
      const buffer = readerImg.result;
      setDataImage([...dataImage, buffer]);
      setIndexImage({ index: indexImage.count, count: indexImage.count + 1 });
    });
    reader.addEventListener("load", async function () {
      const compressedImages = [];
      const compressedImage = await imageCompression(file, options);
      compressedImages.push(
        new File([compressedImage], compressedImage.name, {
          type: compressedImage.type,
        })
      );

      setDataReq({
        ...dataReq,
        images: [...dataReq.images, ...compressedImages],
      });
    });
  };

  useEffect(() => {
    setDataReq({
      ...dataReq,
      companyName: profile?.companyInfomation?.name,
    });
  }, [profile]);

  return (
    <div className="flex justify-center bg-[rgb(244, 245, 245)]">
      <div
        className={`max-w-6xl w-full flex py-4 ${
          checkResize ? "flex-col gap-6" : ""
        }`}
      >
        <div className={`max-w-[780px] w-full  mr-8 flex flex-col gap-y-4`}>
          <div className="flex flex-col gap-12 bg-white p-4 rounded-lg shadow-[-10px_8px_40px_6px_#00000024]">
            <div className="flex h-10 items-center">
              <div className="h-full w-3 bg-yellow-500 mr-4"></div>
              <h1 className="text-2xl font-bold">
                {" "}
                {languageRedux === 1
                  ? "Thông tin đăng tải"
                  : "Posted information"}
              </h1>
            </div>
            <div className="relative w-full border-b-2 px-2 border-transparent rounded-md focus-within:border-black/10">
              <div className="font-semibold">
                <input
                  name="title"
                  type="text"
                  defaultValue={dataReq?.title}
                  placeholder={
                    languageRedux === 1 ? "Tên tiêu đề..." : "Title..."
                  }
                  className="w-full outline-none text-xl"
                  onChange={handleUpdateData}
                />
              </div>
            </div>
            <div className="w-full relative">
              <label className="text-xs text-yellow-400 absolute font-semibold -top-3 px-1 left-2 bg-white">
                {languageRedux === 1 ? "Hình ảnh về công ty" : "Company images"}
              </label>
              <div
                className={`max-w-full h-80 overflow-hidden border-2 border-black/40 rounded-xl flex justify-center flex-col items-center transition-all duration-500`}
              >
                {dataImage[indexImage.index] != undefined ? (
                  <Image
                    className="w-full h-full"
                    width={1920}
                    height={1080}
                    alt=""
                    src={dataImage[indexImage.index]}
                  />
                ) : (
                  <>
                    <Image
                      className="w-16"
                      src={"/iconcamera.svg"}
                      alt=""
                      width={500}
                      height={500}
                    />
                    <button
                      className="p-2 rounded-xl bg-red-500 font-bold"
                      onClick={handleClickBtnUpload}
                    >
                      {languageRedux === 1
                        ? "Thêm hình ảnh"
                        : "Add more images"}
                    </button>
                  </>
                )}
                <input
                  onChange={handleUploadImage}
                  hidden
                  type="file"
                  ref={ref_image}
                />
              </div>
              <div className="flex flex-wrap items-center gap-[34.5px]">
                <ul className="flex flex-wrap justify-center my-2 gap-[34.5px]">
                  {dataImage.map((dt: any, index: number) => {
                    return (
                      <li
                        className="w-[7.5rem] h-[7.5rem] relative cursor-pointer rounded-xl border-2"
                        key={index}
                      >
                        <Image
                          onClick={() => {
                            handleChangeIndex(index);
                          }}
                          className="w-full h-full rounded-xl"
                          alt=""
                          src={dataImage[index]}
                          width={1920}
                          height={1080}
                        />
                        <button
                          className="absolute p-[1px] -right-1 -top-1 rounded-full border-2 bg-white border-black/50"
                          onClick={(e) => {
                            e.preventDefault;
                            handleRemoveImage(index);
                          }}
                        >
                          <Image
                            className="w-8"
                            src={"/iconremove.svg"}
                            alt=""
                            width={200}
                            height={200}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {indexImage.count < 5 && indexImage.count != 0 && (
                  <button
                    className="w-[7.5rem] h-[7.5rem] border-2 border-dashed border-black/30 rounded-xl flex justify-center items-center"
                    onClick={handleClickBtnUpload}
                  >
                    <Image
                      className="w-16"
                      src={"/iconadd.svg"}
                      alt=""
                      width={200}
                      height={200}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-12">
              <Salary dataReq={dataReq} setDataReq={setDataReq} />
              <div className="relative h-fit max-w-[350px] p-2 border-2 rounded-md focus-within:border-yellow-400">
                <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 left-2 bg-white">
                  {languageRedux === 1 ? "Loại hình làm việc" : "Type of work"}
                </label>
                <div className="flex justify-between gap-2">
                  <button
                    className={`flex gap-1 items-center p-2 border-2 w-fit cursor-pointer ${
                      dataReq.isRemotely ? "bg-yellow-300" : ""
                    }`}
                    onClick={() => {
                      setDataReq({
                        ...dataReq,
                        isRemotely: dataReq.isRemotely > 0 ? 0 : 1,
                      });
                    }}
                  >
                    <input
                      className="cursor-pointer "
                      type="checkbox"
                      checked={dataReq?.isRemotely ?? false}
                      onChange={() => {
                        setDataReq({
                          ...dataReq,
                          isRemotely: dataReq.isRemotely > 0 ? 0 : 1,
                        });
                      }}
                    />
                    <label className="cursor-pointer text-sm font-semibold">
                      {languageRedux === 1 ? "Làm việc từ xa" : "Work remotely"}
                    </label>
                  </button>
                  <button
                    className={`flex gap-1 p-2 items-center border-2 w-fit cursor-pointer ${
                      dataReq.isWorkingWeekend ? "bg-yellow-300" : ""
                    }`}
                    onClick={() => {
                      setDataReq({
                        ...dataReq,
                        isWorkingWeekend: dataReq.isWorkingWeekend > 0 ? 0 : 1,
                      });
                    }}
                  >
                    <input
                      className="cursor-pointer "
                      type="checkbox"
                      checked={dataReq?.isWorkingWeekend ?? false}
                      onChange={() => {
                        setDataReq({
                          ...dataReq,
                          isWorkingWeekend:
                            dataReq.isWorkingWeekend > 0 ? 0 : 1,
                        });
                      }}
                    />
                    <label className="cursor-pointer text-sm font-semibold">
                      {languageRedux === 1
                        ? "Làm việc cuối tuần"
                        : "Work on weekends"}
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <CategoryPost dataReq={dataReq} setDataReq={setDataReq} />
          <div className="flex flex-col gap-12 bg-white p-4 rounded-lg  shadow-[-10px_8px_40px_6px_#00000024]">
            <div className="flex h-10 items-center">
              <div className="h-full w-3 bg-yellow-500 mr-4"></div>
              <h1 className="text-2xl font-bold">
                {" "}
                {languageRedux === 1 ? "Chi tiết công việc" : "Job details"}
              </h1>
            </div>
            <div className="relative">
              <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 left-2 bg-white">
                {languageRedux === 1 ? "Mô tả công việc" : "Job description"}
              </label>
              <div>
                <textarea
                  defaultValue={
                    handleDecodingDescription(dataReq?.description ?? "")[0]
                  }
                  onChange={(e) => {
                    handleUpdateDes(e, 0);
                  }}
                  name="detail"
                  className="border-2 border-dashed rounded-md max-w-2xl w-full h-fit min-w-[18rem] min-h-[20rem] resize-none p-4 outline-none border-black/20 focus-within:border-yellow-400"
                />
              </div>
            </div>
            <div className="relative">
              <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 left-2 bg-white">
                {languageRedux === 1 ? "Yêu cầu công việc" : "Job requirements"}
              </label>
              <div>
                <textarea
                  defaultValue={
                    handleDecodingDescription(dataReq?.description ?? "")[1]
                  }
                  onChange={(e) => {
                    handleUpdateDes(e, 1);
                  }}
                  name="req"
                  className="border-2 border-dashed rounded-md max-w-2xl w-full h-fit min-w-[18rem] min-h-[20rem] resize-none p-4 outline-none border-black/20 focus-within:border-yellow-400"
                />
              </div>
            </div>
            <div className="relative">
              <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 left-2 bg-white">
                {languageRedux === 1 ? "Quyền lợi" : "Benefits"}
              </label>
              <div>
                <textarea
                  defaultValue={
                    handleDecodingDescription(dataReq?.description ?? "")[2]
                  }
                  onChange={(e) => {
                    handleUpdateDes(e, 2);
                  }}
                  name="right"
                  className="border-2 border-dashed rounded-md max-w-2xl w-full h-fit min-w-[18rem] min-h-[20rem] resize-none p-4 outline-none border-black/20 focus-within:border-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-fit gap-8 flex flex-col ${
            checkResize ? "max-w-[780px]" : "max-w-[350px]"
          }`}
        >
          <div className="rounded-lg bg-white shadow-[7px_8px_40px_6px_#00000024] p-4">
            <div className="flex h-10 items-center mb-8">
              <div className="h-full w-3 bg-yellow-500 mr-4"></div>
              <h1 className="font-bold text-xl">
                {" "}
                {languageRedux === 1
                  ? "Thông tin chung"
                  : "General information"}
              </h1>
            </div>
            <ul>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-yellow-400 rounded-full">
                  <ApartmentIcon />
                </div>
                <div className="p-2 w-full border-2 border-dashed focus-within:border-yellow-400">
                  <h2>
                    {" "}
                    {languageRedux === 1 ? "Tên công ty" : "Company name"}
                  </h2>
                  <input
                    name="companyName"
                    type="text"
                    defaultValue={dataReq?.companyName}
                    disabled={profile?.companyInfomation ? true : false}
                    className="font-bold p-2 w-full focus-within:border-black/30 outline-none border-dashed border-2"
                    placeholder={
                      languageRedux === 1 ? "Tên công ty" : "Company name"
                    }
                    onChange={handleUpdateData}
                  />
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-yellow-400 rounded-full">
                  <EmailIcon />
                </div>
                <div className="p-2 w-full border-2 border-dashed focus-within:border-yellow-400">
                  <h2>Email</h2>
                  <input
                    name="email"
                    type="email"
                    defaultValue={dataReq?.email}
                    className="font-bold w-full p-2 focus-within:border-black/30 outline-none border-dashed border-2"
                    placeholder={
                      languageRedux === 1 ? "Email" : "Enter Email..."
                    }
                    onChange={handleUpdateData}
                  />
                </div>
              </li>
              <li className="flex items-center my-6">
                <div className="w-12 mr-4 p-3 bg-yellow-400 rounded-full">
                  <LocalPhoneIcon />
                </div>
                <div className="p-2 w-full border-2 border-dashed focus-within:border-yellow-400">
                  <h2>
                    {" "}
                    {languageRedux === 1 ? "Số điện thoại" : "Phone number"}
                  </h2>
                  <input
                    name="phoneNumber"
                    type="tel"
                    defaultValue={dataPost?.phone_contact}
                    className="font-bold p-2 w-full focus-within:border-black/30 outline-none border-dashed border-2"
                    placeholder={
                      languageRedux === 1
                        ? "Số điện thoại"
                        : "Enter Phone number..."
                    }
                    onChange={handleUpdateData}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white shadow-[7px_8px_40px_6px_#00000024] p-4">
            <div className="flex h-10 items-center mb-8">
              <div className="h-full w-3 bg-yellow-500 mr-4"></div>
              <h1 className="font-bold text-xl">
                {" "}
                {languageRedux === 1 ? "Thời gian làm việc" : "Working time"}
              </h1>
            </div>
            <div className="relative max-w-[400px] p-2 border-2 rounded-md focus-within:border-yellow-400">
              <label className="text-xs text-yellow-400 absolute font-semibold -top-3 px-1 left-2 bg-white">
                {languageRedux === 1 ? "Thời gian làm việc" : "Working time"}
              </label>
              <div className="flex gap-2 font-semibold">
                <input
                  name="startTime"
                  type="time"
                  defaultValue={moment(dataReq?.startTime).format("DD:MM")}
                  placeholder="Ngày bắt đầu"
                  className="w-full p-2 border-2 rounded-sm"
                  onChange={handleUpdateData}
                />
                <input
                  name="endTime"
                  type="time"
                  placeholder="Ngày bắt đầu"
                  defaultValue={moment(dataReq?.endTime).format("DD:MM")}
                  className="w-full p-2 border-2 rounded-sm"
                  onChange={handleUpdateData}
                />
              </div>
            </div>
          </div>
          <TypeJob dataReq={dataReq} setDataReq={setDataReq} />
          <PositionPost dataReq={dataReq} setDataReq={setDataReq} />
          <div className="rounded-lg bg-white shadow-[7px_8px_40px_6px_#00000024] p-4">
            <div className="flex h-10 items-center mb-8">
              <div className="h-full w-3 bg-yellow-500 mr-4"></div>
              <h1 className="font-bold text-xl">
                {" "}
                {languageRedux === 1 ? "Thời gian đăng bài" : "Time to post"}
              </h1>
            </div>
            <div className="relative max-w-[400px] p-2 border-2 rounded-md focus-within:border-yellow-400">
              <label className="text-xs text-yellow-400 absolute font-semibold -top-3 px-1 left-2 bg-white">
                {languageRedux === 1 ? "Thời gian đăng bài" : "Time to post"}
              </label>
              <div className="font-bold">
                <div className="flex justify-around text-xs">
                  <button
                    name="isDatePeriod"
                    className={`p-2 border-b-4 ${
                      !typeTimeJob
                        ? "border-yellow-400 text-yellow-500"
                        : " border-transparent"
                    }`}
                    onClick={(e) => {
                      setTypeTimeJob(!typeTimeJob);
                      handleUpdateData(e);
                    }}
                  >
                    {languageRedux === 1 ? "Không thời hạn" : "No deadline"}
                  </button>
                  <button
                    name="isDatePeriod"
                    className={`p-2 border-b-4 ${
                      typeTimeJob
                        ? "border-yellow-400 text-yellow-500"
                        : " border-transparent"
                    }`}
                    onClick={(e) => {
                      setTypeTimeJob(!typeTimeJob);
                      handleUpdateData(e, 1);
                    }}
                  >
                    {languageRedux === 1 ? "Thời hạn" : "Deadline"}
                  </button>
                </div>
                {typeTimeJob && (
                  <div className="flex mt-4 gap-2 font-semibold">
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={moment(dataReq?.startDate).format(
                        "YYYY-MM-DD"
                      )}
                      placeholder="Ngày bắt đầu"
                      className="w-full p-2 border-2 rounded-sm"
                      onChange={handleUpdateData}
                    />
                    <input
                      name="endDate"
                      type="date"
                      defaultValue={moment(dataReq?.endDate).format(
                        "YYYY-MM-DD"
                      )}
                      placeholder="Ngày bắt đầu"
                      className="w-full p-2 border-2 rounded-sm"
                      onChange={handleUpdateData}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white shadow-[7px_8px_40px_6px_#00000024] p-4">
            <div className="flex h-10 items-center mb-8">
              <div className="h-full w-3 bg-yellow-500 mr-4"></div>
              <h1 className="font-bold text-xl">
                {" "}
                {languageRedux === 1
                  ? "Thời hạn nộp đơn"
                  : "Deadline for submission"}
              </h1>
            </div>
            <div className="relative max-w-[400px] p-2 border-2 rounded-md focus-within:border-yellow-400">
              <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 left-2 bg-white">
                {languageRedux === 1
                  ? "Thời hạn nộp đơn"
                  : "Deadline for submission"}
              </label>
              <div>
                <div className="flex">
                  <input
                    name="expiredDate"
                    type="date"
                    defaultValue={moment(dataReq?.expiredDate).format(
                      "YYYY-MM-DD"
                    )}
                    placeholder="Ngày bắt đầu"
                    className="w-full p-2 border-2 rounded-sm font-semibold"
                    onChange={handleUpdateData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-14 right-24 p-4 transition-all bg-yellow-500 rounded-lg hover:text-black/50 hover:bg-yellow-400"
        onClick={handlePost}
      >
        <h2 className="text-xl font-semibold">
          {languageRedux === 1 ? "Cập nhật" : "Update"}
        </h2>
      </button>
      <ToastContainer />
    </div>
  );
};

export default EditPostedPage;
