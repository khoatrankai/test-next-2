import React from "react";
import TypeSkill from "./Types/TypeSkill";
import TypeInfoPerson from "./Types/TypeInfoPerson";
import TypeHobby from "./Types/TypeHobby";
import TypeAchivement from "./Types/TypeAchivement";
import TypeAward from "./Types/TypeAward";
import TypeActivate from "./Types/TypeActivate";
import TypeExperience from "./Types/TypeExperience";
import TypeProject from "./Types/TypeProject";
import TypeStudy from "./Types/TypeStudy";

type Props = {
  data: any;
  type: any;
};

const handleCheckType = (data: any, type: any) => {
  switch (data?.type) {
    case "info_project":
      return <TypeProject data={data} type={type} />;
      break;
    case "info_person":
      return <TypeInfoPerson data={data} type={type} />;
      break;
    case "info_skill":
      return <TypeSkill data={data} type={type} />;
      break;
    case "info_achivement":
      return <TypeAchivement data={data} type={type} />;
      break;
    case "info_award":
      return <TypeAward data={data} type={type} />;
      break;
    case "info_activate":
      return <TypeActivate data={data} type={type} />;
      break;
    case "info_experience":
      return <TypeExperience data={data} type={type} />;
      break;
    case "info_hobby":
      return <TypeHobby data={data} type={type} />;
      break;
    case "info_study":
      return <TypeStudy data={data} type={type} />;
      break;
  }
};
const Type = (props: Props) => {
  const { data, type } = props;
  return <>{handleCheckType(data, type)}</>;
};

export default Type;
