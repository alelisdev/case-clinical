
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCaseProcedureInput } from './dto/user-create-case-procedure.input'
import { UserListCaseProcedureInput } from './dto/user-list-case-procedure.input'
import { UserUpdateCaseProcedureInput } from './dto/user-update-case-procedure.input'
import { UserUpdateCaseProceduresInput } from './dto/user-update-case-procedures.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserListAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { UserListLocationInput } from '@case-clinical/api/location/data-access'

@Injectable()
export class ApiCaseProcedureDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCaseProcedures(userId: string, input?: UserListCaseProcedureInput) {
    const name = input?.name ? input.name : undefined

    return this.data.caseProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
            procedureStatusId: input.procedureStatusId,
            appointmentId: input?.appointmentId,
            procedureTypeId: input.procedureTypeId,
            locationId: input?.locationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {
        legalCase: { 
          include: {
          accidentType: true,
          medLevel: true,
          firm: true,
          attorney: true,
          agent: true,  }
        }, procedureStatus: true, appointment:  {include: {
        appointmentStatus: true,
        medicalRecordStatus: true,
        medicalReport: true,
        patient: true,
        bill: true,
        imaging: true,  }}, location: true}
    })
  }

  async userSelectCaseProcedures(userId: string, input?: UserListCaseProcedureInput) {
    const name = input?.name ? input.name : undefined

    return this.data.caseProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
            procedureStatusId: input.procedureStatusId,
appointmentId: input?.appointmentId,
procedureTypeId: input.procedureTypeId,
locationId: input?.locationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userSelectDetailCaseProcedures(userId: string, input?: UserListCaseProcedureInput) {
    const name = input?.name ? input.name : undefined

    return this.data.caseProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
            procedureStatusId: input.procedureStatusId,
appointmentId: input?.appointmentId,
procedureTypeId: input.procedureTypeId,
locationId: input?.locationId,}]
          },
      select: {
        id: true,
        name: true,
        procedureType: true,
        legalCase: { 
          select: {
          accidentType: {select: {
            id: true,
            name: true}},
          medLevel: {select: {
            id: true,
            name: true}},
          firm: {select: {
            id: true,
            name: true}},
          attorney: {select: {
            id: true,
            name: true}},
        }}, 
        procedureStatus: {select: {
          id: true,
          name: true}},
        location: {select: {
          id: true,
          name: true}},
        appointment: {
          select: {
            id: true,
            name: true,
            appointmentDateAndTime: true,
            appointmentStatus: {select: {
              id: true,
              name: true}},
        medicalRecordStatus: {select: {
          id: true,
          name: true}},
        medicalReport: {select: {
          id: true,
          name: true}},
        bill: {select: {
          id: true,
          name: true}},
        imaging: {select: {
          id: true,
          name: true}},
            location: {
              select: {
                id: true,
                name: true,
                line1: true,
                city: true,
                state: true,
                postalCode: true,
              },
            },
            patient: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            },
            clinicalProvider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                name: true,
              }
            }

            }
          },
        procedureVendors: {
          select: {
            id: true,
            name: true,
            fundingApproved: true,
            vendor: {
              select: {
                id: true,
                name: true,
                vendorType: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            contract: {
              select: {
                id: true,
                name: true,
              }
            },
            caseAccounts: {
              select: {
                id: true,
                name: true,
                description: true,
                medicareRate: true,
                providerPercentOfMedicare: true,
                contractedAmount: true,
                markupPercent: true,
                reimbursedTotal: true,
                initialRevenue: true,
                factor: true,
                retailBill: true,
                estMargin: true,
                roi: true,
                attorneyPaid: true,
                percentOfRetail: true,
                reimbursedFromPCR: true,
                journalEntries: {
                  select: {
                    id: true,
                    name: true,
                    locationName: true,
                    postingDate: true,
                    documentDate: true,
                    dueDate: true,
                    amount: true,
                    costRate: true,
                    accountType: true,
                    accountNumber: true,
                    costCenter: true,
                  }
                }
              }
            },
            estimate: true,
          }
        },
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountCaseProcedures(userId: string, input?: UserListCaseProcedureInput): Promise<CorePaging> {
    const name = input?.name ? input.name : undefined

    const total = await this.data.caseProcedure.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            procedureStatusId: input.procedureStatusId,
            procedureTypeId: input.procedureTypeId,

            legalCaseId: input?.legalCaseId,
appointmentId: input?.appointmentId,
locationId: input?.locationId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCaseProcedure(userId: string, caseProcedureId) {

    return this.data.caseProcedure.findUnique({ where: { id: caseProcedureId } , include: {
      legalCase: true,
      appointment: true,
      location: true,
      procedureType: true,
      priorAuthorizationRequests: true,
      procedureStatus: true,
      procedureVendors: true}  })
  }

  async checkCaseProcedureExist(caseProcedureName: string, legalCaseId:string) {
    try {
      return this.data.caseProcedure.findMany({ where: { name: caseProcedureName,legalCaseId:legalCaseId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCaseProcedure(userId: string, input: UserCreateCaseProcedureInput) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const caseProcedureData = await this.checkCaseProcedureExist(input.name, input.legalCaseId)

        if (caseProcedureData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CaseProcedure', 'Create', input)

    const caseProcedure = await this.data.caseProcedure.create({
      data: {

                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,
                    procedureType: input.procedureTypeId ? { connect: { id: input.procedureTypeId } } : undefined,
                    procedureStatus: input.procedureStatusId ? { connect: { id: input.procedureStatusId } } : undefined,
                appointment:
                input.appointmentId != null
                ? {
                        connect:  {
                            id: input.appointmentId
                        }
                    }: undefined,
                location:
                input.locationId != null
                ? {
                        connect:  {
                            id: input.locationId
                        }
                    }: undefined,name: input.name,
procedureDate: input.procedureDate,
cost: input.cost,
notes: input.notes,
createdBy: userId,
dateCreated: input.dateCreated,
removed: input.removed,
approvedDate: input.approvedDate,
procedureReasonName: input.procedureReasonName,
decisionDate: input.decisionDate,
nextActionDate: input.nextActionDate,

}
, include: {legalCase: true, appointment: true, procedureType: true, procedureStatus: true, location: true, priorAuthorizationRequests: true, procedureVendors: true}
    })

    await this.data.logEvent(sendingUser, false, 'CaseProcedure', 'Create', caseProcedure)

    return caseProcedure

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Procedure')
    }

  }





  async userUpdateCaseProcedure(userId: string, caseProcedureId: string, input: UserUpdateCaseProcedureInput) {

    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    console.log(input)
    try {
      if (!caseProcedureId) {
        throw new BadRequestException('Case Procedure Id is required')
      } else {

      const caseProcedureData = await this.checkCaseProcedureExist(input.name,input.legalCaseId)

      if (caseProcedureData.length > 0) {
        if (caseProcedureData[0].id != caseProcedureId) {
          throw new ConflictException("Record must be unique.")
        }
      }

      if(!input.procedureStatusId && input.procedureStatus) {
        const procedureStatus = await this.data.procedureStatus.findFirst({
          where: {
            id: input.procedureStatus.id,
            name: input.procedureStatus.name,
          }
        })
        if(!procedureStatus) throw new BadRequestException(`Cannot find procedureStatus named ${input.procedureStatus.name}`);
        else input.procedureStatusId = procedureStatus.id;
      }


    await this.data.logEvent(sendingUser, true, 'CaseProcedure', 'Update', input)

    const caseProcedure = this.data.caseProcedure.update({
      where: { id: caseProcedureId },
      data: {

                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,
                    procedureType: input.procedureTypeId ? { connect: { id: input.procedureTypeId } } : undefined,
                    procedureStatus: input.procedureStatusId ? { connect: { id: input.procedureStatusId } } : undefined,
                appointment:
                input.appointmentId != null
                ? {
                        connect:  {
                            id: input.appointmentId
                        }
                    }: undefined,
                location:
                input.locationId != null
                ? {
                        connect:  {
                            id: input.locationId
                        }
                    }: undefined,name: input.name,
procedureDate: input.procedureDate,
cost: input.cost,
notes: input.notes,
createdBy: input.createdBy,
dateCreated: input.dateCreated,
removed: input.removed,
approvedDate: input.approvedDate,
procedureReasonName: input.procedureReasonName,
decisionDate: input.decisionDate,
nextActionDate: input.nextActionDate,

}
, include: {legalCase: true, procedureStatus: true, procedureType: true, appointment: true, location: true, priorAuthorizationRequests: true, procedureVendors: true}
    })

    await this.data.logEvent(sendingUser, false, 'CaseProcedure', 'Update', caseProcedure)

    return caseProcedure

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Procedure')
    }
  }

  async userUpdateCaseProcedures(userId: string, input: UserUpdateCaseProceduresInput): Promise<UpdateResult> {
    const total = input.caseProcedures.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.caseProcedures) {
      const inputData = input.caseProcedures[key]

      const data = {
        id: inputData.id,
name: inputData.name,
legalCaseId: inputData.legalCaseId,
procedureStatusId: inputData.procedureStatusId,
appointmentId: inputData.appointmentId,
locationId: inputData.locationId,
procedureTypeId: inputData.procedureTypeId,
procedureDate: inputData.procedureDate,
cost: inputData.cost,
notes: inputData.notes,
createdBy: inputData.createdBy,
dateCreated: inputData.dateCreated,
removed: inputData.removed,
approvedDate: inputData.approvedDate,
procedureReasonName: inputData.procedureReasonName,
decisionDate: inputData.decisionDate,
nextActionDate: inputData.nextActionDate,

      }

      const caseProcedureData = await this.checkCaseProcedureExist(inputData.name, inputData.legalCaseId)

      if (caseProcedureData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.caseProcedure.upsert({
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


  async userDeleteCaseProcedure(userId: string, caseProcedureId: string) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!caseProcedureId) {
        throw new BadRequestException('Case Procedure Id is required')
      } else {

        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { caseProcedureId: caseProcedureId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }

        const procedureVendorCount = await this.data.procedureVendor.count({ where: { procedureId: caseProcedureId }})
        if(procedureVendorCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure Vendor')
        }


        await this.data.logEvent(sendingUser, true, 'CaseProcedure', 'Delete', caseProcedureId)

        const caseProcedure = this.data.caseProcedure.delete({
          where: { id: caseProcedureId }
        })

        await this.data.logEvent(sendingUser, false, 'CaseProcedure', 'Delete', caseProcedure)

        return caseProcedure

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Procedure')
    }
  }
}

