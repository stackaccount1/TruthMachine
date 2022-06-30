import React from "react";
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  submitTruth,
  viewTruth,
  getCurrentWalletConnected,
  viewTitle,
  mintVoters,
  voteTruth,
  returnvotes,
  tallyVotesVerifyTruth,
} from "./util/interact.js";

import alchemylogo from "./alchemy.svg";

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [truth, setViewTruth] = useState(""); //default message
  const [id, setId] = useState("");
  const [newTruthTitle, setNewTruthTitle] = useState("");
  const [newTruthURL, setNewTruthUrl] = useState("");
  const [voter, setNewVoter] = useState("");
  const [torf, setTOrF] = useState("");
  const [votes, setVotes] = useState("")

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

  const onUpdatePressedNumber2 = async () => {
    const { torf } = await viewTruth(walletAddress, id);
    setTOrF(truth);
  };

  const onUpdatePressedNumber3 = async () => {
    const { status } = await mintVoters(walletAddress, voter);
    setStatus(status);
  };

  const onUpdatePressedNumber4 = async () => {
    const { status } = await viewTitle(walletAddress, id);
    setStatus(status);
  };

  const onUpdatePressedNumber5 = async () => {
    const { status } = await voteTruth(walletAddress, id, torf);
    setStatus(status);
  };

  const onUpdatePressedNumber6 = async () => {
    const votes = await returnvotes(walletAddress, id);
    setVotes(votes);
  };

  const onUpdatePressedNumber7 = async () => {
    const { status } = await tallyVotesVerifyTruth(walletAddress, id, torf);
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

      <h2 style={{ paddingTop: "18px" }}>Vote On Truth Proposal (Must Be Approved Voter Transaction Will Revert)</h2>
      <div>
        <label> Truth Proposal ID No.
        <input
          type="text"
          placeholder="Submit A New Truth Id No."
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        </label>
        <br />
        <label> True Or False
        <input
          type="text"
          placeholder="Enter True or False"
          onChange={(e) => setTOrF(e.target.value)}
          value={torf}
        />
        </label>
        <br />
        <p id="status">{status}</p>

        <button id="publish1" onClick={onUpdatePressedNumber5}>
          VOTE!
        </button>
      </div>

      <p>{truth}</p>

      <div>
        <label> View Truth Boolean:
        <input
          type="text"
          placeholder="Submit A Truth ID No."
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        </label>
        <br />
        <button id="publish2" onClick={onUpdatePressedNumber2}>
          Return Truth Value
        </button>
      </div>

      <div>
        <label> View Title By ID No.
        <p>{torf}</p>
        <input
          type="text"
          placeholder="Submit A Truth ID No."
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        </label>
        <br />
        <button id="publish3" onClick={onUpdatePressedNumber4}>
          Return Truth Title
        </button>
      </div>
      <div>
        <label> View Truth Votes:
        <p>{votes}</p>
        <input
          type="text"
          placeholder="Submit A Truth ID No."
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        </label>
        <br />
        <button id="publish5" onClick={onUpdatePressedNumber6}>
          Return Truth Vote Count
        </button>
      </div>

      <div>
        <label> Execute Vote Tally Determine If True:
        <input
          type="text"
          placeholder="Submit A Truth ID No."
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        </label>
        <br />
        <button id="publish6" onClick={onUpdatePressedNumber7}>
          Tally Votes Flip Boolean!
        </button>
      </div>

      <h2 style={{ paddingTop: "50px" }}>Mint A Voter (Admin Only)</h2>
      <div>
        <label> Mint Voter
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setNewVoter(e.target.value)}
          value={voter}
        />
        </label>
        <br />
        <button id="publish4" onClick={onUpdatePressedNumber3}>
          Mint
        </button>
      </div>
    </div>
  );
};

export default HelloWorld;