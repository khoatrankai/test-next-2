"use client";
import SearchJobComponent from "@/components/SearchJobComponent/SearchJobComponent";
import React, { useEffect } from "react";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-slate-50">
      <SearchJobComponent />
    </div>
  );
};

export default page;
