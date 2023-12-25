import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
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
    <div className="flex flex-col gap-y-6">
      <div
        className="rounded-full object-contain w-full overflow-hidden shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
        onClick={() => {
          useRefAvatar.current.click();
        }}
      >
        <Image
          className="w-full h-full"
          src={imageAvatar ? imageAvatar : "/goapply.png"}
          width={"1000"}
          height={"1000"}
          alt=""
        />
        <input
          type="file"
          hidden
          ref={useRefAvatar}
          onChange={handleUploadImage}
        />
      </div>
      <div className="flex flex-col">
        <input
          className="bg-transparent outline-none border-[1px] border-dashed p-2 focus-within:border-black text-xl text-center"
          placeholder="Name"
          name="name"
          defaultValue={data?.name}
          onChange={(e: any) => {
            handleChange(e);
          }}
        />
        <input
          className="bg-transparent outline-none border-[1px] border-dashed p-2 focus-within:border-black text-sm text-center"
          placeholder="Mục tiêu"
          name="intent"
          defaultValue={data?.intent}
          onChange={(e: any) => {
            handleChange(e);
          }}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="uppercase text-base text-center w-full font-semibold p-2 border-2 border-black">
          thông tin cá nhân
        </div>
        <div className="flex items-start gap-1 w-full">
          <MdMailOutline className="h-full text-2xl" />
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
        </div>
        <div className="flex items-start gap-1 w-full">
          <FaPhoneAlt className="h-full text-2xl" />
          <input
            placeholder="Số điện thoại"
            defaultValue={data?.phone}
            name="phone"
            onChange={handleChange}
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </div>
        <div className="flex items-start gap-1 w-full">
          <FaFacebook className="h-full text-2xl" />
          <input
            onChange={handleChange}
            defaultValue={data?.link}
            name="link"
            placeholder="Facebook.com/"
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </div>
        <div className="flex items-start gap-1 w-full">
          <IoLocationSharp className="h-full text-2xl" />
          <input
            defaultValue={data?.address}
            onChange={handleChange}
            name="address"
            placeholder="Địa chỉ"
            className={`  resize-none text-sm w-full bg-transparent outline-none border-[1px] border-transparent  focus-within:border-transparent focus-within:hover:border-transparent p-1 border-dashed ${
              type === 0 ? "hover:border-white/30 " : "hover:border-black/30 "
            }`}
          />
        </div>
        {data?.moreCvInformations.map((dt: any, i: any) => {
          return (
            <div
              className="flex items-start gap-1 w-full relative"
              onClick={() => {
                setItemFocus(i);
              }}
            >
              <MdContentCopy className="h-full text-2xl" />
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypeInfoPerson;
