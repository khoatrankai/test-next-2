import React, { useState } from 'react'

type Props = {
    data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
}

const handleTypeProject = (props: Props) => {
    const {checkFocus,data,handleUpdateData,index,type} = props
    const [itemFocus, setItemFocus] = useState<any>(-1);
  const handleUpdateTimeStart = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    if (newData?.moreCvProjects?.[i]?.time?.includes("-")) {
      let mang = newData.moreCvProjects[i].time?.split("-");
      newData.moreCvProjects[i].time = `${e.target.value}-${mang[1]}`;
    } else {
      newData.moreCvProjects[i].time = `${e.target.value}-`;
    }

    handleUpdateData(newData, type, index);
  };
  const handleTime = (dataTime: any) => {
    let mang = dataTime?.split("-");
    return mang;
  };
  const handleMoveItem = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    const dt = newData?.moreCvProjects.splice(i, 1);
    switch (e) {
      case "up":
        newData?.moreCvProjects.splice(i - 1, 0, dt?.[0]);
        setItemFocus(i - 1);
        break;

      case "down":
        newData?.moreCvProjects.splice(i + 1, 0, dt?.[0]);
        setItemFocus(i + 1);

        break;
    }
    handleUpdateData(newData, type, index);
  };
  const handleCheckBtn = (name: any, i: any) => {
    const dt = JSON.parse(JSON.stringify(data?.moreCvProjects));
    if (dt?.length > 1) {
      switch (name) {
        case "up":
          if (i === 0) {
            return false;
          } else {
            return true;
          }
          break;
        case "down":
          if (i === dt.length - 1) {
            return false;
          } else {
            return true;
          }
          break;
        default:
          return true;
      }
    } else {
      return false;
    }
  };
  const handleUpdateTimeEnd = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    if (newData?.moreCvProjects?.[i]?.time?.includes("-")) {
      let mang = newData.moreCvProjects[i].time?.split("-");
      newData.moreCvProjects[i].time = `${mang[0]}-${e.target.value}`;
    } else {
      newData.moreCvProjects[i].time = `-${e.target.value}`;
    }
    handleUpdateData(newData, type, index);
  };
  const handleChange = (e: any, i: any) => {
    let newData = JSON.parse(JSON.stringify(data.moreCvProjects));
    newData[i] = { ...newData[i], [e.target.name]: e.target.value };
    const dataReq = { ...data, moreCvProjects: newData };
    handleUpdateData(dataReq, type, index);
  };
  const handleDelete = (i: any) => {
    let newData = JSON.parse(JSON.stringify(data));
    newData?.moreCvProjects.splice(i, 1);
    handleUpdateData(newData, type, index);
  };
  return {handleChange,handleCheckBtn,handleDelete,handleMoveItem,handleTime,handleUpdateTimeEnd,handleUpdateTimeStart,itemFocus,setItemFocus}
}

export default handleTypeProject