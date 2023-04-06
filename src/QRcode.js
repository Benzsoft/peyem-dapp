import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import QRCode from "react-qr-code";
import { QRCodeCanvas } from "qrcode.react";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


function QR() {

const [ QR , setQR ] = useState("");
const [ connect , setConnect ] = useState("Connect wallet");
  
const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "BKsAeeC-F7GB6KBzySe_p5aOCRQ1ZH9l", // required
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "web3modal", // Required
        infuraId: "BKsAeeC-F7GB6KBzySe_p5aOCRQ1ZH9l", // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 97, // Optional. It defaults to 1 if not provided
        darkMode: false, // Optional. Use dark theme, defaults to false
      },
    },
    binancechainwallet: {
      package: true,
    },
  };
  
  
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });
  
  const connectWallet = async () => {
    // if (window.ethereum) {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      await window.ethereum.send("eth_requestAccounts");
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setConnect(account.slice(0,4) + "..." + account[0].slice(-2));
      setQR("https://dispayment.netlify.app/?=ref"+ account)
      console.log(window.location.href.toString() + "?=ref"+ account);
      console.log("web3model hai ye " ,account);
      // document.querySelector(".connect").innerHTML = account;
    // } else {
    //   // Show alert if Ethereum provider is not detected
    //   alert("Please install Mask");
    // }
  };





  useEffect(()=>{

    

  }, [])




  return (
    <div style={{backgroundColor :"white"}} className="App">







<div className="main">
  {/* ***** Header Start ***** */}
  <header   id="header">
    {/* Navbar */}
    <nav style={{backgroundColor :"#090a1a"}} data-aos="zoom-out" data-aos-delay={800} className="navbar gameon-navbar navbar-expand">
      <div className="container header">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src="/img/logo/logo.png" alt="Brand Logo" />
        </a>
        <div className="ml-auto" />
        {/* Navbar Nav */}
       
       
        {/* Navbar Icons */}
        {/* Navbar Toggler */}
        <ul className="navbar-nav toggle">
          <li className="nav-item">
            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
              <i className="icon-menu m-0" />
            </a>
          </li>
        </ul>
        {/* Navbar Action Button */}
        <ul className="navbar-nav action">
          <li className="nav-item ml-2">
            <a onClick={connectWallet} href="#" className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />{connect}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  {/* ***** Header End ***** */}
  {/* ***** Hero Area Start ***** */}
 
  {/*====== Modal Search Area End ======*/}
  {/*====== Modal Responsive Menu Area Start ======*/}
  <div id="menu" className="modal fade p-0">
    <div className="modal-dialog dialog-animated">
      <div className="modal-content h-100">
        <div className="modal-header" data-dismiss="modal">
          Menu <i className="far fa-times-circle icon-close" />
        </div>
        <div className="menu modal-body">
          <div className="row w-100">
            <div className="items p-0 col-12 text-center" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <section className="staking-area" id="stake">


  <div style={{ height: "auto", margin: "0 auto", maxWidth: 500, width: "90%" }}>
    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={QR}
    viewBox={`0 0 256 256`}
    />

{/* <QRCodeCanvas
      id="qrCode"
      value={}
      size={300}
      bgColor={"#00ff00"}
      level={"H"}
    /> */}

</div>

  
  </section>
  {/*====== Modal Responsive Menu Area End ======*/}
</div>


















    </div>
  );
}

export default QR;
