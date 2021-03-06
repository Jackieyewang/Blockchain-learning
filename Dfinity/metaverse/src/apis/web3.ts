import WalletConnectProvider from '@walletconnect/web3-provider';
import createMetaMaskProvider from 'metamask-extension-provider';
import Fortmatic from 'fortmatic';
import Web3Modal from 'web3modal';

const web3Modal = new Web3Modal({
  network: process.env.REACT_APP_WEB3_NETWORK!,
  cacheProvider: true,
  disableInjectedProvider: false,
  providerOptions: {
    'custom-metamask': {
      display: {
        name: 'MetaMask',
        description: 'Connect with MetaMask'
      },
      package: createMetaMaskProvider,
      connector: async (createMetaMaskProvider) => {
        const provider = createMetaMaskProvider();
        await provider.request({ method: 'eth_requestAccounts' });
      }
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: process.env.REACT_APP_FORTMATIC_KEY
      }
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_PROJECT_ID
      }
    }
  }
});

export async function connectWithWeb3 () {
  const provider = await web3Modal.connect();
  const addresses = (await provider.request({ method: 'eth_requestAccounts' })) as Array<string>;

  return {
    provider,
    addresses
  };
}
