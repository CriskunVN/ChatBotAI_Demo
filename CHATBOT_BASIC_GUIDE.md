# Hướng dẫn tạo một app chatbot cơ bản

Tài liệu này giải thích cách xây dựng một app chatbot đơn giản theo cấu trúc `backend/` và `frontend/`.

## 1. Mục tiêu của app

Một chatbot cơ bản thường có 3 phần:

- Giao diện để người dùng nhập tin nhắn.
- Backend nhận và xử lý tin nhắn.
- Hệ thống trả lời lại cho người dùng.

Nếu mới bắt đầu, nên làm theo 2 bước:

1. Làm chatbot trả lời theo rule cố định để hiểu luồng hoạt động.
2. Sau đó thay phần trả lời bằng AI model thật như OpenAI, Gemini, Claude, hoặc Ollama.

## 2. Cấu trúc thư mục gợi ý

```text
backend/
  src/
    app.module.ts
    chatbot/
      chatbot.module.ts
      chatbot.controller.ts
      chatbot.service.ts
      dto/send-message.dto.ts

frontend/
  src/
    App.tsx
    components/
      ChatBox.tsx
      MessageList.tsx
```

## 3. Backend làm gì

Backend là nơi nhận tin nhắn từ frontend và tạo câu trả lời.

Luồng cơ bản:

1. Frontend gửi `message` lên backend bằng `POST`.
2. Backend xử lý tin nhắn.
3. Backend trả về `reply`.
4. Frontend hiển thị reply lên màn hình.

## 4. Giải thích từng phần của backend

### Controller

Controller nhận request từ frontend.

Ví dụ: `POST /chat/send`.

Nó không nên chứa logic xử lý phức tạp, chỉ làm nhiệm vụ điều phối.

### Service

Service chứa logic chính của chatbot.

Ví dụ: nếu người dùng nói “xin chào” thì trả lời “Chào bạn”.

Sau này nếu nối AI thật thì logic gọi API cũng nằm ở đây.

### DTO

DTO là nơi định nghĩa dữ liệu đầu vào.

Ví dụ: yêu cầu phải có `message` là chuỗi.

### Module

Module gom controller và service lại.

NestJS dùng module để tổ chức code theo từng tính năng.

## 5. Cách dùng AI model để trả lời

Khi dùng AI model, backend không tự bịa câu trả lời bằng `if/else` nữa. Thay vào đó, backend sẽ:

1. Nhận tin nhắn từ frontend.
2. Ghép tin nhắn đó vào prompt.
3. Gọi API của AI model.
4. Lấy nội dung trả về và gửi lại cho frontend.

Bạn có thể dùng 2 kiểu phổ biến:

- AI cloud: OpenAI, Gemini, Claude.
- AI local: Ollama, LM Studio.

Ví dụ biến môi trường thường cần có:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

## 6. Ví dụ backend với AI model

### `chatbot.service.ts`

```ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatbotService {
  async getReply(message: string) {
    const prompt = `Bạn là một chatbot hữu ích. Trả lời ngắn gọn, rõ ràng. Người dùng hỏi: ${message}`;

    // Ở đây bạn sẽ gọi OpenAI, Gemini, Claude hoặc Ollama.
    // Ví dụ logic tổng quát:
    // const reply = await aiClient.generate(prompt);

    return {
      reply: `AI model sẽ trả lời tại đây dựa trên prompt: ${prompt}`,
    };
  }
}
```

Giải thích:

- `prompt` là câu lệnh gửi cho AI model.
- `getReply()` giờ cần `async` vì phải chờ API AI trả về.
- Phần gọi thật tới OpenAI, Gemini hoặc Ollama sẽ thay cho dòng comment.

### `chatbot.controller.ts`

```ts
import { Body, Controller, Post } from "@nestjs/common";
import { ChatbotService } from "./chatbot.service";
import { SendMessageDto } from "./dto/send-message.dto";

@Controller("chat")
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post("send")
  async sendMessage(@Body() body: SendMessageDto) {
    return this.chatbotService.getReply(body.message);
  }
}
```

Giải thích:

- Controller vẫn nhận message từ frontend.
- Vì service gọi AI bất đồng bộ, controller cũng dùng `async`.
- Kết quả trả về thường là JSON có `reply`.

