import { GlobalPosition } from "../src/utils/global-position";
import { mockRoomPositionConstructor } from "./utils/mocking";

beforeAll(() => {
  mockRoomPositionConstructor(global);
});

describe("GlobalPosition", () => {
  describe("fromRoomPosition", () => {
    test.concurrent.each([
      [new RoomPosition(12, 12, "E2S3"), new GlobalPosition(112, 162)],
      [new RoomPosition(49, 49, "W0N0"), new GlobalPosition(-1, -1)],
      [new RoomPosition(0, 0, "E0S0"), new GlobalPosition(0, 0)],
      [new RoomPosition(20, 20, "W20S1"), new GlobalPosition(-1030, 70)],
      [new RoomPosition(10, 49, "W3N5"), new GlobalPosition(-190, -251)]
    ])("for roomPos %O should return %O", async (roomPos, expected) => {
      const result = GlobalPosition.fromRoomPosition(roomPos);
      expect(result).toStrictEqual(expected);
    });
  });

  describe("toRoomPosition", () => {
    test.concurrent.each([
      [new GlobalPosition(112, 162), new RoomPosition(12, 12, "E2S3")],
      [new GlobalPosition(0, 0), new RoomPosition(0, 0, "E0S0")],
      [new GlobalPosition(-1, -1), new RoomPosition(49, 49, "W0N0")],
      [new GlobalPosition(-1030, 70), new RoomPosition(20, 20, "W20S1")],
      [new GlobalPosition(-190, -251), new RoomPosition(10, 49, "W3N5")]
    ])("for globalPos %O should return %O", async (globalPos, expected) => {
      const result = globalPos.toRoomPosition();
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });
});
