import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRouteDto, UpdateActiveRouteDto } from '../dto/route.dto';
import { Route } from '../entities/route.entity';
import { RouteRepository } from '../repositories/route.repository';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(RouteRepository) private routeRepository: RouteRepository,
  ) {}

  async getAllRoute(): Promise<Route[]> {
    return await this.routeRepository.find();
  }

  async getRouteById(id: number): Promise<Route> {
    return await this.routeRepository.findOne(id);
  }

  async createNewRoute(payload: CreateRouteDto): Promise<any> {
    const routes = await this.routeRepository.find({
      where: { ferry_no: payload.ferry_no, is_active: true },
    });
    console.log('routes', routes);
    if (routes.length === 0) return await this.routeRepository.save(payload);

    return 0;
  }

  async driverStopLocation(
    payload: UpdateActiveRouteDto,
    ferry_no: any,
  ): Promise<any> {
    console.log('ferry No', ferry_no);

    const routes = await this.routeRepository.find({
      where: { ferry_no: ferry_no, is_active: true },
    });
    console.log('Route ', routes);
    routes.forEach((route) => {
      route.datetime = payload.datetime;
      route.is_active = payload.is_active;
      route.save();
    });
  }
  async checkFerryNumber(payload: any): Promise<any> {
    return await this.routeRepository.find(payload);
  }
}
