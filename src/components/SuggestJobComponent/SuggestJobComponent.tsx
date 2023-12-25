import React, { useState, useEffect } from "react";
import Image from "next/image";
import nearByApi from "@/api/nearby/nearbyApi";
import { useSelector } from "react-redux";
import Link from "next/link";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import { ToastContainer, toast } from "react-toastify";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import LoginIcon from "@mui/icons-material/Login";
import ModalLogin from "../ModalLogin/ModalLogin";
import ShortText from "@/util/ShortText";
type Props = {};

interface ISuggestJob {
  success: boolean;
  data: any;
}

interface IBookmark {
  code: number;
  message: string;
}

const SuggestJobComponent = (props: Props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();

  const [pageNewJob, setPageNewJob] = useState<number>(0);
  const [thresholdNewJob, setThresholdNewJob] = useState<number>(0);
  const [idPrev, setIdPrev] = useState<number>(0);
  const profile = useSelector((state: any) => state.profile.profile);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [listJob, setListJob] = useState<any[]>([]);
  const accountId = localStorage.getItem("accountId");
  const [role, setRole] = useState(0);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = (await nearByApi.getNearByJob(
        profile &&
          profile?.profileLocations?.length > 0 &&
          profile?.profileLocations?.map((item: any) => {
            return item.province.id;
          }),
        null,
        null,
        11,
        thresholdNewJob,
        "vi"
      )) as unknown as ISuggestJob;

      if (res && res.success) {
        setListJob(res.data.posts);
      }
    };
    fetchData();
  }, [thresholdNewJob, bookmarked]);

  const handleNextNewJob = () => {
    setIdPrev(listJob[0].id);
    setThresholdNewJob(listJob[listJob.length - 1].id);
    setPageNewJob(pageNewJob + 1);
  };

  const handlePrevNewJob = () => {
    setThresholdNewJob(idPrev + 1);
  };

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
          setBookmarked(!bookmarked);
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
          setBookmarked(!bookmarked);
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

  useEffect(() => {
    setRole(profile.roleData);
  }, [profile]);

  return role === 0 || role === 1 || role === 2 || role === 3 ? (
    <div className="flex justify-center py-12">
      <div className="w-full max-w-6xl relative">
        <h1 className="font-bold text-2xl mb-8">
          {language === 1 ? `Việc làm gợi ý` : `Suggested jobs`}
        </h1>
        <div className="inline-flex justify-between flex-wrap list-job">
          <ul className="inline-flex flex-wrap justify-center list-job">
            {listJob &&
              listJob.length > 0 &&
              listJob.map((item, index) => (
                <li key={index} className="relative">
                  <Link
                    href={`/post-detail/${item.id}`}
                    className="w-[360px] h-[220px]  bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md px-4 py-6 flex justify-between items-center item-job "
                  >
                    <div className="w-2/12 rounded-sm overflow-hidden">
                      <Image
                        className="w-16 h-16 object-cover"
                        src={
                          item.image
                            ? item.image
                            : "https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png"
                        }
                        alt="anh"
                        width={200}
                        height={200}
                        onError={(e) => {
                          // e.currentTarget.src =
                          //   'https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png';
                        }}
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
                            {item.company_name}
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
                          <p className="text-[9px]">{item?.district}</p>
                        </div>
                        <div className="flex items-center">
                          <Image
                            className="w-4 mr-1"
                            src={"/iconlocation.svg"}
                            alt="anh"
                            width={200}
                            height={200}
                          />
                          <p className="text-[9px]">{item.created_at_text}</p>
                        </div>
                      </div>
                      <div className="inline-flex flex-wrap justify-start gap-1 font-extrabold ">
                        <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                          {handleShortValueNumber(item.salary_min)} -{" "}
                          {handleShortValueNumber(item.salary_max)}{" "}
                          {item.money_type_text}
                        </h3>
                        <h3 className="text-[9px] py-1 px-2 rounded-md min-w-fit bg-slate-50  drop-shadow-xl">
                          {item?.job_type.job_type_name}
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

        {listJob && listJob.length === 0 && <div>Không có dữ liệu</div>}

        {listJob && listJob.length > 0 && (
          <div className="absolute top-0 right-0 flex items-center">
            <a
              className="mr-4 text font-semibold text-red-500 hover-text-red-600"
              href="/more-suggest"
            >
              {language === 1 ? `Xem thêm` : `See more`}
            </a>
            <div className="w-20 flex justify-between">
              <button className="bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group">
                <Image
                  onClick={() => handlePrevNewJob()}
                  className="w-5 group-hover:-ml-1"
                  alt="anh"
                  src={"/iconleft.svg"}
                  width={200}
                  height={200}
                />
              </button>
              <button className="bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group ml-2">
                <Image
                  onClick={() => handleNextNewJob()}
                  className="w-5 group-hover:-mr-1"
                  alt="anh"
                  src={"/iconright.svg"}
                  width={200}
                  height={200}
                />
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <div className="flex justify-center py-12">
        <div className="w-full max-w-6xl relative">
          <h1 className="font-bold text-2xl mb-8">
            {language === 1 ? `Việc làm gợi ý` : `Suggested jobs`}
          </h1>
          <div>
            <div className="flex flex-wrap justify-between">
              {language === 1
                ? "Nhanh chóng tìm được việc làm phù hợp với nhu cầu của bạn."
                : "Quickly find a job that suits your needs."}
              <div
                className="flex gap-2 items-center font-bold text-white bg-black rounded-xl p-3 cursor-pointer"
                onClick={() => {
                  if (role !== 0 && role !== 1 && role !== 2 && role !== 3) {
                    setOpenLogin(true);
                  }
                }}
              >
                <LoginIcon />
                {language === 1 ? "Đăng nhập ngay" : "Login now"}
              </div>
            </div>
          </div>
        </div>
        <ModalLogin
          isOpen={openLogin}
          handleToggleModal={() => setOpenLogin(!openLogin)}
        />
      </div>
    </>
  );
};
export default SuggestJobComponent;
