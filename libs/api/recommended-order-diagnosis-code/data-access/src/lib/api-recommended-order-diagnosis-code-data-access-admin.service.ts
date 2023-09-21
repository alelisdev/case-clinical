
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateRecommendedOrderDiagnosisCodeInput } from './dto/admin-create-recommended-order-diagnosis-code.input'
import { AdminListRecommendedOrderDiagnosisCodeInput } from './dto/admin-list-recommended-order-diagnosis-code.input'
import { AdminListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access'
import { AdminUpdateRecommendedOrderDiagnosisCodeInput } from './dto/admin-update-recommended-order-diagnosis-code.input'

@Injectable()
export class ApiRecommendedOrderDiagnosisCodeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRecommendedOrderDiagnosisCodes(adminId: string, input?: AdminListRecommendedOrderDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderDiagnosisCode.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, recommendedOrder: true}
    })
  }

  async adminCountRecommendedOrderDiagnosisCodes(adminId: string, input?: AdminListRecommendedOrderDiagnosisCodeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.recommendedOrderDiagnosisCode.count(
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

  
  

  async adminRecommendedOrderDiagnosisCode(adminId: string, recommendedOrderDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.recommendedOrderDiagnosisCode.findUnique({ where: { id: recommendedOrderDiagnosisCodeId } , include: {diagnosis: true, recommendedOrder: true} })
  }

  async checkRecommendedOrderDiagnosisCodeExist(recommendedOrderDiagnosisCodeName: string) {
    try {
      return this.data.recommendedOrderDiagnosisCode.findMany({ where: { name: recommendedOrderDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRecommendedOrderDiagnosisCode(adminId: string, input: AdminCreateRecommendedOrderDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const recommendedOrderDiagnosisCodeData = await this.checkRecommendedOrderDiagnosisCodeExist(input.name)

      if (recommendedOrderDiagnosisCodeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.recommendedOrderDiagnosisCode.create({
          data: { 
      
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                recommendedOrder: 
                input.recommendedOrderId != null
                ? {
                        connect:  { 
                            id: input.recommendedOrderId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {diagnosis: true, recommendedOrder: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRecommendedOrderDiagnosisCode(adminId: string, recommendedOrderDiagnosisCodeId, input: AdminUpdateRecommendedOrderDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.recommendedOrderDiagnosisCode.update({
      where: { id: recommendedOrderDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                recommendedOrder: 
                input.recommendedOrderId != null
                ? {
                        connect:  { 
                            id: input.recommendedOrderId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, recommendedOrder: true} 
    })
  }

  async adminDeleteRecommendedOrderDiagnosisCode(adminId: string, recommendedOrderDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.recommendedOrderDiagnosisCode.delete({ where: { id: recommendedOrderDiagnosisCodeId } })
  }
}

