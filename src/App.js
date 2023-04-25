import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Web3 from 'web3';

import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import axios from 'axios';
import { DarkModeToggle } from 'react-dark-mode-toggle-2';

function App() {
  const navigate = useNavigate();
  const [tosend, settosend] = useState('');
  const [connect, setConnect] = useState('Connect wallet');
  const [fullconnect, setfullConnect] = useState('Connect wallet');
  const [inputValue, setInputValue] = useState(0);
  const [inputValue1, setInputValue1] = useState(0);
  const [theme, setTheme] = useState(false);

  function toggleTheme() {
    setTheme(!theme);
  }

  function handleInputChange(event) {
    console.log('refffffff', window.location.href);
    setInputValue(event.target.value);
  }

  function handleInputChange1(event) {
    console.log('refffffff', window.location.href);
    setInputValue1(event.target.value);
  }

  useEffect(() => {
    connectWallet();
  }, []);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: 'BKsAeeC-F7GB6KBzySe_p5aOCRQ1ZH9l', // required
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: 'web3modal', // Required
        infuraId: 'BKsAeeC-F7GB6KBzySe_p5aOCRQ1ZH9l', // Required
        rpc: '',
        chainId: 250,
        darkMode: false,
      },
    },
    binancechainwallet: {
      package: true,
    },
  };

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const changeNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(42220) }],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectWallet = async () => {
    // if (window.ethereum) {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    await window.ethereum.send('eth_requestAccounts');
    const accounts = await web3.eth.getAccounts();
    changeNetwork();
    const account = accounts[0];
    setConnect(accounts[0].slice(0, 4) + '...' + accounts[0].slice(-2));
    setfullConnect(accounts[0]);
    // setmyReferral("https://alexastaking.netlify.app?ref=" + account);

    console.log(account);
  };

  const pay = async (event) => {
    event.preventDefault();
    console.log('form run');

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    var abi = [
      {
        inputs: [{ internalType: 'bool', name: 'test', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'factor',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'lastUpdated',
            type: 'uint256',
          },
        ],
        name: 'InflationFactorUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'rate',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'updatePeriod',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'lastUpdated',
            type: 'uint256',
          },
        ],
        name: 'InflationParametersUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'registryAddress',
            type: 'address',
          },
        ],
        name: 'RegistrySet',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'comment',
            type: 'string',
          },
        ],
        name: 'TransferComment',
        type: 'event',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'accountOwner', type: 'address' },
          { internalType: 'address', name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'accountOwner', type: 'address' },
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
        name: 'burn',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'bytes', name: 'blsKey', type: 'bytes' },
          { internalType: 'bytes', name: 'blsPop', type: 'bytes' },
        ],
        name: 'checkProofOfPossession',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'feeRecipient', type: 'address' },
          {
            internalType: 'address',
            name: 'gatewayFeeRecipient',
            type: 'address',
          },
          { internalType: 'address', name: 'communityFund', type: 'address' },
          { internalType: 'uint256', name: 'refund', type: 'uint256' },
          { internalType: 'uint256', name: 'tipTxFee', type: 'uint256' },
          { internalType: 'uint256', name: 'gatewayFee', type: 'uint256' },
          { internalType: 'uint256', name: 'baseTxFee', type: 'uint256' },
        ],
        name: 'creditGasFees',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'debitGasFees',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'decreaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: 'aNumerator', type: 'uint256' },
          { internalType: 'uint256', name: 'aDenominator', type: 'uint256' },
          { internalType: 'uint256', name: 'bNumerator', type: 'uint256' },
          { internalType: 'uint256', name: 'bDenominator', type: 'uint256' },
          { internalType: 'uint256', name: 'exponent', type: 'uint256' },
          { internalType: 'uint256', name: '_decimals', type: 'uint256' },
        ],
        name: 'fractionMulExp',
        outputs: [
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'bytes', name: 'header', type: 'bytes' }],
        name: 'getBlockNumberFromHeader',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getEpochNumber',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        ],
        name: 'getEpochNumberOfBlock',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getEpochSize',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getExchangeRegistryId',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getInflationParameters',
        outputs: [
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        ],
        name: 'getParentSealBitmap',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'bytes', name: 'header', type: 'bytes' }],
        name: 'getVerifiedSealBitmapFromHeader',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getVersionNumber',
        outputs: [
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        payable: false,
        stateMutability: 'pure',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'bytes', name: 'header', type: 'bytes' }],
        name: 'hashHeader',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'increaseAllowance',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'string', name: '_name', type: 'string' },
          { internalType: 'string', name: '_symbol', type: 'string' },
          { internalType: 'uint8', name: '_decimals', type: 'uint8' },
          { internalType: 'address', name: 'registryAddress', type: 'address' },
          { internalType: 'uint256', name: 'inflationRate', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'inflationFactorUpdatePeriod',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'initialBalanceAddresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'initialBalanceValues',
            type: 'uint256[]',
          },
          {
            internalType: 'string',
            name: 'exchangeIdentifier',
            type: 'string',
          },
        ],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'initialized',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isOwner',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        ],
        name: 'minQuorumSize',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'minQuorumSizeInCurrentSet',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'mint',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'numberValidatorsInCurrentSet',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        ],
        name: 'numberValidatorsInSet',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'registry',
        outputs: [
          { internalType: 'contract IRegistry', name: '', type: 'address' },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'uint256', name: 'rate', type: 'uint256' },
          { internalType: 'uint256', name: 'updatePeriod', type: 'uint256' },
        ],
        name: 'setInflationParameters',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'registryAddress', type: 'address' },
        ],
        name: 'setRegistry',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'string', name: 'comment', type: 'string' },
        ],
        name: 'transferWithComment',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'uint256', name: 'units', type: 'uint256' }],
        name: 'unitsToValue',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'validatorSignerAddressFromCurrentSet',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          { internalType: 'uint256', name: 'index', type: 'uint256' },
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        ],
        name: 'validatorSignerAddressFromSet',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
        name: 'valueToUnits',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    var contractaddress = '0xb9D3D1C1B5bA588010E04ef80Ddc1BBD80Da8B87';

    const instance = new web3.eth.Contract(abi, contractaddress);

    console.log(tosend, web3.utils.toWei(inputValue, 'ether'));
    var sender = '0x171DdD64D32Ac3C65BF19aa9AB794a6dB167e1c2';
    await instance.methods
      .transfer(sender, web3.utils.toWei(inputValue, 'ether'))
      .send({ from: accounts[0] })
      .then(() => {
        alert('send to Admin wallet successfuly');
        sendPayment(event);
      });
  };

  const sendPayment = async (event) => {
    event.preventDefault();
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://e3d15c37e032f514c6fd5cbff3b05bf1:oHrr4tbnB1PH0uz6VQNUvfjf1btvtLlBpXzEu-YuGLSQHG5GER9xp5ESEqiQljJY@sandbox.moncashbutton.digicelgroup.com/Api/oauth/token?scope=read,write&grant_type=client_credentials',
        headers: {},
      };

      axios.request(config).then(async (res) => {
        const response = await axios.post(
          `https://${process.env.REACT_APP_MONCASH_HOST}/v1/CreatePayment`,
          {
            amount: inputValue,
            orderId: new Date().getTime(),
            phoneNumber: event.target.phoneNumber.value,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${res.data.access_token}`,
            },
          }
        );
        console.log(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <ThemeContext.Provider value={theme}>
    <div className='App'>
      <div className='main'>
        {/* ***** Header Start ***** */}
        <header id='header'>
          {/* Navbar */}
          <nav
            data-aos='zoom-out'
            data-aos-delay={800}
            className='navbar gameon-navbar navbar-expand'
          >
            <div className='container header'>
              {/* Logo */}
              <a className='navbar-brand' href='/'>
                <img
                  style={{ width: '200px', height: '90px' }}
                  src='/img/logo/logo.png'
                  alt='Brand Logo'
                />
              </a>
              <div className='ml-auto' />
              {/* Navbar Nav */}

              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <a href='/' className='nav-link active'>
                    Home
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <a href='/' className='nav-link active'>
                    Roadmap
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <a href='/' className='nav-link active'>
                    Learn
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <a href='/' className='nav-link active'>
                    Stake
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <a href='/' className='nav-link active'>
                    Dao
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <a href='/' className='nav-link active'>
                    NFT
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <a href='/' className='nav-link active'>
                    FAQ
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li onClick={toggleTheme} className='nav-item active'>
                  <a
                    href='/'
                    style={{
                      textTransform: 'capitalize',
                    }}
                    className='nav-link active'
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav items mx-auto'>
                <li className='nav-item active'>
                  <DarkModeToggle
                    onChange={(e) => {
                      toggleTheme();
                    }}
                    isDarkMode={theme}
                  />
                  {/* <a
                    href='/'
                    onClick={toggleTheme}
                    style={{
                      textTransform: 'capitalize',
                    }}
                  >
                    {theme}
                  </a> */}
                </li>
              </ul>

              {/* Navbar Icons */}
              {/* Navbar Toggler */}
              <ul className='navbar-nav toggle'>
                <li className='nav-item'>
                  <a
                    href='#'
                    className='nav-link'
                    data-toggle='modal'
                    data-target='#menu'
                  >
                    <i className='icon-menu m-0' />
                  </a>
                </li>
              </ul>
              {/* Navbar Action Button */}

              <ul className='navbar-nav action'></ul>
              <ul className='navbar-nav action'>
                <li className='nav-item ml-2'>
                  {/* <a style={} href='https://metamask.app.link/dapp/' >go to mobile</a> */}
                  <a
                    onClick={connectWallet}
                    href='#'
                    className='btn ml-lg-auto btn-bordered-white'
                  >
                    <i className='icon-wallet mr-md-2' />
                    {connect}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        {/* ***** Header End ***** */}
        {/* ***** Hero Area Start ***** */}
        <section
          style={{
            backgroundImage: `linear-gradient(0deg, ${
              theme ? 'white' : '#090919'
            }, rgba(9, 10, 26, 0.8)), url(img/bg/inner_bg.jpg)`,
          }}
          className='hero-section'
        >
          <div className='container'>
            <div className='row align-items-center justify-content-center'>
              <div className='col-12 col-md-6 col-lg-9 text-center'>
                {/* Hero Content */}
                <div className='hero-content'>
                  <div className='intro text-center mb-5'>
                    <h1 style={{ color: theme ? 'black' : 'blue' }}>
                      {' '}
                      Deposit CUSD{' '}
                    </h1>
                    <h3
                      style={{ color: theme ? 'black' : 'white' }}
                      className='mt-4'
                    >
                      Rule The World
                    </h3>
                  </div>
                  {/* Buttons */}
                  <div className='button-group'>
                    <a
                      className='btn btn-bordered active smooth-anchor'
                      href=''
                    >
                      <i className='icon-rocket mr-2' />
                      Buy Token
                    </a>
                    <a
                      style={{
                        borderColor: theme ? 'black' : 'white',
                        color: theme ? 'black' : 'white',
                      }}
                      className='btn btn-bordered-white'
                      href=''
                    >
                      <i className='icon-note mr-2' />
                      Contract
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ***** Hero Area End ***** */}
        {/* ***** Staking Area Start ***** */}
        <section
          style={{
            background: theme && 'white',
          }}
          className='staking-area'
          id='stake'
        >
          <div className='container'>
            <div className='row'>
              <div className='col-6 col-md-6 col-sm-12'>
                <div
                  style={{
                    background: theme && 'white',
                    boxShadow: theme && '10px 10px 0px 5px #eee',
                    border: theme && '5px solid #eee',
                  }}
                  className='card no-hover staking-card single-staking'
                >
                  <h3
                    style={{
                      color: theme && '#16182d',
                    }}
                    className='m-0'
                  >
                    SEND CASH{' '}
                  </h3>

                  <div className='tab-content mt-md-3' id='myTabContent'>
                    <div
                      className='tab-pane fade show active'
                      id='tab-one'
                      role='tabpanel'
                      aria-labelledby='tab-one-tab'
                    >
                      <div className='staking-tab-content'>
                        <form
                          style={{
                            boxShadow: theme && 'none',
                            border: theme && '5px solid #eee',
                            color: theme && '#16182d',
                          }}
                          class='form'
                          onSubmit={pay}
                        >
                          {/* <span class="signup">Sign Up</span> */}
                          <p className='waltex' style={{ fontSize: '14px' }}>
                            Your wallet Address : <span> {fullconnect} </span>{' '}
                          </p>
                          <input
                            required
                            name='phoneNumber'
                            type='text'
                            placeholder="Receipient's Phone Number"
                            class='form--input'
                          />
                          <input
                            required
                            type='text'
                            placeholder='Full Name'
                            class='form--input'
                          />
                          <select
                            style={{
                              border: `2px solid ${
                                theme ? '#16182d' : 'white'
                              }`,
                              borderRadius: '8px',
                              marginBottom: '6%',

                              color: theme && '#16182d',
                            }}
                            onchange='getSelectValue();'
                          >
                            <option disabled selected>
                              Select the MMT company
                            </option>
                            <option value='USD'>MonCash</option>
                            <option value='USD'>NatCash</option>
                          </select>

                          <input
                            required
                            value={inputValue}
                            min='15'
                            max='10000'
                            onChange={handleInputChange}
                            type='number'
                            placeholder='0.0'
                            class='form--input'
                          />

                          <p className='ptext'>
                            {' '}
                            The amount of cUSD to deposit is :{' '}
                            <span>
                              {' '}
                              {parseInt(inputValue) +
                                (parseInt(inputValue) / 100) * 10}
                            </span>{' '}
                          </p>
                          <p className='ptext'>
                            {' '}
                            Will Receive(in Haitian gourde) :{' '}
                            <span> {inputValue * 153}HTG</span>{' '}
                          </p>
                          <div class='form--marketing'>
                            <input required id='okayToEmail' type='checkbox' />
                            <label for='okayToEmail' class='checkbox'>
                              I agree to the term of peyem services
                            </label>
                          </div>
                          <button
                            type='submit'
                            value='Submit'
                            class='form--submit'
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-6 col-sm-12 col-md-6'>
                <div
                  style={{
                    background: theme && 'white',
                    boxShadow: theme && '10px 10px 0px 5px #eee',
                    border: theme && '5px solid #eee',
                  }}
                  className='card no-hover staking-card single-staking'
                >
                  <h3
                    style={{
                      color: theme && '#16182d',
                    }}
                    className='m-0'
                  >
                    BUY CRYPTO{' '}
                  </h3>

                  <div className='tab-content mt-md-3' id='myTabContent'>
                    <div
                      className='tab-pane fade show active'
                      id='tab-one'
                      role='tabpanel'
                      aria-labelledby='tab-one-tab'
                    >
                      <div className='staking-tab-content'>
                        <form
                          style={{
                            boxShadow: theme && 'none',
                            border: theme && '5px solid #eee',
                            color: theme && '#16182d',
                          }}
                          class='form'
                        >
                          {/* <span class="signup">Sign Up</span> */}
                          <p className='waltex' style={{ fontSize: '14px' }}>
                            Your wallet Address : <span> {fullconnect} </span>{' '}
                          </p>
                          <input
                            required
                            type='text'
                            placeholder="Receipient's Wallet Address"
                            class='form--input'
                          />
                          <input
                            required
                            type='text'
                            placeholder='Full Name'
                            class='form--input'
                          />
                          <input
                            required
                            value={inputValue1}
                            min='15'
                            max='10000'
                            onChange={handleInputChange1}
                            type='number'
                            placeholder='0.0'
                            class='form--input'
                          />

                          <p className='ptext'>
                            {' '}
                            The amount of cUSD you will Receive :{' '}
                            <span>
                              {' '}
                              {parseInt(inputValue1) -
                                (parseInt(inputValue1) / 100) * 10}
                            </span>{' '}
                          </p>
                          <p className='ptext'>
                            {' '}
                            The Amount Pay(in Haitian gourde) :{' '}
                            <span> {inputValue1 * 153}HTG</span>{' '}
                          </p>
                          <div class='form--marketing'>
                            <input required id='okayToEmail' type='checkbox' />
                            <label for='okayToEmail' class='checkbox'>
                              I agree to the term of peyem services
                            </label>
                          </div>
                          <button
                            type='submit'
                            value='Submit'
                            class='form--submit'
                          >
                            BUY
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            background: theme && 'white',
          }}
          className='content-area'
          id='how_to'
        >
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-6'>
                <div
                  style={{
                    background: theme && 'white',
                    color: theme && '#16182d',
                  }}
                  className='content intro'
                >
                  <span className='intro-text'>staking</span>
                  <h2
                    style={{
                      color: theme && '#16182d',
                    }}
                  >
                    How to Stake ?
                  </h2>

                  <p>
                    Staking is a popular way to earn passive income with your
                    crypto investments
                  </p>
                  <ul className='list-unstyled items mt-5'>
                    <li className='item'>
                      {/* Content List */}
                      <div className='content-list d-flex align-items-center'>
                        <div className='content-icon'>
                          <span>
                            <i className='fa-brands fa-discord' />
                          </span>
                        </div>
                        <div className='content-body ml-4'>
                          <h3
                            style={{
                              color: theme && '#16182d',
                            }}
                            className='m-0'
                          >
                            Add CUSD Tokens
                          </h3>
                          <p className='mt-3'>
                            You will need CUSD tokens in your wallet to stake.
                            Once you purchase CUSD tokens, make sure that you
                            add the CUSD token to your MetaMask/TrustWallet
                            Wallet so you can view your CUSD balance.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='item'>
                      {/* Content List */}
                      <div className='content-list d-flex align-items-center'>
                        <div className='content-icon'>
                          <span className='featured'>
                            <i className='fa-brands fa-hotjar' />
                          </span>
                        </div>
                        <div className='content-body ml-4'>
                          <h3
                            style={{
                              color: theme && '#16182d',
                            }}
                            className='m-0'
                          >
                            Connect &amp; Verify Wallet
                          </h3>
                          <p className='mt-3'>
                            Click the "Connect Wallet" button at the upper right
                            corner of the site and make sure you have the
                            Binance Smart Chain network selected in your
                            MetaMask wallet.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='item'>
                      {/* Content List */}
                      <div className='content-list d-flex align-items-center'>
                        <div className='content-icon'>
                          <span>
                            <i className='fa-solid fa-rocket' />
                          </span>
                        </div>
                        <div className='content-body ml-4'>
                          <h3
                            style={{
                              color: theme && '#16182d',
                            }}
                            className='m-0'
                          >
                            Stake CUSD
                          </h3>
                          <p className='mt-3'>
                            You'll need to click the 'Stake CUSD' and scroll to
                            the top of the page to bring up the staking
                            interface on the site.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-12 col-md-6'>
                {/* Blockchain Animation */}
                <div className='wrapper-animation d-none d-md-block'>
                  <div className='blockchain-wrapper'>
                    <div className='pyramid'>
                      <div className='square'>
                        <div className='triangle' />
                        <div className='triangle' />
                        <div className='triangle' />
                        <div className='triangle' />
                      </div>
                    </div>
                    <div className='pyramid inverse'>
                      <div className='square'>
                        <div className='triangle' />
                        <div className='triangle' />
                        <div className='triangle' />
                        <div className='triangle' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ***** Content Area End ***** */}
        {/* ***** CTA Area Start ***** */}
        <section
          style={{
            background: theme && 'white',
          }}
          className='cta-area p-0'
        >
          <div className='container'>
            <div className='row'>
              <div className='col-12 card'>
                <div className='row align-items-center justify-content-center'>
                  <div className='col-12 col-md-5 text-center'>
                    <img src='/img/content/cta_thumb.png' alt />
                  </div>
                  <div className='col-12 col-md-6 mt-4 mt-md-0'>
                    <h2 className='m-0'>BUY $CUSD NOW</h2>
                    <br />
                    <p>
                      Still don’t have $CUSD token? Buy it now on Binance and
                      start staking your tokens
                    </p>
                    <a className='btn btn-bordered active d-inline-block'>
                      <i className='icon-rocket mr-2' />
                      Buy on Binance
                    </a>
                  </div>
                </div>
                <a className='cta-link' />
              </div>
            </div>
          </div>
        </section>
        {/* ***** CTA Area End ***** */}
        {/*====== Footer Area Start ======*/}
        <footer
          style={{
            background: theme && 'white',
            borderTop: theme && '5px solid #eeee',
          }}
          className='footer-area'
        >
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-12 col-md-8 text-center'>
                {/* Footer Items */}
                <div className='footer-items'>
                  {/* Logo */}
                  <a className='navbar-brand' href='/'>
                    <img src='/img/logo/logo.png' alt='Company Logo' />
                  </a>
                  <div className='social-share ml-auto'>
                    <ul
                      className='d-flex list-unstyled'
                      style={{ justifyContent: 'center' }}
                    >
                      <li>
                        <a href=''>
                          <i className='fab fa-telegram' />
                        </a>
                      </li>
                      <li>
                        <a href=''>
                          <i className='fab fa-telegram' />
                        </a>
                      </li>
                      <li>
                        <a href=''>
                          <i className='fas fa-globe' />
                        </a>
                      </li>
                      <li>
                        <a href=''>
                          <i className='fab fa-twitter' />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='copyright-area py-4'>
                    ©2023 PEYEM, All Rights Reserved By{' '}
                    <a href='#' target='_blank'>
                      PEYEM
                    </a>
                  </div>
                </div>
                {/* Scroll To Top */}
                <div id='scroll-to-top' className='scroll-to-top'>
                  <a href='#header' className='smooth-anchor'>
                    <i className='fa-solid fa-arrow-up' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/*====== Footer Area End ======*/}
      </div>
    </div>
    // </ThemeContext.Provider>
  );
}

export default App;
