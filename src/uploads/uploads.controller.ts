import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';

@Controller('uploads')
export class UploadsController {
  
  @Post('image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // 1. If Cloudinary environment variables are set, upload permanently to Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: 'pin_rwanda',
          resource_type: 'auto',
        });

        // Clean up local temporary file
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkErr) {
          console.error('Failed to delete local temporary file:', unlinkErr);
        }

        return { url: uploadResult.secure_url };
      } catch (err) {
        console.error('Cloudinary upload failed, falling back to local storage:', err);
      }
    }
    
    // 2. Otherwise fall back to local disk storage
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = process.env.APP_URL || `${protocol}://${host}`;
    return { url: `${baseUrl}/uploads/${file.filename}` };
  }

}
