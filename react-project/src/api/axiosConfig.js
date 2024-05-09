import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:3000",
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
});