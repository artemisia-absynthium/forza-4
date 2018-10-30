import App from "./App";
import React from "react";
import { mount } from "enzyme";

describe("forza 4 stateless", () => {
  const app = new App();
  
  it("has starting state", () => {
    app.state = app.initState();
    expect(app.endGame()).toBe(false);
    expect(app.state.inGame).toBe(true);
    expect(app.state.currentPlayer).toBe(1);
  });

  it("red wins with vertical forza 4", () => {
    app.state.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];
    expect(app.endGame()).toBe(true);
  });

  it("red wins with horizontal forza 4", () => {
    app.state.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0]
    ];
    expect(app.endGame()).toBe(true);
  });

  it("red wins with upwards diagonal forza 4", () => {
    app.state.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];
    expect(app.endGame()).toBe(true);
  });

  it("red wins with downwards diagonal forza 4", () => {
    app.state.board = [
      [1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    expect(app.endGame()).toBe(true);
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
  })
});
