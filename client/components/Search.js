import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Search = ({ users }) => {
  const [filteredData, setFilteredData] = useState("");
  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search ..."
          onChange={(event) => setFilteredData(event.target.value)}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult">
          {users
            .filter((user) =>
              user.username.toLowerCase().includes(filteredData)
            )
            .map((user) => {
              return (
                <Link
                  className="links resultItem"
                  key={user.id}
                  to={`/users/${user.id}`}
                >
                  <p>{user.username}</p>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapState = ({ users }) => {
  console.log("users", users);
  return {
    users,
  };
};

export default connect(mapState)(Search);
