import axios from "axios";

const baseUrlApi = "http://3.0.98.92";

const apiHelps = axios.create({ baseURL: baseUrlApi });

export default apiHelps;
