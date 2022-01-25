import "./App.css";
import Block from "./components/block";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectReferesh } from "./appSlice";
import React, { useEffect, useState } from "react";

function App() {
  const [blockdata, setblockdata] = useState();
  const [blockchainHeight, setblockchainHeight] = useState();
  const [displayNewBlock, setdisplayNewBlock] = useState(true);
  const refereshed = useSelector(selectReferesh);
  var DisplayBlock=()=>{
    setdisplayNewBlock(true)
    document.getElementById('testing').scrollLeft = document.getElementById('testing').scrollWidth;
  }
  async function getblock() {
    const response = await axios.get("http://127.0.0.1:5000/blockchain");
    setblockdata(response.data.chain);
    setblockchainHeight(response.data.length);
  }
  useEffect(() => {
    getblock();
    setdisplayNewBlock(!displayNewBlock);
  }, [refereshed]);
  return (
    <div className="app">
      <h1>Blockchain</h1>
      <div className="blockchainHeight">
        <h4>Blockchain Height: {blockchainHeight}</h4>
      </div>
      <div className="add-block-button">
        <button onClick={DisplayBlock}>Add a New Block</button>
      </div>
      <div className="blockchain" id="testing">
        {blockdata?.map((block, index) => {
          return (
            <Block
              key={index}
              index={block.index}
              timestamp={block.timestamp}
              nonce={block.nonce}
              previous_hash={block.previous_hash}
              hash={block.hash}
              transactions={block.transactions}
              mined={true}
            />
          );
        })}
        <span className={displayNewBlock ? "" : "add-block-container"}>
          <Block mined={false}/>
        </span>
      </div>
      
    </div>
  );
}

export default App;
