import App from "./App";
import React from "react";
import { mount } from "enzyme";

describe("forza 4 stateless", () => {
  const countPawnsFunction = jest.spyOn(App.prototype, "countConsecutivePawns");
  const app = mount(<App />);
  const maxRecursiveCalls = 11;

  it("has starting state", () => {
    expect(app.state("board")).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]);
    expect(app.state("inGame")).toBe(true);
    expect(app.state("currentPlayer")).toBe(1);
  });

  it("red wins with vertical forza 4", () => {
    app.setState({
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0]
      ]
    });
    expect(app.instance().endGame(2, 0)).toBe(true);
    expect(countPawnsFunction.mock.calls.length).toBeLessThan(
      maxRecursiveCalls
    );
  });

  it("red wins with horizontal forza 4", () => {
    app.setState({
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0]
      ]
    });
    expect(app.instance().endGame(5, 3)).toBe(true);
    expect(countPawnsFunction.mock.calls.length).toBeLessThan(
      maxRecursiveCalls
    );
  });

  it("red wins with upwards diagonal forza 4", () => {
    app.setState({
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0]
      ]
    });
    expect(app.instance().endGame(2, 3)).toBe(true);
    expect(countPawnsFunction.mock.calls.length).toBeLessThan(
      maxRecursiveCalls
    );
  });

  it("red wins with downwards diagonal forza 4", () => {
    app.setState({
      board: [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    });
    expect(app.instance().endGame(3, 3)).toBe(true);
    expect(countPawnsFunction.mock.calls.length).toBeLessThan(
      maxRecursiveCalls
    );
  });

  it("doesn't win", () => {
    app.setState({
      board: [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    });
    expect(app.instance().endGame(1, 1)).toBe(false);
    expect(countPawnsFunction.mock.calls.length).toBeLessThan(
      maxRecursiveCalls
    );
  });

  it("doesn't win 2", () => {
    app.setState({
      board: [
        [1, 2, 2, 2, 0, 0, 0],
        [2, 1, 1, 1, 0, 0, 0],
        [2, 0, 2, 0, 0, 0, 0],
        [2, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    });
    expect(app.instance().endGame(0, 1)).toBe(false);
    expect(countPawnsFunction.mock.calls.length).toBeLessThan(
      maxRecursiveCalls
    );
  });
});

describe("forza 4 stateful", () => {
  const app = mount(<App />);

  it("red moves", () => {
    app.instance().handleMove(0);
    expect(app.state("board")).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ]);
    expect(app.state("inGame")).toBe(true);
    expect(app.state("currentPlayer")).toBe(2);
  });

  it("yellow moves", () => {
    app.instance().handleMove(1);
    expect(app.state("board")).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0]
    ]);
    expect(app.state("inGame")).toBe(true);
    expect(app.state("currentPlayer")).toBe(1);
  });
});
