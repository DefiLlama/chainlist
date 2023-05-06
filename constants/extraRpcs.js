import { mergeDeep } from "../utils/fetch.js";

import { llamaNodesRpcs } from "./llamaNodesRpcs.js";

const privacyStatement = {
  "48Club":
    "IP addresses will be read for rate-limit purpose without being actively stored at application layer. Also notice that we don't actively purge user footprint in lower-level protocol.",
  unitedbloc:
    "UnitedBloc does not collect or store any PII information. UnitedBloc does use IP addresses and transaction requests solely for service management purposes. Performance measurements such as rate limiting and routing rules require the analysis of IP addresses and response time measurements require the analysis of transaction requests. UnitedBloc does not and will never use RPC requests to front run transactions.",
  ankr:
    "For service delivery purposes, we temporarily record IP addresses to set usage limits and monitor for denial of service attacks against our infrastructure. Though we do look at high-level data around the success rate of transactions made over the blockchain RPC, we do not correlate wallet transactions made over the infrastructure to the IP address making the RPC request. Thus, we do not store, exploit, or share any information regarding Personal Identifiable Information (PII), including wallet addresses. https://www.ankr.com/blog/ankrs-ip-address-policy-and-your-privacy/",
  alchemy:
    "We may collect certain information automatically when you use our Services, such as your Internet protocol (IP) address, user settings, MAC address, cookie identifiers, mobile carrier, mobile advertising and other unique identifiers, browser or device information, location information (including approximate location derived from IP address), and Internet service provider. https://www.alchemy.com/policies/privacy-policy",
  nodereal:
    `We may automatically record certain information about how you use our Sites (we refer to this information as "Log Data"). Log Data may include information such as a user's Internet Protocol (IP) address, device and browser type, operating system, the pages or features of our Sites to which a user browsed and the time spent on those pages or features, the frequency with which the Sites are used by a user, search terms, the links on our Sites that a user clicked on or used, and other statistics. We use this information to administer the Service and we analyze (and may engage third parties to analyze) this information to improve and enhance the Service by expanding its features and functionality and tailoring it to our users' needs and preferences. https://nodereal.io/terms`,
  publicnode:
    `We do not store or track any user data with the exception of data that will be public on chain. We do not correlate wallets address's with IP's,  any data which is needed to transact is deleted after 24 hours. We also do no use any Analytics or 3rd party website tracking. https://www.publicnode.com/privacy`,
  onerpc:
    "With the exception of data that will be public on chain, all the other metadata / data should remain private to users and other parties should not be able to access or collect it. 1RPC uses many different techniques to prevent the unnecessary collection of user privacy, which prevents tracking from RPC providers. https://docs.ata.network/1rpc/design/#tracking-prevention",
  builder0x69:
    "Private transactions / MM RPC: https://twitter.com/builder0x69",
  MEVBlockerRPC:
    "Privacy notice: MEV Blocker RPC does not store any kind of user information (i.e. IP, location, user agent, etc.) in any data bases. Only transactions are preserved to be displayed via status endpoint like https://rpc.mevblocker.io/tx/0x627b09d5a9954a810cd3c34b23694439da40558a41b0d87970f2c3420634a229. Connect to MEV Blocker via https://rpc.mevblocker.io",
  flashbots:
    "Privacy notice: Flashbots Protect RPC does not track any kind of user information (i.e. IP, location, etc.). No user information is ever stored or even logged. https://docs.flashbots.net/flashbots-protect/rpc/quick-start",
  bloxroute:
    "We may collect information that is publicly available in a blockchain when providing our services, such as: Public wallet identifier of the sender and recipient of a transaction, Unique identifier for a transaction, Date and time of a transaction, Transaction value, along with associated costs, Status of a transaction (such as whether the transaction is complete, in-progress, or resulted in an error) https://bloxroute.com/wp-content/uploads/2021/12/bloXroute-Privacy-Policy-04-01-2019-Final.pdf",
  cloudflare:
    "Just as when you visit and interact with most websites and services delivered via the Internet, when you visit our Websites, including the Cloudflare Community Forum, we gather certain information and store it in log files. This information may include but is not limited to Internet Protocol (IP) addresses, system configuration information, URLs of referring pages, and locale and language preferences. https://www.cloudflare.com/privacypolicy/",
  blastapi:
    "All the information in our logs (log data) can only be accessed for the last 7 days at any certain time, and it is completely purged after 14 days. We do not store any user information for longer periods of time or with any other purposes than investigating potential errors and service failures. https://blastapi.io/privacy-policy",
  bitstack:
    "Information about your computer hardware and software may be automatically collected by BitStack. This information can include: your IP address, browser type, domain names, access times and referring website addresses. https://bitstack.com/#/privacy",
  pokt:
    "What We Do Not Collect: User's IP address, request origin, request data. https://www.blog.pokt.network/rpc-logging-practices/",
  zmok:
    `API requests - we do NOT store any usage data, additionally, we do not store your logs. No KYC - "Darknet" style of sign-up/sign-in. Only provider that provides Ethereum endpoints as TOR/Onion hidden service. Analytical data are stored only on the landing page/web.  https://zmok.io/privacy-policy`,
  infura:
    "We collect wallet and IP address information. The purpose of this collection is to ensure successful transaction propagation, execution, and other important service functionality such as load balancing and DDoS protection. IP addresses and wallet address data relating to a transaction are not stored together or in a way that allows our systems to associate those two pieces of data. We retain and delete user data such as IP address and wallet address pursuant to our data retention policy. https://consensys.net/blog/news/consensys-data-retention-update/",
  etcnetworkinfo:
    "We do use analytics at 3rd party tracking websites (Google Analytics & Google Search Console) the following interactions with our systems are automatically logged when you access our services, such as your Internet Protocol (IP) address as well as accessed services and pages(Packet details are discarded / not logged!). Data redemption is varying based on traffic, but deleted after 31 days.",
  omnia:
    "All the data and metadata remain private to the users. No third party is able to access, analyze or track it. OMNIA leverages different technologies and approaches to guarantee the privacy of their users, from front-running protection and private mempools, to obfuscation and random dispatching. https://blog.omniatech.io/how-omnia-handles-your-personal-data",
  blockpi:
    "We do not collect request data or request origin. We only temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days and we do not store any user information for longer periods of time. https://blockpi.io/privacy-policy",
  payload:
    "Sent transactions are private: https://payload.de/docs. By default, no data is collected when using the RPC endpoint. If provided by the user, the public address for authentication is captured when using the RPC endpoint in order to prioritize requests under high load. This information is optional and solely provided at the user's discretion. https://payload.de/privacy/",
  gitshock:
    "We do not collect any personal data from our users. Our platform is built on blockchain technology, which ensures that all transactions are recorded on a public ledger that is accessible to all users. However, this information is anonymous and cannot be linked to any specific individual. https://docs.gitshock.com/users-guide/privacy-policy",
  gashawk:
    "Sign-in with Ethereum on https://www.gashawk.io required prior to use. We may collect information that is publicly available in a blockchain when providing our services, such as: Public wallet identifier of the sender and recipient of a transaction, Unique identifier for a transaction, Date and time of a transaction, Transaction value, along with associated costs, Status of a transaction (such as whether the transaction is complete, in-progress, or resulted in an error), read the terms of service https://www.gashawk.io/#/terms and the privacy policy https://www.gashawk.io/#/privacy.",
  LiveplexOracleEVM:
    "Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data. When You access the Service by or through a mobile device, we may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data. We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device. https://www.liveplex.io/privacypolicy.html",
  jellypool:
    "The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. https://www.jellypool.xyz/privacy/",
  restratagem:
    "Only strictly functional data is automatically collected by the RPC. None of this data is directly exported or used for commercial purposes.",
  onfinality:
    "For the sole purpose of providing our service, we temporarily record IP addresses and origins to check against free limits, provide load balancing, prevent DOS attacks, and to determine where best to locate our nodes. We do not, and will never, correlate or link specific wallet addresses or transactions made over our infrastructure to the IP address or origin making the RPC request. After processing IP addresses, we discard the IP address value within 24 hours. Read more here: https://blog.onfinality.io/how-does-onfinality-deal-with-personal-information/",
  getblock:
    "We automatically collect certain information through cookies and similar technologies when you visit, use or navigate Website. This information does not reveal your specific identity (like your name or contact information) and does not allow to identify you. However, it may include device and usage information, such as your IP address, browser and device characteristics, its type and version, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website, information about your interaction in our emails, and other technical and statistical information. This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes.Specifically, as the RPC provider, we do not log and store your IP address, country, location and similar data. https://getblock.io/privacy-policy/",
  teamblockchain:
  "We only store and track data that will be publicly available on the blockchain, and do not collect or retain any other user data. https://policy.teamblockchain.team/",
  getloop:
    "Loop Network follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. https://www.getloop.network/privacypolicy",
  ChainUpCloud:
    "We only collect user IP addresses for the purpose of rate limiting. For more information, please visit https://docs.chainupcloud.com/introduction/products/blockchain-api.",
  iota:
    "When you visit any of our websites or use any features or resources available on or through our websites. When you visit our website, your device and browser may automatically disclose certain information (such as device type, operating system, browser type, browser settings, IP address, language settings, dates and times of connecting to a website and other technical communications information), some of which may constitute Personal Data; https://www.iota.org/privacy-policy",
  markrgo: 
    "We only collect the minimum necessary information to provide our blockchain RPC service (caching). We do not use your data for commercial purposes. Any collected data is short-term and will be automatically deleted within 24 hours if not actively used. https://www.markr.io/privacy-policy",
  croswap:
    "CroSwap records limited metadata from requests, including the number of requests, User-Agent, IP, and ASN. This data is stored for a maximum of 90 days and is solely used for debugging, identifying suspicious activity, and generating analytics.",
  unifra:
    "Regarding the RPC(remote procedure call) data, we do not collect request data or request origin. We temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days. Only the amounts of RPC requests of users are recorded for accounting and billing purposes within longer time. https://unifra.io/",
  croswap:
    "CroSwap records limited metadata from requests, including the number of requests, User-Agent, IP, and ASN. This data is stored for a maximum of 90 days and is solely used for debugging, identifying suspicious activity, and generating analytics.",
  SFTProtocol:
    "Information collected automatically may include usage details, IP addresses, and information collected through cookies and other tracking technologies",
  gateway:
    "When you use our services or visit our websites, we may log your device’s IP address for debugging and security reasons. We may retain this information for up to twelve months",
  eosnetwork:
    "We collect information about your device and internet connection, including the device’s unique device identifier, IP address, operating system, and browser type, mobile network information",
  jfc:
    "We do not collect request data or request origin. We only temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days and we do not store any user information for longer periods of time. https://blockpi.io/privacy-policy",
  j2o:
    "We do not collect request data or request origin. We only temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days and we do not store any user information for longer periods of time. https://blockpi.io/privacy-policy",
  icplazaorg:
    "Please be aware that we collect your following information for the purpose of satisfying your needs in ICPlaza services(...) 1.We will collect your mobile device information, operation records, transaction records, wallet address and other personal information. https://www.ic-plaza.org/privacy-policy",
  tenderly:
    "Additionally, if you are an Account Member, we may collect business and transactional data about you (and your business) that accumulates over the normal course of operation regarding providing our Services. This may include transaction records, stored files, user profiles, information about collaborators, analytics data, and other metrics, as well as other types of information created or generated by your interaction with our Services. https://tenderly.co/privacy-policy"
};

