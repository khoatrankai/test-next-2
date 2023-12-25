import React from "react";
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
type Props = {
  data: any;
  type: any;
};

const TypeStudy = (props: Props) => {
  const { data } = props;
  const styles = StyleSheet.create({
    straightBar1: {
      width: 30,
      height: 1,
      backgroundColor: "orange",
    },
    straightBar2: {
      flex: "1",
      height: 1,
      backgroundColor: "orange",
    },
    viewItem2: {
      // padding: "0 2px",
    },
    textItemRound2: {
      padding: "8px 0",
      textAlign: "center",
      borderWidth: "1px",
      borderColor: "black",
      fontWeight: "medium",
      fontSize: "15px",
      marginBottom: "2px",
    },
    viewItemSmall2: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    viewMainItem2: {
      display: "flex",
      flexDirection: "column",
      fontSize: 12,
      gap: "8px",
    },
    viewMain2: {
      marginTop: "20px",
      padding: "0 30px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },

    textFlex1: {
      marginRight: "30px",
    },
  });
  const handleTime = (dataTime: any) => {
    let mang = dataTime?.split("-");
    return mang;
  };
  return (
    <>
      <View>
        <View style={styles.viewItem2}>
          <Text style={styles.textItemRound2}>HỌC VẤN</Text>
        </View>
        <View style={styles.viewMain2}>
          {data?.moreCvExtraInformations?.map((dt: any) => {
            return (
              <View style={styles.viewMainItem2}>
                <View style={styles.viewItemSmall2}>
                  <Text style={styles.textFlex1}>{dt.position}</Text>
                  <Text> // </Text>
                  <Text>{handleTime(dt.time)[0]}</Text>
                  <Text>-</Text>
                  <Text>{handleTime(dt.time)[1]}</Text>
                </View>
                <Text>{dt.company}</Text>
                <Text>{dt.description}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default TypeStudy;
