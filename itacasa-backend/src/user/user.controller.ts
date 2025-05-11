import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiOkResponse, ApiCreatedResponse} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CommonResponses } from 'src/commom.responses';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({type: UserDto, description: "User created successfuly"})
  create(@Body() createUserDto: CreateUserDto) : Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiOkResponse({type: [UserDto], description: 'List of users'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: UserDto, description: 'User content'})
  @ApiResponse(CommonResponses.Unauthorized)
  async findOne(@Param('id') id: string){
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch(':id')
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiOkResponse({type: UserDto, description: 'Updated user content'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      where: { id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiOkResponse({type: UserDto, description: 'Removed user content'})
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }
}
