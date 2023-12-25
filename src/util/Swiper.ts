/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect,useRef} from 'react'
const useSwiper = (getPT: number = 50,gap:number = 5) => {
 
  const list_Ref = useRef<any>()
  const [widthTrans,setWidthTrans] = useState<number>(0)
  const [maxWidthTrans,setMaxWidthTrans] = useState<number>(0)
  const [position,setPosition] = useState<number>(0)
  useEffect(()=>{
    let width: number = 0 - gap;
    let maxWidth: number = list_Ref.current?.offsetWidth
    list_Ref.current?.querySelectorAll('li').forEach((dt:any)=>{
      width = width + dt.offsetWidth + gap
    })
    setWidthTrans(width)
    setMaxWidthTrans(maxWidth)
  },[list_Ref])
  useEffect(()=>{
    if(list_Ref.current){
      list_Ref.current.style.transform = `translateX(${position}px)`
    }

  },[position])
  const handleNext = () => {
    if(position != -(widthTrans-maxWidthTrans)){
      if((position - getPT) > -(widthTrans-maxWidthTrans)){
        setPosition(position - getPT)
      }else{
        setPosition(-(widthTrans-maxWidthTrans))
      }
    }
    
  }
  const handlePrev = () => {
    if(position != 0){
      if((position + getPT) < 0){
        setPosition(position + getPT)
      }else{
        setPosition(0)
      }
    }
    
  }
  return {list_Ref,handleNext,handlePrev}
}
export default useSwiper