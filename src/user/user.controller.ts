import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint for user registration (teacher or student)
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // Get the currently authenticated user's information
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findById(req.user.userId) 
  }

  // Get a user by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(+id);
  }

  // Get all users (future functionality)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
