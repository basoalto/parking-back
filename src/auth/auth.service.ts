import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.userService['userRepository'].findOne({ where: { email: createAuthDto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(createAuthDto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      parkingLotId: user.parkingLotId,
      companyId: user.companyId
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        parkingLotId: user.parkingLotId,
        companyId: user.companyId
      }
    };
  }

  // Métodos CRUD generados por defecto (pueden eliminarse si no se usan)
  create(createAuthDto: CreateAuthDto) {
    return 'Not implemented';
  }

  findAll() {
    return `Not implemented`;
  }

  findOne(id: number) {
    return `Not implemented`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `Not implemented`;
  }

  remove(id: number) {
    return `Not implemented`;
  }
}
