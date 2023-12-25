import React from "react";
import CvTopModal from "./CvTop/CvTopModal";
import Cv2Modal from "./Cv2Modal/CvTopModal";
import Cv3Modal from "./Cv3Modal/Cv3Modal";

type Props = {
  idTemplate: any;
  dataLoad: any;
  handleSave: any;
  handleAddModalCV: any;
};

const CheckModalCv = (
  id: any,
  dataLoad: any,
  handleSave: any,
  handleAddModalCV: any
) => {
  switch (id.toString()) {
    case "0":
      return (
        <CvTopModal
          dataLoad={dataLoad}
          handleSave={handleSave}
          handleAddModalCV={handleAddModalCV}
        />
      );
      break;
    case "1":
      return (
        <Cv2Modal
          dataLoad={dataLoad}
          handleSave={handleSave}
          handleAddModalCV={handleAddModalCV}
        />
      );
      break;
    case "2":
      return (
        <Cv3Modal
          dataLoad={dataLoad}
          handleSave={handleSave}
          handleAddModalCV={handleAddModalCV}
        />
      );
      break;
  }
};

const CvModal = (props: Props) => {
  const { idTemplate, dataLoad, handleSave, handleAddModalCV } = props;
  return (
    <>{CheckModalCv(idTemplate, dataLoad, handleSave, handleAddModalCV)}</>
  );
};

export default CvModal;
