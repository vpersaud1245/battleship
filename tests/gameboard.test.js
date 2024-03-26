/* eslint-disable no-undef */
import { experiments } from "webpack";
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

  describe("Place Ship", () => {
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

    it("Returns the placed ship", () => {
      const newShip = gameboard.placeShip(1, 1, 5, "X");
      expect(newShip).toMatchObject({ length: 5, hits: 0 });
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

  describe("Recieve Attack", () => {
    it("Ship hits increases by 1 if ship was hit", () => {
      const newShip = gameboard.placeShip(1, 1, 5, "X");
      gameboard.recieveAttack(1, 1);
      expect(newShip).toMatchObject({ length: 5, hits: 1 });
      gameboard.recieveAttack(2, 1);
      expect(newShip).toMatchObject({ length: 5, hits: 2 });
    });
    it("Returns true if ship was hit", () => {
      gameboard.placeShip(1, 1, 5, "X");
      expect(gameboard.recieveAttack(1, 1)).toBe(true);
      expect(gameboard.recieveAttack(2, 1)).toBe(true);
      expect(gameboard.recieveAttack(5, 1)).toBe(true);
    });
    it("Returns false if there was a miss", () => {
      gameboard.placeShip(1, 1, 5, "X");
      expect(gameboard.recieveAttack(1, 2)).toBe(false);
      expect(gameboard.recieveAttack(6, 1)).toBe(false);
    });
    it("Adds coodinate to coordinatesAttacked Array", () => {
      gameboard.placeShip(1, 1, 5, "X");
      gameboard.recieveAttack(1, 1);
      gameboard.recieveAttack(1, 2);
      expect(gameboard.coordinatesAttacked).toContainEqual([1, 1]);
      expect(gameboard.coordinatesAttacked).toContainEqual([1, 2]);
    });
    it("Throws error if coordinate is already in the coordinatesAttacked Array", () => {
      gameboard.recieveAttack(1, 1);
      expect(() => {
        gameboard.recieveAttack(1, 1);
      }).toThrow(new Error("Coordinates have already been attacked"));
    });
  });

  describe("coordinateHasShip", () => {
    it("Returns true if coordinates contain a ship", () => {
      gameboard.placeShip(1, 1, 5, "X");
      gameboard.placeShip(3, 4, 3, "Y");
      expect(gameboard.coordinateHasShip(1, 1)).toBe(true);
      expect(gameboard.coordinateHasShip(2, 1)).toBe(true);
      expect(gameboard.coordinateHasShip(3, 4)).toBe(true);
      expect(gameboard.coordinateHasShip(3, 6)).toBe(true);
    });
    it("Returns false if coordinate is empty", () => {
      gameboard.placeShip(1, 1, 5, "X");
      gameboard.placeShip(3, 4, 3, "Y");
      expect(gameboard.coordinateHasShip(1, 2)).toBe(false);
      expect(gameboard.coordinateHasShip(1, 6)).toBe(false);
      expect(gameboard.coordinateHasShip(3, 3)).toBe(false);
      expect(gameboard.coordinateHasShip(3, 7)).toBe(false);
    });
  });
});
