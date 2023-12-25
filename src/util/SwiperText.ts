import React from 'react'
import {useRef,useEffect,useState} from 'react'

type Props = {
    
}

const SwiperText = () => {
    const [countList,setCountList] = useState<number>(0)
    const [checkMax,setCheckMax] = useState<boolean>(false)
    const [maxItem,setMaxItem] = useState<number>(0)
    const ref_location = useRef<any>()

  useEffect(()=>{
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    },[])
    const handleResize = () => {
        let maxWidth = ref_location.current.parentElement.offsetWidth
        let count:number = 0
        let check:boolean = false
        const list = ref_location.current.querySelectorAll('.item-location')
        setMaxItem(list.length-1)
        setCheckMax(false)
        setCountList(-1)
        list.forEach((dt:any,index:number) => {

                if(check){
                    return
                }
                const width = dt.offsetWidth
                
                count = count + width
                if(count> maxWidth){
                  setCheckMax(true)
                      check = true
                }else{

                  const widthNext = list[index + 1]?.offsetWidth
                  if(widthNext){
                    if(count + 58 > maxWidth){
                      setCheckMax(true)
                      setCountList(index-1)
                      check = true
                    }else{
                      setCountList(index)
                    }
                  }else{
                    setCountList(index)
                  }
                  count = count + 8

                }
        }) 
    }
  return {ref_location,maxItem,countList,handleResize,checkMax}
}

export default SwiperText