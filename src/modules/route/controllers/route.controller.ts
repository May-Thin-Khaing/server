import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRouteDto } from '../dto/route.dto';
import { Route } from '../entities/route.entity';
import { RouteService } from '../services/route.service';

@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService) {}

  @Get('/:id')
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Route> {
    return await this.routeService.getRouteById(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() routeData: CreateRouteDto): Promise<Route> {
    return await this.routeService.createNewRoute(routeData);
  }

  @Post('/check_ferry_no')
  @UsePipes(ValidationPipe)
  async checkferry(@Body() routeData: any): Promise<Route> {
    return await this.routeService.checkFerryNumber(routeData);
  }

}
