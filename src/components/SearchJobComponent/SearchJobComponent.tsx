import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./SearchJobComponent.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { SaveIconFill, SaveIconOutline } from "@/icons";
import bookMarkApi from "@/api/bookmarks/bookMarkApi";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchSearchResult } from "@/redux/reducer/searchReducer";
import { RootState } from "@/redux";
import { useSrollContext } from "@/context/AppProvider";
import ModalLogin from "../ModalLogin/ModalLogin";
import ShortText from "@/util/ShortText";

type Props = {};

interface IBookmark {
  code: number;
  message: string;
}

const SearchJobComponent: React.FC<Props> = (props) => {
  const { handleShortTextHome, handleShortValueNumber } = ShortText();

  const accountId = localStorage.getItem("accountId");
  const searchResult = useSelector(
    (state: any) => state.dataSearchResult.searchResult
  );
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const dispatch = useDispatch();
  const dataRequestObj = JSON.parse(
    localStorage.getItem("dataRequest") || "{}"
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const [page, setPage] = useState(0);
  const [listJob, setListJob] = React.useState<any>([]);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  useEffect(() => {
    setListJob(searchResult.posts);
  }, [searchResult]);
  const { handleLoadHrefPage } = useSrollContext();

  useEffect(() => {
    handleLoadHrefPage();
  }, []);

  const handleBookmarked = (id: number) => {
    try {
      const fetchData = async () => {
        const res = (await bookMarkApi.createBookMark(
          id
        )) as unknown as IBookmark;

        if (res && res.code === 200) {
          toast.success(
            languageRedux === 1
              ? "Lưu bài viết thành công"
              : `Save post success`,
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

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: true } : item
            )
          );
        } else {
          setOpenModalLogin(true);
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        languageRedux === 1
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
            languageRedux === 1
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

          setListJob((prevList: any) =>
            prevList.map((item: any) =>
              item.id === id ? { ...item, bookmarked: false } : item
            )
          );
        }
      };

      fetchData();
    } catch (error) {
      toast.error(
        languageRedux === 1
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

  useEffect(() => {
    const dataObj = dataRequestObj || {};

    const queryParams = {
      q: dataObj.q ? dataObj.q.trim() : null,
      moneyType: dataObj.money_type ? dataObj.money_type : null,
      isWorkingWeekend: dataObj.is_working_weekend
        ? dataObj.is_working_weekend
        : null,
      isDatePeriod: dataObj.is_date_period ? dataObj.is_date_period : null,
      salaryMin: dataObj.salary_min ? dataObj.salary_min : null,
      salaryMax: dataObj.salary_max ? dataObj.salary_max : null,
      jobTypeId: dataObj.jobTypeId ? [dataObj.jobTypeId] : [],
      categoryIds: dataObj.category_ids ? dataObj.category_ids : null,
      districtIds: dataObj.district_ids ? dataObj.district_ids : null,
      salaryType: dataObj.salary_type ? dataObj.salary_type : null,
      lang: "vi",
      page: null,
    };

    dispatch(fetchSearchResult(queryParams) as any);
  }, []);

  const loadMore = async () => {
    if (!loading && hasMoreData) {
      setLoading(true);

      try {
        const dataObj = dataRequestObj || {};

        const queryParams = {
          q: dataObj.q ? dataObj.q.trim() : null,
          moneyType: dataObj.money_type ? dataObj.money_type : null,
          isWorkingWeekend: dataObj.is_working_weekend
            ? dataObj.is_working_weekend
            : null,
          isDatePeriod: dataObj.is_date_period ? dataObj.is_date_period : null,
          salaryMin: dataObj.salary_min ? dataObj.salary_min : null,
          salaryMax: dataObj.salary_max ? dataObj.salary_max : null,
          jobTypeId: dataObj.jobTypeId ? [dataObj.jobTypeId] : [],
          categoryIds: dataObj.category_ids ? dataObj.category_ids : null,
          districtIds: dataObj.district_ids ? dataObj.district_ids : null,
          salaryType: dataObj.salary_type ? dataObj.salary_type : null,
          lang: "vi",
          page: page,
        };

        const response = await dispatch(fetchSearchResult(queryParams) as any);

        if (response) {
          const newPosts = response.payload.posts;

          if (response.payload.is_over === false) {
            setListJob((prevList: any) => [...listJob, ...newPosts]);
            setPage(page + 1);
            setHasMoreData(true);
          } else {
            setHasMoreData(false);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  console.log(listJob)

  return (
    <div className="flex justify-center py-12">
      <div className="w-full max-w-6xl relative">
        <h1 className="font-bold text-2xl mb-3">{`${
          searchResult.total ? searchResult.total : 0
        } kết quả tìm kiếm`}</h1>
        <div>
          <InfiniteScroll
            style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
            dataLength={listJob?.length}
            next={loadMore}
            hasMore={true}
            loader={<></>}
          >
            <ul className="inline-flex flex-wrap justify-center list-job">
              {listJob &&
                listJob.length > 0 &&
                listJob.map((item: any, index: any) => (
                  <li key={index} className="relative">
                    <Link
                      href={`/post-detail/${item.id}`}
                      className="w-[360px] h-[220px]  bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md px-4 py-6 flex justify-between items-center item-job "
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
                            {item?.job_type?.job_type_name}
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
      <ModalLogin
        isOpen={openModalLogin}
        handleToggleModal={() => setOpenModalLogin(!openModalLogin)}
      />
      <ToastContainer />
    </div>
  );
};

export default SearchJobComponent;
