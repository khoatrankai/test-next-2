import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axiosClient from "@/configs/axiosClient";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};

const AvatarProfile = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const ref_avatar = useRef<any>();
  const [dataImg, setDataImg] = useState<any>(dataInfo?.avatarPath);
  const handleClickUp = () => {
    ref_avatar.current.click();
  };
  interface IData {
    data: any;
    code: any;
  }
  const handleUpdateData = (value: any) => {
    const formData = new FormData();
    formData.append("images", value);
    const fetchData = async () => {
      const res = (await axiosClient.put(
        "https://web-service-tk.onrender.com/api/v1/profiles/avt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )) as unknown as IData;
      if (res && res.code === 200) {
        handleUpdateApi();
      }
    };
    fetchData();
  };

  const handleUpdateImage = (e: any) => {
    const file = e.target.files[0];
    const readerImg = new FileReader();
    if (file) {
      readerImg.readAsDataURL(file);
    }
    readerImg.addEventListener("load", function () {
      const buffer = readerImg.result;
      setDataImg(buffer);
      handleUpdateData(file);
    });
  };
  useEffect(() => {
    setDataImg(dataInfo?.avatarPath);
  }, [dataInfo?.avatarPath]);
  return (
    <div className="relative w-fit mb-6">
      <Image
        className="w-32 h-32 rounded-full border-2"
        src={dataImg ?? "/iconuser.svg"}
        width={1000}
        height={1000}
        alt={""}
      />
      <input
        type="file"
        ref={ref_avatar}
        onClick={() => {}}
        hidden
        onChange={handleUpdateImage}
      />
      {props.checkUpdate === false && (
        <button
          className="cursor-pointer absolute bottom-3 right-1"
          onClick={handleClickUp}
        >
          <Image
            className="w-9 bg-white border-2 transition-all rounded-full hover:w-10"
            src={"/iconcamera.svg"}
            width={1000}
            height={1000}
            alt={""}
          />
        </button>
      )}
    </div>
  );
};

export default AvatarProfile;
