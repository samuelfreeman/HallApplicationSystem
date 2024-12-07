import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class AppService {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  // async setCacheKey(key: string, value: string): Promise<void> {
  //   await this.cacheManager.set('key', 'value');
  // }


  // async getCacheKey(key: string, value: string): Promise<string> {
  //   return await this.cacheManager.get('key');
  // }
  // async deleteCacheKey(key: string): Promise<void> {
  //   await this.cacheManager.del('key');
  // }
  // async resetCache(): Promise<void> {
  //   await this.cacheManager.reset()
  // }


  getHello() {

    const cast = {
      "characters": [

        {
          "name": "John Doe",
          "age": 30,
          "gender": "Male",
          "occupation": "Software Engineer"
        },
        {
          "name": "Jane Doe",
          "age": 28,
          "gender": "Female",
          "occupation": "Product Manager"
        },
        {
          "name": "Alice Doe",
          "age": 32,
          "gender": "Female",
          "occupation": "UX Designer"
        },
        {
          "name": "Bob Doe",
          "age": 25,
          "gender": "Male",
          "occupation": "QA Engineer"
        },
        {
          "name": "Charlie Doe",
          "age": 35,
          "gender": "Male",
          "occupation": "Project Manager"
        }
      ]
    }
    const title = 'Home'
    return {  title };
  }
}
