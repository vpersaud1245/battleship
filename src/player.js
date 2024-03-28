export default class Player {
  constructor() {
    this.playedMoves = [];
  }

  #areCoordinatesDuplicate(xcoordinate, ycoordinate) {
    return this.playedMoves.some(
      (coords) => coords[0] === xcoordinate && coords[1] === ycoordinate,
    );
  }

  getMove() {
    let xcoordinate = Math.floor(Math.random() * 10) + 1;
    let ycoordinate = Math.floor(Math.random() * 10) + 1;
    while (this.#areCoordinatesDuplicate(xcoordinate, ycoordinate)) {
      xcoordinate = Math.floor(Math.random() * 10) + 1;
      ycoordinate = Math.floor(Math.random() * 10) + 1;
    }
    this.playedMoves.push([xcoordinate, ycoordinate]);
    return [xcoordinate, ycoordinate];
  }
}
