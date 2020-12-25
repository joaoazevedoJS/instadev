import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Users from './Users';

@Entity('follows')
class Follows {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @Column()
  user_id: string;

  @Column()
  follow_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'follow_id' })
  follow: string;
}

export default Follows;
