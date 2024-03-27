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
    // eslint-disable-next-line no-unused-vars
    this.gameboard = [...Array(10)].map((x) => Array(10));
    this.ships = [];
    this.coordinatesAttacked = [];
  }

  // eslint-disable-next-line class-methods-use-this
  getIndex(coordinate) {
    return coordinate - 1;
  }

  /**
   *
   * @param {Number} xcoordinate
   * @param {Number} ycoordinate
   * @param {Number} shipLength
   * @param {String} direction - direction ship will face 'X' for horizontal 'Y' for vertical
   * @returns
   */
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
    this.ships.push(newShip);
    return newShip;
  }

  #coordinateHasShip(xcoordinate, ycoordinate) {
    const xIndex = this.getIndex(xcoordinate);
    const yIndex = this.getIndex(ycoordinate);
    if (this.gameboard[yIndex][xIndex] instanceof Ship) return true;
    return false;
  }

  #getShipAtCoordinate(xcoordinate, ycoordinate) {
    const xIndex = this.getIndex(xcoordinate);
    const yIndex = this.getIndex(ycoordinate);
    return this.gameboard[yIndex][xIndex];
  }

  #areCoordinatesDuplicate(xcoordinate, ycoordinate) {
    return this.coordinatesAttacked.some(
      (coords) => coords[0] === xcoordinate && coords[1] === ycoordinate,
    );
  }

  recieveAttack(xcoordinate, ycoordinate) {
    if (this.#areCoordinatesDuplicate(xcoordinate, ycoordinate)) {
      throw new Error("Coordinates have already been attacked");
    }
    this.coordinatesAttacked.push([xcoordinate, ycoordinate]);
    if (this.#coordinateHasShip(xcoordinate, ycoordinate)) {
      const ship = this.#getShipAtCoordinate(xcoordinate, ycoordinate);
      ship.hit();
      return true;
    }
    return false;
  }

  areAllShipsSunk() {
    if (this.ships.length === 0) return false;
    let allShipsSunk = true;
    this.ships.forEach((ship) => {
      if (!ship.isSunk()) {
        allShipsSunk = false;
      }
    });
    return allShipsSunk;
  }
}
