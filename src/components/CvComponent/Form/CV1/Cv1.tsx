import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Svg,
  Font,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
// import Roboto_Bold from '../fonts/Roboto-Bold.ttf'
import Type from "./Type";
type Props = {
  arrayData: any;
};
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      fontWeight: 100,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      fontWeight: 200,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      fontWeight: 300,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
});
const styles = StyleSheet.create({
  pdfviewer: {
    width: "100%",
    height: "100%",
    border: "1px solid #ccc",
    overflow: "hidden",
  },
  document: {},
  page: {
    flexDirection: "row",
    display: "flex",
    borderColor: "black",
    fontFamily: "Inter",
  },
  viewType1: {
    width: "30%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#626262",
    padding: "20px 0",
  },
  viewType2: {
    width: "70%",
    color: "black",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 0",
  },
});

const Cv1 = (props: Props) => {
  const [colMax, setColMax] = useState<any>(2);
  const { arrayData } = props;
  return (
    <>
      {arrayData ? (
        <Document style={styles.document}>
          <Page style={styles.page}>
            <View style={styles.viewType1}>
              {arrayData?.[0]?.map((dt: any) => {
                return <Type data={dt} type={0} />;
              })}
            </View>
            <View style={styles.viewType2}>
              {arrayData?.[1]?.map((dt: any) => {
                return <Type data={dt} type={1} />;
              })}
            </View>
          </Page>
        </Document>
      ) : (
        <Document style={styles.document}>
          <Page style={styles.page}>
            <View></View>
            <Text>ABC</Text>
            <View></View>
          </Page>
        </Document>
      )}
    </>
  );
};

export default Cv1;
