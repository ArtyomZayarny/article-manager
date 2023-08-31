import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(article);
  }

  async findAll() {
    return await this.articleRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.articleRepository.findOne({
      where: { id: +id },
    });

    if (!coffee) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return coffee;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    return this.articleRepository.remove(article);
  }
}
