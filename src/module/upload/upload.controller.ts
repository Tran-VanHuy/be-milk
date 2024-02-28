import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { response } from "src/response/response";
import { Response } from "express";

@ApiTags("Upload ảnh")
@Controller({

    version: VERSION_NEUTRAL,
    path: "/v1"
})

export class UploadController {

    constructor(private readonly uploadService: UploadService) { }

    @Post("/upload-photo")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) => {

                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(" ").join('_') + '_' + Date.now() + "." + fileExtension;

                cb(null, newFileName);

            }
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {

                return cb(null, false)
            }

            cb(null, true)
        }
    }))
    async uploadPhoto(@UploadedFile() file: Express.Multer.File) {

        if (!file) {
            throw new BadRequestException("Không thành công")
        } else {
 
            return response(200, {...file, path: `http://localhost:3001/v1/file/${file.filename}`})
        }
    }

    @Get('/file/:filename')
    async getFile(@Param('filename')filename,@Res() res: Response ){

        res.sendFile(filename, {root: "./uploads"});
    }

}