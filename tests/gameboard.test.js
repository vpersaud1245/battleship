/* eslint-disable no-undef */
import Gameboard from "../src/gameboard";

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  it("Converts coordinate to array index", () => {
    expect(gameboard.getIndex(5)).toBe(4);
    expect(gameboard.getIndex(2)).toBe(1);
  });

  it("Places ship at given coordinates along the X axis", () => {
    gameboard.placeShip(1, 1, 5, "X");
    expect(gameboard.gameboard[0][0]).not.toBeUndefined();
    expect(gameboard.gameboard[0][1]).not.toBeUndefined();
    expect(gameboard.gameboard[0][2]).not.toBeUndefined();
    expect(gameboard.gameboard[0][3]).not.toBeUndefined();
    expect(gameboard.gameboard[0][4]).not.toBeUndefined();
    expect(gameboard.gameboard[0][5]).toBeUndefined();
    gameboard.placeShip(2, 2, 3, "X");
    expect(gameboard.gameboard[1][1]).not.toBeUndefined();
    expect(gameboard.gameboard[1][2]).not.toBeUndefined();
    expect(gameboard.gameboard[1][3]).not.toBeUndefined();
  });

  it("Places ship at given coordinates along the Y axis", () => {
    gameboard.placeShip(1, 1, 3, "Y");
    expect(gameboard.gameboard[0][0]).not.toBeUndefined();
    expect(gameboard.gameboard[1][0]).not.toBeUndefined();
    expect(gameboard.gameboard[2][0]).not.toBeUndefined();
    expect(gameboard.gameboard[2][3]).toBeUndefined();
  });

  it("Updates the gameboard Ship array when a ship is placed", () => {
    gameboard.placeShip(1, 1, 5, "X");
    expect(gameboard.ships.length).toBe(1);
    expect(gameboard.ships[0]).toMatchObject({ length: 5, hits: 0 });
  });
});
