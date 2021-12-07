//import { InternalServerErrorException } from '@nestjs/common';
//import bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  userId: string;

  @Column()
  nickName: string;

  @Column('varchar', { comment: 'user password' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne((type) => Profile, (profile) => profile.id, { nullable: false })
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 300 })
  updatedBy: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
