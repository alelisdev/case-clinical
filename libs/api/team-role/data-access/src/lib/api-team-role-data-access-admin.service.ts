
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateTeamRoleInput } from './dto/admin-create-team-role.input'
import { AdminListTeamRoleInput } from './dto/admin-list-team-role.input'

import { AdminUpdateTeamRoleInput } from './dto/admin-update-team-role.input'

@Injectable()
export class ApiTeamRoleDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTeamRoles(adminId: string, input?: AdminListTeamRoleInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.teamRole.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountTeamRoles(adminId: string, input?: AdminListTeamRoleInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.teamRole.count(
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

  
  

  async adminTeamRole(adminId: string, teamRoleId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.teamRole.findUnique({ where: { id: teamRoleId } , include: {teamUsers: true} })
  }

  async checkTeamRoleExist(teamRoleName: string) {
    try {
      return this.data.teamRole.findMany({ where: { name: teamRoleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateTeamRole(adminId: string, input: AdminCreateTeamRoleInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const teamRoleData = await this.checkTeamRoleExist(input.name)

      if (teamRoleData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.teamRole.create({
          data: { 
    name: input.name, 

    }
    , include: {teamUsers: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateTeamRole(adminId: string, teamRoleId, input: AdminUpdateTeamRoleInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.teamRole.update({
      where: { id: teamRoleId },
      data: {
name: input.name, 

}
, include: {teamUsers: true} 
    })
  }

  async adminDeleteTeamRole(adminId: string, teamRoleId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.teamRole.delete({ where: { id: teamRoleId } })
  }
}

