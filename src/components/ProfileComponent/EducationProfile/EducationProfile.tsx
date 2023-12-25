import React, { useEffect, useState } from "react";
import Image from "next/image";
import EducationModal from "./Modal/EducationModal";
import TimeStamp from "@/util/TimeStamp/TimeStamp";
import axiosClient from "@/configs/axiosClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Validate from "@/util/Validate/Validate";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};
interface IData {
  code: number;
  data: any;
}
const EducationProfile = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const { ModalValidate } = Validate();
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [idRemove, setIdRemove] = useState<any>();
  const { handleConvertToDate } = TimeStamp();
  const [tabModal, setTabModal] = useState<boolean>(false);
  const [positionUpdate, setPositionUpdate] = useState<any>(-1);
  const [typeModal, setTypeModal] = useState<any>("add");
  const [rsEdu, setRSEdu] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const handleAdd = () => {
    setTabModal(true);
    setTypeModal("add");
  };
  const handleRemove = async (id: number) => {
    const res = (await axiosClient.put(
      "https://web-service-tk.onrender.com/api/v1/profiles/edu/d",
      { educationId: id }
    )) as unknown as IData;
    if (res && res.code === 200) {
      handleUpdateApi();
    }
  };
  const handleUpdate = (index: number) => {
    setTabModal(true);
    setTypeModal("update");
    setPositionUpdate(index);
  };
  const handleRsEdu = (name: any) => {
    switch (name) {
      case "update":
        setRSEdu(!rsEdu);
        break;
      case "save":
        setRSEdu(!rsEdu);
        break;
      case "close":
        setRSEdu(!rsEdu);
        break;
    }
  };
  const handleYes = () => {
    handleRemove(idRemove);
    setCheckModal(false);
  };
  const haneleNo = () => {
    setCheckModal(false);
  };
  return (
    <div className="border-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-4 rounded-xl mb-8 relative">
      {checkModal &&
        ModalValidate(
          languageRedux === 1
            ? `Bạn chắc chắn muốn xoá không`
            : `Are you sure you want to delete it?`,
          handleYes,
          haneleNo,
          languageRedux
        )}
      <div className="flex justify-between flex-wrap mb-8">
        <div className="flex h-fit items-center">
          <div className="h-10 w-3 bg-yellow-500 mr-4"></div>
          <h1 className="font-bold text-xl">
            {languageRedux === 1 ? `Trình độ học vấn` : `Academic level`}
          </h1>
        </div>

        <div className="flex gap-2">
          {rsEdu ? (
            <>
              <button
                className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1"
                onClick={() => {
                  handleRsEdu("save");
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
                  handleRsEdu("close");
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
                handleRsEdu("update");
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
      </div>
      <div>
        <ul className="flex flex-col gap-y-8">
          {dataInfo?.profilesEducations?.map((dt: any, index: number) => {
            return (
              <li
                key={index}
                className={`text-xs font-medium pl-2  relative transition-all duration-300 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] group ${
                  rsEdu
                    ? "border-dashed border-black/30 border-2 border-l-4"
                    : " border-transparent border-l-black/30 border-2  border-l-4"
                }`}
              >
                <div>
                  <h2 className="font-bold">{dt?.companyName}</h2>
                  <h2>{dt?.major}</h2>
                  <h2>
                    {handleConvertToDate(dt?.startDate)} -{" "}
                    {handleConvertToDate(dt?.endDate)}
                  </h2>
                  <h2>{dt?.academicType?.value}</h2>
                  <p>{dt?.extraInformation}</p>
                </div>
                {rsEdu && (
                  <div>
                    <button
                      className="absolute top-2 right-2 transition-all hidden group-hover:block"
                      onClick={() => {
                        setIdRemove(dt?.id);
                        setCheckModal(true);
                      }}
                    >
                      <Image
                        className="w-3"
                        src={"/iconclose.svg"}
                        alt=""
                        width={200}
                        height={200}
                      />
                    </button>
                    <button
                      className="absolute bottom-2 right-2 transition-all hidden group-hover:flex items-center hover:font-bold hover:text-yellow-500"
                      onClick={() => {
                        handleUpdate(index);
                      }}
                    >
                      <Image
                        className="w-3 mr-1"
                        src={"/iconwrite.svg"}
                        alt=""
                        width={200}
                        height={200}
                      />
                      <h3>{languageRedux === 1 ? "Sửa" : "Update"}</h3>
                    </button>
                  </div>
                )}

                <div className="w-3 h-3 bg-black rounded-full absolute -top-2 -left-2"></div>
                <div className="w-3 h-3 bg-black rounded-full absolute -bottom-2 -left-2"></div>
              </li>
            );
          })}
        </ul>
      </div>
      {props.checkUpdate === false && (
        <>
          <div className="flex justify-center my-2">
            {rsEdu && (
              <button
                className="flex items-center transition-all duration-300 hover:bg-black/25 p-1 rounded-2xl font-bold"
                onClick={handleAdd}
              >
                <Image
                  className="w-6 p-1 bg-black/20 rounded-full mr-1"
                  src={"/iconadd.svg"}
                  alt=""
                  width={200}
                  height={200}
                />
                <h2>{languageRedux === 1 ? "Thêm" : "Add"}</h2>
              </button>
            )}
          </div>
        </>
      )}

      {tabModal && (
        <EducationModal
          setTabModal={setTabModal}
          dataEducation={
            dataInfo?.profilesEducations.length > 0
              ? dataInfo?.profilesEducations[positionUpdate]
              : null
          }
          handleUpdateApi={handleUpdateApi}
          type={typeModal}
        />
      )}
    </div>
  );
};

export default EducationProfile;
