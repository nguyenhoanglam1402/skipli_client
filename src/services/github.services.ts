import axios from "axios";

const headers = {
  "Authorization": "token [GitHub Token Authentication]",
};

export const getGitHubUsers = (username: string, page: number, perPage: number) => {
  return axios.get("http://localhost:3001/github/users",
    {
      params: {
        phoneNumber: localStorage.getItem("phoneNumber"),
        q: username,
        page,
        per_page: perPage,
      },
      headers,
    });
};

export const likeGitHubUser = (userId: string) => {
  return axios.put("http://localhost:3001/github/like", {},
    {
      params: {
        phoneNumber: localStorage.getItem("phoneNumber"),
        uid: userId,
      },
      headers,
    });
};