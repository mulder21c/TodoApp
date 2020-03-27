import axios from "axios";

function fetchList() {
  return axios.get(`http://localhost:8881/todo`);
}

function pushTodo(params) {
  return axios.post(`http://localhost:8881/todo`, params);
}

function changeState(id, done) {
  return axios.patch(`http://localhost:8881/todo/${id}`, { done });
}

export { fetchList, pushTodo, changeState };
