
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAuthorizationInput } from './dto/admin-create-authorization.input'
import { AdminListAuthorizationInput } from './dto/admin-list-authorization.input'
import { AdminListVendorInput } from '@case-clinical/api/vendor/data-access'
import { AdminListAuthorizationCategoryInput } from '@case-clinical/api/authorization-category/data-access'
import { AdminListAuthorizationTypeInput } from '@case-clinical/api/authorization-type/data-access'
import { AdminListProcedureInput } from '@case-clinical/api/procedure/data-access'
import { AdminUpdateAuthorizationInput } from './dto/admin-update-authorization.input'

@Injectable()
export class ApiAuthorizationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAuthorizations(adminId: string, input?: AdminListAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.authorization.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true}
    })
  }

  async adminCountAuthorizations(adminId: string, input?: AdminListAuthorizationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorization.count(
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

  
  

  async adminAuthorization(adminId: string, authorizationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.authorization.findUnique({ where: { id: authorizationId } , include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true, authorizations: true, procedureOrTreatmentRequestAuthorizations: true, recommendedOrderAuthorizations: true} })
  }

  async checkAuthorizationExist(authorizationName: string) {
    try {
      return this.data.authorization.findMany({ where: { name: authorizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAuthorization(adminId: string, input: AdminCreateAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const authorizationData = await this.checkAuthorizationExist(input.name)

      if (authorizationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.authorization.create({
          data: { 
      
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,  
                authorizationCategory: 
                input.authorizationCategoryId != null
                ? {
                        connect:  { 
                            id: input.authorizationCategoryId
                        }
                    }: undefined,  
                authorizationType: 
                input.authorizationTypeId != null
                ? {
                        connect:  { 
                            id: input.authorizationTypeId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,name: input.name, 
requestDescription: input.requestDescription, 
durationOrQuantity: input.durationOrQuantity, 
unit: input.unit, 
cptCode: input.cptCode, 

    }
    , include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true, authorizations: true, procedureOrTreatmentRequestAuthorizations: true, recommendedOrderAuthorizations: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAuthorization(adminId: string, authorizationId, input: AdminUpdateAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorization.update({
      where: { id: authorizationId },
      data: {
  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,  
                authorizationCategory: 
                input.authorizationCategoryId != null
                ? {
                        connect:  { 
                            id: input.authorizationCategoryId
                        }
                    }: undefined,  
                authorizationType: 
                input.authorizationTypeId != null
                ? {
                        connect:  { 
                            id: input.authorizationTypeId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,name: input.name, 
requestDescription: input.requestDescription, 
durationOrQuantity: input.durationOrQuantity, 
unit: input.unit, 
cptCode: input.cptCode, 

}
, include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true, authorizations: true, procedureOrTreatmentRequestAuthorizations: true, recommendedOrderAuthorizations: true} 
    })
  }

  async adminDeleteAuthorization(adminId: string, authorizationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorization.delete({ where: { id: authorizationId } })
  }
}

