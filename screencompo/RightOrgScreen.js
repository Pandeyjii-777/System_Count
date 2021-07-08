
import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { forModalPresentationIOS } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/CardStyleInterpolators';
import Database from '../Database';

const db = new Database();

export default class RightOrgScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Employees List of Right Organizations',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { 
            navigation.navigate('AddProduct', {
              onNavigateBack: this.handleOnNavigateBack
            }); 
          }}
        />
      ),
    };
  };

//Add a constructor function.
  constructor() {
    super();
    this.state = {
      isLoading: true,
      products: [],
      notFound: 'Employee not found.\nPlease click (+) button to add it.'
    };
  }

//Add a function to initialize the screen.
  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getProducts();
    });
  }


//Add a function to get the product list from Database class.
  getProducts() {
    let products = [];
    db.listProductR().then((data) => {
      products = data;
      this.setState({
        products,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false,
      }
    })
  }


  //Add a variable to iterate the listed product in the view.
  keyExtractor = (item, index) => index.toString()


//Add a function to render the List Item.
  renderItem = ({ item }) => (<> 
   
  <TouchableOpacity style={styles.btn1}
   onPress={() => {
    this.props.navigation.navigate('ProductDetails', {
      prodId: `${item.prodId}`,
    });
  }}>
  {}
  <Text style={styles.btn1text}>{item.prodDesc[0]}</Text>
  <Text style={styles.btn2text}>{item.prodName}</Text>
  <Text style={styles.btn3text}>Details</Text>
 
    </TouchableOpacity>

  </>)


  //Add a function to render the rest of List view.
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }
    if(this.state.products.length === 0){
      return(
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      )
    }
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.products}
        renderItem={this.renderItem}
      />
    );
  }
}


//Finally, add a stylesheet for the whole screen after the class bracket.
  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingBottom: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    message: {
      padding: 16,
      fontSize: 18,
      color: 'red'
    },
    btn1:{
      marginVertical: 10, 
      height: 50,
      backgroundColor: 'blue',
      opacity: 1
    },
  
    btn1text:{
      display: 'flex',
      textAlign: 'center',
      position:'absolute',
      marginTop: 5,
      left: 5,
      color: "gold",
      fontSize: 26,
      opacity: 1,
      backgroundColor:'red',
      height: 40,
      width: 40,
      borderRadius: 80
    },
    btn2text:{
      display: 'flex',
      textAlign: 'center',
      color: "white",
      fontSize: 22,
      opacity: 1
    },
    btn3text:{
      display: 'flex',
      textAlign: 'center',
      position:'absolute',
      right: 5,
      color: "black",
      fontSize: 17,
      opacity: 1
    },
    

  });
  

