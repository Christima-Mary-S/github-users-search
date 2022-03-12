import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithuRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);
  // request , loading
  const [request, setRequest] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  const searchGithubUser = async (user) => {
    // console.log(user);
    toggleError();
    // set loading
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, "username does not exist");
    }
    checkRequest();
    setIsLoading(false);
  };

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          // throw an error
          toggleError(true, "sorry! you have exceeded your hourly limit");
        }
      })
      .catch((err) => console.log(err));
  };
  // error
  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };
  useEffect(checkRequest, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        request,
        error,
        searchGithubUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
