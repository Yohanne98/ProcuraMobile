import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Picker,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../common/AppText";
import { ScrollView } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";

export default class PlaceOrderScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      supplier: "Holcim",
      price: 1000,
      Item: "Cement",
      supplierLogo:
        "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2Ftemp%2Fholcim.jpg?alt=media&token=1f95c2ee-44fa-4b82-b8f3-ad1c30724fac",
      options: {
        1: "Colombo",
        2: "Galle",
        3: "Kandy",
        4: "Anuradhapura",
        5: "Katharagama",
      },
      selectedSite: "",

      //
      orderCount: 1,
    };
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <ScrollView>
          <View style={styles.titleArea}>
            <AppText style={styles.titleText}>Place Order</AppText>
          </View>

          {/* supplier area start */}
          <View style={styles.supplierContainer}>
            <View style={{ alignItems: "center", padding: 10 }}>
              <AppText style={{ fontSize: 20, fontWeight: "bold" }}>
                Supplier Details
              </AppText>
            </View>

            <View style={styles.supplierItemPriceContainer}>
              <View style={styles.leftSide}>
                {/* logo side start */}
                <Image
                  style={styles.supplierLogoStyle}
                  source={
                    this.state.supplierLogo
                      ? { uri: this.state.supplierLogo }
                      : null
                  }
                />
                {/* logo side end */}
              </View>
              <View style={styles.rightSide}>
                {/* Right side start */}
                <View style={styles.rightSideRow}>
                  <View style={styles.supplierTitleView}>
                    <AppText style={styles.supplierTitleTxt}>
                      Supplier :
                    </AppText>
                  </View>
                  <View style={styles.supplierValueView}>
                    <AppText style={styles.supplierValueTxt}>
                      {this.state.supplier}
                    </AppText>
                  </View>
                </View>

                <View style={styles.rightSideRow}>
                  <View style={styles.supplierTitleView}>
                    <AppText style={styles.supplierTitleTxt}>Item :</AppText>
                  </View>
                  <View style={styles.supplierValueView}>
                    <AppText style={styles.supplierValueTxt}>
                      {this.state.Item}
                    </AppText>
                  </View>
                </View>

                <View style={styles.rightSideRow}>
                  <View style={styles.supplierTitleView}>
                    <AppText style={styles.supplierTitleTxt}>Price :</AppText>
                  </View>
                  <View style={styles.supplierValueView}>
                    <AppText style={styles.supplierValueTxt}>
                      {this.state.price}
                    </AppText>
                  </View>
                </View>
                {/* Right side end */}
              </View>
            </View>
          </View>

          {/* supplier area end */}

          {/* construction Site - start */}
          <View style={styles.constructionSiteContainer}>
            <View style={styles.constructionSiteLeftSide}>
              <AppText style={styles.constructionSiteTxt}>
                Construction Site :
              </AppText>
            </View>
            <View style={styles.constructionSiteRightSide}>
              <View style={styles.pickerContainer}>
                {/* <Picker
                selectedValue={this.state.selectedValue}
                style={{ height: 50, width: 150 }}
                // onValueChange={(itemValue, itemIndex) =>
                //   setSelectedValue(itemValue)
                // }
              >
                <Picker.Item label="Australia" value="java" />
                <Picker.Item label="Canada" value="js" />
                <Picker.Item label="India" value="js" />
                <Picker.Item label="New Zealand" value="js" />
                <Picker.Item label="Singapre" value="js" />
                <Picker.Item label="USA" value="js" />
              </Picker> */}

                <Picker
                  style={{ width: 200 }}
                  mode="dropdown"
                  selectedValue={this.state.selectedSite}
                  onValueChange={() => {}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedSite: itemValue })
                  }
                >
                  {Object.keys(this.state.options).map((key) => {
                    return (
                      <Picker.Item
                        label={this.state.options[key]}
                        value={key}
                        key={key}
                      />
                    ); //if you have a bunch of keys value pair
                  })}
                </Picker>
              </View>
            </View>
          </View>
          {/* construction Site - end */}

          {/* OrderDetails - start */}
          <View style={styles.orderDetailsContainer}>
            <View style={styles.orderDetailsTitleContainer}>
              <AppText style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Details
              </AppText>
            </View>
            <View>
              <NumericInput
                initValue={1}
                onChange={(value) => this.setState({ orderCount: value })}
                totalWidth={200}
                totalHeight={50}
                iconSize={25}
                step={1}
                minValue={1}
                valueType="real"
                rounded
                textColor="#B0228C"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#EA3788"
                leftButtonBackgroundColor="#E56B70"
              />
            </View>
          </View>
          {/* Order Details - end */}

          <View style={styles.placeOrderBtnView}>
            <TouchableOpacity
              // onPress={this.onPressPlaceNewOrder}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: colors.btnColor,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
    height: 50,
  },
  appButtonText: {
    fontSize: 18,
    // color: "#fff",
    color: colors.btnTextColor,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  titleArea: {
    alignItems: "center",
    padding: 18,
  },
  titleText: {
    fontSize: 27,
    fontWeight: "bold",
  },
  supplierContainer: {
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  //
  supplierItemPriceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftSide: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  rightSide: {
    paddingTop: 8,
  },

  supplierLogoStyle: {
    width: 160,
    height: 90,
    borderRadius: 20,
  },
  rightSideRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  supplierTitleView: {
    width: 90,
  },
  supplierValueView: {},

  supplierTitleTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  supplierValueTxt: { fontSize: 18 },

  placeOrderBtnView: {
    alignItems: "center",
    paddingBottom: 20,
  },

  constructionSiteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
  },
  constructionSiteLeftSide: {
    paddingTop: 10,
    paddingLeft: 10,
    // backgroundColor: "green",
    width: 180,
  },
  constructionSiteRightSide: {},
  constructionSiteTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {},
  //   Order details
  orderDetailsContainer: {
    padding: 10,
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },

  orderDetailsTitleContainer: {
    alignItems: "center",
    padding: 10,
  },
});