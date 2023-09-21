
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateTaskItemInput } from './dto/user-create-task-item.input'
import { UserListTaskItemInput } from './dto/user-list-task-item.input'
import { UserUpdateTaskItemInput } from './dto/user-update-task-item.input'
import { UserUpdateTaskItemsInput } from './dto/user-update-task-items.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserListUserInput } from '@case-clinical/api/user/data-access'

@Injectable()
export class ApiTaskItemDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTaskItems(userId: string, input?: UserListTaskItemInput) {
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

  async userSelectTaskItems(userId: string, input?: UserListTaskItemInput) {
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

  async userCountTaskItems(userId: string, input?: UserListTaskItemInput): Promise<CorePaging> {
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

  async userTaskItem(userId: string, taskItemId) {

    return this.data.taskItem.findUnique({ where: { id: taskItemId } , include: {legalCase: true, assignedTo: true, taskTags: true}  })
  }

  async checkTaskItemExist(taskItemName: string) {
    try {
      return this.data.taskItem.findMany({ where: { name: taskItemName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTaskItem(userId: string, input: UserCreateTaskItemInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const taskItemData = await this.checkTaskItemExist(input.name)

        if (taskItemData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'TaskItem', 'Create', input)

    let taskItem = await this.data.taskItem.create({
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

    await this.data.logEvent(sendingUser, false, 'TaskItem', 'Create', taskItem)

    return taskItem

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Task Item')
    }

  }


  
  

  async userUpdateTaskItem(userId: string, taskItemId: string, input: UserUpdateTaskItemInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!taskItemId) {
        throw new BadRequestException('Task Item Id is required')
      } else {

      const taskItemData = await this.checkTaskItemExist(input.name)

      if (taskItemData.length > 0) {
        if (taskItemData[0].id != taskItemId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'TaskItem', 'Update', input)

    let taskItem = this.data.taskItem.update({
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

    await this.data.logEvent(sendingUser, false, 'TaskItem', 'Update', taskItem)

    return taskItem

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Task Item')
    }
  }

  async userUpdateTaskItems(userId: string, input: UserUpdateTaskItemsInput): Promise<UpdateResult> {
    const total = input.taskItems.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.taskItems) {
      const inputData = input.taskItems[key]

      const data = {
        type: inputData.type, 
id: inputData.id, 
name: inputData.name, 
notes: inputData.notes, 
legalCaseId: inputData.legalCaseId, 
order: inputData.order, 
priority: inputData.priority, 
assignedToId: inputData.assignedToId, 
title: inputData.title, 
dueDate: inputData.dueDate, 
assignedDate: inputData.assignedDate, 
completedOn: inputData.completedOn, 
completed: inputData.completed, 

      }

      const taskItemData = await this.checkTaskItemExist(inputData.name)

      if (taskItemData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.taskItem.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteTaskItem(userId: string, taskItemId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!taskItemId) {
        throw new BadRequestException('Task Item Id is required')
      } else {


        const taskTagCount = await this.data.taskTag.count({ where: { taskId: taskItemId }})
        if(taskTagCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Task Tag')
        }


        await this.data.logEvent(sendingUser, true, 'TaskItem', 'Delete', taskItemId)

        let taskItem = this.data.taskItem.delete({
          where: { id: taskItemId }
        })

        await this.data.logEvent(sendingUser, false, 'TaskItem', 'Delete', taskItem)

        return taskItem

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Task Item')
    }
  }
}

