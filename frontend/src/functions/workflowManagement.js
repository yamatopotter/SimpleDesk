import { api } from "../service/api";
import { getToken } from "./localstorage";
import { showToast } from "./message";
const baseURI = "/workflow";

export const getWorkflow = async () => {
  try {
    const request = await api.get(baseURI, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    return request.data;
  } catch (err) {
    showToast(err);
    return false;
  }
};
