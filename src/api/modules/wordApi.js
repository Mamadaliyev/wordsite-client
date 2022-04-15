import { Api } from "../api";

export class WordApi extends Api {
  getPublicWordsPaging(query) {
    return this.execute("get", "/word", {}, query);
  }
  create(data) {
    return this.execute("post", "/word", data);
  }
  update(id, data) {
    return this.execute("put", `/word/${id}`, data);
  }
  delete(id) {
    return this.execute("delete", `/word/${id}`);
  }
  getMyWordsPaging(query) {
    return this.execute("get", "/word/my-words", {}, query);
  }
}