import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dtos/user.dto';
import { UserSigninDto } from 'src/dtos/userSignin.dto';
import { UserUpdateDto } from 'src/dtos/userUpdate.dto';
import { UserGuard } from './user.guard';

@Controller('user')
export class UserController
{
    constructor(
        private readonly userService: UserService
    ){}
    
    @Get()
    public async getAll()
    {
        return await this.userService.getAll()
    }

    @Get(':userid')
    public async getOneById(@Param('userid')userid)
    {
        return await this.userService.getOneById(userid)
    }

    @Post('/access/:token')
    public async getOneByAccessToken(@Body('token')token)
    {
        return await this.userService.getOneByJwt(token)
    }
    @Post()
    public async createOne(@Body() userDto: UserDto)
    {
        return await this.userService.signup(userDto)
    }

    @Post('signin')
    public async signin(@Body() userDto: UserSigninDto)
    {
        return await this.userService.signin(userDto)
    }

    @UseGuards(UserGuard)
    @Post(':userid')
    public async updateOne(@Param('userid') userid: number, @Body() userDto: UserUpdateDto)
    {
        return await this.userService.updateOne(userDto, userid)
    }

    @UseGuards(UserGuard)
    @Delete(':userid')
    public async deleteOne(@Param('userid') userid)
    {
        return await this.userService.deleteOne(userid)
    }
}
