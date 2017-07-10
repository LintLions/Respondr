import {StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  button: {
    padding: 4,
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  container: {
    marginTop: 65,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 2,
  },
  header:{
    fontSize:24,
    fontWeight:'bold'
  },
  hideButton:{
    padding:4,
    justifyContent: 'center',
    alignSelf: 'center',

  },
  icon:{
    borderRadius:10,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: 'white'
  },
  IconContainer:{
    padding:10,
    width:65
  },
  loginModalInner:{
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  loginModal:{
          flex: 1,
          flexDirection: 'column',
          marginTop:65,
          alignItems: 'center'
  },
  signUp:{
    backgroundColor: 'white',
    margin:8
  },
  signupButton:{
    backgroundColor: 'white',
    borderColor: 'cyan',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    padding: 8
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
    backgroundColor: 'white'
  },
  searchIcon: {
    padding: 10,
    backgroundColor:'white'
  },
  signUpInput:{
    backgroundColor:'ghostwhite',
    borderWidth:1,
    borderRadius: 8,
    borderColor:'cyan',
    width: 300,
    padding: 4
  },
  toggle: {
    padding:2
  }
});
export default styles;