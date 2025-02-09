import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PostsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
