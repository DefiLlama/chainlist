// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
* @title QNT89A7F3C2
* @dev ERC20 compatibile con OpenZeppelin, includendo:
* - Ownable compatibile con OZ <4.9 e =4.9 (costruttore senza parametri)
* - Max Supply immutabile impostato al deploy
* - Mint controllato verso la Riserva Sovrana
* - Burn da parte dell'owner o volontario da parte di qualunque holder
* - Funzione di rilascio token dalla riserva ad un destinatario
*/
contract QNT89A7F3C2 is ERC20, Ownable {
    using Strings for uint256;

    uint256 public immutable maxSupply; // Max supply espressa in unità minime (decimali inclusi)

    event TokensReleased(address indexed to, uint256 amount);
    event ReserveMinted(uint256 amount, uint256 newReserve);
    event TokensBurned(address indexed from, uint256 amount, uint256 newTotalSupply);

    /**
    * @dev Costruttore
    * @param initialSupply supply iniziale in token interi (senza decimali)
    * @param _maxSupply supply massimo in token interi
    */
    constructor(uint256 initialSupply, uint256 _maxSupply)
    ERC20("QNT-89A7F3C2", "QNT89")
    Ownable(msg.sender)
    {
        require(initialSupply <= _maxSupply, "Initial exceeds max");
        maxSupply = _maxSupply * (10 ** decimals());
        _mint(address(this), initialSupply * (10 ** decimals()));
    }

    /**
    * @dev Rilascia token interi dalla riserva ad un destinatario
    */
    function releaseTokens(address to, uint256 tokenAmount) public onlyOwner {
        uint256 amountWithDecimals = tokenAmount * (10 ** decimals());
        uint256 currentReserveTokens = balanceOf(address(this)) / (10 ** decimals());

        require(
            balanceOf(address(this)) >= amountWithDecimals,
            string(
                abi.encodePacked(
                    "Riserva insufficiente. Disponibili: ",
                    currentReserveTokens.toString(),
                    " token"
                )
            )
        );

        _transfer(address(this), to, amountWithDecimals);
        emit TokensReleased(to, amountWithDecimals);
    }

    /**
    * @dev Crea nuovi token nella riserva, senza superare maxSupply
    */
    function mintToReserve(uint256 tokenAmount) public onlyOwner {
        uint256 amountWithDecimals = tokenAmount * (10 ** decimals());
        require(totalSupply() + amountWithDecimals <= maxSupply, "Max supply exceeded");

        _mint(address(this), amountWithDecimals);
        emit ReserveMinted(tokenAmount, reserveBalanceTokens());
    }

    /**
    * @dev Brucia token dalla riserva (solo Owner)
    */
    function burnFromReserve(uint256 tokenAmount) public onlyOwner {
        uint256 amountWithDecimals = tokenAmount * (10 ** decimals());
        require(balanceOf(address(this)) >= amountWithDecimals, "Not enough in reserve");

        _burn(address(this), amountWithDecimals);
        emit TokensBurned(address(this), amountWithDecimals, totalSupply());
    }

    /**
    * @dev Brucia token dal proprio saldo (chiunque)
    */
    function burn(uint256 tokenAmount) public {
        uint256 amountWithDecimals = tokenAmount * (10 ** decimals());
        require(balanceOf(msg.sender) >= amountWithDecimals, "Not enough balance");

        _burn(msg.sender, amountWithDecimals);
        emit TokensBurned(msg.sender, amountWithDecimals, totalSupply());
    }

    /**
    * @dev Lettura riserva in token interi
    */
    function reserveBalanceTokens() public view returns (uint256) {
        return balanceOf(address(this)) / (10 ** decimals());
    }
}
