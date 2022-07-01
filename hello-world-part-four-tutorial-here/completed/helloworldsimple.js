import React from "react";
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  submitTruth,
  getCurrentWalletConnected,
} from "./util/interact.js";

import alchemylogo from "./alchemylogo.svg";

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [truth, setViewTruth] = useState(""); //default message
  //const [id, setId] = useState("");
  const [newTruthTitle, setNewTruthTitle] = useState("");
  const [newTruthURL, setNewTruthUrl] = useState("");
  //const [voter, setNewVoter] = useState("");
  //const [torf, setTOrF] = useState("");

  //called only once
  useEffect(async () => {
    addSmartContractListener();

    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addSmartContractListener() {
    helloWorldContract.events.Title({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setViewTruth(data.returnValues[1]);
        setStatus("🎉 Your message has been updated!");
      }
    });
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onUpdatePressed = async () => {
    const { status } = await submitTruth(walletAddress, newTruthTitle, newTruthURL);
    setStatus(status);
  };

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src={alchemylogo}></img>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: "50px" }}>The Truth Machine: Anyone can submit a research proposal, article, etc. The selected group of voters can decide if the submission is "True", or research performed in good faith. This url/citation link can be verified with a function for further verification in other paper citations and etc. A truth consensus/verification machine.</h2>
      <p>{truth}</p>

      <h2 style={{ paddingTop: "18px" }}>Submit Truth Proposal!:</h2>

      <div>
        <label> TITLE
        <input
          type="text"
          placeholder="Submit A New Truth Title"
          onChange={(e) => setNewTruthTitle(e.target.value)}
          value={newTruthTitle}
        />
        </label>
        <br />
        <label> URL
        <input
          type="text"
          placeholder="Submit A New Truth URL"
          onChange={(e) => setNewTruthUrl(e.target.value)}
          value={newTruthURL}
        />
        </label>
        <br />
        <p id="status">{status}</p>

        <button id="publish" onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  );
};

export default HelloWorld;

