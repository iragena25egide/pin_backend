"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFailedFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let QueryFailedFilter = class QueryFailedFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'An unexpected database error occurred.';
        if (exception.code === '23503') {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Operation failed. This item is linked to other records and cannot be deleted.';
        }
        else if (exception.code === '23505') {
            status = common_1.HttpStatus.CONFLICT;
            message = 'Operation failed. This item already exists (duplicate entry).';
        }
        response.status(status).json({
            statusCode: status,
            message: message,
            error: exception.name,
        });
    }
};
exports.QueryFailedFilter = QueryFailedFilter;
exports.QueryFailedFilter = QueryFailedFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], QueryFailedFilter);
//# sourceMappingURL=query-failed.filter.js.map