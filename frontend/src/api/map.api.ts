import {ENV} from "../common/enums/env.enum";
import axios from "axios";

class MapApi {
    baseUrl = ENV.HASURA_API_URL;
    axios = axios.create({
        baseURL: this.baseUrl
    })

    async getAllCapitals() {
        const result = await this.axios({
          url: '/',
          method: "post",
          headers: {
              "content-type": "application/json",
          },
          data: {
              "operationName": "fetchCapitals",
              "query": `query fetchCapitals { capitals { capital location id } }`,
              "variables": {}
          }
        })
        return result.data;
    }
}

export { MapApi };