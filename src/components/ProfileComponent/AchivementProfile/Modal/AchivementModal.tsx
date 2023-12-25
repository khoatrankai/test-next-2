import React, { useEffect, useRef, useState } from "react";
import axiosClient from "@/configs/axiosClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Validate from "@/util/Validate/Validate";
type Props = {
  type: any;
  dataAchivement?: any;
  handleUpdateApi: any;
  setTabModal: any;
};
interface IData {
  status: number;
  data: any;
}
interface IResquest {
  statusCode: number;
  data: any;
}
const AchivementModal = (props: Props) => {
  const { ModalValidate } = Validate();
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [valueNotify, setValueNotify] = useState<any>("Bạn chắc chắn không ?");

  const { dataAchivement, handleUpdateApi, type, setTabModal } = props;
  const [dataRequest, setDataRequest] = useState<any>();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleUpdateData = async () => {
    if (type === "add") {
      const res = (await axiosClient.post(
        "https://web-service-tkv2.onrender.com/api/v3/profiles-awards",
        dataRequest
      )) as unknown as IResquest;
      if (res && res.statusCode === 201) {
        handleUpdateApi();
        setTabModal(false);
      }
    } else {
      const res = (await axiosClient.put(
        `https://web-service-tkv2.onrender.com/api/v3/profiles-awards/${dataRequest.id}`,
        {
          title: dataRequest?.title,
          description: dataRequest?.description,
        }
      )) as unknown as IResquest;
      if (res && res.statusCode === 200) {
        handleUpdateApi();
        setTabModal(false);
      }
    }
  };
  const handleUpdate = (e: any) => {
    setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
  };
  const handleYes = () => {
    handleUpdateData();
  };
  const haneleNo = () => {
    setCheckModal(false);
  };
  useEffect(() => {
    if (type === "update") {
      setDataRequest(dataAchivement);
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
  }, [type, dataAchivement]);
  return (
    <>
      {(type === "add" || dataRequest) && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          {checkModal &&
            ModalValidate(valueNotify, handleYes, haneleNo, languageRedux)}

          <div className="h-fit w-full max-w-xl bg-white rounded-md py-8 px-5 flex flex-col gap-y-5">
            <h1 className="font-bold text-lg mb-4 w-full text-center">
              {type === "add"
                ? languageRedux === 1
                  ? "Thêm thông tin kinh nghiệm"
                  : "Add Achivement"
                : languageRedux === 1
                ? "Sửa thông tin kinh nghiệm"
                : `Update Achivement`}
            </h1>
            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-11">
              <input
                value={dataRequest?.title}
                className={`outline-none bg-transparent inset-0 px-3 absolute duration-100 text-lg  ${
                  dataRequest?.title
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
                type="text"
                name="title"
                onChange={handleUpdate}
              />
              <h2
                className={`absolute   flex items-center  duration-300 transition-all ${
                  dataRequest?.title
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 inset-x-3 inset-y-0 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? "Tên giải thưởng" : "Title"}
              </h2>
            </div>

            <div className="px-3 py-2 border-2  duration-300 relative transition-all rounded-md group focus-within:border-yellow-500 h-28">
              <textarea
                value={dataRequest?.description}
                className={`outline-none bg-transparent resize-none inset-0 px-3 h-full absolute duration-100 text-lg py-2  ${
                  dataRequest?.description
                    ? ""
                    : " z-30 group-focus-within:z-0 opacity-0 focus-within:opacity-100"
                }`}
                name="description"
                onChange={handleUpdate}
              />
              <h2
                className={`absolute  duration-300 transition-all ${
                  dataRequest?.description
                    ? "group-focus-within:text-yellow-500 inset-auto z-10 px-1 -top-2 bg-white text-xs font-bold"
                    : "text-black/25 group-focus-within:z-10 group-focus-within:inset-auto group-focus-within:text-yellow-500 group-focus-within:px-1 group-focus-within:-top-2 bg-transparent group-focus-within:bg-white text-lg group-focus-within:text-xs font-semibold group-focus-within:font-bold "
                }`}
              >
                {languageRedux === 1 ? "Mô tả" : "Description"}
              </h2>
            </div>
            <div className="flex justify-end">
              <button
                className="p-2 rounded-md bg-yellow-500 font-bold mr-2"
                onClick={() => {
                  setCheckModal(true);
                }}
              >
                {type === "add"
                  ? languageRedux === 1
                    ? "Thêm"
                    : "Add"
                  : languageRedux === 1
                  ? "Cập nhất"
                  : `Edit`}
              </button>
              <button
                className="p-2  font-bold"
                onClick={() => setTabModal(false)}
              >
                {languageRedux === 1 ? "Hủy" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AchivementModal;
