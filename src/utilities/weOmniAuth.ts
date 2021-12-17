import { CustomCallApi } from './customCallApi'
import axios from 'axios'
export const weOmniAuth = async (data: any) => {
  // const config = {
  //   method: 'POST',
  //   baseURL: process.env.WEOMNI_URL,
  //   url: '/uaa/oauth/token',
  //   qs.stringify({ grant_type: 'client_credentials' })
  //   headers: {
  //     'Cookie' : 'AWSALB=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; AWSALBCORS=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; XSRF-TOKEN=c111118f-5f77-42b3-a50d-3cdfd81904d2',
  //     'Content-Type': 'application/x-www-form-urlencoded', 
  //     'Authorization': `Basic ${process.env.ENCOED_TOKEN}`,
  //     'Accept-Encoding': 'gzip, deflate, br',
     
  //   }, 
    
  
  // }
  console.log('weOmniAuth');
  
  const requestBody = {
    grant_type: 'client_credentials',
  }
  
  const config = {
    headers: {
      'Cookie' : 'AWSALB=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; AWSALBCORS=Db5313RTMK4TNMhTKQLtSbcr7uG9bZ0NasJXs4XJiUHzzjjKQpYKYfsvTCdREOVokoi1DFYOIp8bZq+Xy0fEJ2I6ZunGgZPnYiVPH5RCJ3QKkr1+3ljQZjhue4Hh; XSRF-TOKEN=c111118f-5f77-42b3-a50d-3cdfd81904d2',
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': `Basic ${process.env.ENCOED_TOKEN}`,
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
  let url = 'https://platform.weomni.com/uaa/oauth/token'
  try{
    const response =  await axios.post(url,JSON.stringify(requestBody), config)
  .then((result) => {
    // Do somthing
    console.log('response' , response);
    console.log('result' , result);
    return result
  })
  .catch((err) => {
    console.log('err' , err);
  })
} catch(err)  {
  console.log('err' , err);
}

//  const response = await CustomCallApi(config)


}





