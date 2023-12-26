import { CalendarRangeIcon } from "lucide-react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useLocation } from "react-router";
import { Divider, Panel } from "rsuite";
import { PDFViewer } from "@react-pdf/renderer";
import LohitBengaliFont from "../../../../public/fonts/lohit_bd.ttf";
Font.register({ family: "Lohit Bengali", src: LohitBengaliFont });

const Invoice = () => {
  const location = useLocation();
  const data = location.state.data.data;
  const company = location.state.data.companyInfo;

  console.log(data);
  function formatDateString(originalDateString) {
    const originalDate = new Date(originalDateString);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    };

    return originalDate.toLocaleString("en-US", options);
  }

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 10,
      textDecoration: "underline",
    },
    company_label: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    company_email: {
      fontSize: "13px",
      fontWeight: "extrabold",
      marginTop: 5,
    },
    company_address: {
      fontSize: "13px",
      fontWeight: "extrabold",
    },
    info_order: {
      marginTop: 30,
      fontSize: "13px",
      fontWeight: "extrabold",
    },
    info_customer: {
      marginTop: 10,
      fontSize: "13px",
      fontWeight: "extrabold",
      fontFamily: "Lohit Bengali",
    },
    info_email: {
      fontSize: "13px",
      fontWeight: "extrabold",
    },
    common_order: {
      fontSize: "13px",
      fontWeight: "extrabold",
    },
    productRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottom: "1px solid #000000",
      paddingBottom: 5,
      paddingTop: 5,
    },
    productName: {
      flexGrow: 2,
    },
    productQuantity: {
      flexGrow: 1,
      textAlign: "center",
    },
    productPrice: {
      flexGrow: 1,
      textAlign: "right",
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10,
    },
    totalLabel: {
      marginRight: 10,
    },
    totalPrice: {
      fontWeight: "bold",
    },
    table_header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#eeeee1",
      padding: "10",
      marginTop: "20",
      fontSize: "15px",
      fontWeight: "extrabold",
    },
    table_total: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    
      padding: "10",
      fontSize: "15px",
      fontWeight: "extrabold",
    },
    table_body: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "10",
      fontSize: "15px",
      fontWeight:"extralight"
 
    },
    table_header_quantity: {
      marginLeft: 20,
    },
    table_body_product: {
      width: 400,
      fontSize:10
    },
    table_body_price: {
    
      fontSize:10
    },
    devider: {
      border:"0.5px"
    }
  });

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };
  return (
    <div>
      <Panel
        header={
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold">Invoice</h2>
            <p className="font-mono font-bold text-md">
              Invoice for id : {data._id}{" "}
            </p>
          </div>
        }
      >
        <Panel bordered className="w-3/3 h-screen">
          <div className="flex justify-between">
            <p className="flex gap-2">
              <CalendarRangeIcon size={40} />{" "}
              <div className="flex flex-col gap-1 font-medium font-mono">
                <span>Order Time : {formatDateString(data.createdAt)}</span>
                <span>Pickup Time : {data.pickup_time}</span>
              </div>
            </p>
          </div>
          <Divider />
          <Panel bordered className="h-screen">
            <PDFViewer className="w-full h-screen">
              <Document pageMode="fullScreen">
                <Page size="A4" style={styles.page}>
                  <View style={styles.section}>
                    <Text style={styles.header}>Invoice</Text>
                    <Text style={styles.company_label}>
                      {company.brand_label}
                    </Text>
                    <Text style={styles.company_email}>
                      {company.brand_email}
                    </Text>
                    <Text style={styles.company_address}>
                      {company.brand_address}
                    </Text>

                    <Text style={styles.info_order}>Order ID : {data._id}</Text>
                    <Text style={styles.common_order}>
                      Order Date : {formatDateString(data.createdAt)}
                    </Text>
                    <Text style={styles.common_order}>
                      Pickup Date : {data.pickup_time}
                    </Text>
                    <Text style={styles.info_customer}>
                      Customer Name : {data.user_name}
                    </Text>
                    <Text style={styles.info_email}>
                      Contact Number : {data.user_id.phoneNumber}
                    </Text>
                    <Text style={styles.info_email}>
                      Email : {data.user_id.email}
                    </Text>
                    <View style={styles.table_header}>
                      <Text style={styles.table_header_product}>Products</Text>
                      <Text style={styles.table_header_price}>Price</Text>
                    </View>
                    {data.items.map((item,index) => (
                      <>
                        <View style={styles.table_body}>
                          <Text style={styles.table_body_product}>
                            {index + 1}.{item.product_name} x{item.product_quantity}
                          </Text>
                          <Text style={styles.table_body_price}>${item.product_price }</Text>
                        </View>
                      </>
                    ))}
                    <Text style={styles.devider}></Text>
                    <View style={styles.table_total}>
                      <Text style={styles.table_header_product}>Total cost of products :</Text>
                      <Text style={styles.table_header_price}>${data.totalCost }</Text>
                    </View>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </Panel>
        </Panel>
      </Panel>
    </div>
  );
};

export default Invoice;
