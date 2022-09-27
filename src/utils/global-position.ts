const roomRegex = /^([EW])(\d+)([NS])(\d+)$/;
const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * A global positioning system with the center at `E0S0(0, 0)`
 */
export class GlobalPosition {
  constructor(public readonly x: number, public readonly y: number) {}

  /**
   * Creates a global position from a room position
   */
  static fromRoomPosition(roomPos: RoomPosition): GlobalPosition {
    const roomName = roomPos.roomName;
    const roomMatch = roomRegex.exec(roomName);
    if (!roomMatch) throw new Error(`Invalid room name: ${roomName}`);
    const xDir = roomMatch[1] === "W";
    const yDir = roomMatch[3] === "N";
    const xRoom = +roomMatch[2] * 50;
    const yRoom = +roomMatch[4] * 50;
    return new GlobalPosition(
      xDir ? -xRoom + roomPos.x - 50 : xRoom + roomPos.x,
      yDir ? -yRoom + roomPos.y - 50 : yRoom + roomPos.y
    );
  }

  /**
   * Converts the global position back into a room position
   */
  public toRoomPosition(): RoomPosition {
    const x = mod(this.x, 50);
    const y = mod(this.y, 50);
    const dirX = this.x >= 0 ? "E" : "W";
    const dirY = this.y >= 0 ? "S" : "N";
    const xRoom = Math.floor(Math.abs(this.x / 50));
    const yRoom = Math.floor(Math.abs(this.y / 50));

    return new RoomPosition(x, y, `${dirX}${xRoom}${dirY}${yRoom}`);
  }

  public add(b: GlobalPosition): GlobalPosition {
    return new GlobalPosition(this.x + b.x, this.y + b.y);
  }

  public sub(b: GlobalPosition): GlobalPosition {
    return new GlobalPosition(this.x - b.x, this.y - b.y);
  }
}
