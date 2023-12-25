"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axiosClient from "@/configs/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import CvModal from "@/components/CvComponent/Modal/CvModal";
import CvFormPdf from "@/components/CvComponent/Form/CvFormPdf";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import Image from "next/image";
import profileCvsApi from "@/api/profileCvs/profileCvsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};
interface IData {
  statusCode: number;
  data: any;
}
interface ILoad {
  status: number;
  data: any;
}
const page = (props: Props) => {
  const { id } = useParams();
  const profile = useSelector((state: any) => state.profile.profile);
  const [backNext, setBackNext] = useState<any>();
  const [dataLoad, setDataLoad] = useState<any>();
  const [titleCV, setTitleCV] = useState<any>("");
  const [dataType, setDataType] = useState<any>([
    {
      type: "info_person",
      name: "Thông tin cá nhân",
    },
    {
      type: "info_award",
      name: "giải thưởng",
    },
    {
      type: "info_activate",
      name: "Hoạt động",
    },
    {
      type: "info_hobby",
      name: "sở thích",
    },
    {
      type: "info_achivement",
      name: "chứng chỉ",
    },
    {
      type: "info_project",
      name: "dự án",
    },
    {
      type: "info_study",
      name: "học vấn",
    },
    {
      type: "info_experience",
      name: "kinh nghiệm làm việc",
    },
    {
      type: "info_skill",
      name: "các kỹ năng",
    },
  ]);
  const language = useSelector((state: any) => state.changeLaguage.language);
  const [typeTemplate, setTypeTemplate] = useState<any>([
    { id: 0 },
    { id: 1 },
    { id: 2 },
  ]);
  const refBtnMenu = useRef<any>();
  const [func, setFunc] = useState<any>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [templateId, setTemplateId] = useState<any>(0);
  const [typeFocus, setTypeFocus] = useState<any>({});
  const [positionAdd, setPositionAdd] = useState<any>();
  const refDrag = useRef<any>();
  const [refFormCv, setRefFormCv] = useState<any>();
  const [dataSave, setDataSave] = useState<any>();
  const dispatch = useDispatch();
  const handleSave = (data: any) => {
    let pushArray: any = [];
    data?.forEach((dt: any) => {
      pushArray.push(...dt);
    });

    // setDataSave(data);
    setDataLoad(pushArray);
    handleChange(pushArray);
  };
  const handleLoadData = async () => {
    const fetchData = async () => {
      const res = (await axiosClient.get(
        `https://web-service-tkv2.onrender.com/api/v3/cv-extra-information/?cvIndex=${id}`
      )) as unknown as ILoad;
      const res2 = (await axiosClient.get(
        `https://web-service-tkv2.onrender.com/api/v3/cv-project/?cvIndex=${id}`
      )) as unknown as ILoad;
      const res3 = (await axiosClient.get(
        `https://web-service-tkv2.onrender.com/api/v3/cv-information/?cvIndex=${id}`
      )) as unknown as ILoad;
      if (
        res &&
        res.status === 200 &&
        res3 &&
        res3.status === 200 &&
        res2 &&
        res2.status === 200
      ) {
        console.log(id);
        setDataLoad(res2.data.concat(res.data.concat(res3.data)));
        setBackNext({
          back: {},
          present: res2.data.concat(res.data.concat(res3.data)),
          next: {},
        });
      }
    };

    fetchData();
  };

  const handleCheckBtn = (name: any) => {
    let check = false;
    dataLoad?.forEach((dt: any) => {
      if (name === dt.type) {
        check = true;
      }
    });

    return check;
  };

  const handleSavePdf = async () => {
    if (dataSave) {
      const blob = await pdf(
        <CvFormPdf arrayData={dataSave} idTemplate={templateId} />
      ).toBlob();
      const formData = new FormData();
      formData.append("file", blob, "anh1.pdf");
      formData.append("name", titleCV ? titleCV : "CV-OLD");
      formData.append("cvIndex", id.toString());
      formData.append("templateId", templateId);
      try {
        const res = (await profileCvsApi.saveCv(formData)) as any;

        if (res && res.statusCode === 201) {
          dispatch(fetchProfile("vi") as any);
          toast.success(
            language === 1
              ? "Cập nhật CV thành công"
              : "Update a successful CV",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
      } catch (error) {
        console.error("Error while uploading PDF:", error);
      }
    }
  };
  const handleBtnSave = () => {
    const data = JSON.parse(JSON.stringify(dataSave));
    let dataProject = "";
    let dataInfo: any = "";
    let dataArray: any = [];
    let dataContent: any = [];
    data?.forEach((dt: any, index: any) => {
      dt?.forEach((dtt: any, i: any) => {
        if (dtt?.type === "info_project") {
          dataProject = { ...dtt, column: index, index: i };
        } else {
          if (dtt?.type === "info_person") {
            dtt.moreCvInformations?.forEach((dttt: any) => {
              dataContent.push({ ...dttt, cvInformationId: dtt.id });
            });
            delete dtt.moreCvInformations;
            delete dtt.accountId;
            delete dtt.id;
            if (!dtt.avatar) {
              delete dtt.avatar;
            }

            if (dtt.avatar) {
              dataInfo = {
                ...dtt,
                column: index,
                index: i,
                avatar: dataSave[index][i].avatar,
              };
            } else {
              dataInfo = { ...dtt, column: index, index: i };
            }
          } else {
            dataArray.push({ ...dtt, column: index, index: i });
          }
        }
      });
    });
    const fetchData = async () => {
      const delete1 = (await axiosClient.delete(
        "https://web-service-tkv2.onrender.com/api/v3/cv-information",
        { data: { cvindex: id } } as any
      )) as unknown as IData;
      const delete2 = (await axiosClient.delete(
        "https://web-service-tkv2.onrender.com/api/v3/cv-extra-information",
        { data: { cvindex: id } } as any
      )) as unknown as IData;
      const delete3 = (await axiosClient.delete(
        "https://web-service-tkv2.onrender.com/api/v3/cv-project",
        { data: { cvindex: id } } as any
      )) as unknown as IData;
      if (
        delete1?.statusCode === 200 &&
        delete2?.statusCode === 200 &&
        delete3?.statusCode === 200
      ) {
        if (dataArray.length > 0) {
          const res = (await axiosClient.post(
            "https://web-service-tkv2.onrender.com/api/v3/cv-extra-information",
            { data: dataArray }
          )) as unknown as IData;
        }
        if (dataProject) {
          const res2 = (await axiosClient.post(
            "https://web-service-tkv2.onrender.com/api/v3/cv-project",
            { data: [dataProject] }
          )) as unknown as IData;
        }
        if (dataInfo) {
          const formData = new FormData();
          for (let i in dataInfo) {
            if (i === "avatar") {
              if (dataInfo.avatar.includes("http")) {
                formData.append("avatarPath", dataInfo.avatar);
              } else {
                dataInfo[i].forEach((image: any) => {
                  formData.append("images", image);
                });
              }
            } else formData.append(i, dataInfo[i]);
          }
          const res3 = (await axiosClient.post(
            "https://web-service-tkv2.onrender.com/api/v3/cv-information",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )) as unknown as IData;
          if (res3 && res3.statusCode === 201) {
            dataContent = dataContent.map((dt: any) => {
              return { ...dt, cvInformationId: res3.data.id };
            });
            if (dataContent.length > 0) {
              const res4 = (await axiosClient.post(
                "https://web-service-tkv2.onrender.com/api/v3/cv-more-information",
                { data: dataContent }
              )) as unknown as IData;
              if (res4 && res4.statusCode === 201) {
              }
            }
          }

          handleSavePdf();
        }
      }
    };
    if (data.length > 0) {
      fetchData();
    }
  };
  const handleUpdateDataLoad = (typeName: any, type: any, index: any) => {
    switch (typeName) {
      case "info_project":
        setDataLoad([
          ...dataLoad,
          {
            type: typeName,
            column: type,
            cvIndex: id,
            index: index,
            moreCvProjects: [
              {
                time: "-",
                link: "",
                participant: "",
                position: "",
                functionality: "",
                technology: "",
              },
            ],
          },
        ]);
        break;
      case "info_person":
        setDataLoad([
          ...dataLoad,
          {
            type: typeName,
            address: "",
            avatar: null,
            column: type,
            cvIndex: id,
            email: "",
            index: index,
            intent: "",
            link: "",
            moreCvInformations: [],
            name: "",
            phone: "",
          },
        ]);
        break;
      default:
        setDataLoad([
          ...dataLoad,
          {
            type: typeName,
            column: type,
            cvIndex: id,
            index: index,
            moreCvExtraInformations: [
              { company: "", description: "", position: "", time: "-" },
            ],
          },
        ]);
    }
  };
  const handleAddModalCV = (refData: any) => {
    setRefFormCv(refData);
  };

  useEffect(() => {
    handleLoadData();
  }, []);
  useEffect(() => {
    console.log(id);
  }, [id]);
  useEffect(() => {
    if (dataLoad) {
      const dataPush = [];
      for (let i = 0; i < 2; i++) {
        const newData: any = [];
        dataLoad?.forEach((dt: any) => {
          if (dt.column === i) {
            newData.push(dt);
          }
        });
        newData.sort((a: any, b: any) => {
          return a.index - b.index;
        });
        dataPush.push(newData);
      }
      setDataSave(dataPush);
    }
  }, [dataLoad]);
  useEffect(() => {
    if (mouseDown) {
      const divEle = document.createElement("div");
      divEle.className = "fixed p-2 text-sm bg-yellow-400 rounded-xl box-move";
      divEle.textContent = typeFocus?.name;

      const handleMouseMove = (e: any) => {
        e.preventDefault();
        divEle.style.left = e.clientX + "px";
        divEle.style.top = e.clientY + "px";
        document.body.appendChild(divEle);
      };
      const handleMouseUp = (e: any) => {
        setMouseDown(false);
        divEle.remove();
      };
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [mouseDown, typeFocus, refFormCv]);
  useEffect(() => {
    if (!mouseDown && positionAdd && typeFocus) {
      handleUpdateDataLoad(typeFocus.type, positionAdd.type, positionAdd.index);
    }
  }, [mouseDown, positionAdd, typeFocus]);
  useEffect(() => {
    if (refFormCv && mouseDown) {
      const listType = refFormCv.current.children;
      const divGhost = document.createElement("div");
      divGhost.className = "border-y-[1px] w-full h-32 bg-yellow-200 box-ghost";
      const handleMouseEnter = (e: any) => {
        divGhost.remove();
        e.stopPropagation();
        const parentEle = e.target.parentElement;
        const index = Array.from(parentEle.children).indexOf(e.target) - 1;
        const type = Array.from(listType).indexOf(parentEle);
        if (
          e.clientY <
          e.target.getBoundingClientRect().top +
            e.target.getBoundingClientRect().height / 2
        ) {
          parentEle.insertBefore(divGhost, e.target);
          setPositionAdd({ type: type, index: index });
        } else {
          parentEle.insertBefore(divGhost, e.target.nextSibling);
          setPositionAdd({ type: type, index: index + 1 });
        }
      };
      const handleMouseEnterType = (e: any) => {
        divGhost.remove();
        e.target.appendChild(divGhost);
        const index = Array.from(e.target.children).length;
        const type = Array.from(listType).indexOf(e.target);
        setPositionAdd({ type: type, index: index });
      };

      for (let i = 0; i < listType.length; i++) {
        listType[i]?.addEventListener("mouseenter", handleMouseEnterType);

        const listItem = listType[i].children;
        for (let j = 0; j < listItem.length; j++) {
          listItem[j]?.addEventListener("mouseenter", handleMouseEnter);
        }
      }

      return () => {
        for (let i = 0; i < listType.length; i++) {
          const listItem = listType[i].children;
          listType[i]?.removeEventListener("mouseenter", handleMouseEnterType);

          for (let j = 0; j < listItem.length; j++) {
            divGhost.remove();
            listItem[j]?.removeEventListener("mouseenter", handleMouseEnter);
          }
        }
      };
    }
  }, [refFormCv, mouseDown]);
  useEffect(() => {
    if (profile) {
      const dataCvs = profile.profilesCvs?.filter((dt: any) => {
        return +dt.cvIndex === +id;
      });
      if (dataCvs?.length > 0) {
        setTitleCV(dataCvs[0].name);
        setTemplateId(dataCvs[0].templateId);
      }
    }
  }, [profile]);

  const handleChange = (data: any) => {
    const presentNew = data;
    setBackNext({ next: {}, back: backNext, present: presentNew });
  };
  const handleNext = () => {
    if (Object.keys(backNext.next).length !== 0) {
      setDataLoad(backNext.next.present);
      setBackNext({
        ...backNext,
        back: backNext.next.back,
        present: backNext.next.present,
        next: backNext.next.next,
      });
    }
  };
  const handlePrev = () => {
    if (Object.keys(backNext.back).length !== 0) {
      setDataLoad(backNext.back.present);

      setBackNext({
        ...backNext,
        back: backNext.back.back,
        present: backNext.back.present,
        next: backNext,
      });
    }
  };
  return (
    <div className=" bg-slate-100 py-4" ref={refDrag}>
      <div className="mb-24">
        <div className="fixed top-20 flex justify-between py-3 w-full z-40 gap-x-10 bg-white  px-8">
          <div className="flex-1">
            <input
              className="outline-none text-lg font-semibold h-full w-full"
              type="text"
              value={titleCV ?? ""}
              placeholder="Tiêu đề"
              onChange={(e: any) => {
                setTitleCV(e.target.value);
              }}
            />
          </div>
          <div className={`flex gap-x-4  text-white`} ref={refBtnMenu}>
            {backNext && (
              <div className="flex gap-x-2">
                <button
                  className={`p-3 rounded-xl  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
                    Object.keys(backNext.back).length === 0
                      ? "cursor-not-allowed"
                      : " hover:bg-yellow-50"
                  }`}
                  // onClick={handlePrev}
                  onMouseDown={handlePrev}
                >
                  <Image
                    className="w-5"
                    src={"/iconleft.svg"}
                    width={200}
                    height={200}
                    alt=""
                  />
                </button>
                <button
                  className={`p-3 rounded-xl  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  ${
                    Object.keys(backNext.next).length === 0
                      ? "cursor-not-allowed"
                      : " hover:bg-yellow-50"
                  }`}
                  // onClick={handleNext}
                  onMouseDown={handleNext}
                >
                  <Image
                    className="w-5"
                    src={"/iconright.svg"}
                    width={200}
                    height={200}
                    alt=""
                  />
                </button>
              </div>
            )}

            <button
              className="p-2 font-semibold text-yellow-500  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border-2 hover:bg-yellow-500 hover:text-white rounded-lg"
              onClick={handleBtnSave}
            >
              <PDFDownloadLink
                document={
                  <CvFormPdf arrayData={dataSave} idTemplate={templateId} />
                }
                fileName={`${titleCV ? titleCV : "CV-old"}-${id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Đang cập nhật..." : "Lưu và tải xuống"
                }
              </PDFDownloadLink>
            </button>
            <button
              className="p-2 font-semibold bg-yellow-500 rounded-lg"
              onClick={handleBtnSave}
            >
              Lưu lại
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="fixed flex flex-col gap-y-4 h-4/5">
          <div
            className={`p-3 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
              func === 0 ? "bg-yellow-50" : "bg-white"
            }`}
            onClick={() => {
              setFunc(0);
            }}
          >
            <Image
              className="w-8"
              src={"/iconmanyfile.svg"}
              alt=""
              width={200}
              height={200}
            />
            <div
              className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] top-0 left-full translate-x-4 rounded-lg w-80 h-full p-2  transition-all${
                func === 0 ? "" : "hidden"
              }`}
            >
              <h1 className="font-bold text-base mb-10">Template</h1>
              <ul className="flex flex-wrap gap-2">
                {typeTemplate?.map((dt: any) => {
                  return (
                    <li
                      className={`p-2 w-24 h-24 rounded-xl  text-sm font-bold uppercase bg-black/20 cursor-pointer hover:bg-black/10`}
                      onClick={() => {
                        setTemplateId(dt.id);
                      }}
                    >
                      <span className="select-none">{dt.id}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <div className="absolute bg-yellow-300 top-0 left-full translate-x-4 rounded-lg w-80 h-full"></div> */}
          </div>
          <div
            className={`p-3 rounded-lg  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${
              func === 1 ? "bg-yellow-50" : "bg-white"
            }`}
            onClick={() => {
              setFunc(1);
            }}
          >
            <Image
              className="w-8"
              src={"/iconaddfile.svg"}
              alt=""
              width={200}
              height={200}
            />
            <div
              className={`absolute bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] top-0 left-full translate-x-4 rounded-lg w-80 h-full p-2 transition-all ${
                func === 1 ? "" : "hidden"
              }`}
            >
              <h1 className="font-bold text-base mb-10">Mục lục chức năng</h1>
              <ul className="flex flex-wrap gap-2">
                {dataType.map((dt: any) => {
                  return (
                    <li
                      className={`p-2 w-24 h-24 rounded-xl  text-sm font-bold uppercase ${
                        handleCheckBtn(dt.type)
                          ? "bg-black/30 text-black/40 cursor-not-allowed "
                          : "bg-black/20 cursor-pointer hover:bg-black/10"
                      }`}
                      onMouseDown={() => {
                        if (!handleCheckBtn(dt.type)) {
                          setMouseDown(true);
                          setTypeFocus({ ...dt });
                        }
                      }}
                    >
                      <span className="select-none">{dt.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {dataLoad && (
            <CvModal
              handleAddModalCV={handleAddModalCV}
              dataLoad={dataLoad}
              handleSave={handleSave}
              idTemplate={templateId.toString()}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
