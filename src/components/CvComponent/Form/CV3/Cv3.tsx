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
    width: "100vw",
    height: "100vh",
    border: "1px solid #ccc",
    overflow: "hidden",
  },
  document: {},
  page: {
    flexDirection: "column",
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
    backgroundColor: "#000000",
    padding: "20px 0",
  },
  viewPart: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  viewCol: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px 0px",
  },
  viewAll: {
    display: "flex",
    flexDirection: "column",
    padding: "0 5px",
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

const Cv3 = (props: Props) => {
  const [parameter, setParameter] = useState<any>([
    { col: 2, color: "#ffffff|#ffffff", part: "1|2" },
  ]);
  const { arrayData } = props;
  const handleCell = (data: any, index: any) => {
    const array = data.toString()?.split("|");
    let tong = array.reduce((accumulator: any, currentValue: any) => {
      return accumulator + Number(currentValue);
    }, 0);
    return (array[index] / tong) * 100 + "%";
  };
  const handleColor = (data: any, index: any) => {
    const array = data.toString()?.split("|");
    return array[index];
  };
  const ViewCol = ({ data, index }: any) => {
    return Array.from({ length: data.col }).map((dt: any, i: any) => {
      return (
        <View
          style={{
            ...styles.viewCol,
            width: handleCell(data.part, i),
            backgroundColor: handleColor(data.color, i),
            color: i === 0 ? "black" : "black",
          }}
        >
          {arrayData[i]?.map((dt: any) => {
            return <Type data={dt} type={0} />;
          })}
        </View>
      );
    });
  };
  const ViewPart = () => {
    return parameter.map((dt: any, index: any) => {
      return (
        <View style={{ ...styles.viewPart }}>
          <ViewCol data={dt} index={index} />
        </View>
      );
    });
  };
  return (
    <>
      {arrayData && parameter ? (
        <Document style={styles.document}>
          <Page style={styles.page}>
            <View style={{ ...styles.viewAll }}>
              <ViewPart />
            </View>
          </Page>
        </Document>
      ) : (
        <Document style={styles.document}>
          <Page style={styles.page}></Page>
        </Document>
      )}
    </>
  );
};

export default Cv3;
