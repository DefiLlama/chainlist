import { mergeDeep } from "../utils/fetch.js";

import { llamaNodesRpcs } from "./llamaNodesRpcs.js";

const privacyStatement = {
blockswap: "Blockswap RPC does not track any kind of user information at the builder RPC level (i.e. IP, location, etc.) nor is any information logged. All blocks are encrypted when passed between proposers, builders, relayers, and Ethereum. It does not transmit any transactions to the relayer. We use analytical cookies to see which content on the Site is highly frequented and also to analyze if content should be updated or improved. These cookies process and save data like your browser type, referrer URLs, operating system, date/time stamp, views and clicks on the Site, and your (truncated) IP address. For more information please visit: https://docs.pon.network/pon/privacy",
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
    "With the exception of data that will be public on chain, all the other metadata / data should remain private to users and other parties should not be able to access or collect it. 1RPC uses many different techniques to prevent the unnecessary collection of user privacy, which prevents tracking from RPC providers. https://docs.1rpc.io/technology/zero-tracking",
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
  diamondswap:
    "We record limited metadata from requests. This data is stored for a maximum of 90 days and is solely used for debugging, identifying suspicious activity, and generating analytics.",
  unifra:
    "Regarding the RPC(remote procedure call) data, we do not collect request data or request origin. We temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days. Only the amounts of RPC requests of users are recorded for accounting and billing purposes within longer time. https://unifra.io/",
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
    "Please be aware that we collect your following information for the purpose of satisfying your needs in ICPlaza services(...) 1.We will collect your mobile device information, operation records, transaction records, wallet address and other personal information. https://www.icplaza.pro/privacy-policy",
  tenderly:
    "Additionally, if you are an Account Member, we may collect business and transactional data about you (and your business) that accumulates over the normal course of operation regarding providing our Services. This may include transaction records, stored files, user profiles, information about collaborators, analytics data, and other metrics, as well as other types of information created or generated by your interaction with our Services. https://tenderly.co/privacy-policy",
  soma:
    "At SomaNetwork Mainnet Or Testnet, we are committed to protecting your privacy and ensuring the security of your data. This privacy policy summary outlines how we handle and protect your personal information when using our SomaNetwork Mainnet and Testnet services. Please note that this is a summary, and the full privacy policy should be reviewed for complete details soma. 1.We will collect your mobile device information, operation records, transaction records, wallet address and other personal information. https://soma-network.gitbook.io/soma-network/privacy-policy",
  chain49:
    "We collect device information and request metadata like IP address and User Agent for the purpose of load balancing and rate limiting. More info: https://chain49.com/privacy-policy",
  meowrpc:
    "With the exclusion of data that will be openly visible and available on the blockchain, MEOWRPC does not track or store any kind of user information (such as location, IP address, etc.) that passes through our RPC. For further details regarding our privacy practices, we encourage you to refer to our Privacy Policy. https://privacy.meowrpc.com",
  drpc:
    "Specific types of technical data that we may temporarily log include:IP address (only in logs for redirecting requests to the nearest RPC nodes and rate limiting at the free level, which are cleared weekly). The user ID is hidden in the temporary logs, so it is not possible to link them to a specific user.https://drpc.org/privacy-policy",
  las:
    "The Living Assets network does not store any personal data provided by its users. The network solely communicates on-chain signatures generated by web3 compatible wallets. However, it is possible that clients utilizing the network may necessitate supplementary information from their users to fulfill Know Your Customer obligations. In such cases, explicit consent from the users is mandatory, following standard procedures.",
  dwellir:
    "Except for the data that is publicly accessible on the blockchain, Dwellir does not collect or keep any user information (like location, IP address, etc.) transmitted via our RPC. For more information about our privacy methods, we suggest checking out our Privacy Policy at https://www.dwellir.com/privacy-policy",
  ard:
    " (ARD) Ardenium Athena, we prioritize the protection of your privacy and the security of your data. This privacy policy summary provides an overview of how we handle and safeguard your personal information when you use our Ardenium Athena Explorer Blockchain services. However, please note that this is only a summary, and for complete details, we encourage you to review the full privacy policy available at soma, Information Collection: When you use our services, we may collect personal information, such as mobile device details, operation records, transaction records, wallet addresses, and other relevant data. For a more comprehensive understanding, please refer to our full privacy policy at https://docs.ardenium.wiki/ardenium-network/disclaimer.",
  zan:
    "ZAN Node Service generally does not store any kind of user information (e.g. IP address, location, requst location, request data, etc.) that transits through our RPCs except for one senario ——we may track your IP address when you are using our RPCs and will delete it immediately when you stoping using our RPCs. To learn more, please review our privacy policy at https://a.zan.top/static/Privacy-Policy.pdf",
  quicknode:
    "Information about your computer hardware and software may be automatically collected by QuickNode. This information can include such details as your IP address, browser type, domain names, access times and referring website addresses.https://www.quicknode.com/privacy",
  chainstack:
    "We process certain personal data to provide you with the core functionality of our Services. Specifically, when you are: Using the Chainstack Console, we process your name, surname, email address (your account identifier), organization name, IP address, all HTTP headers (most importantly User-Agent), cookies; Using the Chainstack Blockchain infrastructure, we process nodes' token stored in Chainstack Vault, IP address and HTTP headers, request body, API token in Chainstack Vault.https://chainstack.com/privacy/",
  shardeum:
    "Shardeum follows a standard procedure of using log files. These files log visitors when they visit websites... The information collected by log files includes IP addresses, browser type, ISP, date and time stamp, referring/exit pages, and potentially the number of clicks.https://shardeum.org/privacy-policy/",
  softnote:
    "CrispMind collects personal information and uses cookies for site operation, analysis, and enhancement, with no control over third-party cookies.https://softnote.com/privacy/",
  lava:
    "We, our service providers, and our business partners may automatically log information about you, your computer or mobile device, and your interaction over time with the Service..., such as: Device data, ...your computer or mobile device's operating system type and version, manufacturer and model, browser type, screen resolution, RAM and disk size, CPU usage, device type (e.g., phone, tablet), IP address, unique identifiers (including identifiers used for advertising purposes), language settings, mobile device carrier, radio/network information (e.g., Wi-Fi, LTE, 3G), and general location information such as city, state or geographic area. https://www.lavanet.xyz/privacy-policy",
  merkle:
    "merkle does not track or store user information that transits through our RPCs (location, IP, wallet, etc).",
  liquify:
    "What data do we collect? Information collected automatically from your device, including IP address, device type,operating system, browser-type, broad geographic location and other technical information.https://www.liquify.io/privacy_policy.pdf",
  autostake:
    "When you browse our marketing pages, we’ll track that for statistical purposes (like conversion rates and to test new designs). We also store any information you volunteer, like surveys, for as long as it makes sense.https://autostake.com/privacy-policy",
  allthatnode:
    `In addition to the Personal Information, the Billing Information, and the Geolocational Information..., we automatically collect certain information when you use the Platform or Website: IP addresses, browser type and language...; information about a mobile device, including universally unique ID (“UUID”), platform type and version (e.g., iOS or Android), carrier and country location, hardware and processor information, and network type; and activity and usage information occurring via the Platform or Website.https://www.allthatnode.com/privacypolicy.dsrv`,
  lokibuilder:
    "Private transactions. No tracking of any kind (no IPs, location, wallet etc.): https://lokibuilder.xyz/privacy",
  cyphercore:
    "We collect information about you in various ways when you use our website. This includes information you provide directly to us, information we collect automatically, and information we obtain from third-party sources.https://cyphercore.io/privacy-policy/",
  projectpi:
    "When you use Project Pi as an RPC provider we will not store your IP address or any data for more than 24 hours. IP addresses are not connected or correlated to wallet addresses",
  hybrid:
  "HybridChain may automatically collect information regarding your computer hardware and software. This data can encompass details like your IP address, browser type, domain names, access times, and referring website addresses. This collection is in line with HybridChain's privacy policy and aims to optimize service provision and enhance user experience.https://docs.hybridchain.ai/privacy-policy",
  rivet:
    "We collect End Users’ information when they use our Customers’ web3-enabled websites, web applications, and APIs. This information may include but is not limited to IP addresses, system configuration information, and other information about traffic to and from Customers’ websites (collectively, “Log Data”). We collect and use Log Data to operate, maintain, and improve our Services in performance of our obligations under our Customer agreements.https://rivet.cloud/privacy-policy",
  tokenview:
    "Information about your computer hardware and software may be automatically collected by Tokenview. This information can include such details as your IP address, browser type, domain names, access times, etc.https://services.tokenview.io/en/protocol",
  thirdweb:
    "Server logs automatically record information and details about your online interactions with us. For example, server logs may record information about your visit to our Site on a particular time and day and collect information such as your device ID and IP address.https://thirdweb.com/privacy",
  itrocket:
    "We do not track, store or process any personal data. You can check our privacy policy here: https://itrocket.net/privacy-policy/",
  nodeconnect:
    "We may collect information about how you interact with our Service. This may include information about your operating system, IP address, and browser type : https://nodeconnect.org/privacy.txt",
  decubate:
    "With the exception of data that will be public on chain, all the other metadata should remain private to users and other parties should not be able to access or collect it. Decubate doesn't store any data related to the user using the RPC. https://docs.decubate.com/rpc-privacy/",
  polysplit:
    "When you use our Service, we does not track the IP address or other user info.https://polysplit.cloud/privacy",
  nocturnDao:
    "As a fundamental practice, we do not collect, store, or process any personal information from our users. This non-collection policy ensures absolute data security and privacy for our users.https://nocturnode.tech/privacy",
  stateless:
    "Through any of our RPC API endpoints, whether public or private, we do not collect personal identifiers such as IP addresses, request origins, or specific request data. https://www.stateless.solutions/api-usage-privacy-policy",
  rpcgrid:
    "Only strictly functional data is automatically collected by the RPC. None of this data is directly exported or used for commercial purposes. https://rpcgrid.com/privacy-policy",
  tornadoRPC:
    "TornadoRPC prioritizes user privacy and data security. We do not track or store any user information that passes through our RPC, except for data that is clearly visible on the blockchain. For detailed information about our privacy practices, see our Privacy Policy: https://rpc.tornadoeth.cash/privacy",
  q:
    "Our system records data and information about the computer used by the user automatically and with every visit on our website. The following data are collected: Information regarding the type and version of internet browser used to access the website, Operating system, IP address, Date and time of each access, Web page from which the user was redirected to our page, Web pages and resources that were visited, The data mentioned above are saved for a maximum time period of 30 days.https://q.org/privacy-policy"
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
        url: "https://go.getblock.io/d7dab8149ec04390aaa923ff2768f914",
        tracking: "none",
        trackingDetails: privacyStatement.getblock,
      },
      {
        url:
          "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
        tracking: "yes",
        trackingDetails: privacyStatement.nodereal,
      },
      {
        url: "https://ethereum-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://ethereum-rpc.publicnode.com",
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
          "https://openapi.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet",
        tracking: "yes",
        trackingDetails: privacyStatement.bitstack,
      },
      {
        url: "https://eth-pokt.nodies.app",
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
      //"http://127.0.0.1:8545",
      //"https://yolo-intensive-paper.discover.quiknode.pro/45cad3065a05ccb632980a7ee67dd4cbb470ffbd/",
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
      {
        url: "https://rpc.chain49.com/ethereum?api_key=14d1a8b86d8a4b4797938332394203dc",
        tracking: "yes",
        trackingDetails: privacyStatement.chain49
      },
      {
        url: "https://eth.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
        url: "https://eth.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://mainnet.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
       {
        url: "https://rpc.tenderly.co/fork/c63af728-a183-4cfb-b24e-a92801463484",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/mainnet",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
      	url: "https://api.zan.top/node/v1/eth/mainnet/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
      	url: "https://eth-mainnet.diamondswap.org/rpc",
      	tracking: "limited",
      	trackingDetails: privacyStatement.diamondswap,
      },
      "https://rpc.notadegen.com/eth",
      {
        url: "https://eth.merkle.io",
        tracking: "none",
        trackingDetails: privacyStatement.merkle,
      },
      {
        url: "https://rpc.lokibuilder.xyz/wallet",
        tracking: "none",
        trackingDetails: privacyStatement.lokibuilder,
      },
      {
        url: "https://services.tokenview.io/vipapi/nodeservice/eth?apikey=qVHq2o6jpaakcw3lRstl",
        tracking: "yes",
        trackingDetails: privacyStatement.tokenview,
      },
      {
        url: "https://eth.nodeconnect.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.nodeconnect,
      },
      {
        url: "https://api.stateless.solutions/ethereum/v1/0ec6cac0-ecac-4247-8a41-1e685deadfe4",
        tracking: "none",
        trackingDetails: privacyStatement.stateless,
      },
      {
        url: "https://rpc.polysplit.cloud/v1/chain/1",
        tracking: "none",
        trackingDetails: privacyStatement.polysplit,
      },
      {
        url: "https://rpc.tornadoeth.cash/eth",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
      },
      {
        url: "https://rpc.tornadoeth.cash/mev",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
      },
      {
        url: "https://eth1.lava.build/lava-referer-ed07f753-8c19-4309-b632-5a4a421aa589/",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
	{
        url: "https://eth1.lava.build/lava-referer-16223de7-12c0-49f3-8d87-e5f1e6a0eb3b/",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
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
      {
        url: "https://polygon-mumbai-bor-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://polygon-mumbai-bor-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://polygon-mumbai-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://polygon-mumbai.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/polygon-mumbai",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
      	url: "https://api.zan.top/node/v1/polygon/mumbai/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
      	url: "https://polygon-mumbai.api.onfinality.io/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.onfinality,
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
      {
        url: "https://ethereum-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://ethereum-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://goerli.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/goerli",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
      	url: "https://api.zan.top/node/v1/eth/goerli/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://builder-rpc1.0xblockswap.com",
        tracking: "yes",
        trackingDetails: privacyStatement.blockswap
      },
      {
        url: "https://builder-rpc2.0xblockswap.com",
        tracking: "yes",
        trackingDetails: privacyStatement.blockswap
      },
      {
        url: "https://rpc.tornadoeth.cash/goerli",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
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
  195: {
      rpcs: [
	  {
        url: "https://x1-testnet.blockpi.network/v1/rpc/public ",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi
      },
    ]
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
      {
        url: "https://fantom-testnet-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://fantom-testnet-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://fantom.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
      {
        url: "https://avalanche-fuji-c-chain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://avalanche-fuji-c-chain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://avalanche-fuji.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
      	url: "https://api.zan.top/node/v1/avax/fuji/public/ext/bc/C/rpc",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
    ],
  },
  56: {
    rpcs: [
      "https://bsc-dataseed.bnbchain.org/",
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
      "https://bsc-dataseed2.defibit.io/",
      "https://bsc-dataseed3.defibit.io/",
      "https://bsc-dataseed4.defibit.io/",
      "https://bsc-dataseed2.ninicoin.io/",
      "https://bsc-dataseed3.ninicoin.io/",
      "https://bsc-dataseed4.ninicoin.io/",
      "https://bsc-dataseed1.bnbchain.org/",
      "https://bsc-dataseed2.bnbchain.org/",
      "https://bsc-dataseed3.bnbchain.org/",
      "https://bsc-dataseed4.bnbchain.org/",
      "https://bsc-dataseed6.dict.life/",
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
        url: "https://bsc-pokt.nodies.app",
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
	{
        url: "https://getblock.io/nodes/bsc/",
        tracking: "limited",
        trackingDetails: privacyStatement.getblock,
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
        url: "https://bsc-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://bsc-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://bsc-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://bsc.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
      	url: "https://api.zan.top/node/v1/bsc/mainnet/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://bsc.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://services.tokenview.io/vipapi/nodeservice/bsc?apikey=qVHq2o6jpaakcw3lRstl",
        tracking: "yes",
        trackingDetails: privacyStatement.tokenview,
      },
      {
        url: "https://rpc.polysplit.cloud/v1/chain/56",
        tracking: "none",
        trackingDetails: privacyStatement.polysplit,
      },
      {
        url: "https://rpc.tornadoeth.cash/bsc",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
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
      {
        url: "https://bsc-testnet-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://bsc-testnet-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
      	url: "https://api.zan.top/node/v1/bsc/testnet/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
      	url: "https://bsc-testnet.blockpi.network/v1/rpc/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  900000: {
    rpcs: ["https://api.posichain.org", "https://api.s0.posichain.org"],
  },
  43114: {
    rpcs: [
      "https://api.avax.network/ext/bc/C/rpc",
      //"https://avax.rpcgator.com/",
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
        url: "https://avalanche-c-chain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://avalanche-c-chain-rpc.publicnode.com",
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
        url: "https://avax-pokt.nodies.app/ext/bc/C/rpc",
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
      {
        url: "https://avax.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
      	url: "https://api.zan.top/node/v1/avax/mainnet/public/ext/bc/C/rpc",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://avalanche.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.tornadoeth.cash/avax",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
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
      {
        url: "https://fantom-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
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
        url: "https://fantom-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://fantom-rpc.publicnode.com",
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
      {
        url: "https://fantom.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
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
      {
        url: "https://rpc-mainnet.matic.quiknode.pro",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
      "https://matic-mainnet-full-rpc.bwarelabs.com",
      "https://matic-mainnet-archive-rpc.bwarelabs.com",
      {
        url: "https://polygon-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
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
        url: "https://polygon-bor-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://polygon-bor-rpc.publicnode.com",
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
      {
        url: "https://polygon.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://polygon.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/polygon",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
      	url: "https://api.zan.top/node/v1/polygon/mainnet/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://polygon.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
        url: "https://getblock.io/nodes/matic/",
        tracking: "none",
        trackingDetails: privacyStatement.getblock,
      },
      {
        url: "https://api.stateless.solutions/polygon/v1/5850f066-209e-4e3c-a294-0757a4eb34b3",
        tracking: "none",
        trackingDetails: privacyStatement.stateless,
      },
      {
        url: "https://rpc.tornadoeth.cash/polygon",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
      },
    ],
  },
  25: {
    rpcs: [
      "https://evm.cronos.org",
      "https://cronos-rpc.elk.finance/",
      {
        url: "https://cronos.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://cronos-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://cronos-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/cro",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
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
        url: "https://rpc1.icplaza.pro/",
        tracking: "yes",
        trackingDetails: privacyStatement.icplazaorg,
      },
    ],
  },
  42161: {
    rpcs: [
      "https://arb1.arbitrum.io/rpc",
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
        url: "https://arb-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
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
        url: "https://arb-mainnet-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra
      },
      {
        url: "https://rpc.arb1.arbitrum.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      {
        url: "https://arbitrum-one-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://arbitrum-one-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://arbitrum.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
      	url: "https://api.zan.top/node/v1/arb/one/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
      	url: "https://arbitrum.drpc.org",
      	tracking: "none",
      	trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.tornadoeth.cash/arbitrum",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
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
      {
        url: "https://rpc.goerli.arbitrum.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      {
        url: "https://arbitrum-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://arbitrum-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
      	url: "https://api.zan.top/node/v1/arb/goerli/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
      	url: "https://api.stateless.solutions/arbitrum-one/v1/77abba85-53e4-4430-a332-a46deb9900ea",
      	tracking: "none",
      	trackingDetails: privacyStatement.stateless,
      }
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
      {
        url: "https://arbitrum-nova.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://arbitrum-nova-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://arbitrum-nova-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://arbitrum-nova.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  421614: {
    rpcs: [
      {
        url: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public ",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  8217: {
    rpcs: [
      "https://public-en-cypress.klaytn.net",
      {
        url: "https://klaytn-mainnet-rpc.allthatnode.com:8551",
        tracking: "yes",
        trackingDetails: privacyStatement.allthatnode
      },
      {
        url: "https://rpc.ankr.com/klaytn ",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://klaytn.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://klaytn.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://1rpc.io/klay",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://klaytn-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://klaytn.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1666600000: {
    rpcs: [
      "https://api.harmony.one",
      "https://a.api.s0.t.hmny.io",
      "https://api.s0.t.hmny.io",
      {
        url: "https://rpc.ankr.com/harmony",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://harmony.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://1rpc.io/one",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://hmyone-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://endpoints.omniatech.io/v1/harmony/mainnet-0/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
168587773: {
    rpcs: [
      {
        url: "https://blast-sepolia.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  204: {
    rpcs: [
      {
        url: "https://opbnb-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://opbnb-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/opbnb",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
  },
  1666700000: {
    rpcs: [
      {
        url: "https://endpoints.omniatech.io/v1/harmony/testnet-0/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ]
  },
  1313161554: {
    rpcs: [
      "https://mainnet.aurora.dev",
      {
        url: "https://endpoints.omniatech.io/v1/aurora/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://1rpc.io/aurora",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://aurora.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
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
  5165: {
    rpcs: [
      {
        url: "https://bahamut-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://bahamut-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
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
      {
        url: "https://celo.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
        url: "https://op-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
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
      {
        url: "https://rpc.optimism.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      {
        url: "https://optimism-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://optimism-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://optimism.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
        url: "https://api.zan.top/node/v1/opt/mainnet/public",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://optimism.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://optimism.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/optimism",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://api.stateless.solutions/optimism/v1/f373feb1-c8e4-41c9-bb74-2c691988dd34",
        tracking: "none",
        trackingDetails: privacyStatement.stateless,
      },
      {
        url: "https://rpc.tornadoeth.cash/optimism",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
      },
    ],
  },
  11155420: {
    rpcs: [
      {
        url: "https://optimism-sepolia.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
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
      {
        url: "https://rpc.goerli.optimism.gateway.fm",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
      },
      {
        url: "https://optimism-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://optimism-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
      	url: "https://api.zan.top/node/v1/opt/goerli/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://optimism-goerli.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/optimism-goerli",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
    ],
  },
  1088: {
    rpcs: [
      "https://andromeda.metis.io/?owner=1088",
     {
        url: "https://metis-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://metis.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://metis-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  1246: {
    rpcs: ["https://rpc-cnx.omplatform.com"],
  },
  100: {
    rpcs: [
      "https://rpc.gnosischain.com",
      "https://xdai-archive.blockscout.com",
      {
        url: "https://gnosis-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
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
      {
        url: "https://gnosis.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://endpoints.omniatech.io/v1/gnosis/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://gnosis-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://gnosis-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/gnosis",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://rpc.tornadoeth.cash/gnosis",
        tracking: "none",
        trackingDetails: privacyStatement.tornadoRPC,
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
      {
        url: " https://endpoints.omniatech.io/v1/gnosis/chiado/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://gnosis-chiado-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://gnosis-chiado-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/gnosis",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
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
      {
        url: "https://moonriver-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "wss://moonriver-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "https://moonriver-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://moonriver-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
  },
  361: {
    rpcs: ["https://eth-rpc-api.thetatoken.org/rpc"],
  },
  42262: {
    rpcs: ["https://emerald.oasis.dev/",
      {
        url: "https://1rpc.io/oasis/emerald",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
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
      {
        url: "https://1rpc.io/telos/evm",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
  },
  32659: {
    rpcs: [
      "https://mainnet.fusionnetwork.io",
      "wss://mainnet.fusionnetwork.io",
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
      {
        url: "https://moonbeam-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "wss://moonbeam-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "https://endpoints.omniatech.io/v1/moonbeam/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://moonbeam-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://moonbeam-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
  },
  30: {
    rpcs: ["https://public-node.rsk.co"],
  },
  4689: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/iotex",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://babel-api.mainnet.iotex.io",
      "https://babel-api.mainnet.iotex.one",
      "https://babel-api.fastblocks.io",
      {
        url: "https://iotexrpc.com",
	tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://iotex-network.rpc.thirdweb.com",
	tracking: "yes",
	trackingDetails: privacyStatement.thirdweb,
      },
      {
        url: "https://iotex.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  66: {
    rpcs: [
      "https://exchainrpc.okex.org",
     {
        url: "https://oktc-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://okt-chain.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://1rpc.io/oktc",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],

  },
  288: {
    rpcs: [
      "https://mainnet.boba.network/",
      {
        url: "https://boba-ethereum.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/boba-ethereum",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://1rpc.io/boba/eth",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      }
    ],
  },
  321: {
    rpcs: [
      "https://rpc-mainnet.kcc.network",
      "https://kcc.mytokenpocket.vip",
      "https://kcc-rpc.com",
      {
        url: "https://services.tokenview.io/vipapi/nodeservice/kcs?apikey=qVHq2o6jpaakcw3lRstl",
        tracking: "yes",
        trackingDetails: privacyStatement.tokenview,
      },
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
      "https://rpc.fuse.io",
      {
        url: "https://fuse-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt
      },
      {
        url: "https://fuse-mainnet.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack
      },
      {
        url: "https://fuse.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://fuse.liquify.com",
        tracking: "yes",
        trackingDetails: privacyStatement.liquify,
      }
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
      {
        url: "https://shiden-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "wss://shiden-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "https://shiden.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
        url: "https://getblock.io/nodes/bsc/",
        tracking: "none",
        trackingDetails: privacyStatement.getblock,
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
      {
        url: "https://astar-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "wss://astar-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
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
      {
        url: "https://meter.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  5551: {
    rpcs: ["https://l2.nahmii.io/"],
  },
  88: {
    rpcs: ["https://rpc.tomochain.com",
      {
        url: "https://viction.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
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
      {
        url: "https://syscoin-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://syscoin-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
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
  17000: {
    rpcs: [
      {
        url: "https://ethereum-holesky-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://etherem-holesky-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/holesky",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://ethereum-holesky.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
	      url: "https://holesky-rpc.nocturnode.tech",
	      tracking: "none",
        trackingDetails: privacyStatement.nocturnDao,
      },
    ],
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
    rpcs: ["https://rpc.goodata.io"],
    rpcWorking: false,
  },
  35: {
    rpcs: ["https://rpc.tbwg.io"],
  },
  38: {
    rpcs: ["https://rpc.valorbit.com/v2"],
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
      "https://rpc1.xinfin.network",
      "https://erpc.xinfin.network",
      "https://rpc.xinfin.network",
      "https://erpc.xdcrpc.com",
      "https://rpc.xdc.org",
      {
        url: "https://rpc.ankr.com/xdc",
        tracking:"limited",
        trackingDetails: privacyStatement.ankr
      },
    ],
  },
  51: {
    rpcs: [
      "https://rpc.apothem.network",
      "https://erpc.apothem.network",
      "https://apothem.xdcrpc.com"
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
  //Kotti testnet deprecated
  6: {
    rpcs: [
      "https://www.ethercluster.com/kotti",
    ],
  },
  61: {
    rpcs: [
      "https://etc.mytokenpocket.vip",
      "https://rpc.etcinscribe.com",
      "https://etc.etcdesktop.com",
      {
        url: "https://besu-de.etc-network.info",
        tracking: "limited",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://geth-de.etc-network.info",
        tracking: "limited",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://besu-at.etc-network.info",
        tracking: "limited",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://geth-at.etc-network.info",
        tracking: "limited",
        trackingDetails: privacyStatement.etcnetworkinfo,
      },
      {
        url: "https://services.tokenview.io/vipapi/nodeservice/etc?apikey=qVHq2o6jpaakcw3lRstl",
        tracking: "yes",
        trackingDetails: privacyStatement.tokenview,
      },
      {
        url: "https://etc.rivet.link",
        tracking: "none",
        trackingDetails: privacyStatement.rivet
      },
    ],
  },
  //Morden testnet deprecated
  62: {
    rpcs: [
      "https://www.ethercluster.com/morden",
    ],
  },
  63: {
    rpcs: [
      "https://rpc.mordor.etccooperative.org",
      {
        url: "https://geth-mordor.etc-network.info",
        tracking: "limited",
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
    rpcs: ["https://rpc.bitkubchain.io","wss://wss.bitkubchain.io"],
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
  169: {
    rpcs: [
      "https://pacific-rpc.manta.network/http",
      {
        url: "https://1rpc.io/manta",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
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
    rpcs: [
      "https://rpc.pulsechain.com",
	    {
        url: "https://pulse-s.projectpi.xyz",
        tracking: "none",
        trackingDetails: privacyStatement.projectpi,
      },
      {
        url: "https://pulsechain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://pulsechain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      "https://rpc-pulsechain.g4mm4.io",
      "https://evex.cloud/pulserpc",
      "wss://evex.cloud/pulsews"
    ],
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
  595: {
    rpcs: [],
  },
  686: {
    rpcs: [
      "https://eth-rpc-karura.aca-staging.network",
      "https://rpc.evm.karura.network",
      {
        url: "https://karura.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
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
      "https://eth-rpc-acala.aca-staging.network",
      "https://rpc.evm.acala.network",
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
      "https://public-en-baobab.klaytn.net",
      {
        url:"https://klaytn-baobab-rpc.allthatnode.com:8551",
        tracking: "yes",
        trackingDetails: privacyStatement.allthatnode
      },
      {
        url: "https://rpc.ankr.com/klaytn_testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://klaytn-baobab.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://klaytn.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
      {
        url: "https://1rpc.io/core",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://rpc.ankr.com/core",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1130: {
    rpcs: [
      "https://dmc.mydefichain.com/mainnet",
      "https://dmc01.mydefichain.com/mainnet"
    ],
  },
  1131: {
    rpcs: [
      "https://dmc.mydefichain.com/testnet",
      "https://dmc01.mydefichain.com/testnet",
      "https://eth.testnet.ocean.jellyfishsdk.com/"
    ]
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
  300: {
    rpcs: [
      {
	url: "https://zksync-era-sepolia.blockpi.network/v1/rpc/public",
	tracking: "limited",
	trackingDetails: privacyStatement.blockpi,
      },
    ]
  },
  324: {
    rpcs: [
      {
        url: "https://zksync-era.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://zksync.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
        url: "https://zksync.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://1rpc.io/zksync2-era",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ]
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
  1440: {
    rpcs: [
      {
        url: "https://beta.mainnet.livingassets.io/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.las,
      },
      {
        url: "https://gamma.mainnet.livingassets.io/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.las,
      },
    ],
  },
  1442: {
    rpcs: [
        {
      	url: "https://api.zan.top/node/v1/polygonzkevm/testnet/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
	{
      	url: "https://polygon-zkevm-testnet.blockpi.network/v1/rpc/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.blockpi,
      },
    ],
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
  7001: {
    rpcs: [
      {
        url: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  7000: {
    rpcs: [
      {
        url: "https://zetachain-evm.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://zetachain-mainnet-archive.allthatnode.com:8545",
        tracking: "yes",
        trackingDetails: privacyStatement.allthatnode,
      },
      {
        url: "wss://zetachain-mainnet-archive.allthatnode.com:8546",
        tracking: "yes",
        trackingDetails: privacyStatement.allthatnode,
      },
      {
        url: "https://zeta.rpcgrid.com",
        tracking: "none",
        trackingDetails: privacyStatement.rpcgrid,
      },
      {
        url: "wss://zeta.rpcgrid.com",
        tracking: "none",
        trackingDetails: privacyStatement.rpcgrid,
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
    rpcs: [
      "https://evm.kava.io",
      {
        url: "https://kava.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://kava-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://kava-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "wss://kava-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://evm.kava.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack
      },
      {
        url: "wss://wevm.kava.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack
      },
      {
        url: "https://rpc.ankr.com/kava_evm",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://evm.kava-rpc.com",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      }
    ],
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
  5000: {
    rpcs: [
      {
        url: "https://mantle-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://mantle-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://mantle-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://mantle.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.ankr.com/mantle",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://1rpc.io/mantle",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      }
    ],
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
  6688: {
    rpcs: [
      {
        url: "https://iris-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://iris-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
  },
  7341: {
    rpcs: ["https://rpc.shyft.network/"],
  },
  7700: {
    rpcs: [
    "https://canto.gravitychain.io/",
    "https://canto.evm.chandrastation.com/",
    "https://jsonrpc.canto.nodestake.top/",
    "https://canto.dexvaults.com/",
    "wss://canto.gravitychain.io:8546",
    "wss://canto.dexvaults.com/ws",
    "https://canto-rpc.ansybl.io",
    ]
  },
  8000: {
    rpcs: ["https://dataseed.testnet.teleport.network"],
  },
  8995: {
    rpcs: ["https://core.bloxberg.org"],
  },
  9000: {
    rpcs: [
        "https://evmos-testnet-json.qubelabs.io",
        "https://evmos-tjson.antrixy.org",
	      "https://evmos-testnet-rpc.kingsuper.services",
        "https://rpc.evmos.test.theamsolutions.info",
        "https://api.evmos-test.theamsolutions.info",
        "https://rpc.evmos.testnet.node75.org",
	      "https://rpc-evm.testnet.evmos.dragonstake.io",
        "https://evmos-testnet-rpc.stake-town.com",
        "https://evmos-testnet-jsonrpc.stake-town.com",
        "https://api.evmos-test.theamsolutions.info",
        "https://jsonrpc-t.evmos.nodestake.top",
        "https://evmos-testnet-jsonrpc.autostake.com",
        "https://evmos-testnet-jsonrpc.alkadeta.com",
        "https://evm-rpc.evmost.silentvalidator.com",
	      "https://testnet-evm-rpc-evmos.hoodrun.io",
        "https://alphab.ai/rpc/eth/evmos_testnet",
        "https://t-evmos-jsonrpc.kalia.network",
	      "https://jsonrpc-evmos-testnet.mzonder.com",
	      "https://evmos-testnet.lava.build/lava-referer-16223de7-12c0-49f3-8d87-e5f1e6a0eb3b"
    ],
  },
  9001: {
    rpcs: [
      {
        url: "https://evmos.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
      {
        url: "https://evmos-mainnet-jsonrpc.autostake.com",
        tracking: "limited",
        trackingDetails: privacyStatement.autostake
      },
      {
        url: "https://evmos-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://evmos-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://evmos-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://evmos-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      "https://jsonrpc-evmos.goldenratiostaking.net",
      {
        url: "https://evmos.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url:"https://evmos-jsonrpc.cyphercore.io",
        tracking: "yes",
        trackingDetails: privacyStatement.cyphercore
      },
      "https://eth.bd.evmos.org:8545/",
      "https://evmos-json-rpc.stakely.io",
      "https://jsonrpc-evmos-ia.cosmosia.notional.ventures",
      "https://json-rpc.evmos.blockhunters.org",
      "https://evmos-json-rpc.agoranodes.com",
      "https://evmos-json.antrixy.org",
      "https://jsonrpc.evmos.nodestake.top",
      "https://evmos-jsonrpc.alkadeta.com",
      "https://evmos-json.qubelabs.io",
      "https://evmos-rpc.theamsolutions.info",
      "https://evmos-api.theamsolutions.info",
      "https://evmos-jsonrpc.theamsolutions.info",
      "https://evm-rpc-evmos.hoodrun.io",
      "https://evmos-json-rpc.0base.dev",
      "https://json-rpc.evmos.tcnetwork.io",
      "https://rpc-evm.evmos.dragonstake.io",
      "https://evmosevm.rpc.stakin-nodes.com",
      "https://evmos-jsonrpc.stake-town.com",
      "https://json-rpc-evmos.mainnet.validatrium.club",
      "https://rpc-evmos.imperator.co",
      "https://evm-rpc.evmos.silentvalidator.com",
      "https://alphab.ai/rpc/eth/evmos",
      "https://evmos-jsonrpc.kalia.network",
      "https://jsonrpc-evmos.mzonder.com",
      {
        url: "https://evmos.lava.build/lava-referer-16223de7-12c0-49f3-8d87-e5f1e6a0eb3b/",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
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
  84532: {
    rpcs: [
      "https://rpc.notadegen.com/base/sepolia",
	 {
        url: "https://base-sepolia.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  84531: {
    rpcs: [
      {
        url: "https://base-goerli.diamondswap.org/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.diamondswap,
      },
      {
        url: "https://base-goerli.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://1rpc.io/base-goerli",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://base-goerli.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/base-goerli",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://base-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://base-goerli-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://endpoints.omniatech.io/v1/base/goerli/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  8453: {
    rpcs: [
      "https://mainnet.base.org",
      "https://developer-access-mainnet.base.org",
      {
        url: "https://base-mainnet.diamondswap.org/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.diamondswap,
      },
      {
        url: "https://base.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://1rpc.io/base",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://base-pokt.nodies.app",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://base.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
        url: "https://base-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://base.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/base",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      "https://rpc.notadegen.com/base",
      {
        url: "https://base-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://base-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://base.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://endpoints.omniatech.io/v1/base/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://base.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  11235: {
    rpcs: [
      {
        url: "https://haqq-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://haqq-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
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
  534352: {
    rpcs: [
      "https://rpc.scroll.io",
      "https://rpc-scroll.icecreamswap.com",
      {
        url: "https://scroll-mainnet.public.blastapi.io/",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://scroll-mainnet-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra,
      },
      {
        url: "https://scroll.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://1rpc.io/scroll",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://scroll.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc
      },
      {
        url: "https://scroll-mainnet.rpc.grove.city/v1/a7a7c8e2",
        tracking: "none",
        trackingDetails: privacyStatement.pokt
      },
    ],
  },
  534353: {
    rpcs: [
      {
        url: "https://scroll-alpha-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra,
      },
      {
        url: "https://scroll-alphanet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://scroll-alphanet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ]
  },
  534354: {
    rpcs: ["https://prealpha-rpc.scroll.io/l2"]
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
      {
        url: "https://sepolia.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/sepolia",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://sphinx.shardeum.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.shardeum,
      },
      {
        url: "https://dapps.shardeum.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.shardeum,
      },
      {
      	url: "https://api.zan.top/node/v1/eth/sepolia/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      "https://rpc.notadegen.com/eth/sepolia",
      {
        url: "https://ethereum-sepolia-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://ethereum-sepolia-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://1rpc.io/sepolia",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://eth-sepolia.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
    rpcs: ["https://hz.rpc.qkiscan.cn","https://rpc1.qkiscan.cn","https://rpc2.qkiscan.cn","https://rpc3.qkiscan.cn","https://rpc1.qkiscan.io","https://rpc2.qkiscan.io","https://rpc3.qkiscan.io"],
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
    rpcs: ["https://devnet.neonevm.org"]
  },
  245022934: {
    rpcs: ["https://neon-proxy-mainnet.solana.p2p.org", "https://neon-mainnet.everstake.one"],
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
      {
        url: "https://avax-pokt.nodies.app/ext/bc/q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi/rpc",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
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
  1501: {
    rpcs: [
      "https://rpc-canary-1.bevm.io/",
      "https://rpc-canary-2.bevm.io/"
    ]
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
  943: {
    rpcs: [
	     {
        url: "https://pulsetest-s.projectpi.xyz",
        tracking: "none",
        trackingDetails: privacyStatement.projectpi,
      },
      {
        url: "https://pulsechain-testnet-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://pulsechain-testnet-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
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
      "https://node.filutils.com/rpc/v1",
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
  13000: {
    rpcs: ["https://rpc.ssquad.games"],
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
  1072: {
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
      {
        url: "https://1rpc.io/polygon/zkevm",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://polygon-zkevm.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://polygon-zkevm-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
      	url: "https://api.zan.top/node/v1/polygonzkevm/mainnet/public",
      	tracking: "limited",
      	trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://polygon-zkevm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  59144: {
    rpcs: [
      {
        url: "https://linea.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://1rpc.io/linea",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://linea.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://linea.decubate.com",
        tracking: "none",
        trackingDetails: privacyStatement.decubate,
      },
    ],
  },
  59140: {
    rpcs: [
      {
        url: "https://linea-goerli.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
       },
     ],
   },
  534351: {
    rpcs: [
      {
        url: "https://scroll-sepolia.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://scroll-testnet-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra,
      },
      {
        url: "https://rpc.ankr.com/scroll_sepolia_testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://scroll-public.scroll-testnet.quiknode.pro/",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode
      },
      {
        url: "https://scroll-sepolia.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack
      },
      {
        url: "https://scroll-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc
      },
      {
        url: "https://scroll-testnet.rpc.grove.city/v1/a7a7c8e2",
        tracking: "none",
        trackingDetails: privacyStatement.pokt
      },
      "http://scroll-sepolia-rpc.01no.de:8545/",
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
        url: "https://oasys.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
	"https://oasys-mainnet.gateway.pokt.network/v1/lb/c967bd31",
	"https://oasys-mainnet-archival.gateway.pokt.network/v1/lb/c967bd31",
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
      {
        url: "https://rpc.j2o.io",
        tracking: "limited",
        trackingDetails: privacyStatement.j2o,
      },
    ],
  },
  827431: {
    rpcs: [
      "https://mainnet-rpc.curvescan.io",
    ],
  },
  167008: {
    rpcs: [
      {
	url: "https://taiko-katla.blockpi.network/v1/rpc/public",
	tracking: "limited",
	trackingDetails: privacyStatement.blockpi,
      }
    ]
  },
  2323: {
    rpcs: [
      {
        url: "https://data-testnet-v1.somanetwork.io",
        tracking: "yes",
        trackingDetails: privacyStatement.soma,
      },
      {
        url: "https://block-testnet-v1.somanetwork.io",
        tracking: "yes",
        trackingDetails: privacyStatement.soma,
      },
    ],
  },
  2332: {
    rpcs: [
      {
        url: "https://data-mainnet-v1.somanetwork.io",
        tracking: "yes",
        trackingDetails: privacyStatement.soma,
      },
      {
        url: "https://block-mainnet-v1.somanetwork.io",
        tracking: "yes",
        trackingDetails: privacyStatement.soma,
      },
    ],
  },
  570: {
    rpcs: [
      "wss://rpc.rollux.com/wss",
      "https://rpc.rollux.com",
      "https://rollux.rpc.syscoin.org",
      "wss://rollux.rpc.syscoin.org/wss"
    ],
  },
  5700: {
    rpcs: [
      {
        url: "https://syscoin-tanenbaum-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://syscoin-tanenbaum-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
        "https://rollux.rpc.tanenbaum.io",
        "wss://rollux.rpc.tanenbaum.io/wss",
   ],
  },
  8081: {
    rpcs: [
      {
        url: "https://dapps.shardeum.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.shardeum,
      }
    ],
  },
  8082: {
    rpcs: [
      {
        url: "https://sphinx.shardeum.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.shardeum,
      }
    ],
  },
  7895: {
    rpcs: [
      {
        url: "https://rpc-athena.ardescan.com",
        tracking: "yes",
        trackingDetails: privacyStatement.ard,
      },
    ],
  },
  1707: {
    rpcs: ["https://rpc.blockchain.or.th"],
  },
  1708: {
    rpcs: ["https://rpc.testnet.blockchain.or.th"]
  },
  813: {
    rpcs: ["https://mainnet.meerlabs.com"]
  },
  8131: {
    rpcs: ["https://testnet.meerlabs.com"]
  },
  530: {
    rpcs: ["https://fx-json-web3.portfolio-x.xyz:8545/"],
  },
  1003: {
    rpcs: [
      {
        url: "https://rpc.softnote.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.softnote
      },
    ]
  },
 3639: {
   rpcs: ["https://rpc.ichainscan.com"]
 },
  2049: {
    rpcs: ["https://msc-rpc.movoscan.com/"],
  },
  23294: {
    rpcs: [
      {
        url: "https://1rpc.io/oasis/sapphire",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc
      },
    ]
  },
  1339: {
    rpcs: [
     "https://rpc.elysiumchain.tech/",
     "https://rpc.elysiumchain.us/",
   ]
  },
  1338: {
    rpcs: ["https://rpc.atlantischain.network/"]
  },
  6363: {
    rpcs: ["https://dsc-rpc.digitsoul.co.th"],
  },
  363636: {
    rpcs: ["https://dgs-rpc.digitsoul.co.th"],
  },
  2016: {
    rpcs: ["https://eu-rpc.mainnetz.io"],
  },
  2458: {
    rpcs: [
      {
        url: "https://rpc-testnet.hybridchain.ai/",
        tracking: "yes",
        trackingDetails: privacyStatement.hybrid,
      }
    ],
  },
  2468: {
    rpcs: [
      {
        url: "https://coredata-mainnet.hybridchain.ai/",
        tracking: "yes",
        trackingDetails: privacyStatement.hybrid,
      },
      {
        url: "https://rpc-mainnet.hybridchain.ai/",
        tracking: "yes",
        trackingDetails: privacyStatement.hybrid,
      },
    ],
  },
  8899: {
    rpcs: [
      "https://rpc-l1.jibchain.net",
      "https://jib-rpc.inan.in.th",
      "https://rpc-l1.jbc.aomwara.in.th",
      "https://rpc-l1.jbc.xpool.pw",
    ]
  },
  1089: {
    rpcs: [
      {
        url: "https://humans-mainnet-evm.itrocket.net",
        tracking: "none",
        trackingDetails: privacyStatement.itrocket,
      },

    ],
  },
  4139: {
    rpcs: [
      {
        url: "https://humans-testnet-evm.itrocket.net",
        tracking: "none",
        trackingDetails: privacyStatement.itrocket,
      },
    ],
  },
  1972: {
    rpcs: ["https://rpc2.redecoin.eu"],
  },
  131: {
    rpcs: [
      "https://tokioswift.engram.tech",
      "https://tokio-archive.engram.tech",
    ],
  },
  255: {
    rpcs: [
      {
        url: "https://1rpc.io/kroma",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc
      },
    ]
  },
 34443: {
    rpcs: [
      {
        url: "https://1rpc.io/mode",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc
      },
    ]
  },
217: {
  rpcs:["https://rpc2.siriusnet.io"]
},
1100: {
  rpcs:[
  "https://jsonrpc.dymension.nodestake.org",
  "https://evm-archive.dymd.bitszn.com",
  "https://dymension.liquify.com/json-rpc",
  "https://dymension-evm.kynraze.com"
  ]
},
  7070: {
    rpcs:[
      "https://planq-rpc.nodies.app",
      "https://jsonrpc.planq.nodestake.top/"
    ]
  },
  463: {
    rpcs:[
      "https://mainnet-rpc.areon.network",
      "https://mainnet-rpc2.areon.network",
      "https://mainnet-rpc3.areon.network",
      "https://mainnet-rpc4.areon.network",
      "https://mainnet-rpc5.areon.network"
    ]
  },
  35441: {
    rpcs:[
      {
        url: "https://rpc.q.org",
        tracking: "limited",
        trackingDetails: privacyStatement.q,
      },
    ]
  }
};
const allExtraRpcs = mergeDeep(llamaNodesRpcs, extraRpcs);

export default allExtraRpcs;
