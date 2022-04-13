import { Api } from "../api";

export class TagApi extends Api {
  getPaging(query) {
    return this.execute("get", "/tag", {}, query);
  }
  getForChoose(query) {
    return this.execute("get", "/tag/get-for-choose", {}, query);
  }
}
