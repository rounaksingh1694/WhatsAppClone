import axios from "axios";

const instance = axios.create({
	baseURL: "https://api-chat-backend.herokuapp.com/api/",
});

export default instance;
