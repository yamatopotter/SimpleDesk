import { api } from "../service/api";
const baseURI = "/workflow";

export const getWorkflow = async () => {
  try {
    const request = await api.get(baseURI, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      return request.data;
    }

    return false;
  } catch {
    return false;
  }
};
