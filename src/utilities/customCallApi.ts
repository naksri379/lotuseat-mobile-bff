import axios from 'axios'

export async function CustomCallApi(config: any) {
  let response
  try {
   // logger.request(req)
    response = await axios(config)
  } catch (err) {
      console.error(err)
   // logger.error(err)
  } finally {
      console.log(response)
   // logger.response(req, response)
    return response
  }
}
