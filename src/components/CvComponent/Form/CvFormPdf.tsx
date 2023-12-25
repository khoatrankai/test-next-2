import React from "react";
import Cv1 from "./CV1/Cv1";
import Cv2 from "./CV2/Cv2";
import Cv3 from "./CV3/Cv3";

type Props = {
  idTemplate: any;
  arrayData: any;
};

const CheckFormCv = (id: any, arrayData: any) => {
  switch (id.toString()) {
    case "0":
      return <Cv1 arrayData={arrayData} />;
    case "1":
      return <Cv2 arrayData={arrayData} />;
    case "2":
      return <Cv3 arrayData={arrayData} />;
  }
};

const CvFormPdf = (props: Props) => {
  const { idTemplate, arrayData } = props;
  return <>{CheckFormCv(idTemplate, arrayData)}</>;
};

export default CvFormPdf;
