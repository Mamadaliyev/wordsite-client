import { Api } from "../api";

export class UserApi extends Api {
  login(data) {
    return this.execute("post", "/user/login", data);
  }
  logout() {
    return this.execute("post", "/user/logout");
  }
  register(data) {
    return this.execute("post", "/user/register", data);
  }
  update(data) {
    return this.execute("put", "/user", data);
  }
  delete() {
    return this.execute("delete", "/user");
  }
  getInfo() {
    return this.execute("get", "/user");
  }
}
