/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect,useRef} from 'react'
const useSwipers = (getquantity: number=5,getvalueItem: number=5,getvalueM: number=5) => {
    const list_Ref = useRef<any>()
    const [checkLink,setCheckLink] = useState<Boolean>(false)
    const [widthScroll,setWidthScroll] = useState<number>(1152)
    const [widthScrollFirst,setWidthScrollFrist] = useState<number>(1152)
    const [checkTrans,setCheckTrans] = useState<Boolean>(false)
    const [positionDown,setPositionDown] = useState<number>(0)
    const [position,setPosition] = useState<number>(0)
    const [positionTest,setPositionTest] = useState<number>(0)
    const [checkNext,setCheckNext] = useState<Boolean>(true)
    const [checkPrev,setCountPrev] = useState<Boolean>(false)
    const totalTrans = (getquantity*getvalueItem) + (getquantity-1) * getvalueM

    const handleUp = (e: MouseEvent) => {
      if (checkTrans) {
        setCheckTrans(false);
      }
    };
    useEffect(() => {
      if (checkTrans) {
        window.addEventListener('mousemove', handleChange);
      }
    
      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('mousemove', handleChange);
      };
    }, [checkTrans]);
    useEffect(()=>{
      if(!checkTrans){
        setPosition(positionTest)
      }
    },[checkTrans,positionTest])
    useEffect(()=>{
      if(list_Ref.current){
       
        list_Ref.current.style.transform = `translateX(${positionTest}px)`
      }
    },[positionTest])

    useEffect(()=>{
   
      if(position > 0){
        setTimeout(()=> {
          
          if(list_Ref.current){
            list_Ref.current.classList.add(`transition-transform`)
            list_Ref.current.style.transform = `translateX(0px)`
            setPosition(0)
            setPositionTest(0)
          
          }
          
        },100)
        setTimeout(()=> {
          if(list_Ref.current){
            list_Ref.current.classList.remove(`transition-transform`)
          }
          
        },250)
      }else{
  
          const maxWidth = totalTrans - widthScroll
          if(position < -maxWidth){
            setTimeout(()=> {
              if(list_Ref.current){
                list_Ref.current.classList.add(`transition-transform`)
                list_Ref.current.style.transform = `translateX(${-maxWidth})`
                setPosition(-maxWidth)
                setPositionTest(-maxWidth)
              }
              
            },100)
            setTimeout(()=> {
              if(list_Ref.current){
                list_Ref.current.classList.remove(`transition-transform`)
              }
              
            },250)
          }
          else if(position > -maxWidth){
            const postionScroll : number = Number((position/(getvalueItem+ getvalueM)).toFixed()) 
            setTimeout(()=> {
              if(list_Ref.current){
                list_Ref.current.classList.add(`transition-transform`)
                list_Ref.current.style.transform = `translateX(${postionScroll*(getvalueItem+ getvalueM)})`
                setPosition(postionScroll*(getvalueItem+ getvalueM))
                setPositionTest(postionScroll*(getvalueItem+ getvalueM))     
              }
              
            },100)
            setTimeout(()=> {
              if(list_Ref.current){
                list_Ref.current.classList.remove(`transition-transform`)
              }
              
            },250)
            setCheckNext(true)
          }
      }
    },[position])
    const handleChange = (e: MouseEvent) => {
     
      setCheckLink(true)

      if (checkTrans) {
        setPositionTest(e.clientX - positionDown + position)
      }
    };
    useEffect(() => {
      if (checkTrans) {
        window.addEventListener('mouseup', handleUp);
      }
    
      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('mouseup', handleUp);
      };
    }, [checkTrans]);
    const handleClickDown = (e : React.MouseEvent<HTMLUListElement, MouseEvent>) => {
      
      setCheckLink(false)
      if(!checkTrans)
      {
        setPositionDown(e.clientX)
        setCheckTrans(true)
      }
    }

    useEffect(() => {
      
      const handleResize = () => {
        const width = window.innerWidth - 17
        if(width < 1152){
            setWidthScroll(width)
        }else{
            setWidthScroll(1152)
        }
      };
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  useEffect(()=>{
    
    const fullWidth = -totalTrans + 1152
    const width = widthScroll - widthScrollFirst
    if(!checkNext || (fullWidth > position)){
      setPosition(position + width)
    } 
    if(fullWidth === position){
      setCheckNext(false)
    }
    setWidthScrollFrist(widthScroll)
    
  },[widthScroll])
  useEffect(()=>{
    setTimeout(()=> {
      if(list_Ref.current){
        list_Ref.current.classList.add(`transition-transform`)
        list_Ref.current.style.transform = `translateX(${position}px)`
      }
      
    },100)
    setTimeout(()=> {
      if(list_Ref.current){
        list_Ref.current.classList.remove(`transition-transform`)
      }
      
    },250)
    const endTrans = totalTrans + position - (getvalueM + getvalueItem)
    if(endTrans >= widthScroll){
      setCheckNext(true)
    }
    if(position === -(totalTrans - widthScroll)){
      setCheckNext(false)
    }
    if(position === 0){
      setCountPrev(false)
    }else{
      setCountPrev(true)
    }
  },[position])
  const handleNext = () => {
    const endTrans = totalTrans + position - (getvalueM + getvalueItem)
    if(endTrans >= widthScroll){
      setPosition(position - (getvalueItem + getvalueM))
    }else{
      
      setPosition(-(totalTrans - widthScroll))
      
    }
  }
  const handlePrev = () => {
    const fullWidth = -totalTrans + 1152
    if(position < 0){
      if(checkNext || (position === fullWidth)){
        setPosition(position + (getvalueItem + getvalueM))
      }else{
        const vt:number = Math.floor(-position/(getvalueItem+getvalueM))
        setPosition(-vt * (getvalueItem + getvalueM))
        setCheckNext(true)
      }
    }
  }
  return{list_Ref,handleNext,checkNext,checkPrev,handlePrev,handleClickDown,checkLink}
}

export default useSwipers