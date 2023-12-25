import Company from "@/components/CompanyComponent/CompanyInforComponent";
import React, {useState, useEffect} from "react";

type Props = {}

const page = (props: Props) => {
    return (
        <>
            <Company display={'block'} is_profile={false}/>
        </>
    )
}

export default page;