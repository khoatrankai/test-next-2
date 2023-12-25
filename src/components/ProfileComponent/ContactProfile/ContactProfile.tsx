import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosClient from "@/configs/axiosClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};
interface IData {
  code: any;
  data: any;
}
const ContactProfile = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const [dataRequest, setDataRequest] = useState<any>();
  const [rsContact, setRSContact] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleUpdate = (e: any) => {
    setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
  };
  const handleUpdateData = () => {
    const fetchData = async () => {
      const res = (await axiosClient.put(
        "https://web-service-tk.onrender.com/api/v1/profiles/con",
        dataRequest
      )) as unknown as IData;
      if (res && res.code === 200) {
        setRSContact(!rsContact);
        handleUpdateApi();
      }
    };
    fetchData();
  };
  const handleBack = () => {
    setDataRequest(dataInfo);
  };

  const handleRsContact = (name: any) => {
    switch (name) {
      case "update":
        setRSContact(!rsContact);
        break;
      case "save":
        handleUpdateData();
        break;
      case "close":
        handleBack();
        setRSContact(!rsContact);
        break;
    }
  };
  useEffect(() => {
    handleBack();
  }, [dataInfo]);
  return (
    <div className="h-fit border-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-4 rounded-xl mb-4 relative">
      <div className="flex justify-between flex-wrap mb-8">
        <div className="flex h-fit items-center">
          <div className="h-10 w-3 bg-yellow-500 mr-4"></div>
          <h1 className="font-bold text-xl">
            {languageRedux === 1 ? `Thông tin liên hệ` : `Contact information`}
          </h1>
        </div>

        {props.checkUpdate === false && (
          <div className="flex gap-2">
            {rsContact ? (
              <>
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1"
                  onClick={() => {
                    handleRsContact("save");
                  }}
                >
                  <Image
                    className="w-4 mr-1"
                    src={"/icontick.svg"}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <h2 className="text-sm font-bold">
                    {languageRedux === 1 ? "Lưu" : "Save"}
                  </h2>
                </button>
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1"
                  onClick={() => {
                    handleRsContact("close");
                  }}
                >
                  <Image
                    className="w-4 mr-1"
                    src={"/iconclose.svg"}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <h2 className="text-sm font-bold">
                    {languageRedux === 1 ? "Thoát" : "Exit"}
                  </h2>
                </button>
              </>
            ) : (
              <button
                className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1"
                onClick={() => {
                  handleRsContact("update");
                }}
              >
                <Image
                  className="w-4 mr-1"
                  src={"/iconwrite.svg"}
                  alt=""
                  width={200}
                  height={200}
                />
                <h2 className="text-sm font-bold">
                  {languageRedux === 1 ? "Sửa" : "Edit"}
                </h2>
              </button>
            )}
          </div>
        )}
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center">
            <label className="basis-1/3 font-medium">
              {languageRedux === 1 ? "Số điện thoại" : "Phone"}
            </label>
            <div className="basis-2/3 font-bold">
              <input
                className={`outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsContact
                    ? "border-dashed  border-black/30"
                    : "bg-transparent"
                }`}
                value={dataRequest?.phone ?? ""}
                name="phone"
                onChange={handleUpdate}
                disabled={!rsContact}
                type="text"
              />
            </div>
          </li>
          <li className="flex items-center">
            <label className="basis-1/3 font-medium">Email</label>
            <div className="basis-2/3 font-bold">
              <input
                className={`outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsContact
                    ? "border-dashed  border-black/30"
                    : "bg-transparent"
                }`}
                value={dataRequest?.email ?? ""}
                name="email"
                onChange={handleUpdate}
                disabled={!rsContact}
                type="text"
              />
            </div>
          </li>
          <li className="flex items-center">
            <label className="basis-1/3 font-medium">Facebook</label>
            <div className="basis-2/3 font-bold">
              <input
                className={`outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsContact
                    ? "border-dashed  border-black/30"
                    : "bg-transparent"
                }`}
                name="facebook"
                value={dataRequest?.facebook ?? ""}
                onChange={handleUpdate}
                disabled={!rsContact}
                type="text"
              />
            </div>
          </li>
          <li className="flex items-center">
            <label className="basis-1/3 font-medium">LinkedIn</label>
            <div className="basis-2/3 font-bold">
              <input
                onChange={handleUpdate}
                className={`outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsContact
                    ? "border-dashed  border-black/30"
                    : "bg-transparent"
                }`}
                value={dataRequest?.linkedin ?? ""}
                name="linkedin"
                disabled={!rsContact}
                type="text"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactProfile;
