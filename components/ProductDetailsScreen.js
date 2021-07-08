
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ActivityIndicator, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Database from '../Database';

//Instantiate the Database as a constant variable.
const db = new Database();

export default class ProductDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Employee Details',
  };


//Add a function as the constructor.
constructor() {
  super();
  this.state = {
    isLoading: true,
    product: {},
    id: '',
  };
}


//Add a function to initialize the screen.
componentDidMount() {
 
  this._subscribe = this.props.navigation.addListener('didFocus', () => {
    const { navigation } = this.props;
   
    db.productById(navigation.getParam('prodId')).then((data) => {
      console.log(data);
    
    
      product = data;
      
      this.setState({
        product,
        isLoading: false,
        id: product.prodId
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  });
}


//Add a function to delete a product data
deleteProduct(id) {
  const { navigation } = this.props;
  this.setState({
    isLoading: true
  });
  db.deleteProduct(id).then((result) => {
    console.log(result);
    this.props.navigation.goBack();
  }).catch((err) => {
    console.log(err);
    this.setState = {
      isLoading: false
    }
  })
}


//Add a function to render the whole Product Details view.
render() {
  if(this.state.isLoading){
    return(
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <ScrollView>
      <Card style={styles.container}>
        <View style={styles.subContainer}>
          <View>
            <Image
              style={{width: 150, height: 150}}
              source={{uri:"lkjhv"}}
            />
          </View>
          <View>
            <Text style={{fontSize: 16}}>Employee ID: {this.state.product.prodId}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16}}>Employee Name: {this.state.product.prodName}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16}}>Organization Name: {this.state.product.prodDesc}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16}}>Employee Status: {this.state.product.prodPrice}</Text>
          </View>
        </View>
        <View style={styles.detailButton}>
          <Button
            large
            backgroundColor={'#CCCCCC'}
            leftIcon={{name: 'edit'}}
            title='Edit'
            onPress={() => {
              this.props.navigation.navigate('EditProduct', {
                prodId: `${this.state.id}`,
              });
            }} />
        </View>
        <View style={styles.detailButton}>
          <Button
            large
            backgroundColor={'#999999'}
            color={'#FFFFFF'}
            leftIcon={{name: 'delete'}}
            title='Delete'
            onPress={() => this.deleteProduct(this.state.id)} />
        </View>
      </Card>
    </ScrollView>
  );
}

}


//Finally, add the stylesheet for this screen after the class bracket.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
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
  detailButton: {
    marginTop: 10
  }
})





