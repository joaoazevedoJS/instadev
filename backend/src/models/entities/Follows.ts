import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}

export default Follows;
