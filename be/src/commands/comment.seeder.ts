import { fa, faker } from "@faker-js/faker";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { randomInt } from "crypto";
import { CommentsService } from "../comments/comments.service";


(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
        const commentService = app.get(CommentsService);

        for(let i = 0 ; i < 30 ; i++){
            await commentService.create({
                authorId: randomInt(1, 5),
                blogId: randomInt(1,20),
                comment: faker.lorem.words(20)
            })
        }

        process.exit();
  })();