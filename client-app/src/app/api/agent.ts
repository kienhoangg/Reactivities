import { IActivity } from "./../../models/activity";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/";
const response = (response: AxiosResponse) => response.data;
const sleep = (ms: number) => (responses: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => {
      resolve(responses);
    }, ms)
  );
const request = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(response),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(response),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(response),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(response)
};
const Activities = {
  list: (): Promise<IActivity[]> => request.get("Activities/"),
  details: (id: string): Promise<IActivity> => request.get(`Activities/${id}`),
  create: (activity: IActivity) => request.post("Activities/", activity),
  update: (activity: IActivity) =>
    request.put(`Activities/${activity.id}`, activity),
  delete: (id: string) => request.del(`Activities/${id}`)
};
export default { Activities };
