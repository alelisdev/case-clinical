
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContractTermInput } from './dto/admin-create-contract-term.input'
import { AdminListContractTermInput } from './dto/admin-list-contract-term.input'
import { AdminListContractInput } from '@case-clinical/api/contract/data-access'
import { AdminUpdateContractTermInput } from './dto/admin-update-contract-term.input'

@Injectable()
export class ApiContractTermDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContractTerms(adminId: string, input?: AdminListContractTermInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contractTerm.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true}
    })
  }

  async adminCountContractTerms(adminId: string, input?: AdminListContractTermInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractTerm.count(
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

  
  

  async adminContractTerm(adminId: string, contractTermId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contractTerm.findUnique({ where: { id: contractTermId } , include: {contract: true} })
  }

  async checkContractTermExist(contractTermName: string) {
    try {
      return this.data.contractTerm.findMany({ where: { name: contractTermName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContractTerm(adminId: string, input: AdminCreateContractTermInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contractTermData = await this.checkContractTermExist(input.name)

      if (contractTermData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contractTerm.create({
          data: { 
      
                contract: 
                input.contractTermId != null
                ? {
                        connect:  { 
                            id: input.contractTermId
                        }
                    }: undefined,name: input.name, 
maxApproved: input.maxApproved, 
numberIncluded: input.numberIncluded, 
factor: input.factor, 

    }
    , include: {contract: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContractTerm(adminId: string, contractTermId, input: AdminUpdateContractTermInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractTerm.update({
      where: { id: contractTermId },
      data: {
  
                contract: 
                input.contractTermId != null
                ? {
                        connect:  { 
                            id: input.contractTermId
                        }
                    }: undefined,name: input.name, 
maxApproved: input.maxApproved, 
numberIncluded: input.numberIncluded, 
factor: input.factor, 

}
, include: {contract: true} 
    })
  }

  async adminDeleteContractTerm(adminId: string, contractTermId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractTerm.delete({ where: { id: contractTermId } })
  }
}

