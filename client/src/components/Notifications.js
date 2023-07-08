import { message, Modal, Tabs } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteNotification } from "../apicalls/notification";
import { setLoader } from "../redux/loadersSlice";

function Notifications({
  notifications = [],
  reloadNotification,
  showNotifications,
  setShowNotifications
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteNotification(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotification();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
        dispatch(setLoader(false));
      message.error(error.message);
    }
  };

return (
  <Modal
    title="Notifications"
    open={showNotifications}
    onCancel={() => setShowNotifications(false)}
    footer={null}
    centered
    width={1000}
  >
    <div className="flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          className="flex flex-col border border-solid p-2 border-gray-300 rounded cursor-pointer"
          key={notification._id}
          onClick={() => {
            navigate(notification.onClick);
            setShowNotifications(false);
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-gray-700">{notification.title}</h1>
              <span className="text-gray-600">{notification.message}</span>
              <h1 className="text-gray-500 text-sm">
                {moment(notification.createdAt).fromNow()}
              </h1>
            </div>
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => { deleteNotification(notification._id)}}
            ></i>
          </div>
        </div>
      ))}
    </div>
  </Modal>
);
}

export default Notifications;
