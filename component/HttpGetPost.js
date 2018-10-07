const axios = require('axios');
import deviceStorage from "./Login/jwt/services/deviceStorage";
// device.DeviceID = DeviceInfo.getUniqueID();
let token = ''
deviceStorage.get('token').then((GetToken) => {
        token = GetToken
        console.log(token)
        });
// Make a request for a user with a given ID
const AuthStr = 'Bearer '.concat(token);

//
export default class HttpGetPost{
	static get(url){
	    axios.get(URL, { headers: { Authorization: AuthStr } }).then(response => {
	            // If request is good...
	            console.log(response.data);
	          })
	          .catch((error) => {
	            console.log('error 3 ' + error);
	          });
		}
	}