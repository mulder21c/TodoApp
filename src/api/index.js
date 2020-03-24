import axios from "axios";

function fetchList() {
  return axios.get(`http://localhost:8881/todo`);
}

export { fetchList };
