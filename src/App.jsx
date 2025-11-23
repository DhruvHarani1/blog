import { useEffect, useState } from "react";
import "./App.css";
import config from "./config/config";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components";
import {Footer} from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <div className="bg-gray-600">helloooo</div>
        <div>
          <Header />
          <main>{/*  <Outlet></Outlet>*/}</main>
          <Footer />
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default App;
