
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateFirmInput } from './dto/user-create-firm.input'
import { UserListFirmInput } from './dto/user-list-firm.input'
import { UserUpdateFirmInput } from './dto/user-update-firm.input'
import { UserUpdateFirmsInput } from './dto/user-update-firms.input'

import { UserListFirmStatusInput } from '@case-clinical/api/firm-status/data-access'
import { UserListDocumentInput } from '@case-clinical/api/document/data-access'

@Injectable()
export class ApiFirmDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userFirms(userId: string, input?: UserListFirmInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmStatusId: input?.firmStatusId,
eulaId: input?.eulaId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {firmStatus: true, eula: true}
    })
  }

  async userSelectFirms(userId: string, input?: UserListFirmInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmStatusId: input?.firmStatusId,
eulaId: input?.eulaId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountFirms(userId: string, input?: UserListFirmInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.firm.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            firmStatusId: input?.firmStatusId,
eulaId: input?.eulaId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userFirm(userId: string, firmId) {

    return this.data.firm.findUnique({ where: { id: firmId } , include: {firmStatus: true, eula: true, attorneys: {include: {firm: true, attorneyStatus: true, attorneyType: true}}, legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}}  })
   }

  async checkFirmExist(firmName: string) {
    try {
      return this.data.firm.findMany({ where: { name: firmName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateFirm(userId: string, input: UserCreateFirmInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const firmData = await this.checkFirmExist(input.name)

        if (firmData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }


    if(input.eula){
      let eulaId = (await this.data.userCreateDocument(userId, input.eula)).id
      if(eulaId){
        input.eulaId = eulaId
     }
    }

    if(input.dateCreated == null || input.dateCreated == undefined){
      input.dateCreated = new Date();
    }

    await this.data.logEvent(sendingUser, true, 'Firm', 'Create', input)

    let firm = await this.data.firm.create({
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
, include: {firmStatus: true, eula: true, attorneys: {include: {firm: true, attorneyStatus: true, attorneyType: true}}, legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}} 
     })

    await this.data.logEvent(sendingUser, false, 'Firm', 'Create', firm)

    return firm

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Firm')
    }

  }


  
  

  async userUpdateFirm(userId: string, firmId: string, input: UserUpdateFirmInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!firmId) {
        throw new BadRequestException('Firm Id is required')
      } else {

      const firmData = await this.checkFirmExist(input.name)

      if (firmData.length > 0) {
        if (firmData[0].id != firmId) {
          throw new ConflictException("Record must be unique.")
        }
      }


    if(input.eula){
      let eulaId = (await this.data.userCreateDocument(userId, input.eula)).id
      if(eulaId){
        input.eulaId = eulaId
     }
    }


    await this.data.logEvent(sendingUser, true, 'Firm', 'Update', input)

    let firm = this.data.firm.update({
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

    await this.data.logEvent(sendingUser, false, 'Firm', 'Update', firm)

    return firm

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Firm')
    }
  }

  async userUpdateFirms(userId: string, input: UserUpdateFirmsInput): Promise<UpdateResult> {
    const total = input.firms.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.firms) {
      const inputData = input.firms[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
firmStatusNote: inputData.firmStatusNote, 
firmStatusId: inputData.firmStatusId, 
firmName: inputData.firmName, 
address: inputData.address, 
address2: inputData.address2, 
city: inputData.city, 
state: inputData.state, 
zip: inputData.zip, 
country: inputData.country, 
office: inputData.office, 
fax: inputData.fax, 
webAddress: inputData.webAddress, 
email: inputData.email, 
rating: inputData.rating, 
notes: inputData.notes, 
doNotDisturb: inputData.doNotDisturb, 
invoiceOnly: inputData.invoiceOnly, 
reductionNotes: inputData.reductionNotes, 
deceased: inputData.deceased, 
createdBy: inputData.createdBy, 
dateCreated: inputData.dateCreated, 
openCases: inputData.openCases, 
totalSiteCostReturned: inputData.totalSiteCostReturned, 
collectedOfBilled: inputData.collectedOfBilled, 
totalCasesReturned: inputData.totalCasesReturned, 
totalSiteCostAllocated: inputData.totalSiteCostAllocated, 
totalBilledCharges: inputData.totalBilledCharges, 
averageTimeOut: inputData.averageTimeOut, 
eulaId: inputData.eulaId, 

      }

      const firmData = await this.checkFirmExist(inputData.name)

      if (firmData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.firm.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteFirm(userId: string, firmId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!firmId) {
        throw new BadRequestException('Firm Id is required')
      } else {


        const attorneyCount = await this.data.attorney.count({ where: { firmId: firmId }})
        if(attorneyCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Attorney')
        }


        const legalCaseCount = await this.data.legalCase.count({ where: { firmId: firmId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Legal Case')
        }


        await this.data.logEvent(sendingUser, true, 'Firm', 'Delete', firmId)

        let firm = this.data.firm.delete({
          where: { id: firmId }
        })

        await this.data.logEvent(sendingUser, false, 'Firm', 'Delete', firm)

        return firm

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Firm')
    }
  }
}

