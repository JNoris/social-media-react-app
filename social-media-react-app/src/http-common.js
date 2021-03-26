import axios from "axios";

const baseURL = "http://localhost5001";
export default axios.create({
    baseURL:baseURL,
    headers: {
        "Content-type":"application/json"
    }
});