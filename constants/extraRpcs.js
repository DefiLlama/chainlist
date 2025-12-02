import { mergeDeep } from "../utils/fetch.js";

import { llamaNodesRpcs } from "./llamaNodesRpcs.js";

const privacyStatement = {
  blockswap:
    "Blockswap RPC does not track any kind of user information at the builder RPC level (i.e. IP, location, etc.) nor is any information logged. All blocks are encrypted when passed between proposers, builders, relayers, and Ethereum. It does not transmit any transactions to the relayer. We use analytical cookies to see which content on the Site is highly frequented and also to analyze if content should be updated or improved. These cookies process and save data like your browser type, referrer URLs, operating system, date/time stamp, views and clicks on the Site, and your (truncated) IP address. For more information please visit: https://docs.pon.network/pon/privacy",
  "48Club":
    "IP addresses will be read for rate-limit purpose without being actively stored at application layer. Also notice that we don't actively purge user footprint in lower-level protocol.",
  unitedbloc:
    "UnitedBloc does not collect or store any PII information. UnitedBloc does use IP addresses and transaction requests solely for service management purposes. Performance measurements such as rate limiting and routing rules require the analysis of IP addresses and response time measurements require the analysis of transaction requests. UnitedBloc does not and will never use RPC requests to front run transactions.",
  glc: "The types of Personal Data that we collect directly from you or from third parties depend on the circumstances of collection and on the nature of the service requested or transaction undertaken. It may include (but is not limited to Personal information that links back to an individual, e.g. name, gender, date of birth, and other personal identification numbers Contact information, e.g. address phone number and email address Technical information e.g IP address for API services and login Statistical data such as website visits, for example hits to the GLCscan websie. (check out our privacy statement here: https://glscan.io/Policy)",
  ankr: "For service delivery purposes, we temporarily record IP addresses to set usage limits and monitor for denial of service attacks against our infrastructure. Though we do look at high-level data around the success rate of transactions made over the blockchain RPC, we do not correlate wallet transactions made over the infrastructure to the IP address making the RPC request. Thus, we do not store, exploit, or share any information regarding Personal Identifiable Information (PII), including wallet addresses. https://www.ankr.com/blog/ankrs-ip-address-policy-and-your-privacy/",
  alchemy:
    "We may collect certain information automatically when you use our Services, such as your Internet protocol (IP) address, user settings, MAC address, cookie identifiers, mobile carrier, mobile advertising and other unique identifiers, browser or device information, location information (including approximate location derived from IP address), and Internet service provider. https://www.alchemy.com/policies/privacy-policy",
  nodereal: `We may automatically record certain information about how you use our Sites (we refer to this information as "Log Data"). Log Data may include information such as a user's Internet Protocol (IP) address, device and browser type, operating system, the pages or features of our Sites to which a user browsed and the time spent on those pages or features, the frequency with which the Sites are used by a user, search terms, the links on our Sites that a user clicked on or used, and other statistics. We use this information to administer the Service and we analyze (and may engage third parties to analyze) this information to improve and enhance the Service by expanding its features and functionality and tailoring it to our users' needs and preferences. https://nodereal.io/terms`,
  publicnode: `We do not store or track any user data with the exception of data that will be public on chain. We do not correlate wallets address's with IP's,  any data which is needed to transact is deleted after 24 hours. We also do no use any Analytics or 3rd party website tracking. https://www.publicnode.com/privacy`,
  onerpc:
    "With the exception of data that will be public on chain, all the other metadata / data should remain private to users and other parties should not be able to access or collect it. 1RPC uses many different techniques to prevent the unnecessary collection of user privacy, which prevents tracking from RPC providers. https://docs.1rpc.io/technology/zero-tracking",
  builder0x69: "Private transactions / MM RPC: https://twitter.com/builder0x69",
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
  pokt: "We do not collect any personally identifiable information (PII) including user IP address, request origin, or request data. Full logging practices here: https://pocket.network/protocol-logging-practices",
  nodies:
    "We collect data about the blockchain requests you make through our Service. However, we do not use this data to identify you personally. For our complete privacy polic, please visit https://www.nodies.app/privacy.txt",
  zmok: `API requests - we do NOT store any usage data, additionally, we do not store your logs. No KYC - "Darknet" style of sign-up/sign-in. Only provider that provides Ethereum endpoints as TOR/Onion hidden service. Analytical data are stored only on the landing page/web.  https://zmok.io/privacy-policy`,
  infura:
    "We collect wallet and IP address information. The purpose of this collection is to ensure successful transaction propagation, execution, and other important service functionality such as load balancing and DDoS protection. IP addresses and wallet address data relating to a transaction are not stored together or in a way that allows our systems to associate those two pieces of data. We retain and delete user data such as IP address and wallet address pursuant to our data retention policy. https://consensys.net/blog/news/consensys-data-retention-update/",
  radiumblock:
    "Except for the data that is publicly accessible on the blockchain, RadiumBlock does not collect or keep any user information (like location, IP address, etc.) transmitted via our RPC. For more information about our customer privacy policy please visit https://radiumblock.com/privacy.html",
  etcnetworkinfo:
    "We do use analytics at 3rd party tracking websites (Google Analytics & Google Search Console) the following interactions with our systems are automatically logged when you access our services, such as your Internet Protocol (IP) address as well as accessed services and pages(Packet details are discarded / not logged!). Data redemption is varying based on traffic, but deleted after 31 days We do use these infos to improve our services.",
  omnia:
    "All the data and metadata remain private to the users. No third party is able to access, analyze or track it. OMNIA leverages different technologies and approaches to guarantee the privacy of their users, from front-running protection and private mempools, to obfuscation and random dispatching. https://blog.omniatech.io/how-omnia-handles-your-personal-data",
  blockpi:
    "We do not collect request data or request origin. We only temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days and we do not store any user information for longer periods of time. https://blockpi.io/privacy-policy",
  payload:
    "Sent transactions are private: https://payload.de/docs. By default, no data is collected when using the RPC endpoint. If provided by the user, the public address for authentication is captured when using the RPC endpoint in order to prioritize requests under high load. This information is optional and solely provided at the user's discretion. https://payload.de/privacy/",
  /*gitshock:
    "We do not collect any personal data from our users. Our platform is built on blockchain technology, which ensures that all transactions are recorded on a public ledger that is accessible to all users. However, this information is anonymous and cannot be linked to any specific individual. https://docs.gitshock.com/users-guide/privacy-policy",*/ // website is down
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
  iota: "When you visit any of our websites or use any features or resources available on or through our websites. When you visit our website, your device and browser may automatically disclose certain information (such as device type, operating system, browser type, browser settings, IP address, language settings, dates and times of connecting to a website and other technical communications information), some of which may constitute Personal Data; https://www.iota.org/privacy-policy",
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
  jfc: "We do not collect request data or request origin. We only temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days and we do not store any user information for longer periods of time. https://blockpi.io/privacy-policy",
  j2o: "We do not collect request data or request origin. We only temporarily record the request method names and IP addresses for 7 days to ensure our service functionality such as load balancing and DDoS protection. All the data is automatically deleted after 7 days and we do not store any user information for longer periods of time. https://blockpi.io/privacy-policy",
  icplazaorg:
    "Please be aware that we collect your following information for the purpose of satisfying your needs in ICPlaza services(...) 1.We will collect your mobile device information, operation records, transaction records, wallet address and other personal information. https://www.icplaza.pro/privacy-policy",
  tenderly:
    "Additionally, if you are an Account Member, we may collect business and transactional data about you (and your business) that accumulates over the normal course of operation regarding providing our Services. This may include transaction records, stored files, user profiles, information about collaborators, analytics data, and other metrics, as well as other types of information created or generated by your interaction with our Services. https://tenderly.co/privacy-policy",
  soma: "At SomaNetwork Mainnet Or Testnet, we are committed to protecting your privacy and ensuring the security of your data. This privacy policy summary outlines how we handle and protect your personal information when using our SomaNetwork Mainnet and Testnet services. Please note that this is a summary, and the full privacy policy should be reviewed for complete details soma. 1.We will collect your mobile device information, operation records, transaction records, wallet address and other personal information. https://soma-network.gitbook.io/soma-network/privacy-policy",
  chain49:
    "We collect device information and request metadata like IP address and User Agent for the purpose of load balancing and rate limiting. More info: https://chain49.com/privacy-policy",
  meowrpc:
    "With the exclusion of data that will be openly visible and available on the blockchain, MEOWRPC does not track or store any kind of user information (such as location, IP address, etc.) that passes through our RPC. For further details regarding our privacy practices, we encourage you to refer to our Privacy Policy. https://privacy.meowrpc.com",
  drpc: "Specific types of technical data that we may temporarily log include:IP address (only in logs for redirecting requests to the nearest RPC nodes and rate limiting at the free level, which are cleared weekly). The user ID is hidden in the temporary logs, so it is not possible to link them to a specific user.https://drpc.org/privacy-policy",
  las: "The Living Assets network does not store any personal data provided by its users. The network solely communicates on-chain signatures generated by web3 compatible wallets. However, it is possible that clients utilizing the network may necessitate supplementary information from their users to fulfill Know Your Customer obligations. In such cases, explicit consent from the users is mandatory, following standard procedures.",
  dwellir:
    "Except for the data that is publicly accessible on the blockchain, Dwellir does not collect or keep any user information (like location, IP address, etc.) transmitted via our RPC. For more information about our privacy methods, we suggest checking out our Privacy Policy at https://www.dwellir.com/privacy-policy",
  ard: " (ARD) Ardenium Athena, we prioritize the protection of your privacy and the security of your data. This privacy policy summary provides an overview of how we handle and safeguard your personal information when you use our Ardenium Athena Explorer Blockchain services. However, please note that this is only a summary, and for complete details, we encourage you to review the full privacy policy available at soma, Information Collection: When you use our services, we may collect personal information, such as mobile device details, operation records, transaction records, wallet addresses, and other relevant data. For a more comprehensive understanding, please refer to our full privacy policy at https://docs.ardenium.wiki/ardenium-network/disclaimer.",
  zan: "ZAN Node Service generally does not store any kind of user information (e.g. IP address, location, requst location, request data, etc.) that transits through our RPCs except for one senario ——we may track your IP address when you are using our RPCs and will delete it immediately when you stoping using our RPCs. To learn more, please review our privacy policy at https://a.zan.top/static/Privacy-Policy.pdf",
  quicknode:
    "Information about your computer hardware and software may be automatically collected by QuickNode. This information can include such details as your IP address, browser type, domain names, access times and referring website addresses.https://www.quicknode.com/privacy",
  pulsechainstats:
    "PulseChainStats RPC does not store or track user information. We only temporarily log IP addresses for rate limiting and DDoS protection purposes. Logs are automatically deleted after 7 days. No wallet addresses or transaction data are correlated with IP addresses.",
  chainstack:
    "We process certain personal data to provide you with the core functionality of our Services. Specifically, when you are: Using the Chainstack Console, we process your name, surname, email address (your account identifier), organization name, IP address, all HTTP headers (most importantly User-Agent), cookies; Using the Chainstack Blockchain infrastructure, we process nodes' token stored in Chainstack Vault, IP address and HTTP headers, request body, API token in Chainstack Vault.https://chainstack.com/privacy/",
  shardeum:
    "Shardeum follows a standard procedure of using log files. These files log visitors when they visit websites... The information collected by log files includes IP addresses, browser type, ISP, date and time stamp, referring/exit pages, and potentially the number of clicks.https://shardeum.org/privacy-policy/",
  softnote:
    "CrispMind collects personal information and uses cookies for site operation, analysis, and enhancement, with no control over third-party cookies.https://softnote.com/privacy/",
  lava: "We, our service providers, and our business partners may automatically log information about you, your computer or mobile device, and your interaction over time with the Service..., such as: Device data, ...your computer or mobile device's operating system type and version, manufacturer and model, browser type, screen resolution, RAM and disk size, CPU usage, device type (e.g., phone, tablet), IP address, unique identifiers (including identifiers used for advertising purposes), language settings, mobile device carrier, radio/network information (e.g., Wi-Fi, LTE, 3G), and general location information such as city, state or geographic area. https://www.lavanet.xyz/privacy-policy",
  merkle: "merkle does not track or store user information that transits through our RPCs (location, IP, wallet, etc).",
  liquify:
    "What data do we collect? Information collected automatically from your device, including IP address, device type,operating system, browser-type, broad geographic location and other technical information.https://www.liquify.io/privacy_policy.pdf",
  autostake:
    "When you browse our marketing pages, we’ll track that for statistical purposes (like conversion rates and to test new designs). We also store any information you volunteer, like surveys, for as long as it makes sense.https://autostake.com/privacy-policy",
  allthatnode: `In addition to the Personal Information, the Billing Information, and the Geolocational Information..., we automatically collect certain information when you use the Platform or Website: IP addresses, browser type and language...; information about a mobile device, including universally unique ID ("UUID"), platform type and version (e.g., iOS or Android), carrier and country location, hardware and processor information, and network type; and activity and usage information occurring via the Platform or Website.https://www.allthatnode.com/privacypolicy.dsrv`,
  lokibuilder:
    "Private transactions. No tracking of any kind (no IPs, location, wallet etc.): https://lokibuilder.xyz/privacy",
  cyphercore:
    "We collect information about you in various ways when you use our website. This includes information you provide directly to us, information we collect automatically, and information we obtain from third-party sources.https://cyphercore.io/privacy-policy/",
  hybrid:
    "HybridChain may automatically collect information regarding your computer hardware and software. This data can encompass details like your IP address, browser type, domain names, access times, and referring website addresses. This collection is in line with HybridChain's privacy policy and aims to optimize service provision and enhance user experience.https://docs.hybridchain.ai/privacy-policy",
  rivet:
    "We collect End Users’ information when they use our Customers’ web3-enabled websites, web applications, and APIs. This information may include but is not limited to IP addresses, system configuration information, and other information about traffic to and from Customers’ websites (collectively, 'Log Data'). We collect and use Log Data to operate, maintain, and improve our Services in performance of our obligations under our Customer agreements.https://rivet.cloud/privacy-policy",
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
  stackup:
    "We collect Personal Data about you from the following categories of sources: You, When you provide such information directly to us, When you create an account or use our interactive tools and Services. When you use the Services and such information is collected automatically, Third Parties. Read more at https://www.stackup.sh/privacy",
  q: "Our system records data and information about the computer used by the user automatically and with every visit on our website. The following data are collected: Information regarding the type and version of internet browser used to access the website, Operating system, IP address, Date and time of each access, Web page from which the user was redirected to our page, Web pages and resources that were visited, The data mentioned above are saved for a maximum time period of 30 days.https://q.org/privacy-policy",
  gasswap:
    "GasSwap nodes are provided as a public good and we never store any identifiable information for users. See https://docs.gasswap.org/gasswap/public-node",
  mxc: "MXC MoonChain prioritizes user privacy and security, ensuring that no identifiable personal information is collected or stored when utilizing the AXS Layer3 Wallet. For complete details, please refer to our Privacy Policy at https://doc.mxc.com/docs/Resources/Privacy.",
  zeeve:
    "We may collect personal and sensitive personal information about you and store this information in connection with the provision and fulfilment of our services to you. Personal information may include: First name and last name,Email address, Location,IP Address://www.zeeve.io/privacy-policy/",
  tatum:
    "Tatum Technology s.r.o.'s policy respects your privacy regarding any information we may collect from you across our website, https://tatum.io, and other sites we own and operate. For more info, check https://tatum.io/privacy-policy .",
  nodifi:
    "Nodifi AI privacy policy request no privacy intrusion. We do not track IP, wallets, or the websites connected to our nodes. For more info check https://nodifi.ai/privacy-policy",
  taikotools:
    "We don't gather: User IP addresses, wallets, sources of requests and request content. For more info check https://taiko.tools/privacy-policy",
  sigmacore:
    "When you use our services, we do not track user info. Check out our privacy statement here: https://sigmacore.io/privacy-statement.pdf",
  graffiti:
    "Regarding RPC (remote procedure call) data, we do not collect request data or request origin. We temporarily record request method names and IP addresses for 7 days to ensure service functionality like load balancing and DDoS protection. All data is automatically deleted after 7 days, except for RPC request amounts, which are recorded for accounting and billing purposes for a longer period.https://graffiti.farm/privacy-policy/",
  nownodes:
    "We do not collect any financial data. Other data may be collected by third parties; we are not responsible for the actions of third parties. We do not collect any Personal data other than the Personal data set out in this Policy: https://nownodes.io/assets/data/privacy-pol.pdf. ",
  Envelop:
    "We, Envelop, do not collect and/or process any personal data other than publicly available data.  Check out our privacy statement here: https://docs.envelop.is/legal/privacy-policy",
  "4everland":
    "At 4EVERLAND, we are committed to protecting the privacy and security of your personal information. While we do collect certain data from our users, such as names, email addresses, account credentials, and usage information, we take robust measures to safeguard this data. We retain your personal information only for as long as your account remains active, plus an additional 6 months after closure: https://www.4everland.org/privacy-policy.",
  porters:
    "The Company does not store, process, or share personal data except the User's public Key tied to the PORTERs account. The User's public key is only stored and not shared at any time. The User may request the deletion of such data and the closure of the User's account via email to info@porters.xyz. The User understands that through their use of the Services and the Platform, They consent to the collection and use of this information in accordance with the Terms. https://porters.xyz/tos",
  conduit:
    "We retain Personal Data about you for as long as necessary to provide you with our services. In some cases we retain Personal Data for longer, if doing so is necessary to comply with our legal obligations, resolve disputes or collect fees owed, or is otherwise permitted or required by applicable law, rule or regulation.https://www.conduit.xyz/privacy-policy",
  nal: "Sometimes we collect your information automatically when you interact with our services, and sometimes we collect your information directly from individuals. At times, we may collect information about an individual from other sources and third parties, even before our first direct interaction.https://www.nal.network/privacy.html",
  originstake:
    "At OriginStake, your privacy is our top priority. Our RPC services strictly handle on-chain information and never collect or store personal data such as IP addresses, wallet details, location, or any other identifying information. We do not track or log user interactions beyond what’s required for on-chain transactions. Any data temporarily collected is solely for maintaining service functionality, such as load balancing or DDoS protection, and is automatically deleted after 7 days. For more details: https://originstake.com/privacy",
  callstatic:
    "While making RPC requests, we do not log, store, or track your IP address, country, location, or any personal data. We log usage data to help you monitor app performance, such as request volume and success rates. These logs are associated solely with the unique API key generated for each of your endpoints, are anonymized, and are not stored in logs. https://callstatic.com/privacy-policy/",
  glidexp:
    "At Glide Protocol, we strictly adhere to privacy principles by ensuring that no IP addresses, geolocation data, financial information, or any personal data are logged, stored, or tracked during RPC requests. This is made possible by the decentralized nature of blockchain technology, which facilitates secure and transparent without the need for personal information, aligning with our commitment to safeguarding user privacy. For more information, visit https://glideprotocol.xyz/privacy-policy",
  bctech:
    "We do not collect, use, or share any personal data of BC Hyper Chain Blockchain RPC endpoint users. Specifically: We do not collect IP addresses, operating systems, or browser types.No device information, including application IDs, is collected. This commitment ensures that users' information remains private and secure when interacting with our RPC endpoint.For more visit https://versatizecoin.com/rpc_privacy.html",
  buildbear:
    "Usage Data is collected automatically when using the Service.Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.https://www.buildbear.io/privacy-policy",
  BlockRazor:
    "Privacy notice: BlockRazor RPC does not track any kind of user information (i.e. IP, location, etc.). Only information that is public on the blockchain are preserved, such as timestamp of a transaction. For more information please visit: https://blockrazor.gitbook.io/blockrazor/scutum-mev-protect-rpc#privacy-statement",
  numa: "Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers, and other diagnostic data. Check out our Terms of use: https://app.numa.network/terms-of-use/ and Privacy Policy: https://app.numa.network/privacy-policy/",
  Histori:
    "At Histori, we do not log, store, or track your IP address, country, location, or any personal data while making RPC requests and REST API calls. Learn more at: https://histori.xyz/support/privacy-policy",
  MemeCore:
    "We do not log, store, or track any user data without consent with exception of data publicly available on chain.",
  owlracle:
    "For rate-limiting and to prevent abuse, we collect and store the IP address of the user making the request. This data is stored for 1 month and is not shared with any third parties. https://owlracle.info/privacy",
  DTEAM:
    "We do not log, store, or track your IP, location, or personal data during RPC requests. https://dteam.tech/privacy-policy",
  "0xRPC":
    "We don't collect IPs, hash info, browser info, or any attributes sent by the request. See https://0xrpc.io/privacy",
  RHINO:
    "We never collect, store, or track any identifying information. Data points like request volumes and success rates are only aggregated to monitor API performance. For more details, please visit https://rhinostake.com/resources/rhino-apis-terms-conditions",
  GrandValley:
    "We do not collect, store, process, or log any data from users of our Services. This includes, but is not limited to: IP addresses (we explicitly disable IP logging at both software and infrastructure levels), Device/browser identifiers (e.g., user-agent headers, screen resolution), Network metadata (requests, responses, timestamps), Wallet addresses, private keys, or transaction data, Geolocation or demographic information. https://github.com/hubofvalley/Testnet-Guides/blob/main/PRIVACY_POLICY.md",
  reliableninjas:
    "Reliable Ninjas does not collect or track personal user information. IP addresses are only temporarily processed in volatile memory for the sole purpose of rate limiting RPC usage and are purged as soon as they are no longer needed. No identifiable or sensitive information is logged, stored, or retained. Reliable Ninjas does not use cookies or tracking technologies. We do not sell, share, or disclose user data to third parties. For more information, please visit: https://reliableninjas.com/privacy-policy",
  therpc:
    "We temporarily record request method names and IP addresses for 7 days solely for service functionality, such as load balancing and DDoS protection.https://therpc.io/agreement/privacy-policy",
  Spectrum:
    "At SpectrumNodes.com, we collect and process personal information to deliver, secure, and improve our RPC services, and we do so only with a valid legal basis such as your consent or to fulfill contractual obligations. We do not process sensitive personal data, sell user information, or collect from third parties, and we employ strong technical safeguards to protect your privacy. Users have rights to access, correct, or delete their data, and can contact us anytime at privacy@spectrumnodes.com or https://spectrumnodes.com/contact",
  STAKEME:
    "We do not collect or store personal request data or request origins. To ensure the functionality of our services, such as load balancing and DDoS protection",
  PulseChainRpc:
    "We do not store or track any user data other than the data publicly available on-chain.https://rpc.pulsechainrpc.com/privacy",
  MBF: "MBF does not use user accounts and does not intentionally collect personally identifying information. When you access our RPC endpoints, the only data we may process are the requesting IP address and the requested method name. We use this limited data solely for operating the service—for example, rate limiting, abuse and DDoS mitigation, debugging, uptime monitoring, and reliability analytics.",
  DHF: "DHF does not use user accounts and does not intentionally collect personally identifying information. When you access our RPC endpoints, the only data we may process are the requesting IP address and the requested method name. We use this limited data solely for operating the service—for example, rate limiting, abuse and DDoS mitigation, debugging, uptime monitoring, and reliability analytics.",
  Stakely:
    "References are processed in hashed form exclusively for load balancing purposes and remain strictly volatile. No personal data is collected, and IP addresses are never associated with wallets or individual requests. https://stakely.io/policies/privacy-policy#rpc-load-balancer",
  fastnode:
    "Fastnode temporarily logs request metadata (IP address, method, headers, timestamps, status, latency) for rate-limiting, security, DDoS protection and debugging. We do not correlate logs with on-chain wallet addresses, use them to front-run transactions, or sell personal data.https://fastnode.gitbook.io/privacy-policy/",
  Hightower:
    "We may collect publicly available blockchain information in order to provide our services. This can include wallet addresses, transaction IDs, timestamps, amounts and fees, and transaction status. https://www.htw.tech/privacy-policy",
  poolz:
    "For service delivery and abuse prevention, we temporarily record IP addresses at the infrastructure level (via AWS) to set usage limits and monitor for denial of service attacks. These logs are used only for rate limiting and security purposes, and are automatically purged according to AWS retention policies. We do not correlate wallet addresses with IPs, and we do not store, exploit, or share any Personal Identifiable Information (PII). https://www.poolz.finance/privacy/",
  grove:
    "We store minimal PII related to your login information. We will retain Users’ PII (including Sensitive PII, where applicable) while they maintain an account with us or to the extent necessary to provide the services through the Service. Thereafter, we will keep PII for as long as reasonably necessary. See our Privacy Policy for more details: https://grove.city/privacy",
  Chainlink:
    "We collect IP address information for security and troubleshooting purposes. For more information about our privacy practices please reference https://chain.link/privacy-policy."
};

