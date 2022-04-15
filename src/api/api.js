import { config } from "@/config";
import store from "@/store";
import axios from "axios";
import { Message } from "element-ui";

export class Api {
  token;
  userData;
  baseUrl;
  instance;
  timeout = 6000;
  constructor() {
    this.token = store.state.token;
    this.userData = store.state.userData;
    this.baseUrl = config.BASE_URL;
    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async execute(method, url, data, query) {
    try {
      if (query) url += this.makeQueryString(query);

      const response = await this.instance.request({
        method: method,
        url: url,
        data: data,
      });
      console.log(response);
      return response.data;
    } catch (e) {
      if (e.response.data) Message.error(e.response.data.message);
      console.log(e);
      throw e;
    }
  }

  makeQueryString(params) {
    let queryString = "";

    Object.keys(params).forEach((key) => {
      if (
        params[key] !== null &&
        params[key] !== "" &&
        params[key] !== undefined
      ) {
        let value = params[key];
        if (typeof value === "string") {
          value = encodeURI(value);
        }
        queryString = `${queryString + key}=${value}&`;
      }
    });
    queryString = queryString.slice(0, -1);
    queryString = queryString ? `?${queryString}` : queryString;

    return queryString;
  }

  async login(payload) {
    const data = await this.execute("post", "/user/login", payload);

    return data;
  }
}