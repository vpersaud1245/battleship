/*
1.Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
2.Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack 
hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
3.Gameboards should keep track of missed attacks so they can display them properly.
4.Gameboards should be able to report whether or not all of their ships have been sunk.
*/

import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.gameboard = [...Array(10)].map((x) => Array(10));
    this.ships = [];
    this.coordinatesAttacked = [];
  }

  getIndex(coordinate) {
    return coordinate - 1;
  }

  placeShip(xcoordinate, ycoordinate, shipLength, direction) {
    const newShip = new Ship(shipLength);
    const xIndex = this.getIndex(xcoordinate);
    const yIndex = this.getIndex(ycoordinate);
    this.gameboard[yIndex][xIndex] = newShip;
    if (direction === "X") {
      for (let i = 0; i < shipLength; i += 1) {
        this.gameboard[yIndex][xIndex + i] = newShip;
      }
    }
    if (direction === "Y") {
      for (let i = 0; i < shipLength; i += 1) {
        this.gameboard[yIndex + i][xIndex] = newShip;
      }
    }
  }
}
