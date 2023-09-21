
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateFirmInput } from './dto/admin-create-firm.input'
import { AdminListFirmInput } from './dto/admin-list-firm.input'
import { AdminListFirmStatusInput } from '@case-clinical/api/firm-status/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminUpdateFirmInput } from './dto/admin-update-firm.input'

@Injectable()
export class ApiFirmDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminFirms(adminId: string, input?: AdminListFirmInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.firm.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {firmStatus: true, eula: true}
    })
  }

  async adminCountFirms(adminId: string, input?: AdminListFirmInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.firm.count(
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

  
  

  async adminFirm(adminId: string, firmId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.firm.findUnique({ where: { id: firmId } , include: {firmStatus: true, eula: true, attorneys: true, legalCases: true} })
  }

  async checkFirmExist(firmName: string) {
    try {
      return this.data.firm.findMany({ where: { name: firmName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateFirm(adminId: string, input: AdminCreateFirmInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const firmData = await this.checkFirmExist(input.name)

      if (firmData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.firm.create({
          data: { 
      
                firmStatus: 
                input.firmStatusId != null
                ? {
                        connect:  { 
                            id: input.firmStatusId
                        }
                    }: undefined,  
                eula: 
                input.eulaId != null
                ? {
                        connect:  { 
                            id: input.eulaId
                        }
                    }: undefined,name: input.name, 
firmStatusNote: input.firmStatusNote, 
firmName: input.firmName, 
address: input.address, 
address2: input.address2, 
city: input.city, 
state: input.state, 
zip: input.zip, 
country: input.country, 
office: input.office, 
fax: input.fax, 
webAddress: input.webAddress, 
email: input.email, 
rating: input.rating, 
notes: input.notes, 
doNotDisturb: input.doNotDisturb, 
invoiceOnly: input.invoiceOnly, 
reductionNotes: input.reductionNotes, 
deceased: input.deceased, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 
openCases: input.openCases, 
totalSiteCostReturned: input.totalSiteCostReturned, 
collectedOfBilled: input.collectedOfBilled, 
totalCasesReturned: input.totalCasesReturned, 
totalSiteCostAllocated: input.totalSiteCostAllocated, 
totalBilledCharges: input.totalBilledCharges, 
averageTimeOut: input.averageTimeOut, 

    }
    , include: {firmStatus: true, eula: true, attorneys: true, legalCases: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateFirm(adminId: string, firmId, input: AdminUpdateFirmInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.firm.update({
      where: { id: firmId },
      data: {
  
                firmStatus: 
                input.firmStatusId != null
                ? {
                        connect:  { 
                            id: input.firmStatusId
                        }
                    }: undefined,  
                eula: 
                input.eulaId != null
                ? {
                        connect:  { 
                            id: input.eulaId
                        }
                    }: undefined,name: input.name, 
firmStatusNote: input.firmStatusNote, 
firmName: input.firmName, 
address: input.address, 
address2: input.address2, 
city: input.city, 
state: input.state, 
zip: input.zip, 
country: input.country, 
office: input.office, 
fax: input.fax, 
webAddress: input.webAddress, 
email: input.email, 
rating: input.rating, 
notes: input.notes, 
doNotDisturb: input.doNotDisturb, 
invoiceOnly: input.invoiceOnly, 
reductionNotes: input.reductionNotes, 
deceased: input.deceased, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 
openCases: input.openCases, 
totalSiteCostReturned: input.totalSiteCostReturned, 
collectedOfBilled: input.collectedOfBilled, 
totalCasesReturned: input.totalCasesReturned, 
totalSiteCostAllocated: input.totalSiteCostAllocated, 
totalBilledCharges: input.totalBilledCharges, 
averageTimeOut: input.averageTimeOut, 

}
, include: {firmStatus: true, eula: true, attorneys: true, legalCases: true} 
    })
  }

  async adminDeleteFirm(adminId: string, firmId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.firm.delete({ where: { id: firmId } })
  }
}

