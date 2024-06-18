import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

type PrismaEvent = 'beforeExit' | 'someOtherEvent';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        // @ts-ignore
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
