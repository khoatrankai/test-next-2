import React, { useEffect, useState } from "react";
import "./EducationModal.scss";
import axiosClient from "@/configs/axiosClient";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Validate from "@/util/Validate/Validate";
type Props = {
  type: any;
  dataEducation?: any;
  handleUpdateApi: any;
  setTabModal: any;
};
interface IData {
  status: number;
  data: any;
}
interface IResquest {
  code: number;
  data: any;
}
const EducationModal = (props: Props) => {
  const { dataEducation, handleUpdateApi, type, setTabModal } = props;
  const { ModalValidate } = Validate();
  const [valueNotify, setValueNotify] = useState<any>("Bạn chắc chắn không ?");

  const [checkModal, setCheckModal] = useState<boolean>(false);
  const { handleConvertToDate, handleConvertDateToTimestamp } = TimeStamp();
  const [dataRequest, setDataRequest] = useState<any>();
  const [dataAcademic, setDataAcademic] = useState<any>([]);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleUpdateData = async () => {
    if (type === "add") {
      const res = (await axiosClient.put(
        "https://web-service-tk.onrender.com/api/v1/profiles/edu/c",
        dataRequest
      )) as unknown as IResquest;
      if (res && res.code === 200) {
        handleUpdateApi();
        setTabModal(false);
      }
    } else {
      const res = (await axiosClient.put(
        "https://web-service-tk.onrender.com/api/v1/profiles/edu/u",
        dataRequest
      )) as unknown as IResquest;
      if (res && res.code === 200) {
        handleUpdateApi();
        setTabModal(false);
      }
    }
  };
  const handleUpdate = (e: any) => {
    if (e.target.name === "startDate" || e.target.name === "endDate") {
      setDataRequest({
        ...dataRequest,
        [e.target.name]: handleConvertDateToTimestamp(e.target.value),
      });
    } else {
      handleConvertToDate(dataRequest?.startDate);
      setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
    }
  };
  const handleYes = () => {
    handleUpdateData();
  };
  const haneleNo = () => {
    setCheckModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        "https://web-service-tkv2.onrender.com/api/v3/academic-types"
      )) as unknown as IData;
      if (res && res.status === 200) {
        setDataAcademic(res.data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (type === "update") {
      setDataRequest({ ...dataEducation, educationId: dataEducation?.id });
      setValueNotify(
        languageRedux === 1
          ? `Chắc chắn bạn muốn cập nhật ?`
          : `Sure you want to update?`
      );
    } else {
      setValueNotify(
        languageRedux === 1
          ? `Chắc chắn bạn muốn thêm ?`
          : `Sure you want more ?`
      );
    }
  }, [type, dataEducation]);
  return (
    <>
      {(type === "add" || dataRequest) && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          {checkModal &&
            ModalValidate(valueNotify, handleYes, haneleNo, languageRedux)}
          <div className="h-fit w-full max-w-xl bg-white rounded-md py-8 px-5 flex flex-col gap-y-5">
            <h1 className="font-bold text-lg mb-4 w-full text-center">
              {languageRedux === 1
                ? `Thêm thông tin học vấn`
                : `Add education information`}
            </h1>
            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-11">
              <input
                value={dataRequest?.companyName}
                className={`outline-none bg-transparent inset-0 px-3 absolute duration-100 text-lg  ${
                  dataRequest?.companyName
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
                type="text"
                name="companyName"
                onChange={handleUpdate}
              />
              <h2
                className={`absolute   flex items-center  duration-300 transition-all ${
                  dataRequest?.companyName
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 inset-x-3 inset-y-0 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? `Tên trường` : `School name`}
              </h2>
            </div>
            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-11">
              <input
                value={dataRequest?.major}
                className={`outline-none bg-transparent inset-0 px-3 absolute duration-100 text-lg  ${
                  dataRequest?.major
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
                type="text"
                name="major"
                onChange={handleUpdate}
              />
              <h2
                className={`absolute   flex items-center  duration-300 transition-all ${
                  dataRequest?.major
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 inset-x-3 inset-y-0 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? `Chuyên ngành` : `Major`}
              </h2>
            </div>
            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-11">
              <input
                defaultValue={handleConvertToDate(dataRequest?.startDate)}
                className={`outline-none bg-transparent inset-0 px-3 absolute duration-100 text-lg  ${
                  dataRequest?.startDate
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
                type="date"
                name="startDate"
                onChange={handleUpdate}
              />
              <h2
                className={`absolute   flex items-center  duration-300 transition-all ${
                  dataRequest?.startDate
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 inset-x-3 inset-y-0 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? `Ngày bắt đầu` : `Start date`}
              </h2>
            </div>
            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-11">
              <input
                defaultValue={handleConvertToDate(dataRequest?.endDate)}
                className={`outline-none bg-transparent inset-0 px-3 absolute duration-100 text-lg  ${
                  dataRequest?.endDate
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
                type="date"
                name="endDate"
                onChange={handleUpdate}
              />
              <h2
                className={`absolute   flex items-center  duration-300 transition-all ${
                  dataRequest?.endDate
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 inset-x-3 inset-y-0 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? `Ngày kết thúc` : `End date`}
              </h2>
            </div>
            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-11">
              <select
                value={dataRequest?.academicTypeId}
                onChange={handleUpdate}
                name="academicTypeId"
                className={`outline-none bg-transparent inset-0 px-3 absolute duration-100 text-lg  ${
                  dataRequest?.academicTypeId
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
              >
                {dataAcademic.map((dt: any) => {
                  return (
                    <option value={dt?.id} key={dt?.id} className="p-2">
                      {dt?.data}
                    </option>
                  );
                })}
              </select>
              <h2
                className={`absolute  duration-300 transition-all ${
                  dataRequest?.academicTypeId
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? `Bằng cấp` : `Academic type`}
              </h2>
            </div>
            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-28">
              <textarea
                value={dataRequest?.extraInformation}
                className={`outline-none bg-transparent resize-none inset-0 px-3 h-full absolute duration-100 text-lg py-2  ${
                  dataRequest?.extraInformation
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
                name="extraInformation"
                onChange={handleUpdate}
              />
              <h2
                className={`absolute  duration-300 transition-all ${
                  dataRequest?.extraInformation
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? `Mô tả` : `Description`}
              </h2>
            </div>
            <div className="flex justify-end">
              <button
                className="p-2 rounded-md bg-yellow-500 font-bold mr-2"
                onClick={() => {
                  setCheckModal(true);
                }}
              >
                {type === "add" ? "Thêm" : "Cập nhất"}
              </button>
              <button
                className="p-2  font-bold"
                onClick={() => setTabModal(false)}
              >
                {languageRedux === 1 ? `Hủy` : `Cancel`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationModal;
