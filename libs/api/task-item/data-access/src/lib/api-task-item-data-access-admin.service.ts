
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateTaskItemInput } from './dto/admin-create-task-item.input'
import { AdminListTaskItemInput } from './dto/admin-list-task-item.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateTaskItemInput } from './dto/admin-update-task-item.input'

@Injectable()
export class ApiTaskItemDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTaskItems(adminId: string, input?: AdminListTaskItemInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.taskItem.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, assignedTo: true}
    })
  }

  async adminCountTaskItems(adminId: string, input?: AdminListTaskItemInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.taskItem.count(
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

  
  

  async adminTaskItem(adminId: string, taskItemId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.taskItem.findUnique({ where: { id: taskItemId } , include: {legalCase: true, assignedTo: true, taskTags: true} })
  }

  async checkTaskItemExist(taskItemName: string) {
    try {
      return this.data.taskItem.findMany({ where: { name: taskItemName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateTaskItem(adminId: string, input: AdminCreateTaskItemInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const taskItemData = await this.checkTaskItemExist(input.name)

      if (taskItemData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.taskItem.create({
          data: { 
      
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                assignedTo: 
                input.assignedToId != null
                ? {
                        connect:  { 
                            id: input.assignedToId
                        }
                    }: undefined,type: input.type, 
name: input.name, 
notes: input.notes, 
order: input.order, 
priority: input.priority, 
title: input.title, 
dueDate: input.dueDate, 
assignedDate: input.assignedDate, 
completedOn: input.completedOn, 
completed: input.completed, 

    }
    , include: {legalCase: true, assignedTo: true, taskTags: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateTaskItem(adminId: string, taskItemId, input: AdminUpdateTaskItemInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.taskItem.update({
      where: { id: taskItemId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                assignedTo: 
                input.assignedToId != null
                ? {
                        connect:  { 
                            id: input.assignedToId
                        }
                    }: undefined,type: input.type, 
name: input.name, 
notes: input.notes, 
order: input.order, 
priority: input.priority, 
title: input.title, 
dueDate: input.dueDate, 
assignedDate: input.assignedDate, 
completedOn: input.completedOn, 
completed: input.completed, 

}
, include: {legalCase: true, assignedTo: true, taskTags: true} 
    })
  }

  async adminDeleteTaskItem(adminId: string, taskItemId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.taskItem.delete({ where: { id: taskItemId } })
  }
}

