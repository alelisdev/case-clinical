
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAgreementTypeInput } from './dto/admin-create-agreement-type.input'
import { AdminListAgreementTypeInput } from './dto/admin-list-agreement-type.input'

import { AdminUpdateAgreementTypeInput } from './dto/admin-update-agreement-type.input'

@Injectable()
export class ApiAgreementTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAgreementTypes(adminId: string, input?: AdminListAgreementTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.agreementType.findMany({
      where: { 
            name: { 
                contains: input?.name ?? undefined
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAgreementTypes(adminId: string, input?: AdminListAgreementTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    const name = input?.name ? input.name : undefined

    const total = await this.data.agreementType.count(
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

  
  

  async adminAgreementType(adminId: string, agreementTypeId) {
    await this.data.ensureAdminUser(adminId)
    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.agreementType.findUnique({ where: { id: agreementTypeId } , include: {caseAccounts: true} })
  }

  async checkAgreementTypeExist(agreementTypeName: string) {
    try {
      return this.data.agreementType.findMany({ where: { name: agreementTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminUpdateAgreementType(adminId: string, agreementTypeId, input: AdminUpdateAgreementTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.agreementType.update({
      where: { id: agreementTypeId },
      data: {
        name: input.name, 
      }, 
      include: {caseAccounts: true} 
    })
  }
  
  async adminCreateAgreementType(adminId: string, input: AdminCreateAgreementTypeInput) {
    await this.data.ensureAdminUser(adminId)

    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const agreementTypeData = await this.checkAgreementTypeExist(input.name)

      if (agreementTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.agreementType.create({
          data: { 
    name: input.name, 

    }
    , include: {caseAccounts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  

  async adminDeleteAgreementType(adminId: string, agreementTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.agreementType.delete({ where: { id: agreementTypeId } })
  }
}

