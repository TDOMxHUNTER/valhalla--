import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  ConnectButton
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { defineChain } from 'viem';
import {
  QueryClientProvider,
} from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast"


// Define Monad Testnet chain
const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MON',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com/',
    },
  },
  testnet: true,
});

const config = getDefaultConfig({
  appName: 'Valhalla NFT',
  projectId: 'YOUR_PROJECT_ID', // Get this from https://cloud.walletconnect.com
  chains: [monadTestnet],
  ssr: false,
});

// Custom Connect Button Component
export function CustomConnectButton() {
  const { toast } = useToast();

  const handleConnectClick = () => {
    toast({
      title: "Coming Soon!",
      description: "Web3 wallet connection will be available soon.",
      duration: 3000,
    });
  };

  return (
    <button
      onClick={handleConnectClick}
      className="bg-nordic-gold text-black hover:bg-yellow-500 transition-all transform hover:scale-105 font-semibold px-6 py-2 rounded-lg"
    >
      Connect Wallet
    </button>
  );
}

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#D4AF37',
          accentColorForeground: 'black',
          borderRadius: 'medium',
          fontStack: 'system',
        })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}