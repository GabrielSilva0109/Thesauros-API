pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether, "Entrada requer uma quantia mínima de 0.01 BNB");
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        delete players;
    }

    modifier restricted() {
        require(msg.sender == manager, "Apenas o gerente pode chamar esta função");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
