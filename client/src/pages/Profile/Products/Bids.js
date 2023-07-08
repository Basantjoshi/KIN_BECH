import { message, Modal, Table } from "antd";
import Divider from "../../../components/Divider";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllBids } from "../../../apicalls/products";
import { setLoader } from "../../../redux/loadersSlice";

function Bids({showBidsModal, setShowBidsModal, selectedProduct}) {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        setBidsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));

      // message.error(error.message);
      console.log(error.response);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY,hh:mm a");
      },
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone:{record.mobile}</p>
            <p>Email:{record.buyer.email}</p>
          </div>
        );
      },
    },
  ];
  useEffect(()=>{
    if(selectedProduct){
        getData();
    }
  })

  return (
    <Modal
      title="Bids"
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1500}
      footer= {null}
    >     
            <div className="flex gap-3 flex-col">
          <h1 className="text-primary">
         Bids
      </h1>
      <Divider/>
      <h1 className="text-xl text-gray-500">
        Product Name:{selectedProduct.name}
      </h1>
      <Table columns={columns} dataSource={bidsData}/>
      </div>
    </Modal>
  );
}

export default Bids;
