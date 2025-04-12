export enum RoomStatus {
    Not_Available = "Not_Available",
    Available = 'Available'
}
export class CreateRoomDto {
    number: number
    status: RoomStatus
    floorId?: string

}

export class CreateBlockDto {
    name: string
}

export class CreateFloorDto {
    number: number
    blocksId: string
}

export class AssignRoomDto {
    studentId: string
    roomId: string
}