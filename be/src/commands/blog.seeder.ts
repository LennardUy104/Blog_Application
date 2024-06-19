import { fa, faker } from "@faker-js/faker";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { BlogService } from "../blog/blog.service";
import { randomInt } from "crypto";


(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
        const blogService = app.get(BlogService);

        for(let i = 0 ; i < 30 ; i++){
            await blogService.create({
                authorId: randomInt(1, 4),
                blog: faker.lorem.words(20),
                title: faker.lorem.words(3)
            })
        }

        process.exit();
  })();