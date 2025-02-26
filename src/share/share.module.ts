import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { HashingService } from './services/hashing.service';


const shareSevices = [PrismaService, HashingService];
@Global()
@Module({
    providers: shareSevices,
    exports: shareSevices,

})
export class ShareModule {}
