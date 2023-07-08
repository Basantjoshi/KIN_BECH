const router = require("express").Router();
const authMiddleware = require('../middlwares/authMiddleware');
const Notification = require("../models/notificationModal");

//add a notification
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.send({
      success: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


//get all notification by user

// router.get("/get-all-notifications", authMiddleware, async (req, res) => {
//     try {
//       const notification = new Notification.find({user:req.body.userId,}).sort({createdAt: -1});
       
//       res.send({
//         success: true,
//         data : notification,
//       });
//     } catch (error) {
//       res.send({
//         success: false,
//         message: error.message,
//       });
//     }
//   });

  //delete notification
  router.delete("/delete-notifications", authMiddleware, async (req, res) => {
    try {
     await Notification.findByIdAndDelete(req.params.id);
       
      res.send({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  //read all notification by user

  router.put("/read-all-notifications", authMiddleware, async (req, res) => {
    try {
      await Notification.updateMany(
        
           { user:req.body.userId,read:false},
            {$set:{read:true}}
        
  );
  res.send({
    success:true,
    message:"All notifications marked as read",
  })
      }
       
     catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  module.exports = router;