## 7. DTO vẫn giữ nguyên

### `send-message.dto.ts`

```ts
import { IsString, IsNotEmpty } from "class-validator";

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
```

Giải thích:

- `IsString()` đảm bảo dữ liệu là chuỗi.
- `IsNotEmpty()` đảm bảo không được rỗng.
- DTO giúp backend nhận dữ liệu an toàn hơn.

## 8. Module của chatbot

### `chatbot.module.ts`

```ts
import { Module } from "@nestjs/common";
import { ChatbotController } from "./chatbot.controller";
import { ChatbotService } from "./chatbot.service";

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
```

Giải thích:

- `controllers` khai báo controller nào thuộc module.
- `providers` khai báo service nào được dùng trong module.

## 9. Frontend làm gì

Frontend là nơi người dùng gõ tin nhắn và xem câu trả lời.

Frontend thường có:

- Ô nhập tin nhắn.
- Nút gửi.
- Danh sách tin nhắn đã gửi và đã nhận.

## 10. Giải thích từng phần của frontend

### `ChatBox`

- Chứa input và nút gửi.
- Khi người dùng bấm gửi, nó gọi API backend.

### `MessageList`

- Hiển thị toàn bộ hội thoại.
- Thường phân biệt tin nhắn của user và bot.

### `App`

- Là component chính.
- Quản lý state của toàn bộ cuộc trò chuyện.

## 11. Ví dụ frontend tối thiểu

```tsx
import { useState } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch("http://localhost:3000/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div>
      <h1>Chatbot cơ bản</h1>

      <div>
        {messages.map((m, index) => (
          <div key={index}>
            <strong>{m.role}:</strong> {m.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  );
}
```

Giải thích:

- `input` lưu nội dung đang gõ.
- `messages` lưu lịch sử chat.
- `sendMessage()` gọi backend.
- `setMessages()` cập nhật giao diện ngay lập tức.

## 12. Luồng hoạt động khi dùng AI model

1. User nhập câu hỏi.
2. Frontend gửi câu hỏi lên backend.
3. Backend tạo prompt phù hợp.
4. Backend gọi AI model.
5. AI model trả về câu trả lời.
6. Backend gửi `reply` về frontend.
7. Frontend hiển thị câu trả lời cho user.

## 13. Ghi chú quan trọng

- Nếu dùng OpenAI, Gemini hoặc Claude thì cần API key.
- Nếu dùng Ollama thì có thể chạy model local trên máy.
- Nên kiểm soát prompt để AI trả lời đúng vai trò của chatbot.
- Nên thêm xử lý lỗi khi API AI bị timeout hoặc mất kết nối.

## 14. Luồng hoạt động đầy đủ

1. User nhập: “Xin chào”.
2. Frontend lưu tin nhắn vào state.
3. Frontend gửi request lên backend.
4. Backend nhận message.
5. Service tạo câu trả lời.
6. Backend trả về JSON `{ reply: "Chào bạn..." }`.
7. Frontend hiển thị tin nhắn bot.

## 15. Nếu muốn chatbot thông minh hơn

Sau khi chạy được bản cơ bản, bạn có thể nâng cấp:

1. Lưu lịch sử chat vào database.
2. Gọi AI API thật.
3. Thêm xác thực người dùng.
4. Thêm streaming trả lời từng đoạn.
5. Thêm UI đẹp hơn và trạng thái đang trả lời.

## 16. Cách học nhanh nhất

Nên đi theo thứ tự này:

1. Làm backend trả lời cố định.
2. Kết nối frontend với backend.
3. Hiển thị lịch sử chat.
4. Thay logic rule bằng AI thật.
5. Thêm database nếu cần lưu hội thoại.

## 17. Kết luận

App chatbot cơ bản là một hệ thống rất nhỏ nhưng đủ để hiểu toàn bộ luồng:

- Người dùng nhập tin nhắn.
- Frontend gửi dữ liệu.
- Backend xử lý.
- Bot trả lời.

Khi bạn hiểu rõ flow này, việc nâng cấp lên chatbot dùng AI thật sẽ dễ hơn nhiều.
