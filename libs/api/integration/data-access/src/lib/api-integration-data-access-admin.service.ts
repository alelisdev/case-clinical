
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateIntegrationInput } from './dto/admin-create-integration.input'
import { AdminListIntegrationInput } from './dto/admin-list-integration.input'

import { AdminUpdateIntegrationInput } from './dto/admin-update-integration.input'

@Injectable()
export class ApiIntegrationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminIntegrations(adminId: string, input?: AdminListIntegrationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.integration.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountIntegrations(adminId: string, input?: AdminListIntegrationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.integration.count(
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

  
  

  async adminIntegration(adminId: string, integrationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.integration.findUnique({ where: { id: integrationId } , include: {contactSettings: true} })
  }

  async checkIntegrationExist(integrationName: string) {
    try {
      return this.data.integration.findMany({ where: { name: integrationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateIntegration(adminId: string, input: AdminCreateIntegrationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const integrationData = await this.checkIntegrationExist(input.name)

      if (integrationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.integration.create({
          data: { 
    name: input.name, 

    }
    , include: {contactSettings: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateIntegration(adminId: string, integrationId, input: AdminUpdateIntegrationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.integration.update({
      where: { id: integrationId },
      data: {
name: input.name, 

}
, include: {contactSettings: true} 
    })
  }

  async adminDeleteIntegration(adminId: string, integrationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.integration.delete({ where: { id: integrationId } })
  }
}

