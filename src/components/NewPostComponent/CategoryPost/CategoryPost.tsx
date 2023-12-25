import axiosClient from "@/configs/axiosClient";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  dataReq: any;
  setDataReq: any;
};
interface ILocation {
  code: number;
  data: any;
}
const CategoryPost = (props: Props) => {
  const btn_add_category = useRef<any>();
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [dataSaveCategory, setDataSaveCategory] = useState<any>([]);
  const [positionCategory, setPositionCategory] = useState<any>({
    parent_category_id: -1,
  });
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );
  const handleChooseCategory = () => {
    let arrData: any = [];
    props.dataReq.categoryIds.forEach((dt: any) => {
      let name = "";
      dataCategory.forEach((dtt: any) => {
        dtt.childs.forEach((dttt: any) => {
          if (dttt.id === dt) {
            name = dttt.name;
          }
        });
      });
      arrData.push({ child_category_id: dt, child_category_name: name });
    });
    setDataSaveCategory(arrData);
  };
  useEffect(() => {
    if (props.dataReq.categoryIds && dataCategory.length > 0) {
      handleChooseCategory();
    }
  }, [dataCategory, props.dataReq]);

  const [tabCategory, setTabCategory] = useState<boolean>(false);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (tabCategory && !btn_add_category.current.contains(e.target)) {
        setTabCategory(false);
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, [tabCategory]);

  useEffect(() => {
    const fetchData = async () => {
      const res2 = (await axiosClient.get(
        `https://web-service-tk.onrender.com/api/v1/categories?lang=${
          languageRedux === 1 ? "vi" : "en"
        }`
      )) as unknown as ILocation;
      if (res2 && res2.code === 200) {
        setDataCategory(res2.data);
      }
    };
    fetchData();
  }, [languageRedux]);

  const handleUpdatePosCategory = (index: number) => {
    setPositionCategory({ parent_category_id: index });
  };
  const handleCheckCategory = (id: number) => {
    const data = dataSaveCategory.filter((dt: any) => {
      return dt.child_category_id === id;
    });
    if (data.length > 0) {
      return true;
    }
    return false;
  };
  const handleUpdateCategory = (e: any, id: number, name: string) => {
    const check = e.target.checked;

    if (!check) {
      props.setDataReq({
        ...props.dataReq,
        categoryIds: props.dataReq.categoryIds.filter((dt: any) => {
          return dt !== id;
        }),
      });
      setDataSaveCategory(
        dataSaveCategory.filter((dt: any) => {
          return dt.child_category_id != id;
        })
      );
    } else {
      props.setDataReq({
        ...props.dataReq,
        categoryIds: [...props.dataReq.categoryIds, id],
      });
      setDataSaveCategory([
        ...dataSaveCategory,
        { child_category_id: id, child_category_name: name },
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-12 bg-white p-4 rounded-lg  shadow-[-10px_8px_40px_6px_#00000024]">
      <div className="flex h-10 items-center">
        <div className="h-full w-3 bg-yellow-500 mr-4"></div>
        <h1 className="text-2xl font-bold">
          {languageRedux === 1 ? "Danh mục" : "Category"}
        </h1>
      </div>
      <div className="rounded-sm max-w-[400px] w-full h-fit border-2 border-dashed p-4 relative flex flex-wrap items-center">
        <label className="mb-1 text-xs text-yellow-400 absolute font-semibold -top-3 left-2 bg-white">
          {languageRedux === 1 ? "Danh mục" : "Category"}
        </label>
        <ul className="flex flex-wrap gap-4 min-h-fit">
          {dataSaveCategory?.map((dt: any, index: number) => {
            return (
              <li
                className="p-2 rounded-lg border-2 h-full w-[10rem] flex justify-center items-center"
                key={index}
              >
                <h2>{dt.child_category_name}</h2>
              </li>
            );
          })}
        </ul>
        <div className="absolute top-0 right-0 z-20" ref={btn_add_category}>
          <Image
            className="w-6 cursor-pointer"
            src={"/iconadd.svg"}
            alt=""
            width={300}
            height={300}
            onClick={() => {
              setTabCategory(!tabCategory);
            }}
          />
          {tabCategory && (
            <div className="absolute">
              <div className="relative">
                <ul
                  className={`h-80 py-4 w-60 transition-all bg-white/95 shadow-[-2px_20px_20px_10px_#00000024] overflow-y-hidden hover:overflow-y-scroll overflow-x-hidden ${
                    positionCategory.parent_category_id >= 0
                      ? " rounded-l-lg"
                      : "rounded-lg"
                  }`}
                >
                  {dataCategory.map((dt: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className={`p-2 cursor-pointer hover:text-yellow-400 hover:font-bold ${
                          index === positionCategory.parent_category_id
                            ? "text-yellow-400 font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          handleUpdatePosCategory(index);
                        }}
                      >
                        <h2>{dt.parent_category}</h2>
                      </li>
                    );
                  })}
                </ul>
                {positionCategory.parent_category_id >= 0 && (
                  <ul
                    className={`py-4 absolute -top-0 -right-full w-60 bg-white h-80 overflow-y-hidden hover:overflow-y-scroll transition-all rounded-r-lg`}
                  >
                    {dataCategory[
                      positionCategory.parent_category_id
                    ]?.childs.map((dt: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className={`p-2 cursor-pointer flex items-center gap-2 hover:text-yellow-400  hover:font-bold`}
                        >
                          <input
                            type="checkbox"
                            checked={handleCheckCategory(dt.id) ?? false}
                            onChange={(e) => {
                              handleUpdateCategory(e, dt.id, dt.name);
                            }}
                          />
                          <h2>{dt.name}</h2>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;
