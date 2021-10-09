import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './createUser.dto';
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Controller()
export class UsersController {
  constructor(private readonly UserService: UserService) {}

  @MessagePattern({ cmd: "ping" })
  ping(_: any) {
    return of("pong").pipe(delay(1000));
  }

  @MessagePattern({ cmd: 'registerUser' })
  registerUser(createUserDto: CreateUserDto) {
    return this.UserService.registerUser(createUserDto);
  }
}
