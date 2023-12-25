/* eslint-disable react-hooks/rules-of-hooks */
"use client";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-key */
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
