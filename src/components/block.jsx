import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { enterRoom } from "../appSlice";
import "./block.css";

export default function Block(props) {
  const [transaction, setTransactions] = useState([]);
  const [referesh, setreferesh] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  async function addBlock(e) {
    const data = [
      {
        transaction: transaction,
      },
    ];
    setloading(true);
    const response = await axios.post("http://127.0.0.1:5000/add", data);
    setreferesh(!referesh);
    setloading(false);
    if (response.status === 200) {
      dispatch(
        enterRoom({
          referesh: !referesh,
        })
      );
    }
  }
  return (
    <div className="block" id={props.mined ? "" : "block-mined"}>
      <div className="blockchain-container">
        <h2>
          Block: <span>{props.index}</span>
        </h2>
        <h2>
          Timestamp: <span>{props.timestamp}</span>
        </h2>
        <h2>
          Nonce: <span>{props.nonce}</span>
        </h2>
        <div className="transactions">
          <label>Transactions: </label>
          <textarea
            id="transaction"
            rows={8}
            value={props.transactions}
            onChange={(e) => setTransactions(e.target.value)}
          ></textarea>
        </div>
        <div className="hash-container">
          <h2>Prev:</h2>
          <h2 className="hash">{props.previous_hash}</h2>
        </div>
        <div className="hash-container">
          <h2>Hash:</h2>
          <h2 className="hash">{props.hash}</h2>
        </div>
        <button disabled={loading?true:false} className={props.mined ? "button" : ""} id={loading?"not-allowed":""} onClick={addBlock}>
          <span id={loading?"loading":""}>Mine</span>
          <div id={loading?"loading-animation":"loading"}>
            <div className="loader-wrap1">
              <div className="loader-wrap2"></div>
            </div>
          </div>
          
        </button>
      </div>
    </div>
  );
}
