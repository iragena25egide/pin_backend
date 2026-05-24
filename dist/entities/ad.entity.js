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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ad = exports.AdType = exports.AdPosition = void 0;
const typeorm_1 = require("typeorm");
var AdPosition;
(function (AdPosition) {
    AdPosition["HEADER"] = "header";
    AdPosition["SIDEBAR"] = "sidebar";
    AdPosition["BETWEEN_POSTS"] = "between_posts";
    AdPosition["FOOTER"] = "footer";
    AdPosition["TOP"] = "top";
})(AdPosition || (exports.AdPosition = AdPosition = {}));
var AdType;
(function (AdType) {
    AdType["BANNER"] = "banner";
    AdType["VIDEO"] = "video";
    AdType["SPONSORED"] = "sponsored";
})(AdType || (exports.AdType = AdType = {}));
let Ad = class Ad {
};
exports.Ad = Ad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ad.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ad.prototype, "video_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ad.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AdPosition,
        default: AdPosition.SIDEBAR,
    }),
    __metadata("design:type", String)
], Ad.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AdType,
        default: AdType.BANNER,
    }),
    __metadata("design:type", String)
], Ad.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ad.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ad.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Ad.prototype, "clicks", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Ad.prototype, "impressions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Ad.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ad.prototype, "created_at", void 0);
exports.Ad = Ad = __decorate([
    (0, typeorm_1.Entity)('ads')
], Ad);
//# sourceMappingURL=ad.entity.js.map