/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSwiperAutoSlider from "@/util/SwiperAutoSlider";
import { ToastContainer } from "react-toastify";
import apiCompany from "@/api/company/apiCompany";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { analytics } from "@/configs/firebase";
import { logEvent } from "firebase/analytics";
type Props = {};

interface ICompany {
  status: number;
  data: any;
}

const AllCompanyComponent = (props: Props) => {
  const {
    ref_list_slider,
    handleNext,
    checkNext,
    checkPrev,
    handlePrev,
    handleClickDown,
    handleUpData,
    checkClick,
    setCheckClick,
  } = useSwiperAutoSlider(13);
  const [page, setPage] = useState<number>(0);
  const [listCompany, setListCompany] = useState<any[]>([]);
  const router = useRouter();
  const language = useSelector((state: any) => state.changeLaguage.language);

  useEffect(() => {
    handleUpData();
  }, [listCompany]);

  const fetchData = async () => {
    const res = (await apiCompany.getAllCompany(
      page,
      10
    )) as unknown as ICompany;

    if (res && res.status === 200) {
      setListCompany(res.data?.companies);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePrevNewJob = () => {
    setPage(page - 1);
  };

  const handleNextNewJob = () => {
    setPage(page + 1);
  };

  const handleGetData = async (id: number) => {
    logEvent(analytics, "select_company");
    router.push(`/company-detail/${id}`);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="py-10 max-w-6xl w-full overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-2xl">
            {language === 1 ? `Công ty nổi bật` : `Outstanding company`}
          </h1>

          <div className="flex items-center gap-5">
            <div
              className="font-bold text-red-500 cursor-pointer"
              onClick={() => {
                router.push("/company-all");
              }}
            >
              {language === 1 ? "Xem thêm" : "See more"}
            </div>

            <div className="w-20 flex justify-between">
              <button
                className=" bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-lg flex justify-center items-center group"
                onClick={() => {
                  if (page > 0) {
                    handlePrevNewJob();
                  }
                }}
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
                onClick={() => {
                  if ((listCompany.length = 10)) {
                    handleNextNewJob();
                  }
                }}
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
        <div className="relative" style={{ marginBottom: "30px" }}>
          {checkPrev && (
            <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center left-0 w-12 justify-center z-10">
              <button
                className="p-1 border-2 rounded-full transition-all group-hover:p-2"
                onClick={handlePrev}
              >
                <Image
                  className="w-6"
                  src={"/iconleft.svg"}
                  alt="left"
                  width={200}
                  height={200}
                />
              </button>
            </div>
          )}

          <ul
            ref={ref_list_slider}
            className={` select-none inline-flex justify-center`}
            onMouseDown={handleClickDown}
          >
            {listCompany &&
              listCompany?.length > 0 &&
              listCompany.map((item: any, index: number) => (
                <li
                  key={index}
                  className="cursor-pointer w-[220px] h-[208px] rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border-[#dee0e2] flex flex-col border-2 justify-center item-company overflow-hidden hover:border-orange-400"
                  onClick={() => {
                    if (checkClick) {
                      handleGetData(item.id);
                    } else {
                      setCheckClick(true);
                    }
                  }}
                >
                  <div className="basis-7/12 flex items-end justify-center">
                    <img
                      src={
                        item.logoPath
                          ? item.logoPath
                          : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701273430/images/mailchimp/ads_mail/uk1usmfh6phaft7eqo8e.jpg"
                      }
                      className="pointer-events-none w-[180px] h-[96px] rounded-lg object-contain"
                      width={186}
                      height={96}
                      alt="Kinh doanh"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://res.cloudinary.com/ddwjnjssj/image/upload/v1697131521/images/mailchimp/ads_mail/logoCircle.png";
                      }}
                    />
                  </div>

                  <p className="mt-3 font-bold text-center text-sm text-black uppercase flex-1 flex justify-center bg-transparent">
                    {item.name}
                  </p>
                </li>
              ))}
          </ul>
          {checkNext && (
            <div className="absolute group bg-white bg-opacity-20 inset-y-0 flex items-center right-0 w-12 justify-center z-10">
              <button
                className="p-1 border-2 group-hover:p-2 transition-all rounded-full"
                onClick={handleNext}
              >
                <Image
                  className="w-6"
                  src={"/iconright.svg"}
                  alt="right"
                  width={200}
                  height={200}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllCompanyComponent;
