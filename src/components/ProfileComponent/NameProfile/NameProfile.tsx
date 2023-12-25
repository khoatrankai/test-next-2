import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
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
const NameProfile = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const [rsName, setRSName] = useState<boolean>(false);
  const [dataName, setDataName] = useState<any>({ name: "" });
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleBack = () => {
    setDataName({
      ...dataInfo,
    });
  };
  const handleUpdateData = () => {
    const fetchData = async () => {
      const res = (await axios.put(
        "https://web-service-tk.onrender.com/api/v1/profiles/per",
        dataName,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )) as unknown as IData;
      if (res.code === 200) {
        handleUpdateApi();
      }
    };
    fetchData();
  };
  const handleRsName = (name: any) => {
    switch (name) {
      case "update":
        setRSName(!rsName);
        break;
      case "save":
        handleUpdateData();
        setRSName(!rsName);
        break;
      case "close":
        handleBack();
        setRSName(!rsName);
        break;
    }
  };
  const handleUpdate = (e: any) => {
    setDataName({
      ...dataName,
      name: e.target.value,
    });
  };
  useEffect(() => {
    handleBack();
  }, [dataInfo?.name]);
  return (
    <div className="flex items-center relative mb-16">
      <input
        className={`font-bold text-2xl text-center max-w-fit outline-none border-[1px]  ${
          rsName ? "border-dashed border-black/20" : " border-transparent"
        }`}
        disabled={!rsName}
        value={dataName?.name ?? ""}
        onChange={handleUpdate}
        name="name"
        type="text"
      />
      {props.checkUpdate === false && (
        <div className="absolute left-full max-w-fit flex ">
          <button className="w-8 h-8">
            <Image
              className={`w-8 p-1 border-2 bg-yellow-400 rounded-full transition-all ${
                rsName ? "translate-x-full invisible opacity-0" : ""
              }`}
              src={"/iconwrite.svg"}
              onClick={() => {
                handleRsName("update");
              }}
              width={1000}
              height={1000}
              alt={""}
            />
          </button>
          <button className="w-8 h-8">
            <Image
              className={`w-8 p-1 border-2 bg-yellow-400 rounded-full ${
                rsName ? "" : "invisible opacity-0"
              }`}
              src={"/icontick.svg"}
              onClick={() => {
                handleRsName("save");
              }}
              width={1000}
              height={1000}
              alt={""}
            />
          </button>
          <button className="w-8 h-8">
            <Image
              className={`w-8 p-1 border-2 bg-yellow-400 rounded-full ${
                rsName ? "" : "invisible opacity-0"
              }`}
              src={"/iconclose.svg"}
              onClick={() => {
                handleRsName("close");
              }}
              width={1000}
              height={1000}
              alt={""}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default NameProfile;
