
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRoleInput } from './dto/user-list-role.input'

@Injectable()
export class ApiRoleDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRoles(input?: UserListRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.role.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectRoles(input?: UserListRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.role.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRoles(input?: UserListRoleInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.role.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRole(roleId) {

    return this.data.role.findUnique({ where: { id: roleId } , include: {roleFeaturePermissions: true, userRoles: true}  })
  }
}


