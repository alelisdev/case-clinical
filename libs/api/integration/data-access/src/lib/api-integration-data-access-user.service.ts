
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateIntegrationInput } from './dto/user-create-integration.input'
import { UserListIntegrationInput } from './dto/user-list-integration.input'
import { UserUpdateIntegrationInput } from './dto/user-update-integration.input'
import { UserUpdateIntegrationsInput } from './dto/user-update-integrations.input'



@Injectable()
export class ApiIntegrationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userIntegrations(userId: string, input?: UserListIntegrationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.integration.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectIntegrations(userId: string, input?: UserListIntegrationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.integration.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountIntegrations(userId: string, input?: UserListIntegrationInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.integration.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userIntegration(userId: string, integrationId) {

    return this.data.integration.findUnique({ where: { id: integrationId } , include: {contactSettings: {include: {contact: true, integration: true}}}  })
  }

  async checkIntegrationExist(integrationName: string) {
    try {
      return this.data.integration.findMany({ where: { name: integrationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateIntegration(userId: string, input: UserCreateIntegrationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const integrationData = await this.checkIntegrationExist(input.name)

        if (integrationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Integration', 'Create', input)

    let integration = await this.data.integration.create({
      data: { 
name: input.name, 

}
, include: {contactSettings: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Integration', 'Create', integration)

    return integration

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Integration')
    }

  }


  
  

  async userUpdateIntegration(userId: string, integrationId: string, input: UserUpdateIntegrationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!integrationId) {
        throw new BadRequestException('Integration Id is required')
      } else {

      const integrationData = await this.checkIntegrationExist(input.name)

      if (integrationData.length > 0) {
        if (integrationData[0].id != integrationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Integration', 'Update', input)

    let integration = this.data.integration.update({
      where: { id: integrationId },
      data: {
name: input.name, 

}
, include: {contactSettings: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Integration', 'Update', integration)

    return integration

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Integration')
    }
  }

  async userUpdateIntegrations(userId: string, input: UserUpdateIntegrationsInput): Promise<UpdateResult> {
    const total = input.integrations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.integrations) {
      const inputData = input.integrations[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const integrationData = await this.checkIntegrationExist(inputData.name)

      if (integrationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.integration.upsert({
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


  async userDeleteIntegration(userId: string, integrationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!integrationId) {
        throw new BadRequestException('Integration Id is required')
      } else {

        const contactSettingCount = await this.data.contactSetting.count({ where: { integrationId: integrationId }})
        if(contactSettingCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contact Setting')
        }

        await this.data.logEvent(sendingUser, true, 'Integration', 'Delete', integrationId)

        let integration = this.data.integration.delete({
          where: { id: integrationId }
        })

        await this.data.logEvent(sendingUser, false, 'Integration', 'Delete', integration)

        return integration

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Integration')
    }
  }
}

