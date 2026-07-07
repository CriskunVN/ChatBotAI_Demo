import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('send')
  async sendMessage(@Body() body: SendMessageDto) {
    return this.chatbotService.getReply(body.message, body.sessionId);
  }

  @Get('history/:sessionId')
  getHistory(@Param('sessionId') sessionId: string) {
    return this.chatbotService.getHistory(sessionId);
  }

  @Delete('history/:sessionId')
  clearHistory(@Param('sessionId') sessionId: string) {
    return this.chatbotService.clearHistory(sessionId);
  }
}
