import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => ({
    todos: [],
  }),
  modules: {
    auth: authModule
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
    }
  },
  actions: {
    async loadTodos(context) {

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      const todos = [];

      for (const key in responseData) {
        const todo = {
          id: responseData[key].id,
          title: responseData[key].title,
          userId: responseData[key].userId,
          completed: responseData[key].completed,
        };
        todos.push(todo);
      }
      context.commit('setTodos', todos);
    }
  },
  getters: {
    getTodos: state => {
      return state.todos
    }
  },
})

export default store;