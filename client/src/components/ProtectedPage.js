import { Avatar, Badge, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllNotifications, ReadAllNotifications } from "../apicalls/notification";
import { GetCurrentUser } from "../apicalls/users";
import { setLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import Notifications from "./Notifications";

function ProtectedPage(children) {
  const [notificaions=[], setNotifications] = useState([]);
  const [showNotifications,setShowNotifications] = useState(false)
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    
    }
  };
  // const getNotifications = async () => {
  //   try {

  //     const response = await GetAllNotifications();
     
  //     if (response.success) {
  //       dispatch(SetUser(response.data));
  //     } else {
  //       throw new Error(response.message);
  //     }
  //   } catch (error) {
    
  
  //     message.error(error.message);
      
  //   }
  // };
  // const readNotifications = async()=>{
  //   try {
  //     const response = await ReadAllNotifications();
      
  //     if (response.success) {
  //      getNotifications();
  //     } else {
  //       throw new Error(response.message);
  //     }
  //   } catch (error) {

  
  //     message.error(error.message);
      
  //   }

  // }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      // getNotifications();
    } else {
      navigate("/login");
    }
    
  }, []);
  return (
    user && (
      <div>
        {/* {header} */}

        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            KIN BECH
          </h1>
          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <Badge count={notificaions ?.filter((notificaions)=> !notificaions.read).length}
            // onClick={() =>{
            //   readNotifications();
            //    setShowNotifications(true)
            // }}
            className="cursor-pointer">
              <Avatar
              shape="circle"
             icon =  {<i className="ri-notification-line"></i>}
           
            />
            </Badge>
            <i
              className="cursor-pointer ri-logout-box-r-line ml-10"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        {/* {body} */}
        <div className="p-5">{children.children}</div>

        {/* {
        <Notifications
        notificaions = {notificaions}
        reloadNotifications = {getNotifications}
        showNotifications = {showNotifications}
        setShowNotifications = {setShowNotifications}
        />
        
      } */}
      </div>
    )
  );
}

export default ProtectedPage;
