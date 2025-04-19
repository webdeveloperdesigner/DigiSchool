// TestApp/index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
AppRegistry.registerComponent("main", () => App); // ✅ matches app.json
// import { GoogleSignin } from '@react-native-google-signin/google-signin';


// babel.config.js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"]
};


// GoogleSignin.configure({
//   webClientId: '637692250788-anvpd265orvt07f305uac6ue9gi68um4.apps.googleusercontent.com', // From Firebase -> Authentication -> Sign-in method -> Google
// });

