import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {}

  async create(createDto: CreateCommentDto): Promise<Comment> {
    const item = this.repo.create(createDto);
    return this.repo.save(item);
  }

  findAll(): Promise<Comment[]> {
    return this.repo.find();
  }

  findByPost(postId: number): Promise<Comment[]> {
    return this.repo.find({ where: { post_id: postId }, order: { created_at: 'DESC' } });
  }

  findByVideo(videoId: number): Promise<Comment[]> {
    return this.repo.find({ where: { video_id: videoId }, order: { created_at: 'DESC' } });
  }

  async findOne(id: number): Promise<Comment> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Comment with ID " + id + " not found");
    }
    return item;
  }

  async update(id: number, updateDto: UpdateCommentDto): Promise<Comment> {
    const item = await this.findOne(id);
    const updated = this.repo.merge(item, updateDto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
