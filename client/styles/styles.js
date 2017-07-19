import { StyleSheet } from 'react-native';

/* STYLES MAP
*/

var styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  // =============================
  container: {
    flex: 1
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  bottom: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  layoutTest: { // to test layout area
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'red',
    borderWidth: 1,
  },
  // =============================
  helpButtonContainer:{
    height: 150,
    width: 150, 
    borderRadius: 75,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 30,
  },
  helpButton: {
    height: 150,
    width: 150, 
    borderRadius: 75,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 30,
    
    backgroundColor: '#b22222',
    borderRadius: 75,
    
  },
  helpButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  // =============================
  icon:{
    borderRadius:10,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: 'white',
    margin: 5
  },
  iconContainer:{
    padding:10,
  },
  loginModal:{
    flex: 1,
    flexDirection: 'column',
    marginTop:65,
    alignItems: 'center'
  },
  loginModalInner:{
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  header:{
    fontSize:24,
    fontWeight:'bold',
    padding:8,
    alignSelf:'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 2,
  },
  searchIcon: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 4,
    backgroundColor: 'white'
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
  signUp:{
    backgroundColor: 'white',
    margin:8
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

  bold:{
    fontSize: 18,
    fontWeight:'bold',
    padding:4,
  },
  explainer: {
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    padding: 10
  },
  // =============================
  toggleIcon: {
    padding: 20,
  },
  box1: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  box2: {
    flex: 1,
    padding: 20,
    height: 450,
    bottom: 275,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  prompt: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    color: '#656565',
    marginBottom: 20,
  },
  missionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 36,
    margin: 10,

    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  missionButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default styles;

// ======== OLD STYLES ARCHIVE ========
// =========== (DO NOT USE) ===========
var stylesArchive = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  containerColumn: {
    flexDirection: 'column'
  },
  containerRow: {
    flexDirection: 'row'
  },
  // =================================
  // styles for BottomBar-HelpRequests 
  // =================================
  container: {
    flex: 1
  },
  box1: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  box2: {
    flex: 2
  },
  bottomBox: {
    position: 'absolute'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  prompt: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    color: '#656565',
    marginBottom: 20
  },
  buttonDirection: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 36,
    margin: 10,

    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  // =================================
  // styles for BottomBar-AngelStatus 
  // =================================
  toggleIcon: {
    padding: 20
  },
  container: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  containerInner: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#999999',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  switchButton: {
    
  },
  // =================================
  // styles for TopBar 
  // =================================
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
  },
  // =================================
  // styles for SignUp
  // =================================
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
  },




  // =================================
  // JC Re-Write
  // =================================
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  topLeft: {
    position: 'absolute',
    top: 20, // STATUS_BAR_HEIGHT_IOS
    left: 10,
    zIndex: 5,
  },
  topRight: {
    position: 'absolute',
    top: 20, // STATUS_BAR_HEIGHT_IOS
    right: 10,
    zIndex: 5,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 20, // STATUS_BAR_HEIGHT_IOS
    right: 10,
    zIndex: 5,
  },
  // =============================
  helpButtonContainer:{
    height: 150,
    width: 150, 
    borderRadius: 75,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 30,
  },
  helpButton: {
    height: 150,
    width: 150, 
    borderRadius: 75,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 30,
    
    backgroundColor: '#b22222',
    borderRadius: 75,
    
  },
  helpButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  helpButtonPosition: {
    justifyContent: 'flex-end',
    // position: 'absolute',
    // bottom: 0,
    // flex: 1,
    // height: 222,
    // padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  layoutTest: {
    // ==== (layout testing) ====================
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'red',
    borderWidth: 1,
    // ==========================================
  },
  bottom: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
});