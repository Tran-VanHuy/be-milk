import { Body, Controller, Get, HttpCode, Post, Query, Req, SetMetadata, UseGuards, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { RoleGuard } from "src/auth/role.guard";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("User")
@Controller({
    version: VERSION_NEUTRAL,
    path: "/v1",
})

export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseGuards(RoleGuard)
    @SetMetadata('role', 'ADMIN')
    @ApiOperation({ summary: "Danh sách người dùng" })
    @Get("/user")
    async findAll() {

        return await this.userService.getAll()
    }

    @ApiOperation({ summary: "Tạo người dùng" })
    @HttpCode(200)
    @Post("/user")
    async create(@Body() body: UserDto) {

        const res = await this.userService.create(body);
        return res;
    }

    @ApiQuery({ name: "userId", type: String, required: true })
    @HttpCode(200)
    @Get("/user/findOne")
    async findOne(@Query("userId") userId: string) {
        return this.userService.findOne(userId);
    }

    @Post("/user/sign-in")
    async signIn(@Body() body: SignInDto) {
        return this.userService.signIn(body);
    }

    @UseGuards(AuthGuard)
    @Get("/user/change-noti")
    async changeNoti(@Req() header: any) {
        
        return this.userService.changeNoti(header);
    }
}