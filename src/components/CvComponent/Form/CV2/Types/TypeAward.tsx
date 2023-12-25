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

const TypeAward = (props: Props) => {
  const { data } = props;
  const styles = StyleSheet.create({
    viewItem: {
      padding: "0 10px",
    },
    textTitle: {
      fontWeight: "bold",
      fontSize: "15px",
      marginBottom: "2px",
    },
    viewTP: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    viewItemSmall: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
      width: "90%",
    },

    textItem: {
      fontSize: "12",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },

    viewMain: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "10px",
      padding: "0px 5px",
    },
  });
  return (
    <>
      <View style={styles.viewItem}>
        <Text style={styles.textTitle}>GIẢI THƯỞNG</Text>
        <View style={styles.viewMain}>
          {data?.moreCvExtraInformations?.map((dt: any) => {
            return (
              <View style={styles.viewTP}>
                <View style={styles.viewItemSmall}>
                  <Text style={styles.textItem}>{dt.time}</Text>
                </View>
                <View style={styles.viewItemSmall}>
                  <Text style={styles.textItem}>{dt.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default TypeAward;
