import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';


const shareSevices = [PrismaService];
@Global()
@Module({
    providers: shareSevices,
    exports: shareSevices,

})
export class ShareModule {}
