import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { AssignRoomDto, CreateBlockDto, CreateFloorDto, CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Room")
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Post("block")
  createBlock(@Body() createBlockDto:CreateBlockDto) {
    return this.roomsService.createBlock(createBlockDto);
  }

  @Post("floor")

  createFloor(@Body() createFloorDto:CreateFloorDto) {
    return this.roomsService.createFloor(createFloorDto);
  }

  @Post("assign")

  assignRoom(@Body() assignRoomDto:AssignRoomDto) {
    return this.roomsService.assignRoom(assignRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.getAllRooms();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
