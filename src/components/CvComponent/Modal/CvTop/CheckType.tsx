import React, { useEffect } from "react";
import TypeSkill from "./Types/TypeSkill";
import TypeInfoPerson from "./Types/TypeInfoPerson";
import TypeHobby from "./Types/TypeHobby";
import TypeAchivement from "./Types/TypeAchivement";
import TypeAward from "./Types/TypeAward";
import TypeTarget from "./Types/TypeTarget";
import TypeActivate from "./Types/TypeActivate";
import TypeExperience from "./Types/TypeExperience";
import TypeProject from "./Types/TypeProject";
import TypeStudy from "./Types/TypeStudy";

type Props = {
  data: any;
  index: any;
  type: any;
  haneleUpdateData: any;
  checkFocus: any;
};

const CheckType = (props: Props) => {
  const { data, haneleUpdateData, index, type, checkFocus } = props;
  return (
    <>
      {data?.type === "info_person" ? (
        <TypeInfoPerson
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_skill" ? (
        <TypeSkill
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_hobby" ? (
        <TypeHobby
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_achivement" ? (
        <TypeAchivement
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_award" ? (
        <TypeAward
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_target" ? (
        <TypeTarget
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_experience" ? (
        <TypeExperience
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_study" ? (
        <TypeStudy
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_activate" ? (
        <TypeActivate
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : data?.type === "info_project" ? (
        <TypeProject
          data={data}
          handleUpdateData={haneleUpdateData}
          index={index}
          type={type}
          checkFocus={checkFocus}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CheckType;
