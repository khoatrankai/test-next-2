import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import SwiperText from '@/util/SwiperText';
import axios from 'axios';
import axiosClient from '@/configs/axiosClient';
import categoryApi from '@/api/category/categoryApi';
import {RootState} from '@/redux';
import {useSelector} from 'react-redux';
import {ListCateIcon} from '@/icons';

type Props = {
  checkSizeMin: any;
  dataRequest: any;
  setDataRequest: any;
};
interface IData {
  code: any;
  data: any;
}
const PositionJob = (props: Props) => {
  const ref_category = useRef<any>();
  const {dataRequest, setDataRequest, checkSizeMin} = props;
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [positionCategory, setPostionCategory] = useState<number>(-1);
  const [tabCategory, setTabCategory] = useState<boolean>(false);
  const dataRequestObj = JSON.parse(
    localStorage.getItem('dataRequest') || '{}',
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {ref_location, maxItem, countList, handleResize, checkMax} =
    SwiperText();

  useEffect(() => {
    const handleBlurTab = (e: any) => {
      if (
        !ref_category.current.contains(e.target) &&
        e.target.parentElement?.name !== 'btn_close_filter'
      ) {
        setTabCategory(false);
      }
    };
    document.addEventListener('click', handleBlurTab);
    return () => {
      document.removeEventListener('click', handleBlurTab);
    };
  }, [tabCategory]);
  useEffect(() => {
    const fetchData = async () => {
      const res = (await categoryApi.getAllCategorise(
        languageRedux === 1 ? 'vi' : 'en',
      )) as unknown as IData;
      if (res?.code === 200 && res?.data) {
        setDataCategory(res?.data);
      }
    };
    fetchData();
  }, [languageRedux]);
  useEffect(() => {
    handleResize();
  }, [dataCategory, dataRequest]);

  const handleUpdate = (id: number) => {
    const data = dataRequest?.category_ids?.filter((dt: any) => {
      return dt === id;
    });
    if (data?.length > 0) {
      setDataRequest({
        ...dataRequest,
        category_ids: dataRequest?.category_ids?.filter((dt: any) => {
          return dt !== id;
        }),
      });
    } else {
      if (dataRequest?.category_ids) {
        setDataRequest({
          ...dataRequest,
          category_ids: [...dataRequest.category_ids, id],
        });
      } else {
        setDataRequest({
          ...dataRequest,
          category_ids: [id],
        });
      }
    }
  };
  const handleCheckTick = (id: number) => {
    const data = dataRequest?.category_ids?.filter((dt: any) => {
      return dt === id;
    });
    if (data?.length > 0) {
      return true;
    }
    return false;
  };
  const handleChangeCategory = (value: any) => {
    setPostionCategory(value);
  };
  const handleCheckName = (id: any) => {
    let name = '';
    dataCategory.map((dt: any) => {
      dt.childs.map((dtt: any) => {
        if (dtt.id === id) {
          name = dtt.name;
          return;
        }
      });
    });
    return name;
  };

  useEffect(() => {
    setDataRequest({
      ...dataRequest,
      category_ids: dataRequestObj.category_ids,
    });
  }, []);

  return (
    <div
      className={`items-center flex border-black/30 border-[1px] p-1.5 h-12 rounded-2xl justify-between relative ${
        checkSizeMin ? 'w-full' : 'w-[32%] min-w-[302px]'
      }`}
      onClick={() => {
        setTabCategory(!tabCategory);
      }}
      ref={ref_category}
    >
      <div className="w-6 mx-2">
        <ListCateIcon />
      </div>
      <div className="flex-1 overflow-hidden h-full flex items-center">
        {(!dataRequest?.category_ids ||
          dataRequest?.category_ids.length === 0) && (
          <h2>{languageRedux === 1 ? 'Danh mục' : 'Category'}</h2>
        )}
        <ul className="flex gap-2 h-full" ref={ref_location}>
          {dataRequest?.category_ids?.map((dt: any, index: number) => {
            return (
              <li
                key={dt}
                className={`px-2 min-w-fit items-center py-1.5 bg-gray-200 rounded-xl item-location flex ${
                  index <= countList ? '' : 'invisible absolute'
                }`}
              >
                <h2 className="mr-1 text-sm">{handleCheckName(dt)}</h2>
                <button
                  name="btn_close_filter"
                  onClick={(e: any) => {
                    e.stopPropagation();

                    handleUpdate(dt);
                  }}
                >
                  <Image
                    className="w-2"
                    src={'/iconclose.svg'}
                    alt=""
                    width={200}
                    height={200}
                  />
                </button>
              </li>
            );
          })}

          {checkMax && (
            <li className="flex min-w-[50px] py-1.5  items-center justify-center bg-gray-200 rounded-xl">
              <h2 className="mr-1 text-sm">+{maxItem - countList}...</h2>
            </li>
          )}
        </ul>
      </div>
      <button>
        <Image
          className={`w-5 transition-transform duration-300 ${
            tabCategory && '-rotate-90'
          }`}
          src={'/iconleft.svg'}
          alt=""
          width={200}
          height={200}
        />
      </button>
      <div
        className={`absolute right-0 left-0 py-4 rounded-md z-10 bg-slate-100 border-2 transition-transform duration-300 top-12 ${
          tabCategory ? '' : 'invisible -translate-y-2 opacity-0'
        }`}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <button
          className={`group ml-2 mb-2 flex items-center hover:ml-[0.45rem] ${
            positionCategory != -1 ? '' : 'hidden'
          }`}
          onClick={() => {
            handleChangeCategory(-1);
          }}
        >
          <Image
            className="w-5 "
            alt=""
            width={200}
            height={200}
            src={'/iconleft.svg'}
          />
          <h2 className="group-hover:font-medium">
            {languageRedux === 1 ? 'Back' : 'Quay lại'}
          </h2>
        </button>

        <h1
          className={`ml-2 mb-2 font-bold  ${
            positionCategory != -1 ? 'hidden' : ''
          }`}
        >
          {languageRedux === 1 ? 'Choose category' : 'Chọn danh mục'}
        </h1>

        <ul
          className={`w-full h-80 relative ${
            positionCategory === -1 ? 'overflow-scroll overflow-x-hidden' : ''
          }`}
        >
          {dataCategory.map((dt: any, index: number) => {
            return (
              <li
                key={dt.parent_category_id}
                className={`px-5 h-10 flex items-center justify-between cursor-pointer group ${
                  positionCategory === -1 ? ' hover:bg-slate-200' : ''
                }`}
                onClick={() => {
                  handleChangeCategory(index);
                }}
              >
                <h2 className={`${positionCategory === -1 ? '' : 'hidden'}`}>
                  {dt.parent_category}
                </h2>
                <Image
                  className={`w-4 group-hover:-mr-[2px] ${
                    positionCategory === -1 ? '' : 'hidden'
                  }`}
                  alt=""
                  width={200}
                  height={200}
                  src={'/iconright.svg'}
                />
                <ul
                  className={`absolute overflow-y-scroll inset-y-0 w-full bg-slate-100 right-0 transition-all cursor-default ${
                    positionCategory === index
                      ? 'opacity-1 right-0'
                      : 'opacity-0 right-[-100%] invisible'
                  }`}
                >
                  {dt.childs.map((data: any, i: number) => {
                    return (
                      <li
                        key={data.id}
                        className="flex h-10 items-center px-4 hover:bg-slate-200 cursor-pointer"
                        onClick={() => {
                          handleUpdate(data.id);
                        }}
                      >
                        <input
                          checked={handleCheckTick(data.id)}
                          onChange={() => {
                            handleUpdate(data.id);
                          }}
                          className="mr-2"
                          type="checkbox"
                        />
                        <h2>{data.name}</h2>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PositionJob;