export const extraRpcs = {
  1: {
    rpcs: [
      // Quicknode -> tracks IP
      {
        url: "https://go.getblock.io/aefd01aa907c4805ba3c00a9e5b48c6b",
        tracking: "none",
        trackingDetails: privacyStatement.getblock,
      },
      {
        url: "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
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
        url: "https://openapi.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet",
        tracking: "yes",
        trackingDetails: privacyStatement.bitstack,
      },
      {
        url: "https://ethereum-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://eth-mainnet-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra,
      },
      {
        url: "https://ethereum.public.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://rpc.payload.de",
        tracking: "none",
        trackingDetails: privacyStatement.payload,
      },
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
        trackingDetails: privacyStatement.chain49,
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
        url: "https://virtual.mainnet.rpc.tenderly.co/7355b215-ef17-4e3e-8f64-d494284ef18a",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://virtual.mainnet.rpc.tenderly.co/5804dcf7-70e6-4988-b2b0-3672193e0c91",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/mainnet",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://api.zan.top/eth-mainnet",
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
        url: "https://api.stateless.solutions/ethereum/v1/demo",
        tracking: "none",
        trackingDetails: privacyStatement.stateless,
      },
      {
        url: "https://rpc.polysplit.cloud/v1/chain/1",
        tracking: "none",
        trackingDetails: privacyStatement.polysplit,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/ethereum-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://ethereum-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://public-eth.nownodes.io",
        tracking: "yes",
        trackingDetails: privacyStatement.nownodes,
      },
      {
        url: "https://rpc.nodifi.ai/api/rpc/free",
        tracking: "none",
        trackingDetails: privacyStatement.nodifi,
      },
      "https://ethereum.rpc.subquery.network/public",
      {
        url: "https://rpc.graffiti.farm",
        tracking: "limited",
        trackingDetails: privacyStatement.graffiti,
      },
      {
        url: "https://rpc.public.curie.radiumblock.co/http/ethereum",
        tracking: "none",
        trackingDetails: privacyStatement.radiumblock,
      },
      {
        url: "https://eth-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://eth-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "https://rpc.public.curie.radiumblock.co/ws/ethereum",
        tracking: "none",
        trackingDetails: privacyStatement.radiumblock,
      },
      {
        url: "wss://ws-rpc.graffiti.farm",
        tracking: "limited",
        trackingDetails: privacyStatement.graffiti,
      },
      {
        url: "wss://ethereum.callstaticrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.callstatic,
      },
      {
        url: "https://eth.blockrazor.xyz",
        tracking: "none",
        trackingDetails: privacyStatement.BlockRazor,
      },
      {
        url: "https://endpoints.omniatech.io/v1/eth/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://eth1.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
      {
        url: "https://0xrpc.io/eth",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/eth",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://rpc.owlracle.info/eth/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://ethereum.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://eth.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://ethereum-json-rpc.stakely.io",
        tracking: "none",
        trackingDetails: privacyStatement.Stakely,
      },
      {
        url: "https://rpc.poolz.finance/eth",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://eth.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-ethereum-mainnet-reth.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
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
        url: "https://polygon-mumbai.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/polygon-mumbai",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
    ],
  },
  //Rinkeby testnet deprecated
  4: {
    rpcs: ["https://rinkeby.infura.io/3/9aa3d95b3bc440fa88ea12eaa4456161"],
  },
  5: {
    rpcs: [
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
        url: "https://eth-goerli.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
        url: "https://builder-rpc1.0xblockswap.com",
        tracking: "yes",
        trackingDetails: privacyStatement.blockswap,
      },
      {
        url: "https://builder-rpc2.0xblockswap.com",
        tracking: "yes",
        trackingDetails: privacyStatement.blockswap,
      },
    ],
  },
  //Ropsten testnet deprecated
  3: {
    rpcs: ["https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  },
  195: {
    rpcs: ["https://xlayertestrpc.okx.com", "https://testrpc.xlayer.tech"],
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
      {
        url: "https://fantom-testnet.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://fantom-testnet.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://fantom-testnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  4058: {
    rpcs: [
      "https://rpc1.ocean.bahamutchain.com",
      {
        url: "https://Bahamut-ocean-6h42j7.zeeve.net",
        tracking: "none",
        trackingDetails: privacyStatement.zeeve,
      },
    ],
  },
  4444: {
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
        url: "https://api.zan.top/avax-fuji/ext/bc/C/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/avalanche-fuji",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://avalanche-fuji.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://avalanche-fuji.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://avalanche-fuji.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  80002: {
    rpcs: [
      "https://rpc-amoy.polygon.technology",
      {
        url: "https://polygon-bor-amoy-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://polygon-bor-amoy-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://polygon-amoy.blockpi.network/v1/rpc/private",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://polygon-amoy.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://polygon-amoy.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://polygon-amoy.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://api.zan.top/polygon-amoy",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://polygon-amoy-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://polygon-amoy.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://polygon-amoy.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://poly-amoy.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
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
        url: "https://0.48.club",
        tracking: "limited",
        trackingDetails: privacyStatement["48Club"],
      },
      {
        url: "wss://rpc-bsc.48.club/ws/",
        tracking: "limited",
        trackingDetails: privacyStatement["48Club"],
      },
      {
        url: "https://binance-smart-chain-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
        tracking: "yes",
        trackingDetails: privacyStatement.nodereal,
      },
      {
        url: "https://go.getblock.io/cc778cdbdf5c4b028ec9456e0e6c0cf3",
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
        url: "https://bsc.blockpi.network/v1/rpc/private",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://bnb.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
        url: "https://api.zan.top/bsc-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://bsc.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://services.tokenview.io/vipapi/nodeservice/bsc?apikey=gVFJX5OyPdc2kHH7youg",
        tracking: "yes",
        trackingDetails: privacyStatement.tokenview,
      },
      {
        url: "https://rpc.polysplit.cloud/v1/chain/56",
        tracking: "none",
        trackingDetails: privacyStatement.polysplit,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/bsc-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://bsc-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://public-bsc.nownodes.io",
        tracking: "yes",
        trackingDetails: privacyStatement.nownodes,
      },
      {
        url: "https://bsc-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://bsc-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      "https://bnb.rpc.subquery.network/public",
      {
        url: "wss://bsc.callstaticrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.callstatic,
      },
      {
        url: "https://bsc.blockrazor.xyz",
        tracking: "none",
        trackingDetails: privacyStatement.BlockRazor,
      },
      {
        url: "https://endpoints.omniatech.io/v1/bsc/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.owlracle.info/bsc/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://bsc.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://rpc.poolz.finance/bsc",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://bsc.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://public-bsc-mainnet.fastnode.io",
        tracking: "none",
        trackingDetails: privacyStatement.fastnode,
      },
      {
        url: "https://api-bsc-mainnet-full.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  97: {
    rpcs: [
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
        url: "https://api.zan.top/bsc-testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/bsc-testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://bsc-testnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://bsc-testnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://bsc-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://bsc-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://bnb-testnet.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://bsc-testnet.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  900000: {
    rpcs: ["https://api.posichain.org", "https://api.s0.posichain.org"],
  },
  43114: {
    rpcs: [
      "https://api.avax.network/ext/bc/C/rpc",
      "https://avalanche.public-rpc.com",
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
        url: "https://avalanche-public.nodies.app/ext/bc/C/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
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
        url: "https://api.zan.top/avax-mainnet/ext/bc/C/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://avalanche.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/avalanche-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://avax-x-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://avalanche-mainnet.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://0xrpc.io/avax",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/avax",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://rpc.owlracle.info/avax/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://spectrum-01.simplystaking.xyz/avalanche-mn-rpc/ext/bc/C/rpc",
        tracking: "yes",
        trackingDetails: privacyStatement.Spectrum,
      },
      {
        url: "https://avalanche.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://rpc.poolz.finance/avalanche",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://avax.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  250: {
    rpcs: [
      "https://rpcapi.fantom.network",
      {
        url: "https://fantom-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      "https://rpc.ftm.tools/",
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
      {
        url: "https://fantom-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "wss://fantom.callstaticrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.callstatic,
      },
      {
        url: "https://endpoints.omniatech.io/v1/fantom/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://fantom-json-rpc.stakely.io",
        tracking: "none",
        trackingDetails: privacyStatement.Stakely,
      },
      {
        url: "https://api.zan.top/ftm-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://rpc.owlracle.info/ftm/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://fantom.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://fantom.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://public-ftm-mainnet.fastnode.io",
        tracking: "none",
        trackingDetails: privacyStatement.fastnode,
      },
    ],
  },
  137: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/polygon",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      "https://polygon-rpc.com",
      {
        url: "https://rpc-mainnet.matic.quiknode.pro",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
      {
        url: "https://polygon-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://polygon-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
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
      {
        url: "https://polygon-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://go.getblock.io/02667b699f05444ab2c64f9bff28f027",
        tracking: "yes",
        trackingDetails: privacyStatement.getblock,
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
        url: "https://api.zan.top/polygon-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://polygon.meowrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.meowrpc,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/polygon-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://polygon-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      "https://polygon.rpc.subquery.network/public",
      {
        url: "https://polygon-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://polygon-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "https://endpoints.omniatech.io/v1/matic/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://polygon.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
      {
        url: "https://rpc.owlracle.info/poly/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://polygon.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://rpc.poolz.finance/polygon",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://poly.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-polygon-mainnet-full.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "yes",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  25: {
    rpcs: [
      "https://evm.cronos.org",
      "https://cronos-rpc.elk.finance/",
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
      {
        url: "https://cronos.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://cronos.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      "https://rpc.vvs.finance",
      "https://mmf-rpc.xstaking.sg",
      "https://rpc.nebkas.ro",
      {
        url: "https://endpoints.omniatech.io/v1/cronos/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.owlracle.info/cro/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://cro-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://api-cronos-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "yes",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  338: {
    rpcs: [
      "https://evm-t3.cronos.org/",
      {
        url: "https://endpoints.omniatech.io/v1/cronos/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://cro-testnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
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
  8822: {
    rpcs: [
      "https://json-rpc.evm.iotaledger.net",
      {
        url: "https://iota-mainnet-evm.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://rpc.ankr.com/iota_evm",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://iota-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  1075: {
    rpcs: [
      "https://evm-toolkit-api.evm.testnet.iotaledger.net",
      {
        url: "https://iota-testnet-evm.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://rpc.ankr.com/iota_evm_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://iota-testnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  2340: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/atleta_olympia",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  2440: {
    rpcs: [
      {
        url: "https://rpc.atleta.mainnet.dteam.tech",
        tracking: "none",
        trackingDetails: privacyStatement.DTEAM,
      },
      {
        url: "wss://rpc.atleta.mainnet.dteam.tech",
        tracking: "none",
        trackingDetails: privacyStatement.DTEAM,
      },
      {
        url: "https://rpc.ankr.com/atleta_mainnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://public-atla-mainnet.fastnode.io",
        tracking: "none",
        trackingDetails: privacyStatement.fastnode,
      },
      {
        url: "https://rpc.atleta.at.htw.tech",
        tracking: "yes",
        trackingDetails: privacyStatement.Hightower,
      },
      {
        url: "wss://rpc.atleta.at.htw.tech",
        tracking: "yes",
        trackingDetails: privacyStatement.Hightower,
      },
      {
        url: "https://atleta.nownodes.io",
        tracking: "yes",
        trackingDetails: privacyStatement.nownodes,
      },
    ],
  },
  7887: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/kinto",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1559: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/tenet_evm",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  42161: {
    rpcs: [
      "https://arb1.arbitrum.io/rpc",
      {
        url: "https://1rpc.io/arb",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://arbitrum-one-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://arb-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://arbitrum.public.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://arbitrum-one.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://arb-mainnet-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra,
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
        url: "https://api.zan.top/arb-one",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://arbitrum.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/arbitrum-one",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://api.stateless.solutions/arbitrum-one/v1/demo",
        tracking: "none",
        trackingDetails: privacyStatement.stateless,
      },
      "https://arbitrum.rpc.subquery.network/public",
      {
        url: "https://arbitrum.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "wss://arbitrum.callstaticrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.callstatic,
      },
      {
        url: "https://endpoints.omniatech.io/v1/arbitrum/one/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://arb1.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
      {
        url: "https://rpc.owlracle.info/arb/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://arbitrum.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://arbitrum.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://arb-one-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://rpc.poolz.finance/arbitrum",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://arb-one.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://public-arb-mainnet.fastnode.io",
        tracking: "none",
        trackingDetails: privacyStatement.fastnode,
      },
      {
        url: "https://api-arbitrum-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  421613: {
    rpcs: [
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
      {
        url: "https://arb-nova-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://arbitrum-nova.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://arbnova-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://${QUICKNODE_IDENTIFIER}.nova-mainnet.quiknode.pro/${QUICKNODE_API_KEY}",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
      {
        url: "https://docs-demo.nova-mainnet.quiknode.pro",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
    ],
  },
  421614: {
    rpcs: [
      {
        url: "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/arbitrum-sepolia",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://arbitrum-sepolia.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://api.zan.top/arb-sepolia",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://arbitrum-sepolia.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://arbitrum-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://arbitrum-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://arbitrum-sepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://arbitrum-sepolia-testnet.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  8217: {
    rpcs: [
      "https://public-en.node.kaia.io",
      {
        url: "https://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
      {
        url: "https://kaia.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://kaia.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://kaia-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://go.getblock.io/d7094dbd80ab474ba7042603fe912332",
        tracking: "none",
        trackingDetails: privacyStatement.getblock,
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
        url: "https://klaytn.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.ankr.com/kaia",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://kaia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://kaia-mainnet.gateway.tatum.io/",
        tracking: "limited",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  1666600000: {
    rpcs: [
      "https://api.harmony.one",
      "https://a.api.s0.t.hmny.io",
      "https://api.s0.t.hmny.io",
      {
        url: "https://1rpc.io/one",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://endpoints.omniatech.io/v1/harmony/mainnet-0/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://harmony-0.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://harmony-0.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.owlracle.info/one/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://harmony.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  168587773: {
    rpcs: [
      "https://sepolia.blast.io",
      {
        url: "https://endpoints.omniatech.io/v1/blast/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://blast-testnet-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://rpc.ankr.com/blast_testnet_sepolia",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  81457: {
    rpcs: [
      "https://rpc.blast.io",
      "https://blast.din.dev/rpc",
      "https://blastl2-mainnet.public.blastapi.io",
      "https://li-fi-blast.intustechno.workers.dev/rpc",
      {
        url: "https://rpc.ankr.com/blast",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://blast.gasswap.org",
        tracking: "none",
        trackingDetails: privacyStatement.gasswap,
      },
      {
        url: "wss://blast.gasswap.org",
        tracking: "none",
        trackingDetails: privacyStatement.gasswap,
      },

      {
        url: "https://blast-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://blast-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://blast.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://blast.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://blast.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "wss://blast.callstaticrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.callstatic,
      },
      {
        url: "https://endpoints.omniatech.io/v1/blast/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.owlracle.info/blast/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://blast-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://blast.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://blast.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-blast-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  5611: {
    rpcs: [
      {
        url: "https://opbnb-testnet.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  204: {
    rpcs: [
      "https://opbnb-mainnet-rpc.bnbchain.org",
      {
        url: "https://opbnb.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://opbnb.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
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
      {
        url: "https://opbnb-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://opbnb-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "https://opbnb.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://opbnb.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-opbnb-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  1666700000: {
    rpcs: [
      "https://api.s0.b.hmny.io",
      {
        url: "https://endpoints.omniatech.io/v1/harmony/testnet-0/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  1313161554: {
    rpcs: [
      "https://mainnet.aurora.dev",
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
      {
        url: "https://aurora-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://endpoints.omniatech.io/v1/aurora/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.owlracle.info/aurora/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
    ],
  },
  1313161555: {
    rpcs: [
      "https://testnet.aurora.dev",
      "https://aurora-testnet.drpc.org",
      "wss://aurora-testnet.drpc.org",
      {
        url: "https://endpoints.omniatech.io/v1/aurora/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  4181: {
    rpcs: ["https://rpc1.phi.network"],
  },
  128: {
    rpcs: [
      "https://http-mainnet.hecochain.com",
      "https://http-mainnet-node.huobichain.com",
      "https://hecoapi.terminet.io/rpc",
      {
        url: "https://heco.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://heco.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  256: {
    rpcs: ["https://hecotestapi.terminet.io/rpc"],
  },
  5165: {
    rpcs: [
      "https://rpc1.bahamut.io",
      "https://rpc2.bahamut.io",
      "https://rpc1.ftnscan.io",
      "https://rpc2.ftnscan.io",
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
      {
        url: "https://Bahamut-mainnet-2h93.zeeve.net",
        tracking: "none",
        trackingDetails: privacyStatement.zeeve,
      },
      {
        url: "https://rpc.ankr.com/bahamut",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  2552: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/bahamut_horizon",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  42220: {
    rpcs: [
      "https://forno.celo.org",
      "https://rpc.celocolombia.org",
      {
        url: "https://rpc.ankr.com/celo",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://celo-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://celo.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://celo.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://celo-json-rpc.stakely.io",
        tracking: "none",
        trackingDetails: privacyStatement.Stakely,
      },
      {
        url: "https://celo.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://api-celo-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  11142220: {
    rpcs: [
      "https://forno.celo-sepolia.celo-testnet.org",
      {
        url: "https://rpc.ankr.com/celo_sepolia",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://celo-sepolia.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  480: {
    rpcs: [
      "https://worldchain-mainnet.g.alchemy.com/public",
      "https://480.rpc.thirdweb.com",
      "https://worldchain-mainnet.gateway.tenderly.co",
      "wss://worldchain-mainnet.gateway.tenderly.co",
      "https://sparkling-autumn-dinghy.worldchain-mainnet.quiknode.pro",
      {
        url: "https://worldchain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://worldchain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  4801: {
    rpcs: [
      "https://worldchain-sepolia.g.alchemy.com/public",
      "https://4801.rpc.thirdweb.com",
      "https://worldchain-sepolia.gateway.tenderly.co",
      "wss://worldchain-sepolia.gateway.tenderly.co",
      {
        url: "https://worldchain-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://worldchain-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
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
        url: "https://1rpc.io/op",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://optimism-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://opt-mainnet.g.alchemy.com/v2/demo",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://optimism.public.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
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
        url: "https://api.zan.top/opt-mainnet",
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
        url: "https://api.stateless.solutions/optimism/v1/demo",
        tracking: "none",
        trackingDetails: privacyStatement.stateless,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/optimism-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://optimism-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://go.getblock.io/e8a75f8dcf614861becfbcb185be6eb4",
        tracking: "yes",
        trackingDetails: privacyStatement.getblock,
      },
      {
        url: "https://opt-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://opt-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "https://endpoints.omniatech.io/v1/op/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.buildbear.io/esquivelfabian/",
        tracking: "yes",
        trackingDetails: privacyStatement.buildbear,
      },
      {
        url: "https://optimism.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
      "https://optimism.rpc.subquery.network/public",
      {
        url: "https://0xrpc.io/op",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/op",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://rpc.owlracle.info/opt/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://optimism.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://optimism.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://public-op-mainnet.fastnode.io",
        tracking: "none",
        trackingDetails: privacyStatement.fastnode,
      },
      {
        url: "https://api-optimism-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  11155420: {
    rpcs: [
      "https://sepolia.optimism.io",
      {
        url: "https://public.stackup.sh/api/v1/node/optimism-sepolia",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://endpoints.omniatech.io/v1/op/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://optimism-sepolia.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://api.zan.top/opt-sepolia",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://optimism-sepolia-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://optimism-sepolia.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://optimism-sepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://optimism-sepolia-testnet.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  2330: {
    rpcs: ["http://138.197.152.181:8145", "https://rpc0.altcoinchain.org/rpc"],
  },
  1773: {
    rpcs: ["http://138.197.152.181:8245"],
  },
  1881: {
    rpcs: ["https://rpc.cartenz.works"],
  },
  4200: {
    rpcs: [
      "https://rpc.merlinchain.io",
      {
        url: "https://merlin.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      "https://rpc-merlin.rockx.com",
      "https://merlin-mainnet-enterprise.unifra.io",
      {
        url: "https://endpoints.omniatech.io/v1/merlin/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://endpoints.omniatech.io/v1/merlin/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://merlin.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://merlin.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  420: {
    rpcs: [
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
        url: "https://metis-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://metis.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://metis.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://metis-andromeda.rpc.thirdweb.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.thirdweb,
      },
      {
        url: "https://metis-andromeda.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      "https://api.blockeden.xyz/metis/67nCBdZQSH9z3YqDDjdm",
      "https://metis.rpc.hypersync.xyz/",
    ],
  },
  59902: {
    rpcs: [
      {
        url: "wss://metis-sepolia-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://metis-sepolia-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://metis-sepolia.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      "https://sepolia.metisdevops.link",
    ],
  },
  1246: {
    rpcs: ["https://rpc.omplatform.com"],
  },
  100: {
    rpcs: [
      "https://rpc.gnosischain.com",
      "https://xdai-archive.blockscout.com",
      {
        url: "https://gnosis-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
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
        url: "https://rpc.ap-southeast-1.gateway.fm/v4/gnosis/non-archival/mainnet",
        tracking: "yes",
        trackingDetails: privacyStatement.gateway,
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
        url: "https://gno-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://0xrpc.io/gno",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/gno",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://gnosis.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://gnosis.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://public-gno-mainnet.fastnode.io",
        tracking: "none",
        trackingDetails: privacyStatement.fastnode,
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
        url: " https://endpoints.omniatech.io/v1/gnosis/chiado/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://gnosis-chiado.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  1923: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/swell",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1924: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/swell_sepolia",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://swell-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "wss://swell-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1625: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/gravity",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1231: {
    rpcs: ["https://ultron-rpc.net"],
  },
  1285: {
    rpcs: [
      {
        url: "https://rpc.api.moonriver.moonbeam.network",
        tracking: "limited",
        trackingDetails: privacyStatement.MBF,
      },
      {
        url: "wss://wss.api.moonriver.moonbeam.network",
        tracking: "limited",
        trackingDetails: privacyStatement.MBF,
      },
      {
        url: "wss://moonriver.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://moonriver.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://moonriver.unitedbloc.com",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "wss://moonriver.unitedbloc.com",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
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
      {
        url: "https://moonriver.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://moonriver.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.owlracle.info/movr/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://moonriver.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  361: {
    rpcs: ["https://eth-rpc-api.thetatoken.org/rpc"],
  },
  42262: {
    rpcs: [
      "https://emerald.oasis.io",
      {
        url: "https://1rpc.io/oasis/emerald",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
  },
  40: {
    rpcs: [
      "https://rpc.telos.net",
      {
        url: "https://1rpc.io/telos/evm",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://telos.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://telos.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.ankr.com/telos",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.poolz.finance/telos",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
    ],
  },
  41: {
    rpcs: ["https://testnet.telos.net/evm"],
  },
  32659: {
    rpcs: ["https://mainnet.fusionnetwork.io", "wss://mainnet.fusionnetwork.io"],
  },
  1284: {
    rpcs: [
      {
        url: "https://rpc.api.moonbeam.network",
        tracking: "limited",
        trackingDetails: privacyStatement.MBF,
      },
      {
        url: "wss://wss.api.moonbeam.network",
        tracking: "limited",
        trackingDetails: privacyStatement.MBF,
      },
      {
        url: "https://moonbeam.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "wss://moonbeam.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://moonbeam.unitedbloc.com",
        tracking: "limited",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "wss://moonbeam.unitedbloc.com",
        tracking: "limited",
        trackingDetails: privacyStatement.unitedbloc,
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
        url: "https://moonbeam.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://moonbeam.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://moonbeam.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
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
      {
        url: "https://endpoints.omniatech.io/v1/moonbeam/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
        trackingDetails: privacyStatement.radiumblock,
      },
      {
        url: "https://moonbeam.public.curie.radiumblock.co/ws",
        tracking: "none",
        trackingDetails: privacyStatement.radiumblock,
      },
      {
        url: "https://moonbeam.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://moonbeam.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.poolz.finance/moonbeam",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://node.histori.xyz/moonbeam-mainnet/8ry9f6t9dct1se2hlagxnd9n2a",
        tracking: "none",
        trackingDetails: privacyStatement.Histori,
      },
      {
        url: "https://moonbeam.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  31: {
    rpcs: ["https://public-node.testnet.rsk.co", "https://mycrypto.testnet.rsk.co"],
  },
  30: {
    rpcs: [
      "https://mycrypto.rsk.co",
      "https://public-node.rsk.co",
      {
        url: "https://rootstock.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://rootstock.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rootstock-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
    ],
  },

  4689: {
    rpcs: [
      "https://babel-api.mainnet.iotex.io",
      "https://babel-api.mainnet.iotex.one",
      "https://babel-api.fastblocks.io",
      "https://rpc.depinscan.io/iotex",
      "https://rpc.chainanalytics.org/iotex",
      // {
      //   url: "https://iotexrpc.com",
      //   tracking: "limited",
      //   trackingDetails: privacyStatement.ankr,
      // },
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
      {
        url: "https://api-iotex-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
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
        url: "https://1rpc.io/oktc",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://oktc.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://oktc.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
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
      },
      {
        url: "https://boba-eth.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://boba-eth.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://boba.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-boba-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
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
      {
        url: "https://bch-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  19: {
    rpcs: [
      "https://songbird-api.flare.network/ext/C/rpc",
      "https://rpc.ftso.au/songbird",
      "https://songbird.solidifi.app/ext/C/rpc",
    ],
  },
  122: {
    rpcs: [
      "https://rpc.fuse.io",
      {
        url: "https://fuse-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://fuse-mainnet.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack,
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
      },
      {
        url: "https://fuse.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://fuse.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.owlracle.info/fuse/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://fuse.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
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
      {
        url: "https://shiden.public.curie.radiumblock.co/http",
        tracking: "none",
        trackingDetails: privacyStatement.radiumblock,
      },
      {
        url: "https://shiden.public.curie.radiumblock.co/ws",
        tracking: "none",
        trackingDetails: privacyStatement.radiumblock,
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
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "wss://astar.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
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
      {
        url: "https://astar.public.curie.radiumblock.co/http",
        tracking: "none",
        trackingDetails: privacyStatement.radiumblock,
      },
      {
        url: "https://astar.public.curie.radiumblock.co/ws",
        tracking: "none",
        trackingDetails: privacyStatement.radiumblock,
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
    rpcs: ["https://rpc.callistodao.org"],
  },
  108: {
    rpcs: [
      "https://mainnet-rpc.thundercore.com",
      {
        url: "https://thundercore.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://thundercore.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  20: {
    rpcs: [
      "https://api.elastos.io/esc",
      "https://api.trinity-tech.io/esc",
      "https://api2.elastos.io/esc",
      "https://api2.elastos.net/esc",
      "https://api2.elastos.io/eth",
      "https://api2.elastos.net/eth",
      "https://rpc.glidefinance.io/",
    ],
  },
  82: {
    rpcs: [
      "https://rpc.meter.io",
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
    rpcs: [
      {
        url: "https://viction.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://viction.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://viction.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
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
        url: "https://syscoin-evm.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://syscoin-evm.publicnode.com",
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
        url: "https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b",
        tracking: "limited",
        trackingDetails: privacyStatement.infura,
      },
      {
        url: "https://palm-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://palm-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
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
    rpcs: [
      {
        url: " https://rpc.ankr.com/flare",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://flare-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
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
        url: "https://1rpc.io/holesky",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
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
        url: "https://holesky-rpc.nocturnode.tech",
        tracking: "none",
        trackingDetails: privacyStatement.nocturnDao,
      },
      {
        url: "https://holesky.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://endpoints.omniatech.io/v1/eth/holesky/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://api.zan.top/eth-holesky",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://eth-holesky-testnet.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
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
      "wss://rpc.xdcrpc.com/ws",
      "https://rpc1.xinfin.network",
      "https://erpc.xinfin.network",
      "https://erpc.xdcrpc.com",
      "wss://erpc.xdcrpc.com/ws",
      "https://rpc.xdc.org",
      "https://rpc.xdc.network",
      "https://earpc.xinfin.network/",
      "https://erpc.xinfin.network/",
      "wss://ews.xinfin.network/ws",
      {
        url: "https://rpc.ankr.com/xdc",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://xdc-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://api-xdc-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  51: {
    rpcs: [
      "https://erpc.apothem.network",
      "https://apothem.xdcrpc.com",
      "https://rpc.ankr.com/xdc_testnet",
      "https://earpc.apothem.network/",
      "https://erpc.apothem.network/",
      "wss://eaws.apothem.network/",
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
    rpcs: ["https://www.ethercluster.com/kotti"],
  },
  61: {
    rpcs: [
      "https://etc.etcdesktop.com",
      {
        url: "https://etc.rivet.link",
        tracking: "none",
        trackingDetails: privacyStatement.rivet,
      },
      {
        url: "https://0xrpc.io/etc",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/etc",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://ethereum-classic-mainnet.gateway.tatum.io/",
        tracking: "none",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  //Morden testnet deprecated
  62: {
    rpcs: ["https://www.ethercluster.com/morden"],
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
    possibleRebrand: "It is now a Polkadot chain project renamed: Acuity being built on substrate",
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
      },
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
    rpcs: ["https://rpc.bitkubchain.io", "wss://wss.bitkubchain.io"],
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
  143: {
    rpcs: [
      {
        url: "https://monad-mainnet.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
            {
        url: "https://monad-mainnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://monad-mainnet-rpc.spidernode.net/",
      },
    ],
  },
  163: {
    rpcs: ["https://node.mainnet.lightstreams.io"],
  },
  177: {
    rpcs: [
      "https://mainnet.hsk.xyz",
      {
        url: "https://hashkey.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://hashkey.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  169: {
    rpcs: [
      "https://pacific-rpc.manta.network/http",
      {
        url: "https://1rpc.io/manta",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      "https://manta-pacific-gascap.calderachain.xyz/http",
      "https://www.tencentcloud-rpc.com/v2/manta/manta-rpc",
      "https://r1.pacific.manta.systems/http",
      "https://manta.nirvanalabs.xyz/mantapublic",
      "https://manta-pacific.calderachain.xyz/http",
      "wss://manta-pacific.calderachain.xyz/ws",
      {
        url: "https://manta-pacific.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://manta-pacific.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://endpoints.omniatech.io/v1/manta-pacific/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
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
  360: {
    rpcs: ["https://mainnet.shape.network", "https://shape-mainnet.g.alchemy.com/public"],
  },
  369: {
    rpcs: [
      "https://rpc.pulsechain.com",
      "https://rpc.gigatheminter.com",
      "https://rpc-pulsechain.g4mm4.io",
      "https://evex.cloud/pulserpc",
      "wss://evex.cloud/pulsews",
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
      {
        url: "https://rpc.owlracle.info/pulse/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://rpc.pulsechainrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.PulseChainRpc,
      },
      {
        url: "wss://ws.pulsechainrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.PulseChainRpc,
      },
      {
        url: "https://rpc.pulsechainstats.com",
        tracking: "limited",
        trackingDetails: privacyStatement.pulsechainstats,
      },
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
    rpcs: ["https://eth-rpc-acala.aca-staging.network", "https://rpc.evm.acala.network"],
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
    rpcs: [
      "https://rpc.hyperliquid-testnet.xyz/evm",
      {
        url: "https://spectrum-01.simplystaking.xyz/hyperliquid-tn-rpc/evm",
        tracking: "yes",
        trackingDetails: privacyStatement.Spectrum,
      },
      {
        url: "https://rpcs.chain.link/hyperevm/testnet",
        tracking: "yes",
        trackingDetails: privacyStatement.Chainlink,
      }
    ],
  },
  1001: {
    rpcs: [
      "https://public-en-kairos.node.kaia.io",
      {
        url: "https://responsive-green-emerald.kaia-kairos.quiknode.pro/",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
      {
        url: "https://kaia-kairos.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://rpc.ankr.com/kaia_testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://kaia-kairos.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
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
      {
        url: "https://conflux-espace.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
    ],
  },
  1115: {
    rpcs: [
      "https://rpc.test.btcs.network",
      {
        url: "https://core-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://core-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1116: {
    rpcs: [
      "https://rpc.coredao.org",
      "https://core.public.infstones.com",
      "wss://ws.coredao.org",
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
      {
        url: "https://core.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://core.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://api.zan.top/core-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
    ],
  },
  1130: {
    rpcs: ["https://dmc.mydefichain.com/mainnet", "https://dmc01.mydefichain.com/mainnet"],
  },
  1131: {
    rpcs: [
      "https://dmc.mydefichain.com/testnet",
      "https://dmc01.mydefichain.com/testnet",
      "https://eth.testnet.ocean.jellyfishsdk.com/",
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
  300: {
    rpcs: [
      "https://sepolia.era.zksync.dev",
      {
        url: "https://endpoints.omniatech.io/v1/zksync-era/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/zksync_era_sepolia",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  324: {
    rpcs: [
      "https://mainnet.era.zksync.io",
      "https://li-fi-redirect.intustechno.workers.dev/rpc",
      {
        url: "https://go.getblock.io/f76c09905def4618a34946bf71851542",
        tracking: "limited",
        trackingDetails: privacyStatement.getblock,
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
      {
        url: "https://endpoints.omniatech.io/v1/zksync-era/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://api.zan.top/zksync-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://zksync.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://rpc.ankr.com/zksync_era",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://zksync-era.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-zksync-era-mainnet-full.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  196: {
    rpcs: [
      "https://rpc.xlayer.tech",
      "https://xlayerrpc.okx.com",
      {
        url: "https://endpoints.omniatech.io/v1/xlayer/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://xlayer.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://xlayer.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.ankr.com/xlayer",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://xlayer.rpc.blxrbdn.com",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://okx-xlayer.rpc.blxrbdn.com",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://flap-xlayer.rpc.blxrbdn.com",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
    ],
  },
  195: {
    rpcs: [
      "https://xlayertestrpc.okx.com",
      "https://testrpc.xlayer.tech",
      {
        url: "https://endpoints.omniatech.io/v1/xlayer/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/xlayer_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://xlayer-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://xlayer-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://moonbase-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "wss://moonbase-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  1287: {
    rpcs: [
      {
        url: "https://rpc.api.moonbase.moonbeam.network",
        tracking: "limited",
        trackingDetails: privacyStatement.MBF,
      },
      {
        url: "wss://wss.api.moonbase.moonbeam.network",
        tracking: "limited",
        trackingDetails: privacyStatement.MBF,
      },
      {
        url: "https://moonbase.unitedbloc.com",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "wss://moonbase.unitedbloc.com",
        tracking: "yes",
        trackingDetails: privacyStatement.unitedbloc,
      },
      {
        url: "https://moonbeam-alpha.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "wss://moonbeam-alpha.api.onfinality.io/public-ws",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://moonbase-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://moonbase-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
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
        url: "https://endpoints.omniatech.io/v1/polygon-zkevm/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
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
  1890: {
    rpcs: [
      "https://replicator.phoenix.lightlink.io/rpc/v1",
      {
        url: "https://endpoints.omniatech.io/v1/lightlink/phoenix/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  1891: {
    rpcs: [
      "https://replicator.pegasus.lightlink.io/rpc/v1",
      {
        url: "https://endpoints.omniatech.io/v1/lightlink/pegasus/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
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
      // {
      //   url: "https://dogechain.ankr.com",
      //   tracking: "limited",
      //   trackingDetails: privacyStatement.ankr,
      // },
      // {
      //   url: "https://dogechain-sj.ankr.com",
      //   tracking: "limited",
      //   trackingDetails: privacyStatement.ankr,
      // },
      {
        url: "https://doge-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  2021: {
    rpcs: [
      "https://mainnet2.edgewa.re/evm",
      "https://mainnet3.edgewa.re/evm",
      "https://edgeware-evm0.jelliedowl.net/",
      "https://edgeware-evm1.jelliedowl.net/",
      "https://edgeware-evm2.jelliedowl.net/",
      "https://edgeware-evm3.jelliedowl.net/",
      {
        url: "https://edgeware.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  3636: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/botanix_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  3637: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/botanix_mainnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  239: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/tac",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://tac.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
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
      {
        url: "https://7001.rpc.thirdweb.com",
        tracking: "yes",
        trackingDetails: privacyStatement.thirdweb,
      },
      {
        url: "https://zetachain-athens.g.allthatnode.com/archive/evm",
        tracking: "yes",
        trackingDetails: privacyStatement.allthatnode,
      },
      {
        url: "https://zeta-chain-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://zetachain-testnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://zetachain-testnet-evm.reliableninjas.com",
        tracking: "none",
        trackingDetails: privacyStatement.reliableninjas,
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
        url: "https://zetachain-mainnet.g.allthatnode.com/archive/evm",
        tracking: "yes",
        trackingDetails: privacyStatement.allthatnode,
      },
      {
        url: "https://zeta-chain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://zeta-chain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://zetachain-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://7000.rpc.thirdweb.com",
        tracking: "yes",
        trackingDetails: privacyStatement.thirdweb,
      },
      {
        url: "https://zetachain-mainnet-evm.reliableninjas.com",
        tracking: "none",
        trackingDetails: privacyStatement.reliableninjas,
      },
      {
        url: "https://api-zetachain-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
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
  2221: {
    rpcs: [
      "https://evm.testnet.kava.io",
      "https://kava-evm-testnet.rpc.thirdweb.com",
      "wss://wevm.testnet.kava.io",
      "https://kava-testnet.drpc.org",
      "wss://kava-testnet.drpc.org",
    ],
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
        url: "https://kava-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "wss://kava-evm-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://evm.kava.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack,
      },
      {
        url: "wss://wevm.kava.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack,
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
      },
      {
        url: "https://kava.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://kava.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://node.histori.xyz/kava-mainnet/8ry9f6t9dct1se2hlagxnd9n2a",
        tracking: "none",
        trackingDetails: privacyStatement.Histori,
      },
      {
        url: "https://kava.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://kava.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
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
      "https://rpc.mantle.xyz",
      {
        url: "https://mantle-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://mantle-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
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
        url: "https://mantle.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://mantle.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://1rpc.io/mantle",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://mantle.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://api.zan.top/mantle-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://endpoints.omniatech.io/v1/mantle/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.owlracle.info/mantle/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://mantle.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://mantle.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-mantle-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  5003: {
    rpcs: [
      "https://rpc.sepolia.mantle.xyz",
      {
        url: "https://endpoints.omniatech.io/v1/mantle/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://mantle-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://mantle-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
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
  5858: {
    rpcs: ["https://rpc.cthscan.com"],
  },
  5869: {
    rpcs: ["https://proxy.wegochain.io"],
  },
  6626: {
    rpcs: ["https://http-mainnet.chain.pixie.xyz"],
  },
  6231991: {
    rpcs: ["https://block-chain.alt.technology", "wss://block-chain.alt.technology/ws"],
  },
  6688: {
    rpcs: [
      "https://evmrpc.irishub-1.irisnet.org",
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
  7181: {
    rpcs: ["https://rpc-sepolia.uxlinkone.com/"],
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
      "https://canto.dexrouting.com",
    ],
  },
  7924: {
    rpcs: ["https://mainnet-rpc.mochain.app/"],
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
      "https://evmos-testnet.drpc.org",
      "wss://evmos-testnet.drpc.org",
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
        url: "https://evmos-jsonrpc.cyphercore.io",
        tracking: "yes",
        trackingDetails: privacyStatement.cyphercore,
      },
      {
        url: "https://evmos.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://evmos.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      "https://eth.bd.evmos.org:8545/",
      {
        url: "https://evmos-json-rpc.stakely.io",
        tracking: "none",
        trackingDetails: privacyStatement.Stakely,
      },
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
        url: "https://evmos.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
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
  11011: {
    rpcs: ["https://sepolia.shape.network"],
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
  23451: {
    rpcs: ["https://rpc.dreyerx.com"],
  },
  23452: {
    rpcs: ["https://testnet-rpc.dreyerx.com"],
  },
  24484: {
    rpcs: [],
    rpcWorking: false,
  },
  24734: {
    rpcs: [
      "https://node1.mintme.com",
      "https://node.1000x.ch",
      {
        url: "https://0xrpc.io/mint",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/mint",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
    ],
  },
  31102: {
    rpcs: ["rpcWorking:false"],
  },
  32323: {
    rpcs: ["https://mainnet.basedaibridge.com/rpc/"],
  },
  32520: {
    rpcs: [
      "https://rpc-bitgert.icecreamswap.com",
      "https://nodes.vefinetwork.org/bitgert",
      "https://flux-rpc.brisescan.com",
      "https://flux-rpc1.brisescan.com",
      "https://flux-rpc2.brisescan.com",
      "https://rpc-1.chainrpc.com",
      "https://rpc-2.chainrpc.com",
      "https://node1.serverrpc.com",
      "https://node2.serverrpc.com",
    ],
  },
  39797: {
    rpcs: ["https://nodeapi.energi.network", "https://explorer.energi.network/api/eth-rpc"],
  },
  39815: {
    rpcs: ["https://mainnet.oho.ai", "https://mainnet-rpc.ohoscan.com", "https://mainnet-rpc2.ohoscan.com"],
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
  63157: {
    rpcs: ["https://geist-mainnet.g.alchemy.com/public"],
  },
  631571: {
    rpcs: ["https://geist-polter.g.alchemy.com/public"],
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
        url: "https://public.stackup.sh/api/v1/node/base-sepolia",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://base-sepolia.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://base-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://base-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://base-sepolia-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://base-sepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://base-sepolia.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://base-testnet.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
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
    ],
  },
  8453: {
    rpcs: [
      "https://mainnet.base.org",
      "https://developer-access-mainnet.base.org",
      "https://li-fi-base.intustechno.workers.dev/rpc",
      {
        url: "https://base-mainnet.diamondswap.org/rpc",
        tracking: "limited",
        trackingDetails: privacyStatement.diamondswap,
      },
      {
        url: "https://base.public.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      {
        url: "https://1rpc.io/base",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://base-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
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
        url: "https://base.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://public.stackup.sh/api/v1/node/base-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://base-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      "https://base.rpc.subquery.network/public",
      {
        url: "wss://base.callstaticrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.callstatic,
      },
      {
        url: "https://api.zan.top/base-mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.zan,
      },
      {
        url: "https://endpoints.omniatech.io/v1/base/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://base.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
      {
        url: "https://rpc.numa.network/base",
        tracking: "yes",
        trackingDetails: privacyStatement.numa,
      },
      {
        url: "https://rpc.owlracle.info/base/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://base.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://rpc.poolz.finance/base",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://base.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://base.rpc.blxrbdn.com",
        tracking: "yes",
        trackingDetails: privacyStatement.bloxroute,
      },
      {
        url: "https://api-base-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  11235: {
    rpcs: [
      "https://rpc.eth.haqq.network",
      {
        url: "https://haqq-evm.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://haqq-evm.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://evm.haqq.sh",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://evm-ws.haqq.sh",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://haqq-mainnet.gateway.tatum.io",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://haqq.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://haqq.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
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
        url: "https://1rpc.io/scroll",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://scroll.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://scroll.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://scroll.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://scroll-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://endpoints.omniatech.io/v1/scroll/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/scroll",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://scroll.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://scroll.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-scroll-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  88888: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/chiliz",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://chiliz-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://api-chiliz-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
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
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://eth-sepolia.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://eth-sepolia-public.unifra.io",
        tracking: "limited",
        trackingDetails: privacyStatement.unifra,
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
        url: "https://api.zan.top/eth-sepolia",
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
      {
        url: "https://public.stackup.sh/api/v1/node/ethereum-sepolia",
        tracking: "limited",
        trackingDetails: privacyStatement.stackup,
      },
      {
        url: "https://ethereum-sepolia-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://eth-testnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://eth-testnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      "https://ethereum-sepolia.rpc.subquery.network/public",
      {
        url: "https://endpoints.omniatech.io/v1/eth/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://0xrpc.io/sep",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/sep",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://rpc.owlracle.info/sepolia/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://ethereum-sepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://ethereum-sepolia.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://eth-sepolia-testnet.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
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
    rpcs: [
      "https://hz.rpc.qkiscan.cn",
      "https://rpc1.qkiscan.cn",
      "https://rpc2.qkiscan.cn",
      "https://rpc3.qkiscan.cn",
      "https://rpc1.qkiscan.io",
      "https://rpc2.qkiscan.io",
      "https://rpc3.qkiscan.io",
    ],
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
    rpcs: [
      "https://devnet.neonevm.org",
      {
        url: "https://neon-evm-devnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://neon-evm-devnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  245022934: {
    rpcs: [
      "https://neon-proxy-mainnet.solana.p2p.org",
      "https://neon-mainnet.everstake.one",
      {
        url: "https://neon-evm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://neon-evm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
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
      "https://palm-testnet.infura.io/v3/${INFURA_API_KEY}",
      "https://palm-testnet.public.blastapi.io",
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
      "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc",
      {
        url: "https://avax-dfk.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  1666600001: {
    rpcs: [
      "https://s1.api.harmony.one",
      {
        url: "https://harmony-1.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://harmony-1.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
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
    rpcs: ["https://rpc-canary-1.bevm.io/", "https://rpc-canary-2.bevm.io/"],
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
    rpcs: ["https://node.atoshi.io", "https://node2.atoshi.io", "https://node3.atoshi.io"],
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
  42766: {
    rpcs: [
      "https://rpc.zkfair.io",
      {
        url: "https://endpoints.omniatech.io/v1/zkfair/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  43851: {
    rpcs: [
      "https://testnet-rpc.zkfair.io",
      {
        url: "https://endpoints.omniatech.io/v1/zkfair/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  88882: {
    rpcs: ["https://spicy-rpc.chiliz.com"],
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
      "https://rpc.v4.testnet.pulsechain.com",
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
      "https://rpc-testnet-pulsechain.g4mm4.io",
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
    rpcs: ["https://mainapi.omaxray.com/"],
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
      {
        url: "https://filecoin.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://filecoin.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://filecoin.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
    ],
  },
  314159: {
    rpcs: [
      {
        url: "https://filecoin-calibration.chainup.net/rpc/v1",
        tracking: "limited",
        trackingDetails: privacyStatement.ChainUpCloud,
      },
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
    rpcs: ["https://evmapi.nuls.io", "https://evmapi2.nuls.io"],
  },
  15551: {
    rpcs: [
      {
        url: "https://api.mainnetloop.com",
        tracking: "limited",
        trackingDetails: privacyStatement.getloop,
      },
    ],
  },
  88888888: {
    rpcs: [
      {
        url: "https://rpc.teamblockchain.team",
        tracking: "none",
        trackingDetails: privacyStatement.teamblockchain,
      },
    ],
  },
  1072: {
    rpcs: [
      {
        url: "https://json-rpc.evm.testnet.shimmer.network/",
        tracking: "none",
        trackingDetails: privacyStatement.iota,
      },
    ],
  },
  1101: {
    rpcs: [
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
        url: "https://polygon-zkevm-mainnet.public.blastapi.io",
        tracking: "limited",
        trackingDetails: privacyStatement.blastapi,
      },
      {
        url: "https://polygon-zkevm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://polygon-zkevm-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://endpoints.omniatech.io/v1/polygon-zkevm/mainnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://node.histori.xyz/polygon-zkevm-mainnet/8ry9f6t9dct1se2hlagxnd9n2a",
        tracking: "none",
        trackingDetails: privacyStatement.Histori,
      },
      {
        url: "https://polygon-zkevm.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  59144: {
    rpcs: [
      "https://rpc.linea.build",
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
      {
        url: "https://rpc.owlracle.info/linea/70d38ce1826c4a60bb2a8e05a6c8b20f",
        tracking: "limited",
        trackingDetails: privacyStatement.owlracle,
      },
      {
        url: "https://linea.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://linea.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://rpc.poolz.finance/linea",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://api-linea-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "https://linea-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
  },
  2442: {
    rpcs: ["https://rpc.cardona.zkevm-rpc.com"],
  },
  59140: {
    rpcs: ["https://rpc.goerli.linea.build"],
  },
  59141: {
    rpcs: [
      "https://rpc.sepolia.linea.build",
      {
        url: "https://linea-sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        tracking: "limited",
        trackingDetails: privacyStatement.infura,
      },
      {
        url: "https://linea-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://linea-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://linea-sepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  534351: {
    rpcs: [
      "https://sepolia-rpc.scroll.io",
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
        trackingDetails: privacyStatement.quicknode,
      },
      {
        url: "https://scroll-sepolia.chainstacklabs.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack,
      },
      {
        url: "https://scroll-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://scroll-sepolia-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      "http://scroll-sepolia-rpc.01no.de:8545/",
      {
        url: "https://endpoints.omniatech.io/v1/scroll/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/scroll_sepolia_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://scroll-sepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  200810: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/bitlayer_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  2390: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/tac_turin",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  431140: {
    rpcs: [
      {
        url: "https://rpc.markr.io/ext/",
        tracking: "none",
        trackingDetails: privacyStatement.markrgo,
      },
    ],
  },
  248: {
    rpcs: [
      "https://rpc.mainnet.oasys.games",
      {
        url: "https://oasys.blockpi.network/v1/rpc/public",
        tracking: "limited",
        trackingDetails: privacyStatement.blockpi,
      },
      "wss://ws.mainnet.oasys.games/",
      {
        url: "https://oasys.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
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
    rpcs: ["https://mainnet-rpc.curvescan.io"],
  },
  167000: {
    rpcs: [
      "https://rpc.taiko.xyz",
      {
        url: "https://rpc.ankr.com/taiko",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.taiko.tools",
        tracking: "none",
        trackingDetails: privacyStatement.taikotools,
      },
      {
        url: "https://taiko-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://taiko-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "https://taiko.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://taiko.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://taiko-mainnet.rpc.porters.xyz/taiko-public",
        tracking: "none",
        trackingDetails: privacyStatement.porters,
      },
      {
        url: "https://taiko-mainnet.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://taiko-json-rpc.stakely.io/",
        tracking: "none",
        trackingDetails: privacyStatement.Stakely,
      },
      {
        url: "https://taiko.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://taiko.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  167009: {
    rpcs: [
      "https://rpc.hekla.taiko.xyz",
      {
        url: "https://rpc.ankr.com/taiko_hekla",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://hekla.taiko.tools",
        tracking: "none",
        trackingDetails: privacyStatement.taikotools,
      },
      {
        url: "https://taiko-hekla.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "wss://taiko-hekla.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f",
        tracking: "limited",
        trackingDetails: privacyStatement["4everland"],
      },
      {
        url: "https://taiko-hekla.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://taiko-hekla.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://hekla-testnet.rpc.porters.xyz/taiko-public",
        tracking: "none",
        trackingDetails: privacyStatement.porters,
      },
      {
        url: "https://taiko-hekla.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://taiko-hekla.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://taiko-hekla-testnet.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
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
      "https://testnet-au-server-2.somanetwork.io",
      "https://testnet-au-server-1.somanetwork.io",
      "https://testnet-sg-server-1.somanetwork.io",
      "https://testnet-sg-server-2.somanetwork.io",
      {
        url: "https://block-mainnet-v1.somanetwork.io",
        tracking: "yes",
        trackingDetails: privacyStatement.soma,
      },
    ],
  },
  2818: {
    rpcs: [
      "https://rpc.morphl2.io",
      "wss://rpc.morphl2.io:8443",
      "https://rpc-quicknode.morphl2.io",
      "wss://rpc-quicknode.morphl2.io",
    ],
  },
  570: {
    rpcs: [
      "wss://rpc.rollux.com/wss",
      "https://rpc.rollux.com",
      "https://rollux.rpc.syscoin.org",
      "wss://rollux.rpc.syscoin.org/wss",
      {
        url: "https://rpc.ankr.com/rollux",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  57000: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/rollux_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  5700: {
    rpcs: [
      "https://rpc.tanenbaum.io",
      {
        url: "https://syscoin-tanenbaum-evm.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://syscoin-tanenbaum-evm.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
  },
  8081: {
    rpcs: [
      "https://liberty20.shardeum.org",
      {
        url: "https://dapps.shardeum.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.shardeum,
      },
    ],
  },
  8082: {
    rpcs: [
      {
        url: "https://sphinx.shardeum.org/",
        tracking: "yes",
        trackingDetails: privacyStatement.shardeum,
      },
    ],
  },
  964: {
    rpcs: [
      {
        url: "https://bittensor-lite-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
    ],
  },
  945: {
    rpcs: [
      {
        url: "https://bittensor-testnet-lite-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
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
  545: {
    rpcs: [
      "https://testnet.evm.nodes.onflow.org",
      {
        url: "https://flow-testnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  747: {
    rpcs: [
      "https://mainnet.evm.nodes.onflow.org",
      {
        url: "https://flow-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  1707: {
    rpcs: ["https://rpc.blockchain.or.th"],
  },
  1708: {
    rpcs: ["https://rpc.testnet.blockchain.or.th"],
  },
  813: {
    rpcs: ["https://mainnet.meerlabs.com"],
  },
  8131: {
    rpcs: ["https://testnet.meerlabs.com"],
  },
  530: {
    rpcs: ["https://fx-json-web3.portfolio-x.xyz:8545/"],
  },
  1003: {
    rpcs: [
      {
        url: "https://rpc.softnote.com/",
        tracking: "yes",
        trackingDetails: privacyStatement.softnote,
      },
    ],
  },
  3639: {
    rpcs: ["https://rpc.ichainscan.com"],
  },
  2049: {
    rpcs: ["https://msc-rpc.movoscan.com/"],
  },
  23294: {
    rpcs: [
      "https://sapphire.oasis.io",
      {
        url: "https://1rpc.io/oasis/sapphire",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
    ],
  },
  1339: {
    rpcs: ["https://rpc.elysiumchain.tech/", "https://rpc.elysiumchain.us/"],
  },
  1338: {
    rpcs: ["https://rpc.atlantischain.network/"],
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
      },
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
      "https://rpc-l1.inan.in.th",
      "https://rpc-l1.jbc.xpool.pw",
      "https://rpc2-l1.jbc.xpool.pw",
    ],
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
    rpcs: ["https://tokioswift.engram.tech", "https://tokio-archive.engram.tech"],
  },
  9030: {
    rpcs: [
      "https://rpc.qubetics.com",
      "https://evm.qubenode.space",
      "https://evm.qubeticstralbo.eu",
      "wss://socket.qubetics.com",
    ],
  },
  2358: {
    rpcs: ["https://api.sepolia.kroma.network"],
  },
  255: {
    rpcs: [
      "https://api.kroma.network",
      {
        url: "https://1rpc.io/kroma",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://kroma.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://kroma.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      "https://rpc-kroma.rockx.com",
    ],
  },
  34443: {
    rpcs: [
      "https://mainnet.mode.network",
      {
        url: "https://1rpc.io/mode",
        tracking: "none",
        trackingDetails: privacyStatement.onerpc,
      },
      {
        url: "https://mode.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://mode.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://mode.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
    ],
  },
  217: {
    rpcs: ["https://rpc2.siriusnet.io"],
  },
  1100: {
    rpcs: [
      "https://jsonrpc.dymension.nodestake.org",
      "https://rollapp.jrpc.cumulo.com.es",
      "https://dymension.liquify.com/json-rpc",
      "https://dymension-evm.kynraze.com",
      "https://dymension.drpc.org",
      "wss://dymension.drpc.org",
      "https://rpc.mainnet.dymension.aviaone.com",
      "https://evm.rpc.mainnet.dymension.aviaone.com",
      "wss://evm.webSocket.mainnet.dymension.aviaone.com",
      {
        url: "https://dymension.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  7070: {
    rpcs: ["https://planq-public.nodies.app", "https://jsonrpc.planq.nodestake.top/"],
  },
  18686: {
    rpcs: [
      {
        url: "https://rpc.mxc.com",
        tracking: "none",
        trackingDetails: privacyStatement.mxc,
      },
      {
        url: "wss://rpc.mxc.com/ws",
        tracking: "none",
        trackingDetails: privacyStatement.mxc,
      },
    ],
  },
  35441: {
    rpcs: [
      {
        url: "https://rpc.q.org",
        tracking: "limited",
        trackingDetails: privacyStatement.q,
      },
    ],
  },
  1992: {
    rpcs: ["https://rpc.hubble.exchange", "wss://ws-rpc.hubble.exchange"],
  },
  128123: {
    rpcs: [
      "https://node.ghostnet.etherlink.com",
      {
        url: "https://rpc.ankr.com/etherlink_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  42793: {
    rpcs: [
      "https://node.mainnet.etherlink.com",
      {
        url: "https://rpc.ankr.com/etherlink_mainnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  881: {
    rpcs: ["https://rpc.hypr.network"],
  },
  5439: {
    rpcs: ["https://mainnet.egochain.org"],
  },
  2525: {
    rpcs: ["https://mainnet.rpc.inevm.com/http"],
  },
  7171: {
    rpcs: ["https://connect.bit-rock.io", "https://brockrpc.io"],
  },
  28882: {
    rpcs: [
      "https://sepolia.boba.network/",
      {
        url: "https://boba-sepolia.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/boba-sepolia",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
    ],
  },
  200901: {
    rpcs: [
      "https://rpc.bitlayer.org",
      {
        url: "https://rpc.ankr.com/bitlayer",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  220312: {
    rpcs: [
      "https://kultrpc.kultchain.com",
    ],
  },
  131313: {
    rpcs: [
      "https://testnode.dioneprotocol.com/ext/bc/D/rpc",
      {
        url: "https://odyssey.nownodes.io",
        tracking: "yes",
        trackingDetails: privacyStatement.nownodes,
      },
      {
        url: "wss://odyssey.nownodes.io/wss",
        tracking: "yes",
        trackingDetails: privacyStatement.nownodes,
      },
    ],
  },
  77001: {
    rpcs: ["https://public-node.api.boraportal.com/bora/mainnet"],
  },
  // 267: {
  //   rpcs: ["https://rpc.ankr.com/neura_testnet"],
  // },
  60808: {
    rpcs: [
      "https://rpc.gobob.xyz",
      "wss://rpc.gobob.xyz",
      {
        url: "https://bob.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://bob.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://bob.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
    ],
  },
  42: {
    rpcs: [
      "https://rpc.mainnet.lukso.network",
      {
        url: "https://rpc.lukso.sigmacore.io",
        tracking: "none",
        trackingDetails: privacyStatement.sigmacore,
      },
      {
        url: "https://42.rpc.thirdweb.com",
        tracking: "yes",
        trackingDetails: privacyStatement.thirdweb,
      },
      {
        url: "https://public-lukso.nownodes.io",
        tracking: "yes",
        trackingDetails: privacyStatement.nownodes,
      },
    ],
  },
  223: {
    rpcs: [
      "https://rpc.bsquared.network",
      "https://b2-mainnet.alt.technology",
      "https://b2-mainnet-public.s.chainbase.com",
      "https://mainnet.b2-rpc.com",
    ],
  },
  2014: {
    rpcs: ["https://rpc.nowscan.io"],
  },
  16180: {
    rpcs: ["https://subnets.avax.network/plyr/mainnet/rpc"],
  },
  62831: {
    rpcs: ["https://subnets.avax.network/plyr/testnet/rpc"],
  },
  10222: {
    rpcs: [
      {
        url: "https://glc-dataseed.glscan.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.glc,
      },
    ],
  },
  12324: {
    rpcs: ["https://rpc-mainnet.l3x.com"],
  },
  12325: {
    rpcs: ["https://rpc-testnet.l3x.com"],
  },
  721: {
    rpcs: [
      "https://rpc.lycanchain.com",
      "https://us-east.lycanchain.com",
      "https://us-west.lycanchain.com",
      "https://eu-north.lycanchain.com",
      "https://eu-west.lycanchain.com",
      "https://asia-southeast.lycanchain.com",
    ],
  },
  62298: {
    rpcs: ["https://rpc.devnet.citrea.xyz"],
  },
  328527624: {
    rpcs: ["https://testnet-rpc.nal.network"],
  },
  328527: {
    rpcs: [
      {
        url: "https://rpc.nal.network",
        tracking: "yes",
        trackingDetails: privacyStatement.nal,
      },
      "wss://wss.nal.network",
    ],
  },
  988207: {
    rpcs: [
      "https://mainnet-rpc.ecroxscan.com",
      "https://quantum-rpc.ecroxscan.com",
      "https://neuron-rpc.ecroxscan.com",
      "https://corex-rpc.ecroxscan.com",
      "https://vertex-rpc.ecroxscan.com",
      "https://synapse-rpc.ecroxscan.com",
      "https://aether-rpc.ecroxscan.com",
      "https://nucleus-rpc.ecroxscan.com",
      "https://omni-rpc.ecroxscan.com",
      "https://axiom-rpc.ecroxscan.com",
      "https://cronos-rpc.ecroxscan.com",
    ],
  },
  7865: {
    rpcs: [
      {
        url: "https://rpc.powerloom.network",
        tracking: "yes",
        trackingDetails: privacyStatement.conduit,
      },
    ],
  },
  7869: {
    rpcs: [
      "https://rpc-v2.powerloom.network",
      {
        url: "https://rpc-v2.powerloom.network",
        tracking: "yes",
        trackingDetails: privacyStatement.conduit,
      },
    ],
  },
  17071: {
    rpcs: [
      {
        url: "https://rpc.onchainpoints.xyz",
        tracking: "yes",
        trackingDetails: privacyStatement.conduit,
      },
    ],
  },
  187: {
    rpcs: ["https://rpc-d11k.dojima.network"],
  },
  184: {
    rpcs: ["https://rpc-test-d11k.dojima.network"],
  },
  18071918: {
    rpcs: ["https://mande-mainnet.public.blastapi.io"],
  },
  48900: {
    rpcs: [
      "https://mainnet.zircuit.com",
      {
        url: "https://mainnet.zircuit.com",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://zircuit1-mainnet.p2pify.com",
        tracking: "yes",
        trackingDetails: privacyStatement.chainstack,
      },
      {
        url: "https://zircuit-mainnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://zircuit-mainnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://zircuit1-mainnet.liquify.com",
        tracking: "yes",
        trackingDetails: privacyStatement.liquify,
      },
    ],
  },
  48899: {
    rpcs: ["https://zircuit1-testnet.p2pify.com/"],
  },
  53456: {
    rpcs: ["https://rpc.birdlayer.xyz", "https://rpc1.birdlayer.xyz", "wss://rpc.birdlayer.xyz/ws"],
  },
  56288: {
    rpcs: [
      "https://bnb.boba.network",
      "https://replica.bnb.boba.network",
      {
        url: "https://boba-bnb.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://gateway.tenderly.co/public/boba-bnb",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://boba-bnb.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://boba-bnb.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  2522: {
    rpcs: ["https://rpc.testnet.frax.com"],
  },
  252: {
    rpcs: [
      "https://rpc.frax.com",
      {
        url: "https://fraxtal.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://fraxtal.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://fraxtal.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://node.histori.xyz/fraxtal-mainnet/8ry9f6t9dct1se2hlagxnd9n2a",
        tracking: "none",
        trackingDetails: privacyStatement.Histori,
      },
      {
        url: "https://fraxtal.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  13473: {
    rpcs: [
      "https://rpc.testnet.immutable.com",
      "https://immutable-zkevm-testnet.drpc.org",
      "wss://immutable-zkevm-testnet.drpc.org",
    ],
  },
  13371: {
    rpcs: [
      "https://rpc.immutable.com",
      "https://immutable-zkevm.drpc.org",
      "wss://immutable-zkevm.drpc.org",
      {
        url: "https://immutable-zkevm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://immutable-zkevm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://immutable.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
    ],
  },
  4202: {
    rpcs: ["https://rpc.sepolia-api.lisk.com"],
  },
  1135: {
    rpcs: [
      "https://rpc.api.lisk.com",
      {
        url: "https://lisk.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://lisk.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://lisk.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://api-lisk-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  656476: {
    rpcs: [
      "https://rpc.open-campus-codex.gelato.digital",
      {
        url: "https://open-campus-codex-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://open-campus-codex-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  111188: {
    rpcs: [
      "https://rpc.realforreal.gelato.digital",
      {
        url: "https://tangible-real.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "wss://tangible-real.gateway.tenderly.co",
        tracking: "yes",
        trackingDetails: privacyStatement.tenderly,
      },
      {
        url: "https://real.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://real.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  999999999: {
    rpcs: ["https://sepolia.rpc.zora.energy"],
  },
  7777777: {
    rpcs: [
      "https://rpc.zora.energy",
      {
        url: "https://zora.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://zora.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://api-zora-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  4162: {
    rpcs: ["https://rpc.sx-rollup.gelato.digital"],
  },
  79479957: {
    rpcs: ["https://rpc.sx-rollup-testnet.t.raas.gelato.cloud"],
  },
  388: {
    rpcs: [
      "https://mainnet.zkevm.cronos.org",
      {
        url: "https://cronos-zkevm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://cronos-zkevm.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  20230825: {
    rpcs: [
      "https://testnet.vcity.app",
      {
        url: "https://testnet.vcity.app",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
    ],
  },
  996: {
    rpcs: ["https://hk.p.bifrost-rpc.liebi.com"],
  },
  133: {
    rpcs: ["https://hashkeychain-testnet.alt.technology"],
  },
  1946: {
    rpcs: [
      "https://rpc.minato.soneium.org/",
      {
        url: "https://soneium-minato.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://soneium-minato.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  41455: {
    rpcs: [
      "https://rpc.alephzero.raas.gelato.cloud",
      "wss://ws.alephzero.raas.gelato.cloud",
      {
        url: "https://alephzero.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://alephzero.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1111: {
    rpcs: [
      "https://api.wemix.com",
      "wss://ws.wemix.com",
      {
        url: "https://wemix.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://wemix.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1513: {
    rpcs: [
      "https://testnet.storyrpc.io",
      "https://story-evm-testnet-rpc.tech-coha05.xyz",
      "https://story-rpc.oneiricts.com:8445",
      "https://evm-rpc-story.josephtran.xyz",
      "https://lightnode-json-rpc-story.grandvalleys.com",
      {
        url: "https://story-rpc01.originstake.com",
        tracking: "none",
        trackingDetails: privacyStatement.originstake,
      },
      "https://story-rpc-evm.mandragora.io",
      "https://story-testnet-jsonrpc.blockhub.id",
      "https://rpc-storyevm-testnet.aldebaranode.xyz",
      "https://story-testnet.nodeinfra.com",
    ],
  },
  1516: {
    rpcs: [
      "https://odyssey.storyrpc.io",
      "https://lightnode-json-rpc-story.grandvalleys.com",
      "https://odyssey-evm.spidernode.net",
      "https://story-rpc-evm-odyssey.mandragora.io",
      "https://evm-rpc-story.josephtran.xyz",
      "https://story.evm.t.stavr.tech",
      "https://story-testnet-jsonrpc.blockhub.id",
      "https://story-testnet-jsonrpc.daaps-j4ran.cloud",
      {
        url: "https://story-testnet-evm.itrocket.net",
        tracking: "none",
        trackingDetails: privacyStatement.itrocket,
      },
      "https://story-rpc-evm.validatorvn.com",
      "https://rpc-storyevm-testnet.aldebaranode.xyz",
      "https://rpc-evm-story.rawaki.xyz",
      "https://story-odyssey-rpc.auranode.xyz",
      {
        url: "https://evm-rpc.story.testnet.dteam.tech",
        tracking: "none",
        trackingDetails: privacyStatement.DTEAM,
      },
      {
        url: "https://evm-rpc-2.story.testnet.dteam.tech",
        tracking: "none",
        trackingDetails: privacyStatement.DTEAM,
      },
      {
        url: "https://evm-rpc-3.story.testnet.dteam.tech",
        tracking: "none",
        trackingDetails: privacyStatement.DTEAM,
      },
    ],
  },

  16600: {
    rpcs: [
      "https://evmrpc-testnet.0g.ai",
      "https://0g-json-rpc-public.originstake.com",
      "https://og-testnet-jsonrpc.blockhub.id",
      {
        url: "https://0g-json-rpc-public.originstake.com",
        tracking: "none",
        trackingDetails: privacyStatement.originstake,
      },
      {
        url: "https://og-testnet-evm.itrocket.net",
        tracking: "none",
        trackingDetails: privacyStatement.itrocket,
      },
      {
        url: "https://lightnode-json-rpc-0g.grandvalleys.com",
        tracking: "none",
        trackingDetails: privacyStatement.GrandValley,
      },
      {
        url: "https://rpc.ankr.com/0g_newton",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      "https://0g-evm-rpc.murphynode.net",
      {
        url: "https://0g-newton-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://0g-newton-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1740: {
    rpcs: [
      "https://testnet.rpc.metall2.com",
      {
        url: "https://metall2-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://metall2-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1750: {
    rpcs: [
      "https://rpc.metall2.com",
      {
        url: "https://metall2.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://metall2.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  80008: {
    rpcs: ["https://rpc.sepolia.polynomial.fi"],
  },
  8008: {
    rpcs: ["https://rpc.polynomial.fi"],
  },
  8428: {
    rpcs: ["https://api.thatchain.io", "https://api.thatchain.io/mainnet"],
  },
  5115: {
    rpcs: ["https://rpc.testnet.citrea.xyz"],
  },

  14800: {
    rpcs: [
      "https://rpc.moksha.vana.org",
      "https://rpc-moksha-vana.josephtran.xyz",
      "https://moksha-vana-rpc.tech-coha05.xyz",
    ],
  },
  55244: {
    rpcs: [
      {
        url: "https://rpc.superposition.so",
        tracking: "yes",
        trackingDetails: privacyStatement.conduit,
      },
    ],
  },
  8668: {
    rpcs: ["https://mainnet-rpc.helachain.com"],
  },
  698: {
    rpcs: ["https://rpc.matchain.io", "https://rpc.ankr.com/matchain_mainnet"],
  },
  251: {
    rpcs: [
      {
        url: "wss://rpc-api.glideprotocol.xyz/l1-rpc",
        tracking: "none",
        trackingDetails: privacyStatement.glidexp,
      },
      {
        url: "https://rpc-api.glideprotocol.xyz/l1-rpc",
        tracking: "none",
        trackingDetails: privacyStatement.glidexp,
      },
    ],
  },
  253: {
    rpcs: [
      {
        url: "wss://rpc-api.glideprotocol.xyz/l2-rpc",
        tracking: "none",
        trackingDetails: privacyStatement.glidexp,
      },
      {
        url: "https://rpc-api.glideprotocol.xyz/l2-rpc",
        tracking: "none",
        trackingDetails: privacyStatement.glidexp,
      },
    ],
  },
  7332: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/horizen_eon",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1663: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/horizen_gobi_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  52014: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/electroneum",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  5201420: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/electroneum_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  6060: {
    rpcs: [
      {
        url: "https://rpc01.bchscan.io/",
        tracking: "none",
        trackingDetails: privacyStatement.bctech,
      },
    ],
  },
  25327: {
    rpcs: [
      {
        url: "https://everclear.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://everclear.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  383353: {
    rpcs: [
      "https://rpc.cheesechain.xyz",
      "https://rpc.cheesechain.xyz/http",
      "https://cheesechain.calderachain.xyz/http",
      "wss://cheesechain.calderachain.xyz/ws",
    ],
  },
  6900: {
    rpcs: ["https://evm-rpc.nibiru.fi", "wss://evm-rpc-ws.nibiru.fi"],
  },
  383414847825: {
    rpcs: ["https://api.zeniq.network"],
  },
  1319: {
    rpcs: [
      "https://aia-dataseed2.aiachain.org",
      "https://aia-dataseed3.aiachain.org",
      "https://aia-dataseed1.aiachain.org",
      "https://aia-dataseed4.aiachain.org",
      "https://aiachain.bycrpc.com",
      "https://aiachain.znodes.net",
    ],
  },
  2192: {
    rpcs: [
      "https://mainnet.snaxchain.io",
      {
        url: "https://snaxchain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://snaxchain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1328: {
    rpcs: [
      "https://evm-rpc-testnet.sei-apis.com",
      "wss://evm-ws-testnet.sei-apis.com",
      {
        url: "https://sei-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://sei-testnet-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "wss://sei-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1329: {
    rpcs: [
      "https://evm-rpc.sei-apis.com",
      {
        url: "https://sei.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://sei.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://sei-evm-rpc.stakeme.pro",
        tracking: "none",
        trackingDetails: privacyStatement.STAKEME,
      },
      {
        url: "https://sei-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "https://sei.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://sei.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  130: {
    rpcs: [
      "https://mainnet.unichain.org/",
      {
        url: "https://unichain.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://unichain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "wss://unichain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://unichain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://unichain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://0xrpc.io/uni",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/uni",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://unichain.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://unichain-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://rpc.poolz.finance/unichain",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
      {
        url: "https://api-unichain-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  1301: {
    rpcs: [
      "https://sepolia.unichain.org",
      {
        url: "https://endpoints.omniatech.io/v1/unichain/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://unichain-sepolia.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://unichain-sepolia-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://unichain-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://unichain-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://unichain-sepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  50312: {
    rpcs: [
      "https://dream-rpc.somnia.network",
      "https://rpc.ankr.com/somnia_testnet/6e3fd81558cf77b928b06b38e9409b4677b637118114e83364486294d5ff4811",
    ],
  },
  763373: {
    rpcs: [
      "https://rpc-gel-sepolia.inkonchain.com",
      "wss://ws-gel-sepolia.inkonchain.com",
      {
        url: "https://ink-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://ink-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  57073: {
    rpcs: [
      "https://rpc-gel.inkonchain.com",
      "https://rpc-qnd.inkonchain.com",
      "wss://rpc-gel.inkonchain.com",
      "wss://rpc-qnd.inkonchain.com",
      {
        url: "https://ink.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://ink-public.nodies.app",
        tracking: "limited",
        trackingDetails: privacyStatement.nodies,
      },
      {
        url: "wss://ink.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://ink.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
    ],
  },
  3441006: {
    rpcs: [
      "https://pacific-rpc.sepolia-testnet.manta.network/http",
      "https://manta-sepolia.rpc.caldera.xyz/http",
      "wss://manta-sepolia.rpc.caldera.xyz/ws",
      {
        url: "https://endpoints.omniatech.io/v1/manta-pacific/sepolia/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
    ],
  },
  531050104: {
    rpcs: [
      "https://rpc.testnet.sophon.xyz",
      {
        url: "https://rpc-quicknode.testnet.sophon.xyz",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
    ],
  },
  50104: {
    rpcs: [
      "https://rpc.sophon.xyz",
      {
        url: "https://rpc-quicknode.sophon.xyz",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
    ],
  },
  33139: {
    rpcs: [
      "https://rpc.apechain.com",
      "wss://rpc.apechain.com/ws",
      {
        url: "https://apechain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://apechain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  33111: {
    rpcs: [
      "https://rpc.curtis.apechain.com",
      "https://curtis.rpc.caldera.xyz/http",
      "wss://curtis.rpc.caldera.xyz/ws",
      {
        url: "https://apechain-curtis.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://apechain-curtis.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  151: {
    rpcs: ["https://governors.mainnet.redbelly.network"],
  },
  78600: {
    rpcs: ["https://rpc-vanguard.vanarchain.com"],
  },
  2040: {
    rpcs: ["https://rpc.vanarchain.com"],
  },
  21000000: {
    rpcs: [
      {
        url: "https://mainnet.corn-rpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.ankr.com/corn_maizenet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://maizenet-rpc.usecorn.com",
        tracking: "none",
        trackingDetails: privacyStatement.conduit,
      },
    ],
  },
  21000001: {
    rpcs: [
      {
        url: "https://testnet.corn-rpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.ankr.com/corn_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://testnet-rpc.usecorn.com",
        tracking: "none",
        trackingDetails: privacyStatement.conduit,
      },
    ],
  },
  43521: {
    rpcs: [
      {
        url: "https://rpc.formicarium.memecore.net",
        tracking: "none",
        trackingDetails: privacyStatement.MemeCore,
      },
      {
        url: "wss://ws.formicarium.memecore.net",
        tracking: "none",
        trackingDetails: privacyStatement.MemeCore,
      },
    ],
  },

  1480: {
    rpcs: [
      "https://rpc.vana.org",
      "https://evm-rpc-vana.josephtran.xyz",
      "https://evm-rpc-vana.j-node.net",
      "https://islander-vana-rpc.spidernode.net",
    ],
  },
  543210: {
    rpcs: [
      "https://rpc.zerion.io/v1/zero",
      {
        url: "https://zero.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://zero.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  146: {
    rpcs: [
      "https://rpc.soniclabs.com",
      {
        url: "https://sonic.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://sonic.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.ankr.com/sonic_mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "wss://sonic.callstaticrpc.com",
        tracking: "none",
        trackingDetails: privacyStatement.callstatic,
      },
      {
        url: "https://sonic.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://sonic.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://sonic-json-rpc.stakely.io/",
        tracking: "none",
        trackingDetails: privacyStatement.Stakely,
      },
      {
        url: "https://sonic.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-sonic-mainnet-archive.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  57054: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/sonic_blaze_testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://sonic-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://sonic-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://sonic-blaze.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  1514: {
    rpcs: [
      "https://mainnet.storyrpc.io",
      "https://story-evm-rpc.spidernode.net",
      {
        url: "https://evm-rpc.story.mainnet.dteam.tech",
        tracking: "none",
        trackingDetails: privacyStatement.DTEAM,
      },
      {
        url: "https://lightnode-json-rpc-mainnet-story.grandvalleys.com",
        tracking: "none",
        trackingDetails: privacyStatement.GrandValley,
      },
      "https://evm-rpc-story.j-node.net",
      "https://story-evm-rpc.krews.xyz",
      "https://evmrpc.story.nodestake.org",
      "https://story-mainnet.zenithnode.xyz",
      "https://evm-rpc.story.silentvalidator.com",
      "https://story-mainnet-evmrpc.mandragora.io",
      "https://rpc-storyevm.aldebaranode.xyz",
      "https://evm.story.cumulo.me",
      {
        url: "https://rpc.ankr.com/story_mainnet",
        tracking: "none",
        trackingDetails: privacyStatement.bctech,
      },
      "https://evm-rpc-archive.story.node75.org",
    ],
  },
  3030: {
    rpcs: [
      {
        url: "https://datahub-asia01.bchscan.io/",
        tracking: "none",
        trackingDetails: privacyStatement.bctech,
      },
    ],
  },
  42070: {
    rpcs: ["https://rpc-testnet-base.worldmobile.net"],
  },
  10143: {
    rpcs: [
      {
        url: "https://monad-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://monad-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.ankr.com/monad_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://rpc.ankr.com/monad_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://monad-testnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://monad-testnet.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      "https://rpc-testnet.monadinfra.com",
      {
        url: "https://monad-testnet.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
    ],
  },
  80094: {
    rpcs: [
      "https://rpc.berachain.com",
      {
        url: "https://berachain-rpc.publicnode.com",
        tracking: "none",
        trackingDetails: privacyStatement.publicnode,
      },
      {
        url: "https://berachain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://berachain.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.berachain-apis.com",
        tracking: "none",
        trackingDetails: privacyStatement.RHINO,
      },
      {
        url: "wss://rpc.berachain-apis.com",
        tracking: "none",
        trackingDetails: privacyStatement.RHINO,
      },
      {
        url: "https://berachain.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://berachain-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://berachain.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "https://api-berachain-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  2741: {
    rpcs: [
      "https://api.mainnet.abs.xyz",
      {
        url: "https://abstract.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://abstract.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://abstract.api.onfinality.io/public",
        tracking: "limited",
        trackingDetails: privacyStatement.onfinality,
      },
      {
        url: "https://abstract-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  20250217: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/xphere_mainnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1998991: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/xphere_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  1868: {
    rpcs: [
      "https://rpc.soneium.org",
      {
        url: "https://soneium.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://soneium.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  2345: {
    rpcs: [
      "https://rpc.goat.network",
      {
        url: "https://goat-mainnet-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://goat-mainnet-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://rpc.ankr.com/goat_mainnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  48816: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/goat_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  660279: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/xai",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  47279324479: {
    rpcs: [
      {
        url: "https://rpc.ankr.com/xai_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
    ],
  },
  31611: {
    rpcs: [
      "https://rpc.test.mezo.org",
      {
        url: "https://mezo-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://mezo-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  133: {
    rpcs: [
      "https://hashkeychain-testnet.alt.technology",
      {
        url: "https://hashkey-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://hashkey-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  89: {
    rpcs: [
      "https://rpc-testnet.viction.xyz",
      {
        url: "https://viction-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://viction-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1112: {
    rpcs: [
      "https://api.test.wemix.com",
      "wss://ws.test.wemix.com",
      {
        url: "https://wemix-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://wemix-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  808813: {
    rpcs: [
      "https://bob-sepolia.rpc.gobob.xyz",
      "wss://bob-sepolia.rpc.gobob.xyz",
      {
        url: "https://bob-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://bob-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  8691942025: {
    rpcs: ["https://rpc.onfa.io", "https://rpc.onfachain.com", "wss://ws.onfachain.com", "wss://ws.onfa.io"],
  },
  232: {
    rpcs: [
      "https://rpc.lens.xyz",
      {
        url: "https://light-icy-dinghy.lens-mainnet.quiknode.pro",
        tracking: "yes",
        trackingDetails: privacyStatement.quicknode,
      },
      {
        url: "https://lens-mainnet.g.alchemy.com/public",
        tracking: "yes",
        trackingDetails: privacyStatement.alchemy,
      },
      {
        url: "https://lens.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  37111: {
    rpcs: [
      "https://rpc.testnet.lens.dev",
      {
        url: "https://lens-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://lens-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1315: {
    rpcs: [
      "https://aeneid.storyrpc.io/",
      "https://evm-aeneid-story.j-node.net",
      "https://evmrpc-t.story.nodestake.org",
      "https://json-rpc.story-aeneid.cumulo.me",
      {
        url: "https://lightnode-json-rpc-story.grandvalleys.com",
        tracking: "none",
        trackingDetails: privacyStatement.GrandValley,
      },
      {
        url: "https://rpc.ankr.com/story_aeneid_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      "https://aeneid-evm-rpc.krews.xyz",
      "https://story-aeneid-rpc.spidernode.net",
      "https://evm-rpc.story.testnet.node75.org",
      "https://story-aeneid-json-rpc.auranode.xyz",
    ],
  },
  224433: {
    rpcs: [
      "https://cancun-rpc.conet.network",
      "https://rpc.conet.network",
      {
        url: "https://conet.network/",
        tracking: "none",
        trackingDetails: privacyStatement.alchemy,
      },
    ],
  },
  224400: {
    rpcs: [
      "https://mainnet-rpc.conet.network",
      {
        url: "https://conet.network/",
        tracking: "none",
        trackingDetails: privacyStatement.alchemy,
      },
    ],
  },
  4352: {
    rpcs: [
      {
        url: "https://rpc.memecore.net",
        tracking: "none",
        trackingDetails: privacyStatement.MemeCore,
      },
      {
        url: "wss://ws.memecore.net",
        tracking: "none",
        trackingDetails: privacyStatement.MemeCore,
      },
    ],
  },
  5464: {
    rpcs: ["https://sagaevm.jsonrpc.sagarpc.io"],
  },
  911867: {
    rpcs: [
      {
        url: "https://odyssey.ithaca.xyz",
        tracking: "yes",
        trackingDetails: privacyStatement.conduit,
      },
    ],
  },
  108160679: {
    rpcs: [
      "https://evm.orai.io",
      {
        url: "https://oraichain-mainnet-evm.itrocket.net",
        tracking: "none",
        trackingDetails: privacyStatement.itrocket,
      },
    ],
  },
  3073: {
    rpcs: [
      "https://mainnet.movementnetwork.xyz/v1",
      {
        url: "https://movement.lava.build",
        tracking: "yes",
        trackingDetails: privacyStatement.lava,
      },
    ],
  },
  16166: {
    rpcs: ["https://pubnodes.cypherium.io/rpc", "https://make-cph-great-again.community"],
  },
  560048: {
    rpcs: [
      {
        url: "https://rpc.hoodi.ethpandaops.io",
      },
      {
        url: "https://0xrpc.io/hoodi",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "wss://0xrpc.io/hoodi",
        tracking: "none",
        trackingDetails: privacyStatement["0xRPC"],
      },
      {
        url: "https://ethereum-hoodi.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
    ],
  },
  295: {
    rpcs: ["https://hedera.linkpool.pro"],
  },
  11124: {
    rpcs: [
      {
        url: "https://abstract-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://abstract-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  80069: {
    rpcs: [
      {
        url: "https://berachain-bepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://berachain-bepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://berachain-bepolia.therpc.io",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
    ],
  },
  919: {
    rpcs: [
      {
        url: "https://mode-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://mode-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  7849306: {
    rpcs: [
      {
        url: "https://ozean-poseidon-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://ozean-poseidon-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  2020: {
    rpcs: [
      {
        url: "https://ronin.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://ronin.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://ronin-mainnet.gateway.tatum.io/",
        tracking: "yes",
        trackingDetails: privacyStatement.tatum,
      },
      {
        url: "https://api-ronin-mainnet.n.dwellir.com/2ccf18bf-2916-4198-8856-42172854353c",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
  },
  31: {
    rpcs: [
      {
        url: "https://rootstock-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://rootstock-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  713715: {
    rpcs: [
      {
        url: "https://sei-devnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://sei-devnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  5330: {
    rpcs: [
      {
        url: "https://superseed.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://superseed.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  728126428: {
    rpcs: [
      {
        url: "https://tron.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://tron.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://tron.therpc.io/jsonrpc",
        tracking: "limited",
        trackingDetails: privacyStatement.therpc,
      },
      {
        url: "https://tron.api.pocket.network",
        tracking: "none",
        trackingDetails: privacyStatement.pokt,
      },
      {
        url: "public-trx-mainnet.fastnode.io",
        tracking: "none",
        trackingDetails: privacyStatement.fastnode,
      },
    ],
  },

  48898: {
    rpcs: [
      {
        url: "https://zircuit-garfield-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://zircuit-garfield-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  48899: {
    rpcs: [
      {
        url: "https://zircuit-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://zircuit-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  13505: {
    rpcs: [
      "https://rpc-sepolia.gravity.xyz",
      {
        url: "https://gravity-alpha-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://gravity-alpha-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  73115: {
    rpcs: [
      "https://rpc1-mainnet.icbnetwork.info",
      "https://rpc2-mainnet.icbnetwork.info",
      "https://main1.rpc-icb-network.io",
      "https://main2.rpc-icb-network.io",
      "https://mahour.icbnetwork.info"
    ],
  },
  2632500: {
    rpcs: [
      "https://coti-rpc.Hyperflow.finance",
      "wss://coti-rpc.Hyperflow.finance",
      {
        url: "https://rpc.poolz.finance/coti",
        tracking: "limited",
        trackingDetails: privacyStatement.poolz,
      },
    ],
  },
  7082400: {
    rpcs: ["https://coti-test-rpc.Hyperflow.finance", "wss://coti-test-rpc.Hyperflow.finance"],
  },
  7233: {
    rpcs: ["https://rpc-mainnet.inichain.com"],
  },
  42421: {
    rpcs: [
      "https://enugu-rpc.assetchain.org",
      "https://eth.nodebridge.xyz/assetchaintestnet/exec/b903e07d-54ee-4c4d-bffb-8b073e8163fa",
    ],
  },
  43111: {
    rpcs: [
      "https://rpc.hemi.network/rpc",
      {
        url: "https://hemi.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://hemi.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  743111: {
    rpcs: [
      {
        url: "https://hemi-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://hemi-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  42420: {
    rpcs: [
      "https://mainnet-rpc.assetchain.org",
      "https://eth.nodebridge.xyz/assetchain/exec/b2da3d33-5708-4f61-8d1e-2c677124c35a",
    ],
  },
  2691: {
    rpcs: [
      {
        url: "https://mainnet-rpc.splendor.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      },
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  2692: {
    rpcs: [
      {
        url: "https://testnet-rpc.splendor.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      },
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  2691: {
    rpcs: [
      {
        url: "https://mainnet-rpc.splendor.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      },

      {
        url: "https://splendor-rpc.org/",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      },
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  2692: {
    rpcs: [
      {
        url: "https://testnet-rpc.splendor.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      },
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  123999: {
    rpcs: [
      {
        url: "https://a-rpc.nobody.network",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  8678671: {
    rpcs: [
      {
        url: "https://vncscan.io",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
   5031: {
    rpcs: [
      "https://rpc.somnia.network",
      "https://somnia-json-rpc.stakely.io",
      "https://somnia-rpc.publicnode.com"
    ],
  },
   9745: {
    rpcs: [
      {
        url: "https://plasma.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12123: {
    rpcs: [
      {
        url: "https://hoodi.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  300: {
    rpcs: [
      {
        url: "https://celo-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12124: {
    rpcs: [
      {
        url: "https://eth-beacon-chain-hoodi.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12125: {
    rpcs: [
      {
        url: "https://sonic-testnet-v2.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12126: {
    rpcs: [
      {
        url: "https://hyperliquid.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12127: {
    rpcs: [
      {
        url: "https://monad-testnet.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12128: {
    rpcs: [
      {
        url: "https://hemi.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12129: {
    rpcs: [
      {
        url: "https://hemi-testnet.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12130: {
    rpcs: [
      {
        url: "https://gnosis-beacon-chain.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  12131: {
    rpcs: [
      {
        url: "https://gnosis-chiado.drpc.org",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
      }
    ],
    websiteDead: false,
    rpcWorking: true,
  },
  98866: {
    rpcs: [
      {
        url: "https://plume.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://plume.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  747474: {
    rpcs: [
      {
        url: "https://katana.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://katana.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  737373: {
    rpcs: [
      {
        url: "https://katana-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://katana-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  97477: {
    rpcs: [
      {
        url: "https://doma.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://doma.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  5042002: {
    rpcs: [
      {
        url: "https://arc-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://arc-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  55930: {
    rpcs: [
      {
        url: "https://services.datahaven-mainnet.network/mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.DHF,
      },
      {
        url: "wss://services.datahaven-mainnet.network/mainnet",
        tracking: "limited",
        trackingDetails: privacyStatement.DHF,
      },
    ],
  },
  55931: {
    rpcs: [
      {
        url: "https://services.datahaven-testnet.network/testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.DHF,
      },
      {
        url: "wss://services.datahaven-testnet.network/testnet",
        tracking: "limited",
        trackingDetails: privacyStatement.DHF,
      },
    ],
  },
 109: {
    rpcs: [
      {
        url: "https://shibarium.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://shibarium.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
  },
  1440000: {
    rpcs: [
      {
        url: "https://xrplevm.buildintheshade.com",
        tracking: "limited",
        trackingDetails: privacyStatement.grove,
      },
      {
        url: "wss://xrplevm.buildintheshade.com",
        tracking: "limited",
        trackingDetails: privacyStatement.grove,
      },
    ]
  },
  1449000: {
    rpcs: [
      {
        url: "https://xrplevm-testnet.buildintheshade.com",
        tracking: "limited",
        trackingDetails: privacyStatement.grove,
      },
      {
       url: "wss://xrplevm-testnet.buildintheshade.com",
        tracking: "limited",
        trackingDetails: privacyStatement.grove,
      },
    ]
  },
  766: {
    rpcs: [
       {
        url: "https://evm-rpc-ql1.foxxone.one",
        tracking: "none",
        trackingDetails: "No user tracking or data collection",
       },
    ],
  },
   31612: {
    rpcs: [
      {
        url: "https://mezo.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://mezo.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ],
},
  31611: {
    rpcs: [
      {
        url: "https://mezo-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://mezo-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  9745: {
    rpcs: [
      {
       url: "wss://plasma.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  54211: {
    rpcs: [
      {
        url: "https://haqq-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://haqq-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  2345: {
    rpcs: [
      {
        url: "https://goat-mainnet-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://goat-mainnet-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  48816: {
    rpcs: [
      {
        url: "https://goat-testnet3.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://goat-testnet3.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  14601: {
    rpcs: [
      {
        url: "https://sonic-testnet-v2.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://sonic-testnet-v2.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  56: {
    rpcs: [
      {
       url: "wss://bsc.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  534352: {
    rpcs: [
      {
       url: "wss://scroll.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  534351: {
    rpcs: [
      {
       url: "wss://scroll-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  2522: {
    rpcs: [
      {
        url: "https://fraxtal-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://fraxtal-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  42161: {
    rpcs: [
      {
       url: "wss://arbitrum.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  42170: {
    rpcs: [
      {
       url: "wss://arbitrum-nova.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  88153591557: {
    rpcs: [
      {
        url: "https://arb-blueberry-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://arb-blueberry-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  240: {
    rpcs: [
      {
        url: "https://cronos-zkevm-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://cronos-zkevm-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  11142220: {
    rpcs: [
      {
        url: "https://celo-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://celo-sepolia.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  43114: {
    rpcs: [
      {
       url: "wss://avalanche.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  1287: {
    rpcs: [
      {
        url: "https://moonbase-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://moonbase-alpha.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  8217: {
    rpcs: [
      {
       url: "wss://klaytn.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  1001: {
    rpcs: [
      {
        url: "https://klaytn-baobab.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://klaytn-baobab.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  5611: {
    rpcs: [
      {
        url: "https://opbnb-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://opbnb-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  80002: {
    rpcs: [
      {
       url: "wss://polygon-amoy.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  2442: {
    rpcs: [
      {
        url: "https://polygon-zkevm-cardona.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
       url: "wss://polygon-zkevm-cardona.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
  100: {
    rpcs: [
      {
       url: "wss://gnosis.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
    ]
 },
};

const allExtraRpcs = mergeDeep(llamaNodesRpcs, extraRpcs);

export default allExtraRpcs;
