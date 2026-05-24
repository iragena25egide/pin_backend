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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const likes_service_1 = require("./likes.service");
const create_like_dto_1 = require("./create-like.dto");
let LikesController = class LikesController {
    constructor(likesService) {
        this.likesService = likesService;
    }
    toggleLike(createLikeDto) {
        return this.likesService.toggleLike(createLikeDto);
    }
    getLikeCount(post_id, video_id, comment_id, user_id) {
        return this.likesService.getLikeCount(post_id ? +post_id : undefined, video_id ? +video_id : undefined, comment_id ? +comment_id : undefined, user_id);
    }
};
exports.LikesController = LikesController;
__decorate([
    (0, common_1.Post)('toggle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_dto_1.CreateLikeDto]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)('post_id')),
    __param(1, (0, common_1.Query)('video_id')),
    __param(2, (0, common_1.Query)('comment_id')),
    __param(3, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "getLikeCount", null);
exports.LikesController = LikesController = __decorate([
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [likes_service_1.LikesService])
], LikesController);
//# sourceMappingURL=likes.controller.js.map