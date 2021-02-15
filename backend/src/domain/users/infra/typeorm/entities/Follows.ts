import IFollows from '@domain/users/entities/IFollows';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('follows')
class Follows implements IFollows {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @Column()
  public user_id: string;

  @Column()
  public follow_id: string;
}

export default Follows;
