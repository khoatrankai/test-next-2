import React from 'react'

type Props = {}

const ShortText = () => {
    const handleShortTextHome = (data:any,maxText:any) =>{
        let truncatedText = data.toString()
        if(truncatedText){
            if(truncatedText.length>maxText){
                truncatedText = truncatedText.substring(0, maxText) + "...";
    
            }
        }
        
        return truncatedText
    }
    const handleShortValueNumber = (data:any) =>{
        let truncatedText = data.toString()
        if(truncatedText){
            if(truncatedText.length>6){
                truncatedText = truncatedText.substring(0, truncatedText.length-6) + "tr";
    
            }else{
                if(truncatedText.length>3){
                    truncatedText = truncatedText.substring(0, truncatedText.length-3) + "N";
                }
            }
        }
        
        return truncatedText
    }
 return{handleShortTextHome,handleShortValueNumber}
}

export default ShortText