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
  return (
    <GithubContext.Provider
      value={{ githubUser, githubRepos, githubFollowers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
