import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';


import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { subscribe } from 'diagnostics_channel';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(private readonly chatService: ChatService) { }

  @SubscribeMessage('createChat')
  async create(
    @MessageBody() createChatDto: CreateChatDto,

  ) {
    const savedChat = await this.chatService.create(createChatDto);
    // Emit only to the sender
    console.log(savedChat)
    this.server.emit('chatCreated', savedChat);
    return savedChat;
  }


  @SubscribeMessage('globalCreateChat')
  async globalCreateChat(@MessageBody() createChatDto: CreateChatDto) {
    const savedChat = await this.chatService.globalCreate(createChatDto);
    this.server.emit('globalChatCreated', savedChat);

    return savedChat;
  }

  @SubscribeMessage('globalGetChats')
  async findAll() {
    const chats = await this.chatService.globalFindAll();
    this.server.emit('globalAllChats', chats);
    return chats;
  }

  @SubscribeMessage('getRoomChats')
  async findRoomChats(@MessageBody() data: { roomId: string }) {
    const chats = await this.chatService.findRoomChats(data.roomId);
    this.server.emit('roomChats', chats);
    return chats;
  }

  @SubscribeMessage('updateChat')
  async update(
    @MessageBody() updateChatDto: UpdateChatDto,

  ) {
    const updated = await this.chatService.update(updateChatDto.id, updateChatDto);
    this.server.emit('chatUpdated', updated);
    return updated;
  }


  @SubscribeMessage('listMembers')
  async listMembers(@MessageBody() data: { roomId: string }) {
    const members = await this.chatService.listMembers(data.roomId);
    this.server.emit('members', members);
    return members;
  }
  @SubscribeMessage('globalListMembers')
  async globalListMembers( ) {
    const members = await this.chatService.globalListMembers();
    this.server.emit('globalMembers', members);
    return members;
  }



  @SubscribeMessage('deleteChat')
  async remove(@MessageBody() data: { id: string, }) {
    const deleted = await this.chatService.remove(data.id);
    this.server.emit('chatDeleted', data.id);
    return deleted;
  }


}