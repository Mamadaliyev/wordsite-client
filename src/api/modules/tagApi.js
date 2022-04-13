import { Api } from "../api";

export class TagApi extends Api {
  getPaging(query) {
    return this.execute("get", "/tag", {}, query);
  }
}
