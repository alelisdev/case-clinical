
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListImplantInput } from './dto/user-list-implant.input'

@Injectable()
export class ApiImplantDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicImplants(input?: UserListImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantCategoryId: input.implantCategoryId,
salesRepresentativeId: input.salesRepresentativeId,
manufacturerId: input.manufacturerId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {implantCategory: true, salesRepresentative: true, manufacturer: true}
    })
  }

  async publicSelectImplants(input?: UserListImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantCategoryId: input.implantCategoryId,
salesRepresentativeId: input.salesRepresentativeId,
manufacturerId: input.manufacturerId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountImplants(input?: UserListImplantInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.implant.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            implantCategoryId: input.implantCategoryId,
salesRepresentativeId: input.salesRepresentativeId,
manufacturerId: input.manufacturerId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicImplant(implantId) {

    return this.data.implant.findUnique({ where: { id: implantId } , include: {implantCategory: true, salesRepresentative: true, manufacturer: true, priorAuthorizationImplants: true}  })
  }
}


