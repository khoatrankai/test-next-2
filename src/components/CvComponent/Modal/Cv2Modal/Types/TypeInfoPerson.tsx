import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LocationIcon } from "@/icons/iconCV";
import imageCompression from "browser-image-compression";

type Props = {
  data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
};

const TypeInfoPerson = (props: Props) => {
  const useRefAvatar = useRef<any>();
  const { data, handleUpdateData, index, type, checkFocus } = props;
  const [imageAvatar, setImgAvatar] = useState<any>();
  const [itemFocus, setItemFocus] = useState<any>(-1);

  const handleChange = (e: any) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    handleUpdateData(newData, type, index);
  };
  const handleChangeMore = (e: any, i: number) => {
    let newData = JSON.parse(JSON.stringify(data.moreCvInformations));
    newData[i] = { ...newData[i], [e.target.name]: e.target.value };
    const dataReq = { ...data, moreCvInformations: newData };
    handleUpdateData(dataReq, type, index);
  };
  const handleDelete = (i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    newData?.moreCvInformations.splice(i, 1);
    handleUpdateData(newData, type, index);
  };
  const handleUploadImage = (e: any) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 840,
    };

    const file = e.target.files[0];
    const reader = new FileReader();
    const readerImg = new FileReader();
    if (e.target.files[0]) {
      reader.readAsArrayBuffer(file);
      readerImg.readAsDataURL(file);
    }
    readerImg.addEventListener("load", function () {
      const buffer = readerImg.result;
      setImgAvatar(buffer);
    });
    reader.addEventListener("load", async function () {
      const compressedImages = [];
      const compressedImage = await imageCompression(file, options);
      compressedImages.push(
        new File([compressedImage], compressedImage.name, {
          type: compressedImage.type,
        })
      );
      handleUpdateData({ ...data, avatar: compressedImages }, type, index);
    });
  };

  useEffect(() => {
    if (Array.isArray(data?.avatar)) {
      const readerImg = new FileReader();
      readerImg.readAsDataURL(data.avatar[0]);
      readerImg.addEventListener("load", function () {
        const buffer = readerImg.result;
        setImgAvatar(buffer);
      });
    } else {
      setImgAvatar(data?.avatar);
    }
  }, [data]);
  return (
    <>
      <h2 className=" text-lg font-bold">THÔNG TIN CÁ NHÂN</h2>
      <div className="h-56 mb-4">
        <div className="w-full h-full bg-white flex justify-center items-center  border-2 rounded-md overflow-hidden object-contain">
          <div
            className="flex flex-col justify-center items-center cursor-pointer  select-none w-full h-full"
            onClick={() => {
              useRefAvatar.current.click();
            }}
          >
            <Image
              className={`  cursor-pointer pointer-events-none peer ${
                imageAvatar ? "w-full h-full" : "w-10"
              }`}
              alt=""
              src={imageAvatar ? imageAvatar : "/iconcamera.svg"}
              width={"1000"}
              height={"1000"}
            />

            <h3
              className={`text-sm peer-hover:font-bold hover:font-bold text-black ${
                imageAvatar ? "hidden" : ""
              }`}
            >
              Chọn vào hoặc thả ảnh
            </h3>
          </div>

          <input
            type="file"
            hidden
            ref={useRefAvatar}
            onChange={handleUploadImage}
          />
        </div>
      </div>

      <ul className="w-full px-[5px] flex flex-col gap-y-2">
        <li className="flex items-start gap-1 w-full">
          <Image
            className="w-5 pt-1"
            alt=""
            src={"/iconmail.svg"}
            width={200}
            height={200}
          />
          <input
            placeholder="Email"
            name="email"
            defaultValue={data?.email}
            onChange={(e: any) => {
              handleChange(e);
            }}
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </li>
        <li className="flex items-start gap-1 w-full">
          <Image
            className="w-5 pt-1"
            alt=""
            src={"/iconuser.svg"}
            width={200}
            height={200}
          />
          <input
            placeholder="Name"
            name="name"
            defaultValue={data?.name}
            onChange={(e: any) => {
              handleChange(e);
            }}
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </li>
        <li className="flex items-start gap-1 w-full">
          <Image
            className="w-5 pt-1"
            alt=""
            src={"/iconintent.svg"}
            width={200}
            height={200}
          />
          <input
            placeholder="Mục tiêu"
            name="intent"
            defaultValue={data?.intent}
            onChange={(e: any) => {
              handleChange(e);
            }}
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </li>
        <li className="flex items-start gap-1 w-full">
          <Image
            className="w-5 pt-1"
            alt=""
            src={"/iconphone.svg"}
            width={200}
            height={200}
          />
          <input
            placeholder="Số điện thoại"
            defaultValue={data?.phone}
            name="phone"
            onChange={handleChange}
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </li>
        <li className="flex items-start gap-1 w-full">
          <Image
            className="w-5 pt-1"
            alt=""
            src={"/iconfb.svg"}
            width={200}
            height={200}
          />
          <input
            onChange={handleChange}
            defaultValue={data?.link}
            name="link"
            placeholder="Facebook.com/"
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </li>
        <li className="flex items-start gap-1 w-full">
          <span className="w-6 pt-1">
            <LocationIcon color={"#000000"} />
          </span>

          <input
            defaultValue={data?.address}
            onChange={handleChange}
            name="address"
            placeholder="Địa chỉ"
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </li>
        {data?.moreCvInformations?.map((dt: any, i: any) => {
          return (
            <li
              className="flex items-start gap-1 w-full relative"
              onClick={() => {
                setItemFocus(i);
              }}
            >
              <Image
                className="w-5 pt-1"
                alt=""
                src={"/iconadd.svg"}
                width={200}
                height={200}
              />

              <input
                defaultValue={dt?.content}
                onChange={(e: any) => {
                  handleChangeMore(e, i);
                }}
                name="content"
                placeholder="Nội dung thêm"
                className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] p-1 border-dashed ${
                  itemFocus === i && checkFocus
                    ? "border-white/30"
                    : " hover:border-white/30 focus-within:border-white/30 border-transparent"
                }
                
                `}
              />
              <div
                className={`absolute -top-8 flex  gap-x-1 -right-1 ${
                  itemFocus === i && checkFocus ? "" : "hidden"
                }`}
              >
                <button
                  className={` bg-white rounded-md w-7 h-7 border-2`}
                  onClick={(e: any) => {
                    handleDelete(i);
                  }}
                >
                  <div className="p-2">
                    <Image
                      className="pointer-events-none"
                      src={"/icondelete.svg"}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TypeInfoPerson;
