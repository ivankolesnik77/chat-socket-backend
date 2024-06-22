"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("../../schemas/message.schema");
const helpers_1 = require("../../utils/helpers");
const fs_1 = require("fs");
const path = require("path");
let ChatService = class ChatService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async createMessage(messageDto) {
        const { file } = messageDto, messagePayload = __rest(messageDto, ["file"]);
        const message = Object.assign(Object.assign({}, messagePayload), { filename: null });
        if (!messageDto.userId) {
            messageDto.userId = (0, helpers_1.getId)();
        }
        if (messageDto.file) {
            const filePath = path.join(__dirname, '..', '..', '..', 'uploads', messageDto.file.filename);
            (0, fs_1.writeFileSync)(filePath, Buffer.from(messageDto.file.buffer));
            message.filename = messageDto.file.filename;
            message.fileUrl = `http://localhost:3001/uploads/${messageDto.file.filename}`;
        }
        const msg = new this.messageModel(message);
        const createdMessage = await msg.save();
        return createdMessage;
    }
    async getMessages() {
        return await this.messageModel.find().exec();
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map