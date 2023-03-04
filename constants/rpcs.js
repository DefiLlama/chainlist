import { mergeDeep } from "../utils";

import { extraRpcs } from "./extraRpcs";

import { llamaNodesRpcs } from "./llamaNodesRpcs";

const privacyStatement = {
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
    "We do use analytics at 3rd party tracking websites (Google Analytics & Google Search Console) the following intercations with our systems are automatically logged when you access our services, such as your Internet Protocol (IP) address, browser, device information, location information (including approximate location derived from IP address), and Internet Service Provider (ISP) aswell as accessed servcies and pages",
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
    "When you access and use our website or related services we may automatically collect information about your device and usage of our website, products and services, including your operating system, browser type, time spent on certain pages of the website/pages visited/links clicked/language preferences. https://onfinality.io/privacy"
};

const allRpcs = mergeDeep(llamaNodesRpcs, extraRpcs);

export default allRpcs;
