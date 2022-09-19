import React from "react";
import axios from "axios";
const UsersList = ({ getUsers, selectUser, popAp, search }) => {
  const deleteUser = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers());
    popAp("edit");
  };
  //-------------------//

  return (
    <section className="content-users">
      {search.map((user) => (
        <article key={user.id} className="card-user">
          <div className="content-data-user">
            <h4>
              {user.first_name} {user.last_name}
            </h4>
            <small>{user.email}</small>
            <h5>
              <i
                className="fa-solid fa-cake-candles"
                style={{ color: "rgb(240, 157, 215)" }}
              ></i>{" "}
              {user.birthday}
            </h5>
          </div>
          <div className="content-btn-card-user">
            <button onClick={() => selectUser(user)}>
              <i
                className="fa-solid fa-user-pen"
                style={{ color: "rgb(53, 143, 202)" }}
              ></i>
            </button>
            <button onClick={() => deleteUser(user.id)}>
              <i
                className="fa-regular fa-trash-can"
                style={{ color: "rgb(202, 53, 85)" }}
              ></i>
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default UsersList;
