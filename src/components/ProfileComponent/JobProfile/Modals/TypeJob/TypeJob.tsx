import axiosClient from "@/configs/axiosClient";
import { RootState } from "@/redux";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  rsJob: any;
  dataRequest: any;
  setDataRequest: any;
};
interface IData {
  code: any;
  data: any;
}
const TypeJob = (props: Props) => {
  const { rsJob, dataRequest, setDataRequest } = props;
  const [dataType, setDataType] = useState<any>([]);
  const [tabType, setTabType] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        `https://web-service-tk.onrender.com/api/v1/job-types?lang=${
          languageRedux === 1 ? "vi" : "en"
        }`
      )) as unknown as IData;
      if (res && res.code === 200 && res.data) {
        setDataType(res.data);
      }
    };
    fetchData();
  }, [languageRedux]);
  const handleUpdate = (id: any) => {
    setDataRequest({ ...dataRequest, jobTypeId: id });
  };
  const handleCheckName = (id: any) => {
    const data = dataType?.filter((dt: any) => {
      return dt.id === id;
    });
    if (data.length > 0) {
      return data[0].name;
    }
    return languageRedux === 1 ? "Chọn loại" : "Choose type";
  };
  return (
    <div>
      <div className="flex h-10 items-center mb-2">
        <h1 className="font-bold text-base">
          {languageRedux === 1 ? "Loại công việc" : "Type job"}
        </h1>
      </div>
      <div
        onClick={() => {
          if (rsJob) {
            setTabType(!tabType);
          }
        }}
        className={`p-4 border-[1px] border-black/40 max-w-fit relative rounded-2xl ${
          rsJob
            ? "border-dashed cursor-pointer border-black/30 hover:bg-black/5"
            : ""
        }`}
      >
        <h2>{handleCheckName(dataRequest?.jobTypeId)}</h2>

        <div
          className={`absolute  w-40 pt-2 transition-all  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-white rounded-md z-20 left-0 ${
            tabType
              ? "h-fit top-full"
              : "invisible opacity-0 -translate-y-1 h-0"
          }`}
        >
          <ul>
            {dataType.map((dt: any) => {
              return (
                <li key={dt.id} onClick={() => handleUpdate(dt.id)}>
                  <button className="p-2 hover:text-yellow-400 hover:font-bold font-medium">
                    {dt.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TypeJob;
