/* eslint-disable no-undef */
import Gameboard from "../src/gameboard";

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  describe("placeShip", () => {
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

  describe("recieveAttack", () => {
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

  describe("areAllShipsSunk", () => {
    it("Returns true if all ships in the ship array are sunk", () => {
      gameboard.placeShip(1, 1, 5, "X");
      for (let i = 1; i <= 5; i += 1) {
        gameboard.recieveAttack(i, 1);
      }
      gameboard.placeShip(2, 2, 3, "Y");
      for (let i = 2; i <= 4; i += 1) {
        gameboard.recieveAttack(2, i);
      }
      expect(gameboard.areAllShipsSunk()).toBe(true);
    });
    it("Returns false if at least one ship is not sunk", () => {
      gameboard.placeShip(1, 1, 5, "X");
      for (let i = 1; i <= 5; i += 1) {
        gameboard.recieveAttack(i, 1);
      }
      gameboard.placeShip(2, 2, 3, "Y");

      expect(gameboard.areAllShipsSunk()).toBe(false);
    });
    it("If no ships are placed returns false", () => {
      expect(gameboard.areAllShipsSunk()).toBe(false);
    });
  });
});
