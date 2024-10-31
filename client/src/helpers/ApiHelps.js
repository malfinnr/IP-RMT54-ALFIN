import axios from "axios";

const baseUrlApi = "https://iproject.presidentalfinison.site";

const apiHelps = axios.create({ baseURL: baseUrlApi });

export default apiHelps;
