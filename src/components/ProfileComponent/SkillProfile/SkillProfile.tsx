import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosClient from "@/configs/axiosClient";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
type Props = {
  dataInfo: any;
  handleUpdateApi: any;
  checkUpdate: boolean;
};
interface IData {
  statusCode: any;
  data: any;
}

const SkillProfile = (props: Props) => {
  const { dataInfo, handleUpdateApi } = props;
  const [rsSkill, setSkill] = useState<boolean>(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const [dataRequest, setDataRequest] = useState<any>([]);
  const [dataAdd, setDataAdd] = useState<any>([]);
  const [dataRemove, setDataRemove] = useState<any>({ ids: [] });
  const [dataLevel, setDataLevel] = useState<any>([]);
  useEffect(() => {
    setDataLevel([
      { id: 9, name: languageRedux === 1 ? "Tập sự" : "Beginner" },
      { id: 10, name: languageRedux === 1 ? "Sơ cấp" : "Elementary" },
      { id: 11, name: languageRedux === 1 ? "Kinh nghiệm" : "Experienced" },
      { id: 12, name: languageRedux === 1 ? "Thành thạo" : "Proficient" },
      { id: 13, name: languageRedux === 1 ? "Chuyên gia" : "Expert" },
    ]);
  }, [languageRedux]);

  const handleCheckSame = (name: string, level: number) => {
    const dataArr = [...dataRequest, ...dataAdd];
    let keyMain = name + "|" + level;

    let seen = new Set();
    seen.add(keyMain);
    let duplicates = [];

    for (let item of dataArr) {
      let key = item.skillName + "|" + item.skillLevelId;
      if (seen.has(key)) {
        duplicates.push(item);
      }
    }
    if (duplicates.length > 1) {
      return true;
    }
    return false;
  };
  const handleUpdateRequest = (index: number, e: any, value?: number) => {
    switch (e.target.name) {
      case "skillName":
        setDataRequest(
          dataRequest.map((dt: any, i: number) => {
            if (i === index) {
              dt.skillName = e.target.value;
              dt.api = true;
              return dt;
            }
            return dt;
          })
        );
        break;
      case "skillLevelId":
        setDataRequest(
          dataRequest.map((dt: any, i: number) => {
            if (i === index) {
              dt.skillLevelId = value;
              dt.api = true;
              return dt;
            }
            return dt;
          })
        );
        break;
      default:
        setDataRequest(
          dataRequest.filter((dt: any, i: number) => {
            return i !== index;
          })
        );
        const data = dataRequest.filter((dt: any, i: number) => {
          return i === index;
        });
        if (dataRemove.ids.length > 0) {
          setDataRemove({ ids: [...dataRemove.ids, data[0].id] });
        } else {
          setDataRemove({ ids: [data[0].id] });
        }
    }
  };
  useEffect(() => {
    const newData = dataInfo?.profilesSkills.map((dt: any) => {
      return { ...dt, api: false };
    });
    setDataRequest(newData);
  }, [dataInfo?.profilesSkills]);
  const handleCheckNameLevel = (id: number) => {
    const data = dataLevel.filter((dt: any) => {
      return dt.id === id;
    });
    return data[0]?.name;
  };
  const handleUpdateAdd = (index: number, e: any, value?: number) => {
    if (e.target.name === "skillName") {
      setDataAdd(
        dataAdd.map((dt: any, i: number) => {
          if (i === index) {
            dt.skillName = e.target.value;
            return dt;
          }
          return dt;
        })
      );
    } else {
      if (e.target.name === "skillLevelId") {
        setDataAdd(
          dataAdd.map((dt: any, i: number) => {
            if (i === index) {
              dt.skillLevelId = value;
              return dt;
            }
            return dt;
          })
        );
      } else {
        setDataAdd(
          dataAdd.filter((dt: any, i: number) => {
            return i !== index;
          })
        );
      }
    }
  };
  const handleAdd = () => {
    setDataAdd([...dataAdd, { skillName: "", skillLevelId: 9 }]);
  };
  const handleApiUpdate = async () => {
    let res = 200;
    for (let i of dataRequest) {
      const data = await fetchUpdata(i);
      if (!data) {
        res = 0;
      }
    }
    return res;
  };
  const fetchUpdata = async (dt: any) => {
    let check = true;
    if (dt.api) {
      const resUp = (await axiosClient.put(
        `https://web-service-tkv2.onrender.com/api/v3/profiles-skills/${dt.id}`,
        { skillName: dt.skillName, skillLevelId: dt.skillLevelId }
      )) as unknown as IData;
      if (resUp.statusCode !== 200) {
        check = false;
      }
    }
    return check;
  };
  const handleApiCreate = async () => {
    let res = 201;
    for (let i of dataAdd) {
      const data = await fetchCreatedata(i);
    }
    return res;
  };
  const fetchCreatedata = async (dt: any) => {
    const resUp = (await axiosClient.post(
      "https://web-service-tkv2.onrender.com/api/v3/profiles-skills",
      dt,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )) as unknown as IData;
    if (resUp.statusCode === 201 && resUp) {
      return true;
    }
    return false;
  };
  const handleUpdateData = () => {
    const fetchData = async () => {
      let resRemove = { statusCode: 200, data: [] };
      if (dataRemove.ids.length > 0) {
        resRemove = (await axiosClient.delete(
          "https://web-service-tkv2.onrender.com/api/v3/profiles-skills/remove",
          { data: dataRemove }
        )) as unknown as IData;
      }

      if (resRemove.statusCode === 200 && resRemove) {
        setDataRemove({ ids: [] });
        const resUp = await handleApiUpdate();
        if (resUp === 200) {
          const resCre = await handleApiCreate();
          if (resCre === 201) {
            setDataAdd([]);
            handleUpdateApi();
            setSkill(!rsSkill);
          }
        }
      }
    };
    fetchData();
  };
  function checkDuplicates(arr: any) {
    let seen = new Set();
    let duplicates = [];

    for (let item of arr) {
      let key = item.skillName + "|" + item.skillLevelId;
      if (seen.has(key)) {
        duplicates.push(item);
      } else {
        seen.add(key);
      }
    }

    return duplicates;
  }
  const handleRsSkill = (name: any) => {
    switch (name) {
      case "update":
        setSkill(!rsSkill);
        break;
      case "save":
        const dataarr = [...dataRequest, ...dataAdd];
        if (checkDuplicates(dataarr).length === 0) handleUpdateData();
        break;
      case "close":
        setSkill(!rsSkill);
        break;
    }
  };
  return (
    <div className="h-fit border-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-4 rounded-xl mb-4 relative">
      <div className="flex justify-between flex-wrap mb-8">
        <div className="flex h-fit items-center">
          <div className="h-10 w-3 bg-yellow-500 mr-4"></div>
          <h1 className="font-bold text-xl">
            {languageRedux === 1 ? "Kỹ năng" : "Skill"}
          </h1>
        </div>

        {props.checkUpdate === false && (
          <div className="flex gap-2">
            {rsSkill ? (
              <>
                <button
                  className="w-fit flex items-center hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg p-1"
                  onClick={() => {
                    handleRsSkill("save");
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
                    handleRsSkill("close");
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
                  handleRsSkill("update");
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
        <ul className="flex flex-col gap-y-2">
          {dataRequest?.map((dt: any, index: number) => {
            return (
              <li
                key={index}
                className={`border-2  rounded-lg p-2 relative group ${
                  handleCheckSame(dt.skillName, dt.skillLevelId)
                    ? "border-red-500"
                    : " border-transparent focus-within:border-black/20 hover:border-black/20"
                }`}
              >
                <input
                  className={`text-base w-full outline-none border-[1px] p-1 border-transparent border-dashed ${
                    rsSkill
                      ? `hover:border-black/10 focus-within:border-black/10`
                      : ""
                  }`}
                  name="skillName"
                  onChange={(e) => {
                    handleUpdateRequest(index, e);
                  }}
                  value={dt?.skillName}
                  disabled={!rsSkill}
                  placeholder={
                    languageRedux === 1 ? "Tên kỹ năng" : "Skill name"
                  }
                />

                <div
                  className={`text-base w-full mb-2 outline-none border-[1px] p-1 border-transparent border-dashed ${
                    rsSkill
                      ? "hover:border-black/10 focus-within:border-black/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <h2 className="text-gray-400 mr-1">
                      {languageRedux === 1 ? "Cấp độ:" : "Level:"}
                    </h2>
                    <h2 className="font-bold">
                      {handleCheckNameLevel(dt?.skillLevelId)}
                    </h2>
                  </div>
                  <div>
                    <ul className="w-full flex">
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateRequest(index, e, 9);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all ${
                            dt.skillLevelId === 9
                              ? " bg-blue-600"
                              : rsSkill && "hover:bg-blue-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateRequest(index, e, 10);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 10
                              ? "bg-green-600"
                              : rsSkill && "hover:bg-green-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateRequest(index, e, 11);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 11
                              ? "bg-yellow-600"
                              : rsSkill && "hover:bg-yellow-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateRequest(index, e, 12);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 12
                              ? "bg-orange-600"
                              : rsSkill && "hover:bg-orange-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateRequest(index, e, 13);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 13
                              ? "bg-red-600"
                              : rsSkill && "hover:bg-red-500"
                          }`}
                        ></button>
                      </li>
                    </ul>
                  </div>
                </div>
                {rsSkill && (
                  <button
                    className="p-2 rounded-full absolute hidden -top-3 -right-3 bg-white border-2 group-hover:block"
                    name="deleteSkill"
                    onClick={(e) => {
                      handleUpdateRequest(index, e);
                    }}
                  >
                    <Image
                      className="w-4"
                      src={"/iconclose.svg"}
                      alt=""
                      width={200}
                      height={200}
                    />
                  </button>
                )}
              </li>
            );
          })}
          {dataAdd.map((dt: any, index: number) => {
            return (
              <li
                key={index}
                className={`border-2  rounded-lg p-2 relative group ${
                  handleCheckSame(dt.skillName, dt.skillLevelId)
                    ? "border-red-500"
                    : " border-transparent focus-within:border-black/20 hover:border-black/20"
                }`}
              >
                <input
                  className={`text-base w-full outline-none border-[1px] p-1 border-transparent border-dashed ${
                    rsSkill
                      ? "hover:border-black/10 focus-within:border-black/10"
                      : ""
                  }`}
                  name="skillName"
                  onChange={(e) => {
                    handleUpdateAdd(index, e);
                  }}
                  value={dt?.skillName}
                  disabled={!rsSkill}
                  placeholder={
                    languageRedux === 1 ? "Tên kỹ năng" : "Skill name"
                  }
                />

                <div
                  className={`text-base w-full mb-2 outline-none border-[1px] p-1 border-transparent border-dashed ${
                    rsSkill
                      ? "hover:border-black/10 focus-within:border-black/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <h2 className="text-gray-400 mr-1">
                      {languageRedux === 1 ? "Cấp độ:" : "Level:"}
                    </h2>
                    <h2 className="font-bold">
                      {handleCheckNameLevel(dt?.skillLevelId)}
                    </h2>
                  </div>
                  <div>
                    <ul className="w-full flex">
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateAdd(index, e, 9);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all ${
                            dt.skillLevelId === 9
                              ? " bg-blue-600"
                              : rsSkill && "hover:bg-blue-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateAdd(index, e, 10);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 10
                              ? "bg-green-600"
                              : rsSkill && "hover:bg-green-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateAdd(index, e, 11);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 11
                              ? "bg-yellow-600"
                              : rsSkill && "hover:bg-yellow-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateAdd(index, e, 12);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 12
                              ? "bg-orange-600"
                              : rsSkill && "hover:bg-orange-500"
                          }`}
                        ></button>
                      </li>
                      <li className="basis-1/5">
                        <button
                          onClick={(e) => {
                            handleUpdateAdd(index, e, 13);
                          }}
                          disabled={!rsSkill}
                          name="skillLevelId"
                          className={`w-full h-4 border-2 transition-all  ${
                            dt.skillLevelId === 13
                              ? "bg-red-600"
                              : rsSkill && "hover:bg-red-500"
                          }`}
                        ></button>
                      </li>
                    </ul>
                  </div>
                </div>
                {rsSkill && (
                  <button
                    className="p-2 rounded-full absolute hidden -top-3 -right-3 bg-white border-2 group-hover:block"
                    onClick={(e) => {
                      handleUpdateAdd(index, e);
                    }}
                  >
                    <Image
                      className="w-4"
                      src={"/iconclose.svg"}
                      alt=""
                      width={200}
                      height={200}
                    />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        {rsSkill && (
          <button
            className="flex items-center transition-all duration-300 hover:bg-black/25 p-1 rounded-2xl"
            onClick={handleAdd}
          >
            <Image
              className="w-6 mr-1 p-1 bg-black/20 rounded-full"
              src={"/iconadd.svg"}
              alt=""
              width={200}
              height={200}
            />
            <h2 className="font-bold">
              {languageRedux === 1 ? "Thêm" : "Add"}
            </h2>
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillProfile;
