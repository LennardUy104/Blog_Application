import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma.service';
import { startWith } from 'rxjs';
import { contains } from 'class-validator';

@Injectable()
export class BlogService {

  constructor(private prisma : PrismaService){}

  async create(createBlogDto: CreateBlogDto) {
    const has_author = await this.prisma.user.findUnique({
      where: {
        id: createBlogDto.authorId,
      },
    });

    if (!has_author) {
      throw new Error('Author does not exist');
    }

    const { authorId, blog, title } = createBlogDto;
    return await this.prisma.blog.create({
      data: {
        authorId,
        blog,
        title,
      },
    });
  }

  async findAll(page = 1 , author) {
    try {
      if(!page){
        page = 1
      } 
      
      const skip = (page - 1) * 10;
      const take = 10;

      const where: any = !author
          ? {}
          : {
          user: {
              name: author
          },
      };

        const blogs = await this.prisma.blog.findMany({
            skip: skip,
            take: take,
            include: {
                user: true,
                comment: true,
            },
            where: where,
        });

        const totalBlogs = await this.prisma.blog.count({
            where: where,
        });

        return {
            data: blogs,
            pagination: {
                total: totalBlogs,
                page: page,
                pageSize: 10,
                totalPages: Math.ceil(totalBlogs / 10),
            },
        };
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
  }
  

  async findOne(id: number) {
    return await this.prisma.blog.findFirst({ 
      where: { id: Number( id ) } ,
      include: {
        user : true , 
        comment : {
          include: {
            user : true
          }
        }
      }
    })
  }

  async findBlogByAuthorId(id : number){
    return await this.prisma.blog.findMany({
      where: {
        authorId : id
      },
      include: {
        user: true , 
        comment : {
          include :{
            user: true
          }
        }
      }, 
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