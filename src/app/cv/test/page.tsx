"use client";
import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
type Props = {};

const page = (props: Props) => {
  const ref = useRef<any>();
  useEffect(() => {}, [ref]);

  return (
    <div ref={ref} className="p-4">
      page
    </div>
  );
};

export default page;
