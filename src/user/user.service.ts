import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    
    // Register new user (can be teacher or student based on role)
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }

    // Find a user by email
    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
    }

    // Find a user by id
    async findById(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }

    // Get all users (for future admin features)
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

}
