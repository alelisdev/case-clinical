
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAuthorizationInput } from './dto/user-create-authorization.input'
import { UserListAuthorizationInput } from './dto/user-list-authorization.input'
import { UserUpdateAuthorizationInput } from './dto/user-update-authorization.input'
import { UserUpdateAuthorizationsInput } from './dto/user-update-authorizations.input'

import { UserListVendorInput } from '@case-clinical/api/vendor/data-access'
import { UserListAuthorizationCategoryInput } from '@case-clinical/api/authorization-category/data-access'
import { UserListAuthorizationTypeInput } from '@case-clinical/api/authorization-type/data-access'
import { UserListProcedureInput } from '@case-clinical/api/procedure/data-access'

@Injectable()
export class ApiAuthorizationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAuthorizations(userId: string, input?: UserListAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,
            vendor: input.vendorName ? {
              name: { contains: input.vendorName }
            } : undefined,
authorizationCategoryId: input.authorizationCategoryId,
authorizationTypeId: input.authorizationTypeId,
procedureId: input.procedureId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true}
    })
  }

  async userSelectAuthorizations(userId: string, input?: UserListAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,
authorizationCategoryId: input.authorizationCategoryId,
authorizationTypeId: input.authorizationTypeId,
procedureId: input.procedureId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountAuthorizations(userId: string, input?: UserListAuthorizationInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorization.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,
            vendor: input.vendorName ? {
              name: { contains: input.vendorName }
            } : undefined,
authorizationCategoryId: input.authorizationCategoryId,
authorizationTypeId: input.authorizationTypeId,
procedureId: input.procedureId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userAuthorization(userId: string, authorizationId) {

    return this.data.authorization.findUnique({ where: { id: authorizationId } , include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true, authorizations: true, procedureOrTreatmentRequestAuthorizations: true, recommendedOrderAuthorizations: true}  })
  }

  async checkAuthorizationExist(authorizationName: string) {
    try {
      return this.data.authorization.findMany({ where: { name: authorizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAuthorization(userId: string, input: UserCreateAuthorizationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const authorizationData = await this.checkAuthorizationExist(input.name)

        if (authorizationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Authorization', 'Create', input)

    let authorization = await this.data.authorization.create({
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

    await this.data.logEvent(sendingUser, false, 'Authorization', 'Create', authorization)

    return authorization

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Authorization')
    }

  }





  async userUpdateAuthorization(userId: string, authorizationId: string, input: UserUpdateAuthorizationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!authorizationId) {
        throw new BadRequestException('Authorization Id is required')
      } else {

      const authorizationData = await this.checkAuthorizationExist(input.name)

      if (authorizationData.length > 0) {
        if (authorizationData[0].id != authorizationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Authorization', 'Update', input)

    let authorization = this.data.authorization.update({
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

    await this.data.logEvent(sendingUser, false, 'Authorization', 'Update', authorization)

    return authorization

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Authorization')
    }
  }

  async userUpdateAuthorizations(userId: string, input: UserUpdateAuthorizationsInput): Promise<UpdateResult> {
    const total = input.authorizations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.authorizations) {
      const inputData = input.authorizations[key]

      const data = {
        id: inputData.id,
name: inputData.name,
vendorId: inputData.vendor?.id,
authorizationCategoryId: inputData.authorizationCategory?.id,
authorizationTypeId: inputData.authorizationType?.id,
requestDescription: inputData.requestDescription,
durationOrQuantity: inputData.durationOrQuantity,
unit: inputData.unit,
cptCode: inputData.cptCode,
procedureId: inputData.procedure?.id,

      }

      const authorizationData = await this.checkAuthorizationExist(inputData.name)

      if (authorizationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.authorization.upsert({
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


  async userDeleteAuthorization(userId: string, authorizationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!authorizationId) {
        throw new BadRequestException('Authorization Id is required')
      } else {


        const authorizationDiagnosisCodeCount = await this.data.authorizationDiagnosisCode.count({ where: { authorizationId: authorizationId }})
        if(authorizationDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Authorization Diagnosis Code')
        }


        const procedureOrTreatmentRequestAuthorizationCount = await this.data.procedureOrTreatmentRequestAuthorization.count({ where: { authorizationId: authorizationId }})
        if(procedureOrTreatmentRequestAuthorizationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure or Treatment Request Authorization')
        }


        const recommendedOrderAuthorizationCount = await this.data.recommendedOrderAuthorization.count({ where: { authorizationId: authorizationId }})
        if(recommendedOrderAuthorizationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Recommended Order Authorization')
        }


        await this.data.logEvent(sendingUser, true, 'Authorization', 'Delete', authorizationId)

        let authorization = this.data.authorization.delete({
          where: { id: authorizationId }
        })

        await this.data.logEvent(sendingUser, false, 'Authorization', 'Delete', authorization)

        return authorization

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Authorization')
    }
  }
}

