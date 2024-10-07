import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExamsModule } from './exams/exams.module';
import { ExamFormsModule } from './exam-forms/exam-forms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'kaoshi_db',
      autoLoadEntities: true,
      synchronize: true, // Not recommended for production
    }),
    UserModule,
    AuthModule,
    ExamsModule,
    ExamFormsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
