
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRecommendedOrderDiagnosisCodeInput } from './dto/user-list-recommended-order-diagnosis-code.input'

@Injectable()
export class ApiRecommendedOrderDiagnosisCodeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRecommendedOrderDiagnosisCodes(input?: UserListRecommendedOrderDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
recommendedOrderId: input.recommendedOrderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, recommendedOrder: true}
    })
  }

  async publicSelectRecommendedOrderDiagnosisCodes(input?: UserListRecommendedOrderDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
recommendedOrderId: input.recommendedOrderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRecommendedOrderDiagnosisCodes(input?: UserListRecommendedOrderDiagnosisCodeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.recommendedOrderDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
recommendedOrderId: input.recommendedOrderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRecommendedOrderDiagnosisCode(recommendedOrderDiagnosisCodeId) {

    return this.data.recommendedOrderDiagnosisCode.findUnique({ where: { id: recommendedOrderDiagnosisCodeId } , include: {diagnosis: true, recommendedOrder: true}  })
  }
}