export const extraRpcs = {
  1: {
    rpcs: [
      // Quicknode -> tracks IP
      {
        url: "https://endpoints.omniatech.io/v1/eth/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/eth",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url:
          "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
        tracking: "yes",
        trackingDetails: privacyStatement.nodereal,
      },
      {
        url: "https://ethereum.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/eth",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://rpc.builder0x69.io/",
        tracking: "none",
        trackingDetails: privacyStatement.builder0x69,
      },
      {
        url: "https://rpc.mevblocker.io",
        tracking: "none",
        trackingDetails: privacyStatement.MEVBlockerRPC,
      },
      {
        url: "https://rpc.flashbots.net/",
        tracking: "none",
        trackingDetails: privacyStatement.flashbots,
      },
      {
        url: "https://virginia.rpc.blxrbdn.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://uk.rpc.blxrbdn.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://singapore.rpc.blxrbdn.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://eth.rpc.blxrbdn.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://cloudflare-eth.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.cloudflare,
      },
      // RPC Fast -> Tracks IP
      {
        url: "https://eth-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://api.securerpc.com/v1",
        tracking: "unspecified",
      },
      {
        url:
          "https://api.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet",
        tracking: "yes",
        trackingDetails: privacyStatement.bitstack,
      },
      {
        url: "https://eth-rpc.gateway.pokt.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://eth-mainnet-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra
      },
      {
        url: "https://ethereum.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://rpc.payload.de",
        tracking: "none",
        trackingDetails: privacyStatement.payload,
      },
      // Distributed cluster of Ethereum nodes designed for speed and anonymity!
      {
        url: "https://api.zmok.io/mainnet/oaen6dy8ff6hju9k",
        tracking: "none",
        trackingDetails: privacyStatement.zmok,
      },
      {
        url: "https://eth-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://eth.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "https://core.gashawk.io/rpc",
        tracking: "yes",
        trackingDetails: privacyStatement.gashawk,
      },
      // "http://127.0.0.1:8545",

      //"https://yolo-intensive-paper.discover.quiknode.pro/45cad3065a05ccb632980a7ee67dd4cbb470ffbd/",
      //"https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79",
      //"https://api.mycryptoapi.com/eth",
      //"https://mainnet-nethermind.blockscout.com/",
      //"https://nodes.mewapi.io/rpc/eth",
      //"https://main-rpc.linkpool.io/",
      "https://mainnet.eth.cloud.ava.do/",
      "https://ethereumnodelight.app.runonflux.io",
      "https://eth-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
      //"http://18.211.207.34:8545",
      "https://main-light.eth.linkpool.io",
      {
        url: "https://rpc.eth.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      
    ],
  },
  2: {
    rpcs: ["https://node.eggs.cool", "https://node.expanse.tech"],
  },
  1975: {
    rpcs: ["https://rpc.onuschain.io"],
  },
  80001: {
    rpcs: [
      "https://rpc-mumbai.maticvigil.com",
      {
        url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/polygon_mumbai",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://polygontestapi.terminet.io/rpc",
      {
        url: "https://polygon-testnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://polygon-mumbai.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  //Rinkeby testnet deprecated
  4: {
    rpcs: [
      "https://rpc.ankr.com/eth_rinkeby",
      "https://rinkeby.infura.io/3/9aa3d95b3bc440fa88ea12eaa4456161",
    ],
  },
  5: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/eth_goerli",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://endpoints.omniatech.io/v1/eth/goerli/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        tracking: "limited",
        trackingDetails: privacyStatement.infura,
      },
      {
        url: "https://eth-goerli.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://eth-goerli.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://goerli.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://eth-goerli.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "https://rpc.goerli.eth.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      
    ],
  },
  //Ropsten testnet deprecated
  3: {
    rpcs: [
      "https://rpc.ankr.com/eth_ropsten",
      "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    ],
  },
  4002: {
    rpcs: [
      "https://rpc.testnet.fantom.network/",
      {
        url: "https://endpoints.omniatech.io/v1/fantom/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/fantom_testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://fantom-testnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  "4444": {
    rpcs: ["https://janus.htmlcoin.dev/janus/"],
  },
  43113: {
    rpcs: [
      "https://api.avax-test.network/ext/bc/C/rpc",
      {
        url: "https://endpoints.omniatech.io/v1/avax/fuji/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/avalanche_fuji",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.ankr.com/avalanche_fuji-c",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://avalanchetestapi.terminet.io/ext/bc/C/rpc",
      {
        url: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  56: {
    rpcs: [
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
      "https://bsc-dataseed2.defibit.io/",
      "https://bsc-dataseed3.defibit.io/",
      "https://bsc-dataseed4.defibit.io/",
      "https://bsc-dataseed2.ninicoin.io/",
      "https://bsc-dataseed3.ninicoin.io/",
      "https://bsc-dataseed4.ninicoin.io/",
      "https://bsc-dataseed1.binance.org/",
      "https://bsc-dataseed2.binance.org/",
      "https://bsc-dataseed3.binance.org/",
      "https://bsc-dataseed4.binance.org/",
      {
        url: "https://rpc-bsc.48.club",
        tracking: "limited",
        trackingDetails: privacyStatement["48Club"],
      },
      {
        url: "https://koge-rpc-bsc.48.club",
        tracking: "limited",
        trackingDetails: privacyStatement["48Club"],
      },
      {
        url: "https://endpoints.omniatech.io/v1/bsc/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url:
          "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
        tracking: "yes",
        trackingDetails: privacyStatement.nodereal,
      },
      {
        url: "https://rpc.ankr.com/bsc",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://bscrpc.com",
      "https://bsc.rpcgator.com/",
      {
        url: "https://binance.nodereal.io",
        tracking: "yes",
        trackingDetails: privacyStatement.nodereal,
      },
      "https://bsc-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
      "https://nodes.vefinetwork.org/smartchain",
      {
        url: "https://1rpc.io/bnb",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://bsc.rpc.blxrbdn.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://bsc.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://bnb.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "https://bsc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://bsc-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  97: {
    rpcs: [
      {
        url: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      "https://bsctestapi.terminet.io/rpc",
      {
        url: "https://bsc-testnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  900000: {
    rpcs: ["https://api.posichain.org", "https://api.s0.posichain.org"],
  },
  43114: {
    rpcs: [
      "https://api.avax.network/ext/bc/C/rpc",
      "https://avax.rpcgator.com/",
      "https://avalanche.public-rpc.com",
      {
        url: "https://rpc.ankr.com/avalanche",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://blastapi.io/public-api/avalanche",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      "https://avalancheapi.terminet.io/ext/bc/C/rpc",
      {
        url: "https://avalanche-c-chain.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/avax/c",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://avalanche.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://avax-mainnet.gateway.pokt.network/v1/lb/605238bf6b986eea7cf36d5e/ext/bc/C/rpc",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://avalanche.api.onfinality.io/public/ext/bc/C/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://endpoints.omniatech.io/v1/avax/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  250: {
    rpcs: [
      "https://rpcapi.fantom.network",
      {
        url: "https://endpoints.omniatech.io/v1/fantom/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      "https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac",
      "https://rpc.ftm.tools/",
      {
        url: "https://rpc.ankr.com/fantom",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://rpc.fantom.network",
      "https://rpc2.fantom.network",
      "https://rpc3.fantom.network",
      {
        url: "https://fantom-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://1rpc.io/ftm",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://fantom.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://fantom.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://fantom.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://rpc.fantom.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      
    ],
  },
  137: {
    rpcs: [
      "https://rpc-mainnet.maticvigil.com",
      {
        url: "https://endpoints.omniatech.io/v1/matic/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      "https://polygon-rpc.com",
      "https://rpc-mainnet.matic.network",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet.chainstacklabs.com",
      "https://matic-mainnet-full-rpc.bwarelabs.com",
      "https://matic-mainnet-archive-rpc.bwarelabs.com",
      "https://poly-rpc.gateway.pokt.network/",
      {
        url: "https://rpc.ankr.com/polygon",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://polygon-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      "https://polygonapi.terminet.io/rpc",
      {
        url: "https://1rpc.io/matic",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      "https://polygon-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
      {
        url: "https://polygon-bor.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      "https://polygon-mainnet-public.unifra.io",
      {
        url: "https://polygon-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://polygon.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://polygon.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://polygon.rpc.blxrbdn.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
    ],
  },
  25: {
    rpcs: [
      "https://evm.cronos.org",
      "https://cronos-rpc.elk.finance/",
      {
        url: "https://node.croswap.com/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.croswap,
      },
      {
        url: "https://cronos.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://cronos-evm.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
  },
  338: {
    rpcs: [
      "https://evm-t3.cronos.org/",      
    ],
  },
  
  142857: {
    rpcs: [
      {
        url: "https://rpcmainnet.ic-plaza.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.icplazaorg,
      },
    ],
  },
  
  42161: {
    rpcs: [
      "https://arb1.arbitrum.io/rpc",
      {
        url: "https://arb1.croswap.com/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.croswap,
      },
      {
        url: "https://rpc.ankr.com/arbitrum",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://1rpc.io/arb",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://arbitrum.getblock.io/api_key/mainnet/",
        tracking: "none",
        trackingDetails: privacyStatement.getblock,
      },
      {
        url: "https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}",
        tracking: "limited",
        trackingDetails: privacyStatement.infura,
      },
      {
        url: "https://arb-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://arbitrum.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://arbitrum-one.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://endpoints.omniatech.io/v1/arbitrum/one/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url:"https://arb-mainnet-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra
      },
      {
        url: "https://arbitrum.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  421613: {
    rpcs: [
      {
        url: "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://arb-goerli.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://arbitrum-goerli.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  42170: {
    rpcs: [
      "https://nova.arbitrum.io/rpc",
      {
        url: "https://arbitrum-nova.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  8217: {
    rpcs: [
      "https://public-node-api.klaytnapi.com/v1/cypress",
      "https://cypress.fautor.app/archive",
      {
        url: "https://klaytn.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  1666600000: {
    rpcs: [
      "https://harmony-0-rpc.gateway.pokt.network",
      "https://api.harmony.one",
      "https://a.api.s0.t.hmny.io",
      "https://api.s0.t.hmny.io",
      {
        url: "https://rpc.ankr.com/harmony",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://harmony-mainnet.chainstacklabs.com",
      {
        url: "https://harmony.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  1313161554: {
    rpcs: [
      "https://mainnet.aurora.dev",
      {
        url: "https://endpoints.omniatech.io/v1/aurora/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  1313161555: {
    rpcs: [
      {
        url: "https://endpoints.omniatech.io/v1/aurora/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ]
  },
  4181: {
    rpcs: ["https://rpc1.phi.network"],
  },
  128: {
    rpcs: [
      "https://http-mainnet.hecochain.com",
      "https://http-mainnet-node.huobichain.com",
      "https://hecoapi.terminet.io/rpc",
    ],
  },
  256: {
    rpcs: ["https://hecotestapi.terminet.io/rpc"],
  },
  42220: {
    rpcs: [
      "https://forno.celo.org",
      {
        url: "https://rpc.ankr.com/celo",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://1rpc.io/celo",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
  },
  10: {
    rpcs: [
      "https://mainnet.optimism.io/",
      {
        url: "https://optimism-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://rpc.ankr.com/optimism",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://1rpc.io/op",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://opt-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://optimism.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://endpoints.omniatech.io/v1/op/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://optimism.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  1881: {
    rpcs: [
      {
        url: "https://rpc.cartenz.works",
        tracking: "none",
        trackingDetails: privacyStatement.gitshock,
      }
    ]
  },
  420: {
    rpcs: [
      {
        url: "https://endpoints.omniatech.io/v1/op/goerli/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://opt-goerli.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://optimism-goerli.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  1088: {
    rpcs: ["https://andromeda.metis.io/?owner=1088"],
  },
  1246: {
    rpcs: ["https://rpc-cnx.omplatform.com"],
  },
  100: {
    rpcs: [
      "https://rpc.gnosischain.com",
      "https://xdai-rpc.gateway.pokt.network",
      "https://xdai-archive.blockscout.com",
      {
        url: "https://rpc.gnosis.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      {
        url: "https://gnosis-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://rpc.ankr.com/gnosis",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.ap-southeast-1.gateway.fm/v4/gnosis/non-archival/mainnet",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      {
        url: "https://gnosis.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://gnosis.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  10200: {
    rpcs: [
      "https://rpc.chiadochain.net",
      {
        url: "https://rpc.chiado.gnosis.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
    ],
  },
  1231: {
    rpcs: ["https://ultron-rpc.net"],
  },
  1285: {
    rpcs: [
      {
        url: "wss://moonriver.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://moonriver.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "https://moonriver.unitedbloc.com:2000",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "wss://moonriver.unitedbloc.com:2001",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "https://moonriver.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  361: {
    rpcs: ["https://eth-rpc-api.thetatoken.org/rpc"],
  },
  42262: {
    rpcs: ["https://emerald.oasis.dev/"],
  },
  40: {
    rpcs: [
      "https://mainnet.telos.net/evm",
      "https://rpc1.eu.telos.net/evm",
      "https://rpc1.us.telos.net/evm",
      "https://rpc2.us.telos.net/evm",
      "https://api.kainosbp.com/evm",
      "https://rpc2.eu.telos.net/evm",
      "https://evm.teloskorea.com/evm",
      "https://rpc2.teloskorea.com/evm",
      "https://rpc01.us.telosunlimited.io/evm",
      "https://rpc02.us.telosunlimited.io/evm",
    ],
  },
  32659: {
    rpcs: [
      "https://mainnet.anyswap.exchange",
      "https://mainway.freemoon.xyz/gate",
      "https://fsn.dev/api",
      "https://mainnet.fusionnetwork.io",
    ],
  },
  1284: {
    rpcs: [
      "https://rpc.api.moonbeam.network",
      {
        url: "https://moonbeam.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "wss://moonbeam.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "https://moonbeam.unitedbloc.com:3000",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "wss://moonbeam.unitedbloc.com:3001",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "https://moonbeam.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://rpc.ankr.com/moonbeam",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://1rpc.io/glmr",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
  },
  30: {
    rpcs: ["https://public-node.rsk.co"],
  },
  4689: {
    rpcs: [
      "https://iotex-mainnet.gateway.pokt.network/v1/lb/6176f902e19001003499f492",
      {
        url: "https://rpc.ankr.com/iotex",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://babel-api.mainnet.iotex.io",
      "https://babel-api.mainnet.iotex.one",
      "https://pokt-api.iotex.io",
    ],
  },
  66: {
    rpcs: ["https://exchainrpc.okex.org"],
  },
  288: {
    rpcs: [
      "https://mainnet.boba.network/",
      {
        url: "https://boba-mainnet.gateway.pokt.network/v1/lb/623ad21b20354900396fed7f",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "http://boba-ethereum.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "http://gateway.tenderly.co/public/boba-ethereum",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
    ],
  },
  321: {
    rpcs: [
      "https://rpc-mainnet.kcc.network",
      "https://kcc.mytokenpocket.vip",
      "https://kcc-rpc.com",
    ],
  },
  888: {
    rpcs: ["https://gwan-ssl.wandevs.org:56891", "https://gwan2-ssl.wandevs.org"],
  },
  106: {
    rpcs: [
      "https://evmexplorer.velas.com/rpc",
      "https://velas-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
    ],
  },
  10000: {
    rpcs: [
      "https://smartbch.fountainhead.cash/mainnet",
      "https://global.uat.cash",
      "https://rpc.uatvo.com",
    ],
  },
  19: {
    rpcs: ["https://songbird.towolabs.com/rpc"],
  },
  122: {
    rpcs: [
      "https://fuse-rpc.gateway.pokt.network/",
      "https://rpc.fuse.io",
      "https://fuse-mainnet.chainstacklabs.com",
      {
        url: "https://fuse.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  336: {
    rpcs: [
      "https://rpc.shiden.astar.network:8545/",
      {
        url: "https://shiden.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  592: {
    rpcs: [
      "https://evm.astar.network/",
      "https://rpc.astar.network:8545",
      {
        url: "https://astar.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://1rpc.io/astr",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://astar-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://astar.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "wss://astar.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
    ],
  },
  71394: {
    rpcs: ["https://mainnet.godwoken.io/rpc/eth-wallet"],
  },
  52: {
    rpcs: [
      "https://rpc.coinex.net/",
      "https://rpc1.coinex.net/",
      "https://rpc2.coinex.net/",
      "https://rpc3.coinex.net/",
      "https://rpc4.coinex.net/",
    ],
  },
  820: {
    rpcs: ["https://rpc.callisto.network", "https://clo-geth.0xinfra.com/"],
  },
  108: {
    rpcs: ["https://mainnet-rpc.thundercore.com"],
  },
  20: {
    rpcs: ["https://api.elastos.io/esc", "https://api.trinity-tech.io/esc"],
  },
  82: {
    rpcs: ["https://rpc.meter.io",
      {
        url: "https://rpc-meter.jellypool.xyz/",
        tracking: "yes",
        trackingDetails: privacyStatement.jellypool,
      },
    ],
  },
  5551: {
    rpcs: ["https://l2.nahmii.io/"],
  },
  88: {
    rpcs: ["https://rpc.tomochain.com"],
  },
  246: {
    rpcs: ["https://rpc.energyweb.org"],
  },
  57: {
    rpcs: [
      "https://rpc.syscoin.org",
      {
        url: "https://rpc.ankr.com/syscoin",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  8: {
    rpcs: ["https://rpc.octano.dev"],
  },
  5050: {
    rpcs: ["https://rpc.liquidchain.net/", "https://rpc.xlcscan.com/"],
  },
  333999: {
    rpcs: ["https://rpc.polis.tech"],
  },
  55: {
    rpcs: [
      "https://rpc-1.zyx.network/",
      "https://rpc-2.zyx.network/",
      "https://rpc-3.zyx.network/",
      "https://rpc-5.zyx.network/",
    ],
  },
  60: {
    rpcs: ["https://rpc.gochain.io"],
  },
  11297108109: {
    rpcs: [
      {
        url:
          "https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b",
        tracking: "limited",
        trackingDetails: privacyStatement.infura,
      },
      {
        url: "https://palm-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  7: {
    rpcs: ["https://rpc.dome.cloud"],
  },
  11: {
    rpcs: ["https://api.metadium.com/dev"],
  },
  14: {
    rpcs: [],
    rpcWorking: false,
  },
  15: {
    rpcs: ["https://prenet.diode.io:8443/"],
  },
  17: {
    rpcs: ["https://rpc.thaifi.com"],
  },
  22: {
    rpcs: ["https://api.trinity-tech.io/eid", "https://api.elastos.io/eid"],
  },
  24: {
    rpcs: ["https://rpc.kardiachain.io"],
  },
  27: {
    rpcs: ["https://rpc.shibachain.net"],
    websiteUrl: "https://shibachain.net/",
  },
  29: {
    rpcs: ["https://rpc.genesisl1.org"],
  },
  33: {
    rpcs: [],
    rpcWorking: false,
  },
  35: {
    rpcs: ["https://rpc.tbwg.io"],
  },
  38: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  44: {
    rpcs: [
      {
        url: "https://crab.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  50: {
    rpcs: [
      "https://rpc.xdcrpc.com",
      "https://erpc.xinfin.network",
      "https://rpc.xinfin.network",
      "https://rpc1.xinfin.network",
    ],
  },
  58: {
    rpcs: [
      "https://dappnode1.ont.io:10339",
      "https://dappnode2.ont.io:10339",
      "https://dappnode3.ont.io:10339",
      "https://dappnode4.ont.io:10339",
    ],
  },
  59: {
    rpcs: ["https://api.eosargentina.io", "https://api.metahub.cash"],
  },
  15557: {
    rpcs: [
      {
        url: "https://api.testnet.evm.eosnetwork.com",
        tracking: "yes",
        trackingDetails: privacyStatement.eosnetwork,
      },
    ],
  },
  17777: {
    rpcs: [
      {
        url: "https://api.evm.eosnetwork.com",
        tracking: "yes",
        trackingDetails: privacyStatement.eosnetwork,
      },
    ],
  },
  6: {
    rpcs: [
      "https://www.ethercluster.com/kotti",
      {
        url: "https://geth-kotti.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
    ],
  },
  61: {
    rpcs: [
      "https://etc.rivet.link",
      "https://etc.etcdesktop.com",
      "https://etc.mytokenpocket.vip",
      {
        url: "https://besu-de.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://geth-de.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://erigon-de.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://besu-at.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://geth-at.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://erigon-at.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      "https://rpc.etcplanets.com",
    ],
  },
  63: {
    rpcs: [
      "https://www.ethercluster.com/mordor",
      {
        url: "https://geth-mordor.etc-network.info",
        tracking: "yes",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
    ],
  },
  64: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  68: {
    rpcs: [],
    rpcWorking: false,
  },
  74: {
    rpcs: ["https://idchain.one/rpc/"],
  },
  76: {
    rpcs: [],
    rpcWorking: false,
    possibleRebrand:
      "It is now a Polkadot chain project renamed: Acuity being built on substrate",
  },
  77: {
    rpcs: ["https://sokol.poa.network"],
  },
  78: {
    rpcs: ["https://ethnode.primusmoney.com/mainnet"],
  },
  80: {
    rpcs: ["website:https://genechain.io/en/index.html"],
    rpcWorking: false,
  },
  86: {
    rpcs: ["https://evm.gatenode.cc"],
  },
  87: {
    rpcs: [
      {
        url: "https://rpc.novanetwork.io:9070",
        tracking: "none",
        trackingDetails: privacyStatement.restratagem,
      },
      {
        url: "https://dev.rpc.novanetwork.io/",
        tracking: "none",
        trackingDetails: privacyStatement.restratagem,
      }
    ],
  },
  90: {
    rpcs: ["https://s0.garizon.net/rpc"],
  },
  91: {
    rpcs: ["https://s1.garizon.net/rpc"],
  },
  92: {
    rpcs: ["https://s2.garizon.net/rpc"],
  },
  93: {
    rpcs: ["https://s3.garizon.net/rpc"],
  },
  96: {
    rpcs: ["https://rpc.nextsmartchain.com"],
  },
  99: {
    rpcs: ["https://core.poanetwork.dev"],
  },
  101: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  111: {
    rpcs: ["https://rpc.etherlite.org"],
  },
  123: {
    rpcs: ["https://rpc.fusespark.io"],
  },
  124: {
    rpcs: [],
    rpcWorking: false,
  },
  126: {
    rpcs: ["https://rpc.mainnet.oychain.io", "https://rpc.oychain.io"],
  },
  127: {
    rpcs: [],
    rpcWorking: false,
  },
  142: {
    rpcs: ["https://rpc.prodax.io"],
  },
  163: {
    rpcs: ["https://node.mainnet.lightstreams.io"],
  },
  186: {
    rpcs: ["https://rpc.seelen.pro/"],
  },
  188: {
    rpcs: ["https://mainnet.bmcchain.com/"],
  },
  199: {
    rpcs: ["https://rpc.bittorrentchain.io/"],
  },
  200: {
    rpcs: ["https://arbitrum.xdaichain.com"],
  },
  70: {
    rpcs: ["https://http-mainnet.hoosmartchain.com"],
  },
  211: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  222: {
    rpcs: ["https://blockchain-api-mainnet.permission.io/rpc"],
  },
  258: {
    rpcs: [],
    rpcWorking: false,
  },
  262: {
    rpcs: ["https://sur.nilin.org"],
  },
  333: {
    rpcs: [],
    rpcWorking: false,
  },
  369: {
    rpcs: [],
    rpcWorking: false,
  },
  385: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  416: {
    rpcs: ["https://rpc.sx.technology"],
  },
  499: {
    rpcs: [],
    rpcWorking: false,
    website: "https://rupayacoin.org/",
  },
  512: {
    rpcs: ["https://rpc.acuteangle.com"],
  },
  555: {
    rpcs: ["https://rpc.velaverse.io"],
  },
  558: {
    rpcs: ["https://rpc.tao.network"],
  },
  686: {
    rpcs: [
      "https://eth-rpc-karura.aca-api.network",
      "https://rpc.evm.karura.network",
      {
        url: "https://karura.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      }
    ],
  },
  707: {
    rpcs: [],
    rpcWorking: false,
  },
  777: {
    rpcs: ["https://node.cheapeth.org/rpc"],
  },
  787: {
    rpcs: [
      "https://eth-rpc-acala.aca-api.network",
      "https://rpc.evm.acala.network",
      {
        url: "https://acala-polkadot.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
    ],
  },
  803: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  880: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  977: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  998: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  1001: {
    rpcs: [
      "https://public-node-api.klaytnapi.com/v1/baobab",
      "https://baobab.fautor.app/archive",
      {
        url: "https://klaytn-baobab.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  1010: {
    rpcs: ["https://meta.evrice.com"],
  },
  1012: {
    rpcs: ["https://global.rpc.mainnet.newtonproject.org"],
  },
  1022: {
    rpcs: [],
    websiteDead: "Possible rebrand to Clover CLV",
    rpcWorking: false,
  },
  1024: {
    rpcs: ["https://api-para.clover.finance"],
  },
  1030: {
    rpcs: [
      "https://evm.confluxrpc.com",
      "https://conflux-espace-public.unifra.io",
    ],
  },
  1115: {
    rpcs: ["https://rpc.test.btcs.network"],
  },
  1116: {
    rpcs: [
      "https://rpc.coredao.org",
      "https://core.public.infstones.com",
    ],
  },
  1139: {
    rpcs: ["https://mathchain.maiziqianbao.net/rpc"],
  },
  1197: {
    rpcs: [],
    rpcWorking: false,
  },
  1202: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  1213: {
    rpcs: ["https://dataseed.popcateum.org"],
  },
  1214: {
    rpcs: [],
    rpcWorking: false,
  },
  1280: {
    rpcs: ["https://nodes.halo.land"],
  },
  1287: {
    rpcs: [
      "https://rpc.testnet.moonbeam.network",
      {
        url: "https://moonbase.unitedbloc.com:1000",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "wss://moonbase.unitedbloc.com:1001",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "https://moonbase-alpha.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://moonbeam-alpha.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
      {
        url: "wss://moonbeam-alpha.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality
      },
    ],
  },
  1288: {
    rpcs: [],
    rpcWorking: false,
  },
  1618: {
    rpcs: ["https://send.catechain.com"],
  },
  1620: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  1657: {
    rpcs: ["https://dataseed1.btachain.com/"],
  },
  1856: {
    rpcs: ["rpcWorking:false"],
    rpcWorking: false,
  },
  1987: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  2000: {
    rpcs: [
      "https://rpc.dogechain.dog",
      "https://rpc-us.dogechain.dog",
      "https://rpc-sg.dogechain.dog",
      "https://rpc.dogechain.dog",
      "https://rpc01-sg.dogechain.dog",
      "https://rpc02-sg.dogechain.dog",
      "https://rpc03-sg.dogechain.dog",
      {
        url: "https://dogechain.ankr.com",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://dogechain-sj.ankr.com",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  2021: {
    rpcs: [
      "https://mainnet2.edgewa.re/evm", 
      "https://mainnet3.edgewa.re/evm", 
      "https://edgeware-evm.jelliedowl.net/",
      {
        url: "https://edgeware.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  2025: {
    rpcs: ["https://mainnet.rangersprotocol.com/api/jsonrpc"],
  },
  2077: {
    rpcs: ["http://rpc.qkacoin.org:8548"],
  },
  2100: {
    rpcs: ["https://api.ecoball.org/ecoball/"],
  },
  2213: {
    rpcs: ["https://seed4.evanesco.org:8546"],
  },
  2222: {
    rpcs: ["https://evm.kava.io"],
  },
  2559: {
    rpcs: [],
    rpcWorking: false,
  },
  2612: {
    rpcs: ["https://api.ezchain.com/ext/bc/C/rpc"],
  },
  3690: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  5197: {
    rpcs: ["https://mainnet.eraswap.network"],
  },
  5315: {
    rpcs: [],
    rpcWorking: false,
  },
  5729: {
    rpcs: ["https://rpc-testnet.hika.network"],
  },
  5869: {
    rpcs: ["https://proxy.wegochain.io"],
  },
  6626: {
    rpcs: ["https://http-mainnet.chain.pixie.xyz"],
  },
  7341: {
    rpcs: ["https://rpc.shyft.network/"],
  },
  8000: {
    rpcs: ["https://dataseed.testnet.teleport.network"],
  },
  8995: {
    rpcs: ["https://core.bloxberg.org"],
  },
  9001: {
    rpcs: [
      "https://eth.bd.evmos.org:8545/",
      "https://evmos-mainnet.gateway.pokt.network/v1/lb/627586ddea1b320039c95205",
      "https://evmos-json-rpc.stakely.io",
      "https://jsonrpc-evmos-ia.cosmosia.notional.ventures",
      "https://json-rpc.evmos.blockhunters.org",
      "https://evmos-json-rpc.agoranodes.com",
      {
        url: "https://evmos-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://evmos-evm.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      "https://jsonrpc-evmos.goldenratiostaking.net",
      {
        url: "https://evmos.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  836542336838601: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  9100: {
    rpcs: ["rpcWorking:false"],
  },
  10101: {
    rpcs: ["https://eu.mainnet.xixoio.com"],
  },
  11111: {
    rpcs: ["https://api.trywagmi.xyz/rpc"],
  },
  12052: {
    rpcs: ["https://zerorpc.singularity.gold"],
  },
  13381: {
    rpcs: ["https://rpc.phoenixplorer.com/"],
  },
  16000: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  19845: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  21816: {
    rpcs: ["https://seed.omlira.com"],
  },
  24484: {
    rpcs: [],
    rpcWorking: false,
  },
  24734: {
    rpcs: ["https://node1.mintme.com"],
  },
  31102: {
    rpcs: ["rpcWorking:false"],
  },
  32520: {
    rpcs: [
      "https://rpc.icecreamswap.com",
      "https://nodes.vefinetwork.org/bitgert",
      "https://flux-rpc.brisescan.com",
      "https://flux-rpc1.brisescan.com",
      "https://flux-rpc2.brisescan.com",
      "https://rpc-1.chainrpc.com",
      "https://rpc-2.chainrpc.com",
      "https://node1.serverrpc.com",
      "https://node2.serverrpc.com"
    ],
  },
  39797: {
    rpcs: [
      "https://nodeapi.energi.network",
      "https://explorer.energi.network/api/eth-rpc",
    ],
  },
  39815: {
    rpcs: [
      "https://mainnet.oho.ai",
      "https://mainnet-rpc.ohoscan.com",
      "https://mainnet-rpc2.ohoscan.com",
    ],
  },
  42069: {
    rpcs: ["rpcWorking:false"],
  },
  43110: {
    rpcs: ["rpcWorking:false"],
  },
  45000: {
    rpcs: ["https://rpc.autobahn.network"],
  },
  47805: {
    rpcs: ["https://rpc.rei.network"],
  },
  55555: {
    rpcs: ["https://rei-rpc.moonrhythm.io"],
  },
  63000: {
    rpcs: ["https://rpc.ecredits.com"],
  },
  70000: {
    rpcs: [],
    rpcWorking: false,
  },
  70001: {
    rpcs: ["https://proxy1.thinkiumrpc.net/"],
  },
  70002: {
    rpcs: ["https://proxy2.thinkiumrpc.net/"],
  },
  70103: {
    rpcs: ["https://proxy103.thinkiumrpc.net/"],
  },
  84531: {
    rpcs: [
      {
        url: "https://base-goerli.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  99999: {
    rpcs: ["https://rpc.uschain.network"],
  },
  100000: {
    rpcs: [],
    rpcWorking: false,
  },
  100001: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39000"],
  },
  100002: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39001"],
  },
  100003: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39002"],
  },
  100004: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39003"],
  },
  100005: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39004"],
  },
  100006: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39005"],
  },
  100007: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39006"],
  },
  100008: {
    rpcs: ["http://eth-jrpc.mainnet.quarkchain.io:39007"],
  },
  108801: {
    rpcs: ["rpcWorking:false"],
  },
  110000: {
    rpcs: ["rpcWorking:false"],
  },
  110001: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39900"],
  },
  110002: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39901"],
  },
  110003: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39902"],
  },
  110004: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39903"],
  },
  110005: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39904"],
  },
  110006: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39905"],
  },
  110007: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39906"],
  },
  110008: {
    rpcs: ["http://eth-jrpc.devnet.quarkchain.io:39907"],
  },
  200625: {
    rpcs: ["https://boot2.akroma.org/"],
  },
  201018: {
    rpcs: ["https://openapi.alaya.network/rpc"],
  },
  210425: {
    rpcs: [],
    rpcWorking: false,
  },
  246529: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  281121: {
    rpcs: ["rpcWorking:false"],
  },
  534353:{
    rpcs:[
      {
        url: "https://scroll-alphanet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url:"https://scroll-alpha-public.unifra.io",
        tracking:"limited",
        trackingDetails: privacyStatement.unifra,
      },
      {
        url: "https://scroll-testnet.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      }
    ]
  },
  534354:{
    rpcs:[
    ]
  },
  888888: {
    rpcs: ["https://infragrid.v.network/ethereum/compatible"],
  },
  955305: {
    rpcs: ["https://host-76-74-28-226.contentfabric.io/eth/"],
  },
  1313114: {
    rpcs: ["https://rpc.ethoprotocol.com"],
  },
  1313500: {
    rpcs: ["https://rpc.xerom.org"],
  },
  11155111: {
    rpcs: [
      {
        url: "https://eth-sepolia.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy
      },
      {
        url: "https://endpoints.omniatech.io/v1/eth/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://eth-sepolia.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://eth-sepolia-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra
      },
    ]
  },
  7762959: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  13371337: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  18289463: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  20181205: {
    rpcs: ["https://hz.rpc.qkiscan.cn"],
  },
  28945486: {
    rpcs: [],
    rpcWorking: false,
  },
  35855456: {
    rpcs: ["https://node.joys.digital"],
  },
  61717561: {
    rpcs: ["https://c.onical.org"],
  },
  192837465: {
    rpcs: ["https://mainnet.gather.network"],
  },
  245022926: {
    rpcs: ["https://proxy.devnet.neonlabs.org/solana"],
  },
  245022934: {
    rpcs: ["https://neon-proxy-mainnet.solana.p2p.org", "rpcWorking:false"],
  },
  311752642: {
    rpcs: ["https://mainnet-rpc.oneledger.network"],
  },
  356256156: {
    rpcs: ["https://testnet.gather.network"],
  },
  486217935: {
    rpcs: ["https://devnet.gather.network"],
  },
  1122334455: {
    rpcs: [],
    rpcWorking: false,
  },
  11297108099: {
    rpcs: [
      {
        url: "https://palm-testnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },
  1313161556: {
    rpcs: [],
    websiteDead: true,
    rpcWorking: false,
  },
  53935: {
    rpcs: [
      "https://avax-dfk.gateway.pokt.network/v1/lb/6244818c00b9f0003ad1b619/ext/bc/q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi/rpc",
      {
        url: "https://dfkchain.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  1666600001: {
    rpcs: ["https://s1.api.harmony.one"],
  },
  1666600002: {
    rpcs: ["https://s2.api.harmony.one"],
  },
  1666600003: {
    rpcs: [],
    rpcWorking: false,
  },
  2021121117: {
    rpcs: [],
    rpcWorking: false,
    websiteDead: true,
  },
  3125659152: {
    rpcs: [],
    rpcWorking: false,
  },
  197710212030: {
    rpcs: ["https://rpc.ntity.io"],
  },
  6022140761023: {
    rpcs: ["https://molereum.jdubedition.com"],
    websiteDead: true,
  },
  79: {
    rpcs: [
      "https://dataserver-us-1.zenithchain.co/",
      "https://dataserver-asia-3.zenithchain.co/",
      "https://dataserver-asia-4.zenithchain.co/",
      "https://dataserver-asia-2.zenithchain.co/",
    ],
  },
  1506: {
    rpcs: ["https://mainnet.sherpax.io/rpc"],
  },
  512512: {
    rpcs: ["https://galaxy.block.caduceus.foundation"],
  },
  256256: {
    rpcs: ["https://mainnet.block.caduceus.foundation"],
  },
  167: {
    rpcs: [
      "https://node.atoshi.io",
      "https://node2.atoshi.io",
      "https://node3.atoshi.io",
    ],
  },
  7777: {
    rpcs: [
      "https://testnet1.rotw.games",
      "https://testnet2.rotw.games",
      "https://testnet3.rotw.games",
      "https://testnet4.rotw.games",
      "https://testnet5.rotw.games",
    ],
  },
  103090: {
    rpcs: ["https://evm.cryptocurrencydevs.org", "https://rpc.crystaleum.org"],
  },
  420420: {
    rpcs: [
      "https://mainnet.kekchain.com",
      "https://rpc2.kekchain.com",
      "https://kek.interchained.org",
      "https://kekchain.interchained.org",
    ],
  },
  420666: {
    rpcs: ["https://testnet.kekchain.com"],
  },
  1515: {
    rpcs: ["https://beagle.chat/eth"],
  },
  10067275: {
    rpcs: ["https://testnet.plian.io/child_test"],
  },
  16658437: {
    rpcs: ["https://testnet.plian.io/testnet"],
  },
  2099156: {
    rpcs: ["https://mainnet.plian.io/pchain"],
  },
  8007736: {
    rpcs: ["https://mainnet.plian.io/child_0"],
  },
  970: {
    rpcs: ["https://rpc.mainnet.computecoin.com"],
  },
  971: {
    rpcs: ["https://beta-rpc.mainnet.computecoin.com"],
  },
  10086: {
    rpcs: [],
    rpcWorking: false,
    websiteDead: true,
  },
  5177: {
    rpcs: [],
    rpcWorking: false,
    websiteDead: true,
  },
  10248: {
    rpcs: [],
    rpcWorking: false,
    websiteDead: true,
  },
  18159: {
    rpcs: [
      "https://mainnet-rpc.memescan.io/",
      "https://mainnet-rpc2.memescan.io/",
      "https://mainnet-rpc3.memescan.io/",
      "https://mainnet-rpc4.memescan.io/",
    ],
  },
  311: {
    rpcs: ['https://mainapi.omaxray.com/'],
  },
  314: {
    rpcs: [
      "https://api.node.glif.io",
      {
        url: "https://rpc.ankr.com/filecoin",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://filecoin.chainup.net/rpc/v1",
        tracking: "limited",
        trackingDetails: privacyStatement.ChainUpCloud,
      },
      {
        url: "https://infura.sftproject.io/filecoin/rpc/v1",
        tracking: "yes",
        trackingDetails: privacyStatement.SFTProtocol,
      },
     "https://api.chain.love/rpc/v1",
    ],
  },
  314159: {
    rpcs: [
      {
        url: "https://filecoin-calibration.chainup.net/rpc/v1",
        tracking: "limited",
        trackingDetails: privacyStatement.ChainUpCloud,
      }
    ],
  },
  3141: {
    rpcs: [
      {
        url: "https://filecoin-hyperspace.chainup.net/rpc/v1",
        tracking: "limited",
        trackingDetails: privacyStatement.ChainUpCloud,
      }
    ],
  },
  13000: {
    rpcs: ["https://rpc.ssquad.games"],
  },
  14000: {
    rpcs: [],
    rpcWorking: false,
    websiteDead: true,
  },
  22776: {
    rpcs: [],
    rpcWorking: false,
    websiteDead: true,
  },
  50001: {
    rpcs: [
      "https://rpc.oracle.liveplex.io",
      {
        url: "https://rpc.oracle.liveplex.io",
        tracking: "yes",
        trackingDetails: privacyStatement.LiveplexOracleEVM,
      },
    ],
  },
  119: {
    rpcs: [
      "https://evmapi.nuls.io",
      "https://evmapi2.nuls.io",
    ],
  },
  15551: {
    rpcs: [
      {
        url: "https://api.mainnetloop.com",
        tracking: "limited",
        trackingDetails: privacyStatement.getloop
      }
    ],
  },
  88888888: {
    rpcs: [
      {
        url: "https://rpc.teamblockchain.team",
        tracking: "none",
        trackingDetails: privacyStatement.teamblockchain,
      }
    ],
  },
  1071: {
    rpcs: [
      {
        url: "https://json-rpc.evm.testnet.shimmer.network/",
        tracking: "none",
        trackingDetails: privacyStatement.iota,
      }
    ],
  },
  1101: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/polygon_zkevm",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.polygon-zkevm.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
    ],
  },
  431140: {
    rpcs: [
      {
        url: "https://rpc.markr.io/ext/",
        tracking: "none",
        trackingDetails: privacyStatement.markrgo,
      }
    ],
  },
  248: {
    rpcs: [
      {
        url: "https://oasys-rpc.gateway.pokt.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://oasys.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      }
    ],
  },
    3501: {
    rpcs: [
      "https://rpc.jfinchain.com",
      {
        url: "https://rpc.jfinchain.com",
        tracking: "limited",
        trackingDetails: privacyStatement.jfc,
      },
    ],
  },
  35011: {
    rpcs: [
      "https://rpc.j2o.io",
      {
        url: "https://rpc.j2o.io",
        tracking: "limited",
        trackingDetails: privacyStatement.j2o,
      },
    ],
  }
};

const allExtraRpcs = mergeDeep(llamaNodesRpcs, extraRpcs);

export default allExtraRpcs;
