import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardModule } from './dashboard/dashboard.module';
import { SellerModule } from './seller/seller.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL as string),
    AuthModule,
    DashboardModule,
    SellerModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
