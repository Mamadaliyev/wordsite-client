import { Api } from "../api";

export class QuizApi extends Api {
  getPaging(query) {
    return this.execute("get", "/quiz", {}, query);
  }
  create(data) {
    return this.execute("post", "/quiz", data);
  }
  finish(id) {
    return this.execute("post", `/quiz/finish/${id}`);
  }
  get(id) {
    return this.execute("get", `/quiz/${id}`);
  }
  answer(quizId, answerId) {
    return this.execute("post", `/quiz/answer/${quizId}/${answerId}`);
  }
}
