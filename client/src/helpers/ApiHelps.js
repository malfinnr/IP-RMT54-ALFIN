import axios from "axios";

const baseUrlApi = "http://localhost:3000";

const apiHelps = axios.create({ baseURL: baseUrlApi });

export default apiHelps;
