import { Inject, Injectable } from "@nestjs/common";
import { resToJson } from "src/common/jsonParser";
import { POST_REPOSITORY } from "src/core/constants";
import { Post } from "./entities";

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepo: typeof Post
  ) { }

  async createPost(data) {
    return (await this.postRepo.create(data)).toJSON()
  }

  async getUserPosts(userId: number) {
    const { rows, count } = await this.postRepo.findAndCountAll({ where: { authorId: userId } })
    return { data: resToJson(rows), count }
  }


  async getSinglePostOfUser(postId: number, userId: number) {
    return this.postRepo.findOne({ where: { id: postId, authorId: userId } })
  }
}