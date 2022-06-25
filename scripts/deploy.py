from brownie import truthmachine, accounts, config
from web3 import Web3

def deploy_md():
    acct = accounts.add(config["wallets"]["from_key"])
    truthmachine.deploy({'from': acct})

def main():
    deploy_md()