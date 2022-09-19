import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UsersForm = ({
  getUsers,
  userSelected,
  deselectUser,
  checkedBox,
  popAp,
}) => {
  //-------------------//
  const { register, handleSubmit, reset } = useForm();
  //-------------------//
  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    }
  }, [userSelected]);
  //-------------------//
  const submit = (data) => {
    if (userSelected) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          data
        )
        .then(() => getUsers());
    } else {
      axios
        .post(`https://users-crud1.herokuapp.com/users/`, data)
        .then(() => getUsers())
        .catch((error) => console.log(error));
    }
    clear();
    checkedBox();
  };
  //-------------------//
  const clear = () => {
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
    deselectUser();
  };
  //-------------------//
  return (
    <form onSubmit={handleSubmit(submit)} className="container-form">
      <div className="content-input">
        <div className="container-input">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" {...register("email")} />
        </div>

        <div className="container-input">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" {...register("password")} />
        </div>

        <div className="container-input">
          <label htmlFor="first_name">Name: </label>
          <input type="text" id="first_name" {...register("first_name")} />
        </div>

        <div className="container-input">
          <label htmlFor="last_name">Last name: </label>
          <input type="text" id="last_name" {...register("last_name")} />
        </div>

        <div className="container-input">
          <label htmlFor="birthday">birthday: </label>
          <input type="date" id="birthday" {...register("birthday")} />
        </div>
        <button>{userSelected ? "Update" : "Submit"}</button>
      </div>
    </form>
  );
};

export default UsersForm;
