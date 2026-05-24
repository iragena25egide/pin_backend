"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contact_message_dto_1 = require("./create-contact-message.dto");
class UpdateContactMessageDto extends (0, mapped_types_1.PartialType)(create_contact_message_dto_1.CreateContactMessageDto) {
}
exports.UpdateContactMessageDto = UpdateContactMessageDto;
//# sourceMappingURL=update-contact-message.dto.js.map