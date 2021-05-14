import React, { useState, useEffect } from "react";
import DomainDisabledIcon from "@material-ui/icons/DomainDisabled";
import Grid from "@material-ui/core/Grid";
import axios from "../helper/axioshelper";
import "../StyleSheet/QuestionList.css";
import "../StyleSheet/QuestionBox.css";
import "../StyleSheet/About.css";

const Find = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  return (
    <div style={{ background: "rgb(12, 17, 24)", paddingTop: "20px" }}>
      <div id="QuestionSearch" style={{ marginTop: "20px" }}>
        <div className="QuestionBox_inputField" style={{ marginTop: "" }}>
          <input
            type="text"
            placeholder="Search for a question"
            className="QuestionBox_inputfield"
            id="searchBar"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>
      <Grid class="row">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="main__content">
            <h1 id="brand" style={{ marginBottom: "40px", marginTop: "50px" }}>
              people
            </h1>
          </div>
        </Grid>
        {users.map((user) => {
          return (
            <div class="card">
              <div class="card-header">
                <img src={user.profileImage} alt="imag" />
                <DomainDisabledIcon className="card-icon" />
              </div>
              <div class="card-body">
                <p>
                  <ul>
                    <li>{user.username}</li>
                    <li></li>
                  </ul>
                </p>
              </div>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default Find;
