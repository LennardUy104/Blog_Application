import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogService {

  constructor(private prisma : PrismaService){}

  async create(createBlogDto: CreateBlogDto) {
    const has_author = await this.prisma.user.findUnique({
      where: {
        id: createBlogDto.author,
      },
    });

    if (!has_author) {
      throw new Error('Author does not exist');
    }

    const { author, blog, title } = createBlogDto;
    return await this.prisma.blog.create({
    data: {
      author,
      blog,
      title,
    },
  });
  }

  async findAll() {
    return await this.prisma.blog.findMany({
      include: {
        user: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.blog.findFirst({ 
      where: { id: Number( id ) } ,
      include: {user : true}
    })
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.prisma.blog.update({
      where: { id : Number( id ) },
      data : { blog: updateBlogDto.blog , title : updateBlogDto.title}
    })
  }

  async remove(id: number) {
    return await this.prisma.blog.delete({
      where : {id : Number(id)}
    })
  }
}
