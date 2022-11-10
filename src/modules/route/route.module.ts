import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from 'src/app.gateway';
import { RouteController } from './controllers/route.controller';
import { RouteRepository } from './repositories/route.repository';
import { RouteService } from './services/route.service';

@Module({
  controllers: [RouteController],
  imports: [TypeOrmModule.forFeature([RouteRepository])],
  providers: [RouteService, AppGateway],
})
export class RouteModule {}
