import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosClient from "@/configs/axiosClient";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};
interface ILocation {
  code: number;
  data: any;
}
const InfoPerson = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const [dataLocation, setDataLocation] = useState<any>([]);
  const [dataRequest, setDataRequest] = useState<any>();
  const [rsInfo, setRSInfo] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleUpdate = (e: any) => {
    switch (e.target.name) {
      case "birthday":
        setDataRequest({
          ...dataRequest,
          [e.target.name]: new Date(e.target.value).getTime(),
        });
        break;
      default:
        setDataRequest({ ...dataRequest, [e.target.name]: e.target.value });
    }
  };
  const rsData = () => {
    setDataRequest(dataInfo);
  };
  const saveData = () => {
    handleUpdateData();
  };
  const handleUpdateData = () => {
    const fetchData = async () => {
      const res = (await axiosClient.put(
        "https://web-service-tk.onrender.com/api/v1/profiles/per",
        dataRequest
      )) as unknown as ILocation;
      if (res && res.code === 200) {
      }
    };
    fetchData();
  };
  useEffect(() => {
    rsData();
  }, [dataInfo]);
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        "https://web-service-tk.onrender.com/api/v1/locations/p"
      )) as unknown as ILocation;
      if (res && res.code === 200) {
        setDataLocation(res.data);
      }
    };
    fetchData();
  }, []);
  const handleRsInfo = (name: any) => {
    switch (name) {
      case "update":
        setRSInfo(!rsInfo);
        break;
      case "save":
        saveData();
        setRSInfo(!rsInfo);
        break;
      case "close":
        setRSInfo(!rsInfo);
        rsData();
        break;
    }
  };

  return (
    <div className="border-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-4 rounded-xl mb-8 relative">
      <div className="mb-8 flex justify-between flex-wrap">
        <div className="flex h-fit items-center ">
          <div className="h-10 w-3 bg-yellow-500 mr-4"></div>
          <h1 className="font-bold text-xl">
            {languageRedux === 1 ? "Thông tin cá nhân" : "Personal information"}
          </h1>
        </div>

        {props.checkUpdate === false && (
          <div className="flex gap-2">
            {rsInfo ? (
              <>
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1"
                  onClick={() => {
                    handleRsInfo("save");
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
                    handleRsInfo("close");
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
                  handleRsInfo("update");
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
        <div className="flex flex-col gap-2">
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-medium">
              {languageRedux === 1 ? "Ngày sinh" : "Birthday"}
            </label>
            <div className="basis-2/3 font-bold">
              <input
                className={`outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                value={moment(dataRequest?.birthday).format("yyyy-MM-DD")}
                name="birthday"
                onChange={handleUpdate}
                disabled={!rsInfo}
                type="date"
              />
            </div>
          </div>
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-medium">
              {languageRedux === 1 ? "Giới tính" : "Sex"}
            </label>
            <div className="basis-2/3 font-bold">
              <select
                name="gender"
                className={` focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 appearance-none ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                value={dataRequest?.gender}
                disabled={!rsInfo}
                onChange={handleUpdate}
              >
                <option value={1}>
                  {languageRedux === 1 ? "Nam" : "Male"}
                </option>
                <option value={0}>
                  {languageRedux === 1 ? "Nữ" : "Female"}
                </option>
              </select>
            </div>
          </div>
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-medium">
              {languageRedux === 1 ? "Địa chỉ" : "Address"}
            </label>
            <div className="basis-2/3 font-bold">
              <select
                value={dataRequest?.address}
                name="address"
                className={`focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 appearance-none ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                onChange={handleUpdate}
                disabled={!rsInfo}
              >
                {dataLocation?.map((dt: any) => {
                  return (
                    <option key={dt.id} value={dt.id}>
                      {dt.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex min-w-fit items-center">
            <label className="basis-1/3 font-medium">
              {languageRedux === 1
                ? "Vị trí ứng tuyển"
                : "Position applied for"}
            </label>
            <div className="basis-2/3 font-bold">
              <input
                value={dataRequest?.jobTypeName ?? ""}
                className={`outline-none focus-within:bg-black/5 border-[1px] w-full rounded-lg p-1 ${
                  rsInfo ? "border-dashed border-black/30" : "bg-transparent"
                }`}
                name="jobTypeName"
                onChange={handleUpdate}
                disabled={!rsInfo}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPerson;
