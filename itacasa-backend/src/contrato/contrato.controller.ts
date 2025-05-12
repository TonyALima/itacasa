import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { ApiCreatedResponse, ApiResponse, ApiNotFoundResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContratoDto } from './dto/contrato.dto';
import { CommonResponses } from 'src/commom.responses';

@ApiBearerAuth()
@Controller('contrato')
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) { }

  @Post('user/:userId/imovel/:imovelId')
  @ApiCreatedResponse({ type: ContratoDto, description: 'Contrato created successfully' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'User not found'})
  async create(
    @Param('userId') userId: string,
    @Param('imovelId') imovelId: string,
    @Body() createContratoDto: CreateContratoDto,
  ) {
    const cliente = await this.contratoService.findOne({ id: userId });
    if (!cliente) {
      throw new Error(`Cliente with ID ${userId} not found`);
    }
    const imovel = await this.contratoService.findImovelById(imovelId);
    if (!imovel) {
      throw new Error(`Imovel with ID ${imovelId} not found`);
    }
    const contratoInput = {
      cliente: {
        connect: { id: userId },
      },
      imovel: {
        connect: { id: imovelId },
      },
      ...createContratoDto,
    };
    return this.contratoService.create(contratoInput);
  }

  @Get()
  @ApiOkResponse({ type: [ContratoDto], description: 'List of all contratos' })
  @ApiResponse(CommonResponses.Unauthorized)
  findAll() {
    return this.contratoService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: [ContratoDto], description: 'List of contratos for a specific user' })
  @ApiResponse(CommonResponses.Unauthorized)
  findByUser(@Param('userId') userId: string) {
    return this.contratoService.findMany({
      where: { clienteId: userId },
    });
  }

  @Get('imovel/:imovelId')
  @ApiOkResponse({ type: ContratoDto, description: 'Contrato for a specific imovel' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'Imovel not found'})
  async findByImovel(@Param('imovelId') imovelId: string) {
    // only one contrato per imovel
    const imoveis = await this.contratoService.findMany({
      where: { imovelId },
    });
    if (!imoveis || imoveis.length === 0) {
      throw new HttpException(`Imovel with ID ${imovelId} not found`, HttpStatus.NOT_FOUND);
    }
    return imoveis[0];
  }

  @Get(':id')
  @ApiOkResponse({ type: ContratoDto, description: 'Contrato content' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'Contrato not found'})
  findOne(@Param('id') id: string) {
    return this.contratoService.findOne({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ type: ContratoDto, description: 'Updated contrato content' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'Contrato not found'})
  update(@Param('id') id: string, @Body() updateContratoDto: UpdateContratoDto) {
    return this.contratoService.update({
      where: { id },
      data: updateContratoDto,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: ContratoDto, description: 'Removed contrato content' })
  @ApiResponse(CommonResponses.Unauthorized)
  @ApiNotFoundResponse({description: 'Contrato not found'})
  remove(@Param('id') id: string) {
    return this.contratoService.remove({ id });
  }
}
