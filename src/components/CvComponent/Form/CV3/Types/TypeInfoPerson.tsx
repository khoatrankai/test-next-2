import React, { useEffect } from "react";

type Props = {
  data: any;
  type: any;
};
import {
  PDFViewer,
  Document,
  Page,
  Text,
  Svg,
  Font,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const TypeInfoPerson = (props: Props) => {
  const { data, type } = props;
  const handleCheckImage = (dataa: any) => {
    console.log(dataa);
    if (typeof dataa !== "string") {
      const file = dataa?.[0];
      if (file) {
        const url = URL?.createObjectURL(file);
        return url;
      }
    }
    return dataa;
  };
  useEffect(() => {}, [data]);
  const styles = StyleSheet.create({
    avatarImg: {
      borderRadius: "100%",
      overflow: "hidden",
    },
    viewItem: {
      padding: "0 10px",
    },
    textTitle: {
      padding: "8px 0",
      textAlign: "center",
      borderWidth: "1px",
      borderColor: "black",
      fontWeight: "medium",
      fontSize: "15px",
      marginBottom: "2px",
    },
    textName: {
      padding: "4px 0",
      textAlign: "center",
      fontSize: "16px",
    },
    textIntent: {
      padding: "0",
      textAlign: "center",
      fontSize: "12px",
      marginBottom: "10px",
    },
    viewTP: {
      display: "flex",
      flexDirection: "column",
      padding: "0 2px",
      gap: "10px",
    },
    viewItemSmall: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
      width: "90%",
    },
    icon: {
      width: "15",
      height: "15",
      objectFit: "contain",
    },
    textItem: {
      fontSize: "12",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
  return (
    <>
      <View style={styles.viewItem}>
        <View style={styles.viewTP}>
          <Image
            src={
              handleCheckImage(data?.avatar) ??
              "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701359384/images/avatar/1701359383630-48cd1190-8d4f-4e01-8742-797dfa8026c3.jpg"
            }
            style={styles.avatarImg}
          />
          <Text style={styles.textName}>{data.name}</Text>
          <Text style={styles.textIntent}>{data.intent}</Text>
          <Text style={styles.textTitle}>THÔNG TIN CÁ NHÂN</Text>

          <View style={styles.viewItemSmall}>
            <Image
              src={
                type != "-1"
                  ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701510744/cv-icon/email/ovc6uekecpscy910dhqv.png"
                  : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701510752/cv-icon/email/zyqk1mujx0vxnqbgvce3.png"
              }
              style={styles.icon}
            />
            <Text style={styles.textItem}>{data?.email}</Text>
          </View>

          <View style={styles.viewItemSmall}>
            <Image
              src={
                type != "-1"
                  ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511124/cv-icon/phone/chf3fgo5pdtnaghvltyh.png"
                  : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511123/cv-icon/phone/llmon3bgqdt3di6ikrwl.png"
              }
              style={styles.icon}
            />
            <Text style={styles.textItem}>{data?.phone}</Text>
          </View>
          <View style={styles.viewItemSmall}>
            <Image
              src={
                type != "-1"
                  ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511245/cv-icon/facebook/h2eycvomj4oh4qc7ogf5.png"
                  : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511236/cv-icon/facebook/thcqbnrm7xxlxflrq9fz.png"
              }
              style={styles.icon}
            />
            <Text style={styles.textItem}>{data?.link}</Text>
          </View>
          <View style={styles.viewItemSmall}>
            <Image
              src={
                type != "-1"
                  ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511352/cv-icon/address/djyh0lezfeacbpqg92kr.png"
                  : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701511351/cv-icon/address/hlhltnvvlxftehkncdua.png"
              }
              style={styles.icon}
            />
            <Text style={styles.textItem}>{data?.address}</Text>
          </View>
          {data?.moreCvInformations?.map((dt: any) => {
            return (
              <View style={styles.viewItemSmall}>
                <Image
                  src={
                    type != "-1"
                      ? "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701518599/cv-icon/more/b46jc6zsgxb4wcjlsg2c.png"
                      : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1701518599/cv-icon/more/ng2asxysjub9wfjemgoi.png"
                  }
                  style={styles.icon}
                />
                <Text style={styles.textItem}>{dt.content}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default TypeInfoPerson;
