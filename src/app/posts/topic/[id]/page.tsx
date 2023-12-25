'use client'
import React, {useState, useEffect} from "react";
import {useParams} from 'next/navigation';
import hotTopicApi from "@/api/topics/hotTopicApi";

type Props = {};

const page = (props: Props) => {
    const {id} = useParams();

    useEffect(() => {
        // const res = hotTopicApi.getHotJobById(id);
    }, []);    
    return (
        <div>
            
        </div>
    )
}
export default page;