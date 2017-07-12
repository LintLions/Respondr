import {StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  bold:{
    fontSize: 18,
    fontWeight:'bold',
    padding:4,
  },
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
    backgroundColor: 'gainsboro',
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  explainer: {
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    padding: 10
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  flowRightImage: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
  },
  header:{
    fontSize:24,
    fontWeight:'bold',
    padding:8,
    alignSelf:'center',
  },
  hideButton:{
    padding:4,
    justifyContent: 'center',
    alignSelf: 'center',

  },
  IconContainer:{
    padding:10,
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
  nav:{
    alignContent: 'space-between',
    justifyContent: 'center'
  },
  navIcon:{
    padding:10
  },
  navArrow:{
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUp:{
    backgroundColor: 'white',
    margin:8
  },
  signUpButton:{
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
    backgroundColor: 'white'
  },
  searchIcon: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 4,
    backgroundColor: 'white'
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