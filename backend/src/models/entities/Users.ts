import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public email: string;

  @Column()
  public user_name: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public user_avatar: string;

  @Column('time with time zone')
  public birthday: Date;

  @Column('bool')
  public verified_account: boolean;

  @Column()
  public verification_code: string;

  @Column('integer')
  public mail_resend_count: number;

  @Column('time with time zone')
  public mail_limit_date_resend: Date;

  @Column('bool')
  public private_account: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

export default Users;
