export type PropItemValue = {
  id: number;
  title: string;
  icon: JSX.Element;
  total: number | undefined;
  path: string;
};

export type PropItemOther = {
  otherTop: PropItemValue[];
  otherBottom: PropItemValue[];
  otherMid: PropItemValue[];
};
