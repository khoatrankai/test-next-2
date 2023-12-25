import React from 'react'

// type Props = {
    
// }
const EncodingDescription = () => {
  const handleEncodingDescription = (arrayData:any)=>{
    let text = ""
    arrayData.forEach((dt:any,index:number) => {
        if(index > 0)
            text = text + '/$/'+dt
        else{
            text = text +dt

        }
    });
    return text
  }
  const handleDecodingDescription = (data:any) => {
     const arrayData = data.split('/$/')
     return arrayData
  }
  const handleUpdateDescription = (data:any,value:any,index:any) =>{
    data[index] = value 
    return handleEncodingDescription(data)
  }
  return {handleDecodingDescription,handleEncodingDescription,handleUpdateDescription}
}

export default EncodingDescription