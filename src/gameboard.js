import Ship from "./ship";

export default class Gameboard {
  constructor() {
    // eslint-disable-next-line no-unused-vars
    this.gameboard = [...Array(10)].map((x) => Array(10));
    this.ships = [];
    this.coordinatesAttacked = [];
  }

  // eslint-disable-next-line class-methods-use-this
  #getIndex(coordinate) {
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
    const xIndex = this.#getIndex(xcoordinate);
    const yIndex = this.#getIndex(ycoordinate);
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
    const xIndex = this.#getIndex(xcoordinate);
    const yIndex = this.#getIndex(ycoordinate);
    if (this.gameboard[yIndex][xIndex] instanceof Ship) return true;
    return false;
  }

  #getShipAtCoordinate(xcoordinate, ycoordinate) {
    const xIndex = this.#getIndex(xcoordinate);
    const yIndex = this.#getIndex(ycoordinate);
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
