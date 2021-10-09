import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './createUser.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const newUser = await admin.auth().createUser({
        email: createUserDto.email,
        emailVerified: false,
        password: createUserDto.password,
        displayName: createUserDto.full_name,
        disabled: false,
      });

      let user = new User();
      user.id = newUser.uid;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.full_name = createUserDto.full_name;
      user.dob = createUserDto.dob;

      await this.UsersRepository.save(user);

      return { user: user };
    } catch (e) {
      return { error: e };
    }
  }
}
