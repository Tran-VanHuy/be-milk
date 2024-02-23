import { Body, Controller, Get, HttpCode, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@ApiTags("User")
@Controller({
    version: VERSION_NEUTRAL,
    path: "/v1",
})

export class UserController {

    constructor(private readonly userService: UserService){}

    @ApiOperation({summary: "Danh sách người dùng"})
    @Get("/user")
    async findAll(){

        return "hello";
    }

    @ApiOperation({summary: "Tạo người dùng"})
    @HttpCode(200)
    @Post("/user")
    async create(@Body() body: UserDto){

        const res = await this.userService.create(body);
        return res;
    }
    
}