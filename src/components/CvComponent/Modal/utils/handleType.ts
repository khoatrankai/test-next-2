import React, { useState } from 'react'

type Props = {
    data: any;
  type: any;
  index: any;
  handleUpdateData: any;
  checkFocus: any;
}

const handleType = (props: Props) => {
    const {data,handleUpdateData,index,type} = props
    const [itemFocus, setItemFocus] = useState<any>(-1);
    const handleUpdateTimeStart = (e: any, i: any) => {
        let newData = JSON.parse(JSON.stringify(data));
        if (newData?.moreCvExtraInformations?.[i]?.time?.includes("-")) {
          let mang = newData.moreCvExtraInformations[i].time?.split("-");
          newData.moreCvExtraInformations[i].time = `${e.target.value}-${mang[1]}`;
        } else {
          newData.moreCvExtraInformations[i].time = `${e.target.value}-`;
        }
    
        handleUpdateData(newData, type, index);
      };
      const handleTime = (dataTime: any) => {
        let mang = dataTime?.split("-");
        return mang;
      };
      const handleUpdateTimeEnd = (e: any, i: any) => {
        let newData = JSON.parse(JSON.stringify(data));
        if (newData?.moreCvExtraInformations?.[i]?.time?.includes("-")) {
          let mang = newData.moreCvExtraInformations[i].time?.split("-");
          newData.moreCvExtraInformations[i].time = `${mang[0]}-${e.target.value}`;
        } else {
          newData.moreCvExtraInformations[i].time = `-${e.target.value}`;
        }
        handleUpdateData(newData, type, index);
      };
    const handleChange = (e: any, i: number) => {
      let newData = JSON.parse(JSON.stringify(data.moreCvExtraInformations));
      newData[i] = { ...newData[i], [e.target.name]: e.target.value };
      const dataReq = { ...data, moreCvExtraInformations: newData };
      handleUpdateData(dataReq, type, index);
    };
    const handleMoveItem = (e: any, i: any) => {
      let newData = JSON.parse(JSON.stringify(data));
      const dt = newData?.moreCvExtraInformations.splice(i, 1);
      switch (e) {
        case "up":
          newData?.moreCvExtraInformations.splice(i - 1, 0, dt?.[0]);
          setItemFocus(i - 1);
          break;
  
        case "down":
          newData?.moreCvExtraInformations.splice(i + 1, 0, dt?.[0]);
          setItemFocus(i + 1);
  
          break;
      }
      handleUpdateData(newData, type, index);
    };
    const handleCheckBtn = (name: any, i: any) => {
      const dt = JSON.parse(JSON.stringify(data?.moreCvExtraInformations));
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
    const handleDelete = (i: any) => {
      let newData = JSON.parse(JSON.stringify(data));
      newData?.moreCvExtraInformations.splice(i, 1);
      handleUpdateData(newData, type, index);
    };
  return {handleChange,handleCheckBtn,handleDelete,handleMoveItem,itemFocus,setItemFocus,handleTime,handleUpdateTimeEnd,handleUpdateTimeStart}
}

export default handleType