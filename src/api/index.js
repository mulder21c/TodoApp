import axios from "axios";

function fetchList() {
  return axios.get(`http://localhost:8881/todo`);
}

function pushTodo(params) {
  return axios.post(`http://localhost:8881/todo`, params);
}

function patchTodo(id, params) {
  return axios.patch(`http://localhost:8881/todo/${id}`, params);
}

function deleteTodo(id) {
  return axios.delete(`http://localhost:8881/todo/${id}`);
}

export { fetchList, pushTodo, patchTodo, deleteTodo };
