/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect,useRef} from 'react'
const useSwiperSlider = () => {
    const [countItem,setCountItem] = useState<number>(0)
    const [nowItem,setNowItem] = useState<number>(0)
    const list_Ref = useRef<any>()
    useEffect(()=>{
        setCountItem(list_Ref.current.querySelectorAll('li').length)
    },[])
    useEffect(()=>{
        list_Ref.current.style.transform = `translateX(-${nowItem * 100}%)`
    },[nowItem])
  const handleNext = () => {
    if(nowItem<countItem-1){
        setNowItem(nowItem + 1)
    }else{
        setNowItem(0)
    }
  }
  const handlePrev = () => {
    if(nowItem===0){
        setNowItem(countItem-1)
    }else{
        setNowItem(nowItem-1)
    }
    
  }
  return {list_Ref,handleNext,handlePrev}
}
export default useSwiperSlider