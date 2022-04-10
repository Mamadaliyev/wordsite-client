import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SigninView from "../views/auth/SigninView.vue";
import SignupView from "../views/auth/SignupView.vue";
import ProfileView from "../views/ProfileView.vue";
import MyWordsView from "../views/words/MyWordsView.vue";
import Tags from "../views/TagsView.vue";
import Quiz from "../views/quiz/QuizView.vue";
import QuizTestView from "../views/quiz/QuizTestView";
import QuizInfoView from "../views/quiz/QuizInfoView";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SigninView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignupView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tags",
    name: "tags",
    component: Tags,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/quiz",
    name: "quiz",
    component: Quiz,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/quiz/test",
    name: "quiz-test",
    component: QuizTestView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/quiz/test/:id",
    name: "quiz-retest",
    component: QuizTestView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/quiz/info/:id",
    name: "quiz-info",
    component: QuizInfoView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my-words",
    name: "my-words",
    component: MyWordsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    meta: {
      requiresAuth: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.token && from.name !== to.name) {
      router.push({
        name: "sign-in",
      });
    } else {
      next();
    }
  }
  next();
});

export default router;
