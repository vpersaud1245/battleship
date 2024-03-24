/* eslint-disable no-undef */
import Ship from "../src/ship";

describe("Ship class", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(5);
  });

  it("Increases the hit count when hit() is called", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it("isSunk() returns true or false based on  ship hits vs length", () => {
    expect(ship.isSunk()).toBe(false);
    ship.hits = 2;
    expect(ship.isSunk()).toBe(false);
    ship.hits = 5;
    expect(ship.isSunk()).toBe(true);
    ship.hits = 6;
    expect(ship.isSunk()).toBe(true);
  });
});
