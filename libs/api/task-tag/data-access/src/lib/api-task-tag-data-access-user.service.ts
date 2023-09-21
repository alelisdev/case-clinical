
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateTaskTagInput } from './dto/user-create-task-tag.input'
import { UserListTaskTagInput } from './dto/user-list-task-tag.input'
import { UserUpdateTaskTagInput } from './dto/user-update-task-tag.input'
import { UserUpdateTaskTagsInput } from './dto/user-update-task-tags.input'

import { UserListTaskItemInput } from '@case-clinical/api/task-item/data-access'
import { UserListTagInput } from '@case-clinical/api/tag/data-access'

@Injectable()
export class ApiTaskTagDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTaskTags(userId: string, input?: UserListTaskTagInput) {
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

  async userSelectTaskTags(userId: string, input?: UserListTaskTagInput) {
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

  async userCountTaskTags(userId: string, input?: UserListTaskTagInput): Promise<CorePaging> {
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

  async userTaskTag(userId: string, taskTagId) {

    return this.data.taskTag.findUnique({ where: { id: taskTagId } , include: {task: true, tag: true}  })
  }

  async checkTaskTagExist(taskTagName: string) {
    try {
      return this.data.taskTag.findMany({ where: { name: taskTagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTaskTag(userId: string, input: UserCreateTaskTagInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const taskTagData = await this.checkTaskTagExist(input.name)

        if (taskTagData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'TaskTag', 'Create', input)

    let taskTag = await this.data.taskTag.create({
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

    await this.data.logEvent(sendingUser, false, 'TaskTag', 'Create', taskTag)

    return taskTag

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Task Tag')
    }

  }


  
  

  async userUpdateTaskTag(userId: string, taskTagId: string, input: UserUpdateTaskTagInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!taskTagId) {
        throw new BadRequestException('Task Tag Id is required')
      } else {

      const taskTagData = await this.checkTaskTagExist(input.name)

      if (taskTagData.length > 0) {
        if (taskTagData[0].id != taskTagId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'TaskTag', 'Update', input)

    let taskTag = this.data.taskTag.update({
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

    await this.data.logEvent(sendingUser, false, 'TaskTag', 'Update', taskTag)

    return taskTag

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Task Tag')
    }
  }

  async userUpdateTaskTags(userId: string, input: UserUpdateTaskTagsInput): Promise<UpdateResult> {
    const total = input.taskTags.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.taskTags) {
      const inputData = input.taskTags[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
taskId: inputData.taskId, 
tagId: inputData.tagId, 

      }

      const taskTagData = await this.checkTaskTagExist(inputData.name)

      if (taskTagData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.taskTag.upsert({
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


  async userDeleteTaskTag(userId: string, taskTagId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!taskTagId) {
        throw new BadRequestException('Task Tag Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'TaskTag', 'Delete', taskTagId)

        let taskTag = this.data.taskTag.delete({
          where: { id: taskTagId }
        })

        await this.data.logEvent(sendingUser, false, 'TaskTag', 'Delete', taskTag)

        return taskTag

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Task Tag')
    }
  }
}

