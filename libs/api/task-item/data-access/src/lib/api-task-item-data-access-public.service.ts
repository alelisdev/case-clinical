
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTaskItemInput } from './dto/user-list-task-item.input'

@Injectable()
export class ApiTaskItemDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTaskItems(input?: UserListTaskItemInput) {
    let name = input?.name ? input.name : undefined

    return this.data.taskItem.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
assignedToId: input.assignedToId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, assignedTo: true}
    })
  }

  async publicSelectTaskItems(input?: UserListTaskItemInput) {
    let name = input?.name ? input.name : undefined

    return this.data.taskItem.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
assignedToId: input.assignedToId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountTaskItems(input?: UserListTaskItemInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.taskItem.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
assignedToId: input.assignedToId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicTaskItem(taskItemId) {

    return this.data.taskItem.findUnique({ where: { id: taskItemId } , include: {legalCase: true, assignedTo: true, taskTags: true}  })
  }
}


