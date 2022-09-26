const roomRegex = /^([EW])(\d+)([NS])(\d+)$/;

export class GlobalPosition {
  constructor(public readonly x: number, public readonly y: number) {}

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

  public add(b: GlobalPosition): GlobalPosition {
    return new GlobalPosition(this.x + b.x, this.y + b.y);
  }
}
