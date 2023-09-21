
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateTaskTagInput } from './dto/admin-create-task-tag.input'
import { AdminListTaskTagInput } from './dto/admin-list-task-tag.input'
import { AdminListTaskItemInput } from '@case-clinical/api/task-item/data-access'
import { AdminListTagInput } from '@case-clinical/api/tag/data-access'
import { AdminUpdateTaskTagInput } from './dto/admin-update-task-tag.input'

@Injectable()
export class ApiTaskTagDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTaskTags(adminId: string, input?: AdminListTaskTagInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.taskTag.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {task: true, tag: true}
    })
  }

  async adminCountTaskTags(adminId: string, input?: AdminListTaskTagInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.taskTag.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminTaskTag(adminId: string, taskTagId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.taskTag.findUnique({ where: { id: taskTagId } , include: {task: true, tag: true} })
  }

  async checkTaskTagExist(taskTagName: string) {
    try {
      return this.data.taskTag.findMany({ where: { name: taskTagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateTaskTag(adminId: string, input: AdminCreateTaskTagInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const taskTagData = await this.checkTaskTagExist(input.name)

      if (taskTagData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.taskTag.create({
          data: { 
      
                task: 
                input.taskId != null
                ? {
                        connect:  { 
                            id: input.taskId
                        }
                    }: undefined,  
                tag: 
                input.tagId != null
                ? {
                        connect:  { 
                            id: input.tagId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {task: true, tag: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateTaskTag(adminId: string, taskTagId, input: AdminUpdateTaskTagInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.taskTag.update({
      where: { id: taskTagId },
      data: {
  
                task: 
                input.taskId != null
                ? {
                        connect:  { 
                            id: input.taskId
                        }
                    }: undefined,  
                tag: 
                input.tagId != null
                ? {
                        connect:  { 
                            id: input.tagId
                        }
                    }: undefined,name: input.name, 

}
, include: {task: true, tag: true} 
    })
  }

  async adminDeleteTaskTag(adminId: string, taskTagId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.taskTag.delete({ where: { id: taskTagId } })
  }
}

