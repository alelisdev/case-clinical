
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateTeamUserInput } from './dto/admin-create-team-user.input'
import { AdminListTeamUserInput } from './dto/admin-list-team-user.input'
import { AdminListTeamInput } from '@case-clinical/api/team/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminListTeamRoleInput } from '@case-clinical/api/team-role/data-access'
import { AdminUpdateTeamUserInput } from './dto/admin-update-team-user.input'

@Injectable()
export class ApiTeamUserDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTeamUsers(adminId: string, input?: AdminListTeamUserInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.teamUser.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {team: true, user: true, teamRole: true}
    })
  }

  async adminCountTeamUsers(adminId: string, input?: AdminListTeamUserInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.teamUser.count(
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

  
  

  async adminTeamUser(adminId: string, teamUserId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.teamUser.findUnique({ where: { id: teamUserId } , include: {team: true, user: true, teamRole: true} })
  }

  async checkTeamUserExist(teamUserName: string) {
    try {
      return this.data.teamUser.findMany({ where: { name: teamUserName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateTeamUser(adminId: string, input: AdminCreateTeamUserInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const teamUserData = await this.checkTeamUserExist(input.name)

      if (teamUserData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.teamUser.create({
          data: { 
      
                team: 
                input.teamId != null
                ? {
                        connect:  { 
                            id: input.teamId
                        }
                    }: undefined,  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,  
                teamRole: 
                input.teamRoleId != null
                ? {
                        connect:  { 
                            id: input.teamRoleId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {team: true, user: true, teamRole: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateTeamUser(adminId: string, teamUserId, input: AdminUpdateTeamUserInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.teamUser.update({
      where: { id: teamUserId },
      data: {
  
                team: 
                input.teamId != null
                ? {
                        connect:  { 
                            id: input.teamId
                        }
                    }: undefined,  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,  
                teamRole: 
                input.teamRoleId != null
                ? {
                        connect:  { 
                            id: input.teamRoleId
                        }
                    }: undefined,name: input.name, 

}
, include: {team: true, user: true, teamRole: true} 
    })
  }

  async adminDeleteTeamUser(adminId: string, teamUserId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.teamUser.delete({ where: { id: teamUserId } })
  }
}

