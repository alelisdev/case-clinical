
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateServiceInput } from './dto/admin-create-service.input'
import { AdminListServiceInput } from './dto/admin-list-service.input'

import { AdminUpdateServiceInput } from './dto/admin-update-service.input'

@Injectable()
export class ApiServiceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminServices(adminId: string, input?: AdminListServiceInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.service.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountServices(adminId: string, input?: AdminListServiceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.service.count(
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

  
  

  async adminService(adminId: string, serviceId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.service.findUnique({ where: { id: serviceId } , include: {clinicalProviderServices: true} })
  }

  async checkServiceExist(serviceName: string) {
    try {
      return this.data.service.findMany({ where: { name: serviceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateService(adminId: string, input: AdminCreateServiceInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const serviceData = await this.checkServiceExist(input.name)

      if (serviceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.service.create({
          data: { 
    name: input.name, 

    }
    , include: {clinicalProviderServices: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateService(adminId: string, serviceId, input: AdminUpdateServiceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.service.update({
      where: { id: serviceId },
      data: {
name: input.name, 

}
, include: {clinicalProviderServices: true} 
    })
  }

  async adminDeleteService(adminId: string, serviceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.service.delete({ where: { id: serviceId } })
  }
}

