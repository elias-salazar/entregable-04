import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import UsersForm from "./componets/UsersForm";
import UsersList from "./componets/UsersList";
import axios from "axios";
function App() {
  //-------------------//
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  //------------------//
  useEffect(() => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => setUsers(res.data));
  }, []);

  //-------------------//
  const getUsers = () => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => setUsers(res.data));
  };
  //-------------------//
  const selectUser = (user) => {
    setUserSelected(user);
    checkedBox();
  };
  //-------------------//
  const deselectUser = () => setUserSelected(null);
  //-------------------//
  const checkedBox = () => {
    setIsChecked(!isChecked);
  };
  //-------------------//
  const addNewUser = () => {
    deselectUser();
    setIsChecked(!isChecked);
    popAp();
  };
  const popAp = () => {
    setTimeout(function (valor) {
      console.log(valor);
    }, 2000);
  };
  //-------------------//

  const search = users.filter((user) => {
    return (
      user.first_name?.toLowerCase().includes(`${searchUser.toLowerCase()}`) ||
      user.last_name?.toLowerCase().includes(`${searchUser.toLowerCase()}`)
    );
  });

  return (
    <div className="App">
      <div className="search">
        <h1>User List</h1>
        <input
          type="text"
          placeholder="Search user"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      <div className="content-all">
        <div className="content-add-users">
          <input type="checkbox" id="btn-modal" checked={isChecked} />
          <label onClick={addNewUser} htmlFor="btn-modal" className="lbl-modal">
            <i class="fa-solid fa-user-plus"></i> Add user
          </label>
          <div className="modal">
            <div className="contenedor">
              <header>New User</header>
              <label onClick={checkedBox} className="close" htmlFor="btn-modal">
                x
              </label>
              <div className="contenido">
                <UsersForm
                  getUsers={getUsers}
                  userSelected={userSelected}
                  deselectUser={deselectUser}
                  checkedBox={checkedBox}
                  popAp={popAp}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="content-list">
          <UsersList
            getUsers={getUsers}
            popAp={popAp}
            selectUser={selectUser}
            search={search}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
