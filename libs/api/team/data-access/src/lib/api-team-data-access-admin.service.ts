
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateTeamInput } from './dto/admin-create-team.input'
import { AdminListTeamInput } from './dto/admin-list-team.input'

import { AdminUpdateTeamInput } from './dto/admin-update-team.input'

@Injectable()
export class ApiTeamDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTeams(adminId: string, input?: AdminListTeamInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.team.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountTeams(adminId: string, input?: AdminListTeamInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.team.count(
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

  
  

  async adminTeam(adminId: string, teamId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.team.findUnique({ where: { id: teamId } , include: {teamUsers: true} })
  }

  async checkTeamExist(teamName: string) {
    try {
      return this.data.team.findMany({ where: { name: teamName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateTeam(adminId: string, input: AdminCreateTeamInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const teamData = await this.checkTeamExist(input.name)

      if (teamData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.team.create({
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

  async adminUpdateTeam(adminId: string, teamId, input: AdminUpdateTeamInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.team.update({
      where: { id: teamId },
      data: {
name: input.name, 

}
, include: {teamUsers: true} 
    })
  }

  async adminDeleteTeam(adminId: string, teamId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.team.delete({ where: { id: teamId } })
  }
}

