export declare class UploadsController {
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
