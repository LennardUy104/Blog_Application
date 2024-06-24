import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentsService {

  constructor(private prisma: PrismaService){}  

  async create(createCommentDto: CreateCommentDto) {
    const { authorId, blogId, comment } = createCommentDto;
  

    const numericAuthorId = typeof authorId === 'string' ? parseInt(authorId, 10) : authorId;
    const numericBlogId = typeof blogId === 'string' ? parseInt(blogId, 10) : blogId;
  

    const [has_author, has_blog] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: numericAuthorId } }),
      this.prisma.blog.findUnique({ where: { id: numericBlogId } })
    ]);
  
    if (!has_author) {
      throw new Error('Author does not exist');
    }
  
    if (!has_blog) {
      throw new Error('Blog does not exist');
    }
  

    return await this.prisma.comment.create({
      data: {
        comment,
        user: { connect: { id: numericAuthorId } },
        blog: { connect: { id: numericBlogId } }
      },
      include: {
        user: true,
        blog: true
      }
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