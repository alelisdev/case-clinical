
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAuthorizationDiagnosisCodeInput } from './dto/admin-create-authorization-diagnosis-code.input'
import { AdminListAuthorizationDiagnosisCodeInput } from './dto/admin-list-authorization-diagnosis-code.input'
import { AdminListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListAuthorizationInput } from '@case-clinical/api/authorization/data-access'
import { AdminUpdateAuthorizationDiagnosisCodeInput } from './dto/admin-update-authorization-diagnosis-code.input'

@Injectable()
export class ApiAuthorizationDiagnosisCodeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAuthorizationDiagnosisCodes(adminId: string, input?: AdminListAuthorizationDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.authorizationDiagnosisCode.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, authorization: true}
    })
  }

  async adminCountAuthorizationDiagnosisCodes(adminId: string, input?: AdminListAuthorizationDiagnosisCodeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationDiagnosisCode.count(
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

  
  

  async adminAuthorizationDiagnosisCode(adminId: string, authorizationDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.authorizationDiagnosisCode.findUnique({ where: { id: authorizationDiagnosisCodeId } , include: {diagnosis: true, authorization: true} })
  }

  async checkAuthorizationDiagnosisCodeExist(authorizationDiagnosisCodeName: string) {
    try {
      return this.data.authorizationDiagnosisCode.findMany({ where: { name: authorizationDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAuthorizationDiagnosisCode(adminId: string, input: AdminCreateAuthorizationDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const authorizationDiagnosisCodeData = await this.checkAuthorizationDiagnosisCodeExist(input.name)

      if (authorizationDiagnosisCodeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.authorizationDiagnosisCode.create({
          data: { 
      
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {diagnosis: true, authorization: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAuthorizationDiagnosisCode(adminId: string, authorizationDiagnosisCodeId, input: AdminUpdateAuthorizationDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationDiagnosisCode.update({
      where: { id: authorizationDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, authorization: true} 
    })
  }

  async adminDeleteAuthorizationDiagnosisCode(adminId: string, authorizationDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationDiagnosisCode.delete({ where: { id: authorizationDiagnosisCodeId } })
  }
}

