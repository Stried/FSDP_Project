import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use(function (config) {
  let accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

// TODO: Why does this collide with my data being undefined in forms.
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();
        window.location = "/user/login";
    }
    return Promise.reject(error);
});

export default instance;
