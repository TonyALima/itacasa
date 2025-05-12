import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpException, HttpStatus } from '@nestjs/common';
import { ImovelService } from './imovel.service';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';
import { ApiCreatedResponse, ApiResponse, ApiNotFoundResponse, ApiOkResponse, ApiBearerAuth, ApiBadRequestResponse } from '@nestjs/swagger';
import { ImovelDto } from './dto/imovel.dto';
import { CommonResponses } from 'src/commom.responses';
import { TipoUser } from '@prisma/client';

@ApiBearerAuth()
@UsePipes(new ValidationPipe({transform: true}))
@Controller('imovel')
export class ImovelController {
  constructor(private readonly imovelService: ImovelService) {}

  @Post('user/:userId')
  @ApiCreatedResponse({ type: ImovelDto, description: 'Imovel created successfully' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiBadRequestResponse({ description: 'Bad Request - Invalid or missign field' })
  async create(
    @Param('userId') userId: string,
    @Body() createImovelDto: CreateImovelDto
  ) {
    const user = await this.imovelService.findUserById(userId);
    if (!user) {
      throw new HttpException(`User with ID ${userId} not found`, HttpStatus.NOT_FOUND);
    }
    
    if (user.tipo != TipoUser.PROPRIETARIO){
      throw new HttpException('User is not a proprietario', HttpStatus.BAD_REQUEST);
    }

    const imovelInput = {
      proprietario: {
        connect: { id: userId },
      },
      ...createImovelDto,
    };
    return this.imovelService.create(imovelInput);
  }

  @Get()
  @ApiOkResponse({ type: [ImovelDto], description: 'List of all imoveis' })
  @ApiResponse(CommonResponses.Unauthorized)
  findAll() {
    return this.imovelService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ImovelDto, description: 'Imovel content' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'Imovel not found'})
  findOne(@Param('id') id: string) {
    return this.imovelService.findOne({ id });
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: [ImovelDto], description: 'List of imoveis for a specific user' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'User not found'})
  findByUser(@Param('userId') userId: string) {
    return this.imovelService.findMany({
      where: { proprietarioId: userId },
    });
  }

  @Patch(':id')
  @ApiOkResponse({ type: ImovelDto, description: 'Updated imovel content' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'Imovel not found'})
  @ApiBadRequestResponse({ description: 'Bad Request - Invalid or missign field' })
  update(@Param('id') id: string, @Body() updateImovelDto: UpdateImovelDto) {
    return this.imovelService.update(
      {
        where: { id },
        data: updateImovelDto,
      },
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ImovelDto, description: 'Removed imovel content' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'Imovel not found'})
  remove(@Param('id') id: string) {
    return this.imovelService.remove({ id });
  }
}
