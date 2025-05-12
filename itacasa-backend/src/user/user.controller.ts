import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CommonResponses } from 'src/commom.responses';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({type: UserDto, description: "User created successfully"})
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { senha, ...userWithoutSenha } = user;
    return userWithoutSenha;
  }

  @Get()
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiOkResponse({type: [UserDto], description: 'List of users'})
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(({ senha, ...userWithoutSenha }) => userWithoutSenha); 
  }

  @Get(':id')
  @ApiOkResponse({type: UserDto, description: 'User content'})
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'User not found'})
  async findOne(@Param('id') id: string){
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const { senha, ...userWithoutSenha } = user;
    return userWithoutSenha;
  }

  @Patch(':id')
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiOkResponse({type: UserDto, description: 'Updated user content'})
  @ApiNotFoundResponse({description: 'User not found'})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update({
      where: { id },
      data: updateUserDto,
    });
    const { senha, ...userWithoutSenha } = user;
    return userWithoutSenha;
  }

  @Delete(':id')
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiOkResponse({type: UserDto, description: 'Removed user content'})
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove({ id });
    const { senha, ...userWithoutSenha } = user;
    return userWithoutSenha;
  }
}
