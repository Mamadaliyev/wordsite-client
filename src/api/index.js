import { QuizApi } from "./modules/quizApi";
import { TagApi } from "./modules/tagApi";
import { UserApi } from "./modules/userApi";
import { WordApi } from "./modules/wordApi";

export const quizApi = new QuizApi();
export const wordApi = new WordApi();
export const userApi = new UserApi();
export const tagApi = new TagApi();
