const express = require("express");
const app = express();
const port = 3001;
const Web3 = require("web3");
const Web3Modal = require("web3modal");
const Provider = require("@truffle/hdwallet-provider");
const ethers = require("ethers");

const address = "0x51344e43c4266cd988a4C4A5719983A0D20e7446";
const privatekey = "1c101f5984459edd9a125acd94f5b9f71f8982f6404454438734ab9b3ffd8267";
const rpcurl = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const SmartContractAddress = "0xa0EEf862FbA1a6262b594F8e5f18ccC0066BC038";
const SmartContractABI = require("./abi");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const sendData = async () => {
  console.log("Sending Data...");
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://data-seed-prebsc-1-s1.binance.org:8545/"
  // );
  var provider = new Provider(privatekey, rpcurl);
  var web3 = new Web3(provider);
  var myContract = new web3.eth.Contract(
    SmartContractABI,
    SmartContractAddress
  );
  var oldvalue = await myContract.methods.retrieve().call();
  console.log("Old value: ", oldvalue);

  var receipt = await myContract.methods.store(1234).send({ from: address });
  console.log(receipt);

  var newvalue = await myContract.methods.retrieve().call();
  console.log("New value: ", newvalue);

  console.log("Done with all things");
};

sendData();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
