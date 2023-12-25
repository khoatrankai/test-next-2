import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
type Props = {
  handleSave: any;
  dataLoad: any;
  handleAddModalCV: any;
};

const handleModal = (props: Props) => {
  const { dataLoad, handleAddModalCV, handleSave } = props;
  const refPdf = useRef<any>();
  const refType = useRef<any>();
  const [arrayData, setArrayData] = useState<any>();
  const [positionFocus, setPositionFocus] = useState<any>({
    type: -1,
    index: -1,
  });
  const [positionMove, setPositionMove] = useState<any>({
    type: "",
    index: "",
  });
  const [positionOver, setPositionOver] = useState<any>({
    type: "",
    index: "",
  });
  const [checkDrag, setCheckDrag] = useState<boolean>(false);

  const handleUpdatePositionFocus = (type: any, index: any) => {
    setPositionFocus({ type, index });
  };
  const handleDeleteTypeCV = (type: any, index: any) => {
    const dt = JSON.parse(JSON.stringify(arrayData));
    dt?.[type]?.splice(index, 1);
    handleSave(dt);
    setPositionFocus({ type: -1, index: -1 });
  };

  const handleAddItem = (type: any, index: any) => {
    const newData = JSON.parse(JSON.stringify(arrayData));
    switch (newData?.[type]?.[index]?.type) {
      case "info_project":
        newData?.[type]?.[index]?.moreCvProjects.push({
          time: "",
          link: "",
          participant: "",
          position: "",
          functionality: "",
          technology: "",
          index: 0,
        });
        handleSave(newData);
        break;
      case "info_person":
        newData?.[type]?.[index]?.moreCvInformations?.push({
          content: "Content",
        });
        handleSave(newData);
        break;
      default:
        newData?.[type]?.[index]?.moreCvExtraInformations?.push({
          position: "",
          time: "",
          company: "",
          description: "",
          index: 0,
        });
        handleSave(newData);
    }
  };

  const handleDragStart = (column: any, index: any) => {
    setCheckDrag(true);
    setPositionFocus({ type: -1, index: -1 });
    setPositionMove({ type: column, index: index });
  };
  const handleDragEnd = () => {
    setCheckDrag(false);
    handleSave(arrayData);
    setPositionMove({ type: -1, index: -1 });

    setPositionOver({ type: -1, index: -1 });
  };
  const handleDragOver = (column: any, index: any) => {
    if (column !== positionOver.type || index !== positionOver.index) {
      handleChangeSort(positionMove.type, positionMove.index, column, index);
    }
    if (column === positionMove.type && index === positionMove.index) {
      setPositionOver({ type: -1, index: -1 });
    }
  };

  const handleUpdateData = (data: any, type: any, index: any) => {
    let avatar = "";
    arrayData.forEach((dt: any, i: any) => {
      dt.forEach((dtt: any, j: any) => {
        if (dtt.type === "info_person") {
          avatar = dtt.avatar;
        }
      });
    });
    let newData = JSON.parse(JSON.stringify(arrayData));

    if (data.type === "info_person") {
      if (compareFiles(data.avatar?.[0], avatar?.[0])) {
        newData = newData.map((dt: any) => {
          return dt.map((dtt: any) => {
            if (dtt.type === "info_person") {
              dtt.avatar = avatar;
            }
            return dtt;
          });
        });
      }
    } else {
      newData = newData.map((dt: any) => {
        return dt.map((dtt: any) => {
          if (dtt.type === "info_person") {
            dtt.avatar = avatar;
          }
          return dtt;
        });
      });
    }
    newData[type][index] = data;
    handleSave(newData);
  };
  const handleChangeSort = (
    type1: any,
    index1: any,
    type2: any,
    index2: any
  ) => {
    if (arrayData.length > 0 && (type1 !== type2 || index1 !== index2)) {
      let avatar = "";
      arrayData.forEach((dt: any, i: any) => {
        dt.forEach((dtt: any, j: any) => {
          if (dtt.type === "info_person") {
            avatar = dtt.avatar;
          }
        });
      });
      let dataNew = JSON.parse(JSON.stringify(arrayData));
      let data = dataNew[type1] ?? [];
      let data2 = dataNew[type2] ?? [];
      dataNew.map((dt: any, i: any) => {
        return dt.map((dtt: any, j: any) => {
          if (dtt.type === "info_person") {
            dtt.avatar = avatar;
          }
        });
      });
      if (type1 === type2) {
        if (index1 !== index2) {
          const dt = dataNew?.[type1]?.[index1];
          data.splice(index1, 1);
          data.splice(index2, 0, dt);
          setPositionOver({ type: type1, index: index1 });
        }
      } else {
        data2?.splice(index2, 0, dataNew?.[type1]?.[index1]);
        data?.splice(index1, 1);
      }
      dataNew = dataNew.map((dt: any, i: any) => {
        return dt.map((dtt: any, j: any) => {
          return { ...dtt, column: i, index: j };
        });
      });
      setArrayData(dataNew);
      setPositionMove({ type: type2, index: index2 });
    }
  };
  const compareFiles = (file1: any, file2: any) => {
    if (file2 === "" && file1 === "") {
      return false;
    } else {
      if (file1?.name !== file2?.name) {
        return false;
      }

      if (file1?.size !== file2?.size) {
        return false;
      }

      if (file1?.type !== file2?.type) {
        return false;
      }
    }

    return true;
  };
  const handleCheckFocus = (type: any, index: any) => {
    if (type === positionFocus?.type && index === positionFocus?.index) {
      return true;
    }
    return false;
  };
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
      setArrayData(dataPush);
    }
  }, [dataLoad]);
  useEffect(() => {
    const handleBlurTab = (e: any) => {
      // console.log(refPdf.current, e.target);

      if (refPdf.current && !refPdf.current.contains(e.target)) {
        // console.log(refPdf.current, e.target.parentElement);
        setPositionFocus({ type: -1, index: -1 });
      }
    };
    document.addEventListener("click", handleBlurTab);
    return () => {
      document.removeEventListener("click", handleBlurTab);
    };
  }, []);

  useEffect(() => {
    handleAddModalCV(refType);
  }, [refType]);
  const SelectItem = React.forwardRef(
    ({ children, typeCol, index, dt }: any) => {
      return (
        <div
          className={` border-[1px] border-transparent focus-within:border-black/60  ${
            positionMove?.type === typeCol && positionMove?.index === index
              ? "bg-yellow-300"
              : "bg-transparent"
          } hover:border-black/60 ${
            positionFocus?.type === typeCol && positionFocus?.index === index
              ? "z-20  bg-white"
              : ""
          }`}
        >
          <div
            className={`w-full relative `}
            draggable={checkDrag}
            onDragStart={(e: any) => {
              const crt = document.createElement("div");
              crt.innerText = dt?.type;
              crt.style.backgroundColor = "red";
              crt.style.position = "absolute";
              crt.style.padding = "4px";
              crt.style.borderRadius = "10px";

              crt.style.top = "0px";
              crt.style.right = "0px";
              crt.style.zIndex = "-1";
              crt.style.opacity = "5";
              e.target.appendChild(crt);

              e.dataTransfer.setDragImage(crt, 0, 0);
              e.target.style.cursor = "move";
              e.dataTransfer.effectAllowed = "default";
              window.setTimeout(() => {
                crt.remove();
              }, 100);
            }}
            onDragEnd={handleDragEnd}
            onDragOver={(e: any) => {
              e.target.style.cursor = "move";
              handleDragOver(typeCol, index);
            }}
          >
            <div
              className=" px-[10px] py-4"
              onClick={() => {
                handleUpdatePositionFocus(typeCol, index);
              }}
            >
              {children}
            </div>
            <div className="absolute -top-10 z-30">
              <div
                className={`flex gap-x-1 ${
                  positionFocus?.type === typeCol &&
                  positionFocus?.index === index
                    ? ""
                    : "invisible"
                }`}
              >
                <button
                  className=" bg-white rounded-md w-8 h-8 border-2"
                  onMouseDown={(e: any) => {
                    handleDragStart(typeCol, index);
                  }}
                >
                  <div className="p-2">
                    <Image
                      className="pointer-events-none select-none"
                      src={"/iconfourway.svg"}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                </button>
                <button
                  className=" bg-white rounded-md w-8 h-8 border-2"
                  onClick={(e: any) => {
                    // handleDragStart(0, index);
                    handleAddItem(typeCol, index);
                  }}
                >
                  <div className="p-2">
                    <Image
                      className="pointer-events-none"
                      src={"/iconadd.svg"}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                </button>
                <button
                  className=" bg-white rounded-md w-8 h-8 border-2"
                  onClick={(e: any) => {
                    handleDeleteTypeCV(typeCol, index);
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
          </div>
        </div>
      );
    }
  );

  return {
    SelectItem,
    refPdf,
    refType,
    arrayData,
    setArrayData,
    positionMove,
    positionOver,
    checkDrag,
    setCheckDrag,
    setPositionMove,
    setPositionOver,
    positionFocus,
    setPositionFocus,
    handleAddItem,
    handleChangeSort,
    handleCheckFocus,
    handleDeleteTypeCV,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    handleUpdateData,
    handleUpdatePositionFocus,
  };
};

export default handleModal;
