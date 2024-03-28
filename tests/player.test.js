/* eslint-disable no-undef */
import Player from "../src/player";

describe("Player", () => {
  let player;
  beforeEach(() => {
    player = new Player();
  });
  describe("getMove()", () => {
    it("should return an array with two elements representing valid coordinates", () => {
      const move = player.getMove();
      expect(move).toHaveLength(2);
      expect(move[0]).toBeGreaterThanOrEqual(1);
      expect(move[0]).toBeLessThanOrEqual(10);
      expect(move[1]).toBeGreaterThanOrEqual(1);
      expect(move[1]).toBeLessThanOrEqual(10);
    });

    it("should not return duplicate coordinates in consecutive calls", () => {
      const moves = new Set();
      for (let i = 0; i < 100; i += 1) {
        const move = player.getMove();
        const moveString = move.toString(); // Convert to string for Set comparison
        expect(moves.has(moveString)).toBeFalsy(); // Check if move already exists
        moves.add(moveString); // Add move to set for comparison
      }
    });
  });
});
