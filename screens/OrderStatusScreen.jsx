import React, { Component } from "react";
import { Text, StyleSheet, View, Alert, Image } from "react-native";
import { ScrollView, TouchableHighlight, TouchableOpacity  } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import OrderStatusCard from "../components/OrderStatusCard";
import Screen from "../components/Screen";
import constants from "../utils/constants";
import colors from "../config/colors";

const axios = require("axios").default;


export default class OrderStatusScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      requisitions:[],
       selectedType:"ALL" ,  // APPROVAL_PENDING , APPROVED , REJECTED , IN_PROCESS , ORDER_PLACED , DELIVERED , PARTIALLY_DELIVERED 
        isLoading:false
     
    };
    this.onPress = this.onPress.bind(this);
    this.onPressCard = this.onPressCard.bind(this);
  }

  onPressCard(requisitionId, status){

    // Alert.alert("The requisiond id is: "+requisitionId);
    this.props.navigation.navigate("OrderStatusFullScreen",{requisitionId:requisitionId, status:status});
  }

  onPress(type) {


   if( type=='ALL'){

    this.setState({requisitions:[]});
    this.setState({isLoading:true});
     
      this.setState({
        selectedType:"ALL"
      }, () => {
          //Type all network call start
            axios.get(constants.ipAddress + "/requisition/all")
            .then(
              function (response) {
                  
                this.setState({
                    requisitions: response.data 
                }, () => {
                  this.setState({isLoading:false});
                });

              }.bind(this)
            )
            .catch(
              function (error) {
                console.log("error occurred -" + error);
                this.setState({isLoading:false});
              }.bind(this)
            );
          //Type all network call end
      });

   }else if( type=='APPROVAL_PENDING'){

    this.setState({requisitions:[]});
    this.setState({isLoading:true});

      this.setState({
          selectedType:"APPROVAL_PENDING"
      }, () => {
        //Approval pending network call start
          axios.get(constants.ipAddress + "/requisition/type=APPROVAL_PENDING")
          .then(
            function (response) {
                
              this.setState({
                  requisitions: response.data 
              }, () => {
                this.setState({isLoading:false});
              });

            }.bind(this)
          )
          .catch(
            function (error) {
              console.log("error occurred -" + error);
              this.setState({isLoading:false});
            }.bind(this)
          );

        //Approval pending network call end
      });

   }else if( type=='APPROVED'){

    this.setState({requisitions:[]});
    this.setState({isLoading:true});
      this.setState({
          selectedType:"APPROVED"
      }, () => {
        //approved network call start
        axios.get(constants.ipAddress + "/requisition/type=APPROVED")
        .then(
          function (response) {
              
            this.setState({
                requisitions: response.data 
            }, () => {
              this.setState({isLoading:false});
            });

          }.bind(this)
        )
        .catch(
          function (error) {
            console.log("error occurred -" + error);
            this.setState({isLoading:false});
          }.bind(this)
        );

      //approved network call end
      });

  }else if( type=='REJECTED'){
    
    this.setState({requisitions:[]});
    this.setState({isLoading:true});
      this.setState({
          selectedType:"REJECTED"
      }, () => {
          //Rejected network call start
          axios.get(constants.ipAddress + "/requisition/type=REJECTED")
          .then(
            function (response) {
                
              this.setState({
                  requisitions: response.data 
              }, () => {
                this.setState({isLoading:false});
              });
  
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log("error occurred -" + error);
              this.setState({isLoading:false});
            }.bind(this)
          );
  
        //Rejected network call end
      });

  }else if( type=='IN_PROCESS'){
    
    this.setState({requisitions:[]});
    this.setState({isLoading:true});
      this.setState({
          selectedType:"IN_PROCESS"
      }, () => {
          //Rejected network call start
          axios.get(constants.ipAddress + "/requisition/type=IN_PROCESS")
          .then(
            function (response) {
                
              this.setState({
                  requisitions: response.data 
              }, () => {
                this.setState({isLoading:false});
              });
  
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log("error occurred -" + error);
              this.setState({isLoading:false});
            }.bind(this)
          );
  
        //Rejected network call end
      });

  }else if( type=='ORDER_PLACED'){
    
      this.setState({
          selectedType:"ORDER_PLACED"
      }, () => {
        Alert.alert(this.state.selectedType);
      });

  }else if( type=='DELIVERED'){
    
      this.setState({
          selectedType:"DELIVERED"
      }, () => {
        Alert.alert(this.state.selectedType);
      });

  } else if( type=='PARTIALLY_DELIVERED'){
    
      this.setState({
          selectedType:"PARTIALLY_DELIVERED"
      }, () => {
        Alert.alert(this.state.selectedType);
      });
  }

  
  }


  componentDidMount(){
    this.setState({isLoading:true});

    axios
    .get(constants.ipAddress + "/requisition/all")
    .then(
      function (response) {
           
        this.setState({
            requisitions: response.data
        }, () => {
          this.setState({isLoading:false});
        });

      }.bind(this)
    )
    .catch(
      function (error) {
        console.log("error occurred -" + error);
        this.setState({isLoading:false});
      }.bind(this)
    );



  }

  onPressPlaceNewOrder = () => {
    // this.props.navigation.navigate("PlaceOrderScreen",{itemObjId:this.state.itemObjId, loggedUser:this.state.loggedUser});
    Alert.alert("Hi");
  };

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
          <View style={styles.orderStatusTitleView}>
            <AppText style={styles.orderStatusTitleTxt}>Order Status</AppText>
          </View>
 
        
             
         
          <View>
            <ScrollView horizontal={true}>

            {/* <View style={styles.singleButton}>
              <TouchableOpacity
                onPress={this.onPressPlaceNewOrder}
                style={[styles.buttonCommon, { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>All</Text>
              </TouchableOpacity>
            </View> */}

            <View style={styles.singleButton}>
              <TouchableOpacity
               onPress={() => this.onPress('ALL')}
                style={[styles.buttonCommon,  this.state.selectedType == 'ALL' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('APPROVAL_PENDING')}
                style={[styles.buttonCommon,  this.state.selectedType == 'APPROVAL_PENDING' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Approval Pending</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('APPROVED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'APPROVED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Approved</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('REJECTED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'REJECTED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Rejected</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('IN_PROCESS')}
                style={[styles.buttonCommon,  this.state.selectedType == 'IN_PROCESS' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>In Process</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('ORDER_PLACED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'ORDER_PLACED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Order Placed</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('DELIVERED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'DELIVERED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>delivered</Text>
              </TouchableOpacity>
            </View>            
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('PARTIALLY_DELIVERED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'PARTIALLY_DELIVERED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Partially Delivered</Text>
              </TouchableOpacity>
            </View>


            </ScrollView>

           
            {this.state.isLoading == true &&               
              <View style={styles.gearLoadingContainer}>
                  <Image
                      source={require("../assets/orderStatus/loading.gif")}
                      style={styles.gearLoadingImg}
                    />
              </View> 
            }

          </View>


          <ScrollView>


           {this.state.requisitions.map((item) =>
           
            <TouchableOpacity onPress={() => this.onPressCard(item._id,item.status)}>

            
            <OrderStatusCard 
            key={item._id}
            itemId={item.itemId} 
            RequisitionId={item._id} 
            status={item.status} 
            date={item.requiredDate} 
            site={item.siteId} 
            siteManager={item.siteManagerUsername} 
            price={item.totalPrice} 
            priority={item.priority} />
            </TouchableOpacity>
          
          )}  


      
            
          </ScrollView>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  orderStatusTitleView:{
    alignItems:"center",
    padding: 10,
  },
  orderStatusTitleTxt:{
    fontSize:20,
    fontWeight:"bold"
  },

 

 appButtonTextAll: {
    fontSize: 15,
    color: colors.btnTextColor,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonCommon:{
    borderRadius: 30,
    paddingVertical: 10, 
    paddingHorizontal: 12, 
  
   
    height: 40,
    elevation: 8,
  },
  singleButton:{
    padding: 10,

  },
  gearLoadingContainer:{
    alignItems:"center"
  },
  gearLoadingImg:{
    width:80,
    height:80
  }
 

});
