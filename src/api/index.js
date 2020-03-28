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

function searchTodo(options) {
  const { title, is, registed_gte, registed_lte } = options;
  const params = {
    _sort: `id`,
    _order: `desc`
  };

  if (title) params.q = title;
  if (is == "complete") params.done = true;
  else if (is == "incomplete") params.done = false;
  if (registed_gte) params.registed_gte = registed_gte;
  if (registed_lte) params.registed_lte = registed_lte;
  const queryStr = new URLSearchParams(params).toString();
  return axios.get(`http://localhost:8881/todo?${queryStr}`);
}

export { fetchList, pushTodo, patchTodo, deleteTodo, searchTodo };
