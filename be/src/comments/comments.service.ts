import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {

  constructor(private prisma: PrismaService){}  

  async create(createCommentDto: CreateCommentDto) {
    const has_author = await this.prisma.user.findUnique({
      where: {
        id: createCommentDto.author,
      },
    });

    const has_blog = await this.prisma.blog.findUnique({
      where: {
        id : createCommentDto.blogid,
      },
    });

    if (!has_author || !has_blog) {
      throw new Error('Author does not exist');
    }

    const { author, blogid , comment } = createCommentDto;
    return await this.prisma.comment.create({
      data: {
        author ,
        blogid,
        comment
      },
    });
  }

  async findAll() {
    return await this.prisma.comment.findMany({
      include: {
        user : true ,
        blog : true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.comment.findUnique({
      where: {id: Number(id)},
      include : {
        user : true,
        blog: true
      }
    })
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.prisma.comment.update({
      where: { id : Number( id ) },
      data : { comment : updateCommentDto.comment}
    })
  }

  async remove(id: number) {
    return await this.prisma.comment.delete({
      where: {
        id : Number(id)
      }
    })
  }
}
