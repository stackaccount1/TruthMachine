



TruthmachineProject is the active project.

Running 'scripts/deploy.py::main'...
Transaction sent: 0x99076cf01837352e819021ba5b7c34a485f22a57c6a5236a7edbf684e7748021
  Gas price: 1.780290482 gwei   Gas limit: 556090   Nonce: 4
  truthmachine.constructor confirmed   Block: 7120448   Gas used: 505537 (90.91%)
  truthmachine deployed at: 0x2aa06a5B99b4969AE575cf64E71D32418D045202


"abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "value",
          "type": "string"
        }
      ],
      "name": "Title",
      "type": "event"
    },
    {
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "gas": 496629,
      "inputs": [
        {
          "name": "_url",
          "type": "string"
        },
        {
          "name": "_title",
          "type": "string"
        }
      ],
      "name": "submitTruth",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "gas": 108304,
      "inputs": [
        {
          "name": "proleteriataddress",
          "type": "address"
        }
      ],
      "name": "mintVoters",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "gas": 74072,
      "inputs": [
        {
          "name": "proposedtruthid",
          "type": "uint256"
        },
        {
          "name": "torf",
          "type": "bool"
        }
      ],
      "name": "voteTruth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "gas": 38053,
      "inputs": [
        {
          "name": "proposedtruthid",
          "type": "uint256"
        }
      ],
      "name": "tallyVotesVerifyTruth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "gas": 1494,
      "inputs": [
        {
          "name": "proposedtruthid",
          "type": "uint256"
        }
      ],
      "name": "returnvotes",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "gas": 1524,
      "inputs": [
        {
          "name": "proposedtruthid",
          "type": "uint256"
        }
      ],
      "name": "viewTruth",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "gas": 22007,
      "inputs": [
        {
          "name": "proposedtruthid",
          "type": "uint256"
        }
      ],
      "name": "viewTitle",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "gas": 1391,
      "inputs": [],
      "name": "voter",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "gas": 1421,
      "inputs": [],
      "name": "truthCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "gas": 1451,
      "inputs": [],
      "name": "voterCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],