import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./ListJobComponent.scss";
import postsApi from "@/api/posts/postsApi";
import Link from "next/link";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ModalLogin from "../ModalLogin/ModalLogin";
import ShortText from "@/util/ShortText";

type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

const ListJobComponent = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();
  const [pageNewJob, setPageNewJob] = useState<number>(0);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [idPrev, setIdPrev] = useState<number>(0);
  const [listJob, setListJob] = useState<any[]>([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const accountId = localStorage.getItem("accountId");
  const categoryId = useSelector((state: any) => state.categoryId);
  const [categoriesId, setCategoriesId] = useState<string>("");
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const language = useSelector((state: any) => state.changeLaguage.language);

  useEffect(() => {
    setCategoriesId(categoryId);
  }, [categoryId]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await postsApi.getPostNewestV3(
        null,
        Number(categoriesId) ? Number(categoriesId) : null,
        null,
        null,
        12,
        thresholdNewJob,
        language === 1 ? "vi" : "en"
      );

      if (res && res.status === 200) {
        setListJob(res.data);
      }
    };
    fetchData();
  }, [thresholdNewJob, bookmarked, categoriesId, language]);

  const handleNextNewJob = () => {
    setIdPrev(listJob[0]?.id);
    setThresholdNewJob(listJob[listJob.length - 1].id);
    setPageNewJob(pageNewJob + 1);
  };

  const handlePrevNewJob = () => {
    setThresholdNewJob(idPrev + 1);
  };

  // get data when cookie modify

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            language === 1 ? "Lưu bài viết thành công" : "Save post success",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          setBookmarked(!bookmarked);
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        language === 1
          ? "Bạn không thể đánh dấu bài viết của chính mình"
          : "You cannot bookmark your own post",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleDeleteBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.deleteBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            language === 1
              ? "Bỏ lưu bài đăng thành công"
              : "Unsave post success",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          setBookmarked(!bookmarked);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        language === 1
          ? "Bạn không thể xóa bài viết của chính mình"
          : "You cannot delete your own post",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleToggleModal = () => {
    setOpenModalLogin(false);
  };

  return (
    <div className="flex justify-center py-12">
      <div className="w-full max-w-6xl relative">
        <h1 className="font-bold text-2xl mb-8">
          {language === 1 ? `Việc làm mới` : `New job`}
        </h1>
        <div>
          <ul className="inline-flex flex-wrap justify-center list-job">
            {listJob &&
              listJob.length > 0 &&
              listJob.map((item, index) => (
                <li key={index} className="relative">
                  <Link
                    href={`/post-detail/${item.id}`}
                    className="w-[360px] h-[220px]  bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md px-4 py-6 flex justify-between items-center item-job "
                  >
                    <div className="w-2/12">
                      <Image
                        className="w-16 h-16 rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] object-cover"
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
                          <p className="text-[9px]  drop-shadow-xl">
                            {item?.location?.district?.fullName}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Image
                            className="w-4 mr-1"
                            src={"/iconlocation.svg"}
                            alt="anh"
                            width={200}
                            height={200}
                          />
                          <p className="text-[9px]  drop-shadow-xl">
                            {item.createdAtText}
                          </p>
                        </div>
                      </div>
                      <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold">
                        <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                          {handleShortValueNumber(item.salaryMin.toString())} -{" "}
                          {handleShortValueNumber(item.salaryMax.toString())}{" "}
                          {item.moneyType}
                        </h3>
                        <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                          {item?.jobType.name}
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
        </div>
        <div className="absolute top-0 right-0 flex items-center">
          <a
            className="mr-4 text font-semibold text-red-500 hover:text-red-600"
            href="/more-new"
          >
            {language === 1 ? `Xem thêm` : `See more`}
          </a>
          <div className="w-20 flex justify-between">
            <button
              className=" bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group"
              onClick={() => handlePrevNewJob()}
            >
              <Image
                className="w-5 group-hover:-ml-1"
                alt="anh"
                src={"/iconleft.svg"}
                width={200}
                height={200}
              />
            </button>
            <button
              className=" bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group ml-2"
              onClick={() => handleNextNewJob()}
            >
              <Image
                className="w-5 group-hover:-mr-1"
                alt="anh"
                src={"/iconright.svg"}
                width={200}
                height={200}
              />
            </button>
          </div>
        </div>
      </div>
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={handleToggleModal}
      />
      <ToastContainer />
    </div>
  );
};

export default ListJobComponent;
