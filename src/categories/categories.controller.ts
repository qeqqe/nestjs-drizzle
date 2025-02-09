import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import * as schema from './categories.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  async createCategory(@Body() request: { name: string }) {
    return this.categoriesService.createCategory(request.name);
  }

  @Post('post')
  async addToPost(
    @Body() postToCategory: typeof schema.postToCategories.$inferInsert,
  ) {
    return this.categoriesService.addToPost(postToCategory);
  }
}
