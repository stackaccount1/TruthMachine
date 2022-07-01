require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../contract-abi.json");
const contractAddress = "0x2aa06a5B99b4969AE575cf64E71D32418D045202";

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);


export const submitTruth = async (address, message, url) => {

    //input error handling
    if (!window.ethereum || address === null) {
      return {
        status:
          "💡 Connect your Metamask wallet to update the message on the blockchain.",
      };
    }
  
    if (message.trim() === "") {
      return {
        status: "❌ Your message cannot be an empty string.",
      };
    }
  
    //set up transaction parameters
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: address, // must match user's active address.
      data: helloWorldContract.methods.submitTruth(url, message).encodeABI(),
    };
  
    //sign the transaction
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        status:"SUCCESS",
      };
    } catch (error) {
      return {
        status: "😥 " + error.message,
      };
    }
};

export const mintVoters = async (address, toaddress) => {

  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (toaddress.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.mintVoters(toaddress).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status:"SUCCESS",
      txHash,
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};

export const voteTruth = async (address, truthid, bool) => {

  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (truthid.trim() === "") {
    return {
      status: "❌ Your id cannot be an empty string.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.voteTruth(truthid, bool).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: "SUCCESS",
      txHash,
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }

};
export const tallyVotesVerifyTruth = async (address, truthid) => {

  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (truthid.trim() === "") {
    return {
      status: "❌ Your id cannot be an empty string.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.tallyVotesVerifyTruth(truthid).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: "SUCCESS",
      txHash,
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }

};

export const returnvotes = async (address, truthid) => {
  const votes = await helloWorldContract.methods.returnvotes(truthid).call();
  return votes;
}

export const viewTruth = async (address, truthid) => {
  const torf = await helloWorldContract.methods.viewTruth(truthid).call();
  console.log(torf)
  return torf;
}

export const viewTitle = async (address, truthid) => {
  const title = await helloWorldContract.methods.viewTitle(truthid).call();
  return title;
}

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };