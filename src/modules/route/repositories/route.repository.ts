import { EntityRepository, Repository } from 'typeorm';
import { Route } from '../entities/route.entity';

@EntityRepository(Route)
export class RouteRepository extends Repository<Route> {}
