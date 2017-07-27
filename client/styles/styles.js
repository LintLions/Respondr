import { StyleSheet } from 'react-native';

/* STYLES MAP
*/

var styles = StyleSheet.create({
  ring: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(63,150,191,0.5)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(180,4,4,0.5)",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
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
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
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
  goodButton: {
    height: 150,
    width: 150, 
    borderRadius: 75,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 30,
    
    backgroundColor: '#48BBEC',
    borderRadius: 75,
    
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
    marginTop: 15,
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
  button1: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
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
  box3: {
    // flex: 1,
    padding: 20,
    height: 400,
    // top: 50,
    bottom: -120,
    // justifyContent: 'center',
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  beaconChat: {
    flex: 1,
    height: 222,
    padding: 20,
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  beaconChatContainer:{
    height: 200,
    // width: 500, 
    borderRadius: 75,
    // justifyContent: 'center', 
    // alignItems: 'center',
    margin: 10,
  },
});

export default styles;