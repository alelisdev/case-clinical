
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTaskTagInput } from './dto/user-list-task-tag.input'

@Injectable()
export class ApiTaskTagDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTaskTags(input?: UserListTaskTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.taskTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            taskId: input.taskId,
tagId: input.tagId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {task: true, tag: true}
    })
  }

  async publicSelectTaskTags(input?: UserListTaskTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.taskTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            taskId: input.taskId,
tagId: input.tagId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountTaskTags(input?: UserListTaskTagInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.taskTag.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            taskId: input.taskId,
tagId: input.tagId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicTaskTag(taskTagId) {

    return this.data.taskTag.findUnique({ where: { id: taskTagId } , include: {task: true, tag: true}  })
  }
}


