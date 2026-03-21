import { BadRequestException } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";

export function getHotelImageUploadOptions() {
  return {
    storage: diskStorage({
      destination: (_req, _file, cb) => {
        const uploadPath = join(process.cwd(), 'uploads', 'hoteles');
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (_req, file, cb) => {
        const fileName = `hotel-${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
        cb(null, fileName);
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
        return cb(new BadRequestException('Solo se permiten imágenes JPG, JPEG, PNG o WEBP'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  };
}