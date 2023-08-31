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
    const article = await this.articleRepository.findOne({
      where: { id: +id },
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.preload({
      id: +id,
      ...updateArticleDto,
    });

    if (!article) {
      throw new NotFoundException(`article #${id} not founded`);
    }

    return this.articleRepository.save(article);
  }

  async remove(id: number) {
    const article = await this.findOne(id);

    if (!article) {
      throw new NotFoundException(`article #${id} not founded`);
    }
    return this.articleRepository.remove(article);
  }
}
