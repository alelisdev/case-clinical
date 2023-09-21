
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListUserRoleInput } from './dto/user-list-user-role.input'

@Injectable()
export class ApiUserRoleDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicUserRoles(input?: UserListUserRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.userRole.findMany({
      where: {
            AND: [{
            name: { contains: name },
            roleId: input.roleId,
userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {role: true, user: true}
    })
  }

  async publicSelectUserRoles(input?: UserListUserRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.userRole.findMany({
      where: {
            AND: [{
            name: { contains: name },
            roleId: input.roleId,
userId: input.userId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountUserRoles(input?: UserListUserRoleInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.userRole.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            roleId: input.roleId,
userId: input.userId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicUserRole(userRoleId) {

    return this.data.userRole.findUnique({ where: { id: userRoleId } , include: {role: true, user: true}  })
  }
}


