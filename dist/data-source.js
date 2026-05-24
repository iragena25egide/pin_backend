"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const user_entity_1 = require("./entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
const video_entity_1 = require("./entities/video.entity");
const comment_entity_1 = require("./entities/comment.entity");
const ad_entity_1 = require("./entities/ad.entity");
const like_entity_1 = require("./entities/like.entity");
const subscriber_entity_1 = require("./entities/subscriber.entity");
const contact_message_entity_1 = require("./entities/contact-message.entity");
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const useUrl = !!process.env.DATABASE_URL;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    ...(useUrl
        ? {
            url: process.env.DB_URL,
        }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }),
    ssl: useUrl
        ? { rejectUnauthorized: false }
        : false,
    synchronize: false,
    logging: !isProduction,
    entities: [user_entity_1.User, post_entity_1.Post, video_entity_1.Video, comment_entity_1.Comment, ad_entity_1.Ad, like_entity_1.Like, subscriber_entity_1.Subscriber, contact_message_entity_1.ContactMessage],
    migrations: ['dist/migrations/*{.js}'],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map