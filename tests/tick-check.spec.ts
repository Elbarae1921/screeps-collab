import { startPromiseLoop } from "../src/utils/promise";
import { advanceTick, onTick, onTickCallback } from "../src/utils/tick-check";
import { mockGlobal } from "./utils/mocking";

beforeEach(() => {
  mockGlobal('Game', { time: 1 });
});

describe('onTickCallback', () => {
  describe('should call back', () => {
    it('when called for the same tick', done => {
      onTickCallback(Game.time, () => done());
    });

    it('when called for the previous ticks', done => {
      onTickCallback(Game.time - 1, () => done());
    });

    it('when called for the next tick', () => {
      const fn = jest.fn();
      onTickCallback(Game.time + 1, () => fn());
      advanceTick();
      expect(fn).not.toBeCalled();
      Game.time++;
      advanceTick();
      expect(fn).toBeCalledTimes(1);
    });

    it('when called for the 10th next tick', () => {
      const fn = jest.fn();
      onTickCallback(Game.time + 10, () => fn());
      for (let i=0;i<10;i++) {
        advanceTick();
        expect(fn).not.toBeCalled();
        Game.time++;
      }
      advanceTick();
      expect(fn).toBeCalledTimes(1);
    });

    it('but should not be called twice', () => {
      const fn = jest.fn();
      onTickCallback(Game.time + 5, () => fn());
      for (let i=0;i<10;i++) {
        advanceTick();
        Game.time++;
      }
      advanceTick();
      expect(fn).toBeCalledTimes(1);
    });
  });
});

describe('onTick', () => {
  describe('should call back', () => {
    it('when called for the same tick', done => {
      onTick(Game.time).then(() => done());
      startPromiseLoop();
    });

    it('when called for the previous ticks', done => {
      onTick(Game.time - 1).then(() => done());
      startPromiseLoop();
    });

    it('when called for the next tick', () => {
      const fn = jest.fn();
      onTick(Game.time + 1).then(() => fn());
      advanceTick();
      startPromiseLoop();
      expect(fn).not.toBeCalled();
      Game.time++;
      advanceTick();
      startPromiseLoop();
      expect(fn).toBeCalledTimes(1);
      startPromiseLoop();
    });

    it('when called for the 10th next tick', () => {
      const fn = jest.fn();
      onTick(Game.time + 10).then(() => fn());
      for (let i=0;i<10;i++) {
        advanceTick();
        startPromiseLoop();
        expect(fn).not.toBeCalled();
        Game.time++;
      }
      advanceTick();
      startPromiseLoop();
      expect(fn).toBeCalledTimes(1);
      startPromiseLoop();
    });

    it('but should not be called twice', () => {
      const fn = jest.fn();
      onTick(Game.time + 5).then(() => fn());
      for (let i=0;i<10;i++) {
        advanceTick();
        startPromiseLoop();
        Game.time++;
      }
      advanceTick();
      startPromiseLoop();
      expect(fn).toBeCalledTimes(1);
    });
  });
});
