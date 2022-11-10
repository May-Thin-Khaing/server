import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('routes')
export class Route extends BaseEntity {
  // @PrimaryGeneratedColumn({
  //   comment: 'The route unique identifier',
  // })
  // id: number;
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    type: 'varchar',
  })
  ferry_no: string;

  @Column({
    type: 'text',
  })
  time_period: string;

  @Column({
    type: 'text',
  })
  datetime: string;

  @Column({
    default: true,
  })
  is_active: Boolean;
}
