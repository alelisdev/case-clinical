
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAuthorizationInput } from './dto/user-list-authorization.input'

@Injectable()
export class ApiAuthorizationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAuthorizations(input?: UserListAuthorizationInput) {
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
      take: input?.limit,
      skip: input?.skip , include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true}
    })
  }

  async publicSelectAuthorizations(input?: UserListAuthorizationInput) {
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

  async publicCountAuthorizations(input?: UserListAuthorizationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.authorization.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,
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

  async publicAuthorization(authorizationId) {

    return this.data.authorization.findUnique({ where: { id: authorizationId } , include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true, authorizations: true, procedureOrTreatmentRequestAuthorizations: true, recommendedOrderAuthorizations: true}  })
  }
}


