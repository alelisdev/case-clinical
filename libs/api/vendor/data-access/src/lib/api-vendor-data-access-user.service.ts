
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateVendorInput } from './dto/user-create-vendor.input'
import { UserListVendorInput } from './dto/user-list-vendor.input'
import { UserUpdateVendorInput } from './dto/user-update-vendor.input'
import { UserUpdateVendorsInput } from './dto/user-update-vendors.input'
import { UserListVendorTypeInput } from '@case-clinical/api/vendor-type/data-access'
import moment from 'moment'

@Injectable()
export class ApiVendorDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userVendors(userId: string, input?: UserListVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorTypeId: input.vendorTypeId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {vendorType: true}
    })
  }

  async userSelectVendors(userId: string, input?: UserListVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorTypeId: input.vendorTypeId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountVendors(userId: string, input?: UserListVendorInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.vendor.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorTypeId: input.vendorTypeId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userVendor(userId: string, vendorId) {

    return this.data.vendor.findUnique({ where: { id: vendorId } , include: {vendorType: true, assignedDocuments: true, caseAccounts: {include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true, portfolio: true, procedureVendor: true}}, clinicalProviders: true, contracts: {include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}}, durableMedicalEquipments: {include: {vendor: true}}, procedureVendors: {include: {procedure: true, contract: true, vendor: true}}, vendorLocations: {include: {locations: true, vendor: true}}}  })
  }

  async userVendorStats(userId: string, providorId: string) {

    const user = await this.data.user.findUnique({ where: { id: userId } });
    if(!user.vendorId) throw new BadRequestException('Only vendor can access this function');

    const vendorId = user.vendorId;

    // Total Patient Count
    const allPatientCount = await this.data.patient.count({

    });

    const providerObj = {};
    if(providorId !== "" && providorId !== "all") {
      providerObj['id'] = providorId;
    }

    const totalPatientCount = await this.data.patient.count({
      // distinct: ['id'],
       where: {
        appointments: {
          some: {
            clinicalProvider: {
              vendorId: vendorId,
              ...providerObj
            }
          }
        }
       },
     });

    //  Today Patients
    const todayDateFilter = this.data.parseDateFilter({
      operator: '=',
      startDate: new Date()
    });

    const allTodayPatientCount = await this.data.patient.count({
      // distinct: ['id'],
      where: {
       appointments: {
         some: {
            appointmentDateAndTime: todayDateFilter,
         }
       }
      },
    });

    const todayPatientCount = await this.data.patient.count({
      // distinct: ['id'],
      where: {
       appointments: {
         some: {
          AND: [
            {
              clinicalProvider: {
                vendorId: vendorId,
                ...providerObj
              },
            },
            {
              appointmentDateAndTime: todayDateFilter,
            }
          ]
         }
       }
      },
    });

    const dateFilter = this.data.parseDateFilter({ startDate: new Date(), operator: '>=' });

    const allAppointments = await this.data.appointment.count({
      where: {
        appointmentDateAndTime: dateFilter,
      }
    });
    const appointments = await this.data.appointment.count({
      where: {
        AND: [
          {
            appointmentDateAndTime: dateFilter,
          },
          {
            clinicalProvider: {
              vendorId,
              ...providerObj
            }
          }
        ]
      }
    });

    return {
      totalPatientCount: totalPatientCount,
      totalPatientPercent: totalPatientCount > 0 ? (totalPatientCount / allPatientCount) * 100 : 0,
      todayPatientCount: todayPatientCount,
      todayPatientPercent: allTodayPatientCount > 0 ? (todayPatientCount / allTodayPatientCount) * 100 : 0,
      appointmentCount: appointments,
      appointmentsPercent: allAppointments > 0 ? (appointments / allAppointments) * 100 : 0,
    }
  }

  async checkVendorExist(vendorName: string) {
    try {
      return this.data.vendor.findMany({ where: { name: vendorName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateVendor(userId: string, input: UserCreateVendorInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const vendorData = await this.checkVendorExist(input.name)

        if (vendorData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Vendor', 'Create', input)

    let vendor = await this.data.vendor.create({
      data: {

                vendorType:
                input.vendorTypeId != null
                ? {
                        connect:  {
                            id: input.vendorTypeId
                        }
                    }: undefined,
                    vendorLocations: input.vendorLocations ? {
                      create: input.vendorLocations
                    } : undefined,
                    name: input.name,
line1: input.line1,
city: input.city,
state: input.state,
postalCode: input.postalCode,
emailAddress: input.emailAddress,
taxId: input.taxId,
phoneNumber: input.phoneNumber,
fax: input.fax,
mailingAddress: input.mailingAddress,
line2: input.line2,
country: input.country,
office: input.office,
email: input.email,
website: input.website,
contactPerson: input.contactPerson,
owner: input.owner,
bankRoutingNumber: input.bankRoutingNumber,
bankAccountNumber: input.bankAccountNumber,
bankName: input.bankName,
bankCity: input.bankCity,
bankState: input.bankState,
bankZip: input.bankZip,
notes: input.notes,
agreementDetails: input.agreementDetails,
providerSearchNameDisplayType: input.providerSearchNameDisplayType,
cellphone: input.cellphone,
achCheckOrWire: input.achCheckOrWire,
reductionNotes: input.reductionNotes,
latitude: input.latitude,
longitude: input.longitude,
businessCentralName: input.businessCentralName,
logoId: input.logoId,
driversLicenseId: input.driversLicenseId
}
, include: {vendorType: true, assignedDocuments: true, caseAccounts: true, clinicalProviders: true, contracts: true, durableMedicalEquipments: true, procedureVendors: true, vendorLocations: true}
    })

    await this.data.logEvent(sendingUser, false, 'Vendor', 'Create', vendor)

    return vendor

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Vendor')
    }

  }





  async userUpdateVendor(userId: string, vendorId: string, input: UserUpdateVendorInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!vendorId) {
        throw new BadRequestException('Vendor Id is required')
      } else {

      const vendorData = await this.checkVendorExist(input.name)

      if (vendorData.length > 0) {
        if (vendorData[0].id != vendorId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Vendor', 'Update', input)

    let vendor = this.data.vendor.update({
      where: { id: vendorId },
      data: {

                vendorType:
                input.vendorTypeId != null
                ? {
                        connect:  {
                            id: input.vendorTypeId
                        }
                    }: undefined,name: input.name,
line1: input.line1,
city: input.city,
state: input.state,
taxId: input.taxId,
postalCode: input.postalCode,
emailAddress: input.emailAddress,
phoneNumber: input.phoneNumber,
fax: input.fax,
mailingAddress: input.mailingAddress,
line2: input.line2,
country: input.country,
office: input.office,
email: input.email,
website: input.website,
contactPerson: input.contactPerson,
owner: input.owner,
bankRoutingNumber: input.bankRoutingNumber,
bankAccountNumber: input.bankAccountNumber,
bankName: input.bankName,
bankCity: input.bankCity,
bankState: input.bankState,
bankZip: input.bankZip,
notes: input.notes,
agreementDetails: input.agreementDetails,
providerSearchNameDisplayType: input.providerSearchNameDisplayType,
cellphone: input.cellphone,
achCheckOrWire: input.achCheckOrWire,
reductionNotes: input.reductionNotes,
latitude: input.latitude,
longitude: input.longitude,
businessCentralName: input.businessCentralName,
logoId: input.logoId,
driversLicenseId: input.driversLicenseId
}
, include: {vendorType: true, assignedDocuments: true, caseAccounts: true, clinicalProviders: true, contracts: true, durableMedicalEquipments: true, procedureVendors: true, vendorLocations: true}
    })

    await this.data.logEvent(sendingUser, false, 'Vendor', 'Update', vendor)

    return vendor

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Vendor')
    }
  }

  async userUpdateVendors(userId: string, input: UserUpdateVendorsInput): Promise<UpdateResult> {
    const total = input.vendors.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.vendors) {
      const inputData = input.vendors[key]

      const data = {
        id: inputData.id,
name: inputData.name,
taxId: inputData.taxId,
line1: inputData.line1,
city: inputData.city,
state: inputData.state,
postalCode: inputData.postalCode,
emailAddress: inputData.emailAddress,
phoneNumber: inputData.phoneNumber,
fax: inputData.fax,
mailingAddress: inputData.mailingAddress,
vendorTypeId: inputData.vendorTypeId,
line2: inputData.line2,
country: inputData.country,
office: inputData.office,
email: inputData.email,
website: inputData.website,
contactPerson: inputData.contactPerson,
owner: inputData.owner,
bankRoutingNumber: inputData.bankRoutingNumber,
bankAccountNumber: inputData.bankAccountNumber,
bankName: inputData.bankName,
bankCity: inputData.bankCity,
bankState: inputData.bankState,
bankZip: inputData.bankZip,
notes: inputData.notes,
agreementDetails: inputData.agreementDetails,
providerSearchNameDisplayType: inputData.providerSearchNameDisplayType,
driversLicenseId: inputData.driversLicenseId,
logoId: inputData.logoId,
cellphone: inputData.cellphone,
achCheckOrWire: inputData.achCheckOrWire,
reductionNotes: inputData.reductionNotes,
latitude: inputData.latitude,
longitude: inputData.longitude,
businessCentralName: inputData.businessCentralName,

      }

      const vendorData = await this.checkVendorExist(inputData.name)

      if (vendorData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.vendor.upsert({
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


  async userDeleteVendor(userId: string, vendorId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!vendorId) {
        throw new BadRequestException('Vendor Id is required')
      } else {

        const assignedDocumentCount = await this.data.assignedDocument.count({ where: { vendorId: vendorId }})
        if(assignedDocumentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Assigned Document')
        }


        const caseAccountCount = await this.data.caseAccount.count({ where: { vendorId: vendorId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }


        const clinicalProviderCount = await this.data.clinicalProvider.count({ where: { vendorId: vendorId }})
        if(clinicalProviderCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider')
        }


        const contractCount = await this.data.contract.count({ where: { vendorId: vendorId }})
        if(contractCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contract')
        }


        const durableMedicalEquipmentCount = await this.data.durableMedicalEquipment.count({ where: { vendorId: vendorId }})
        if(durableMedicalEquipmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Durable Medical Equipment')
        }


        const procedureVendorCount = await this.data.procedureVendor.count({ where: { vendorId: vendorId }})
        if(procedureVendorCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure Vendor')
        }


        const vendorLocationCount = await this.data.vendorLocation.count({ where: { vendorId: vendorId }})
        if(vendorLocationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Vendor Location')
        }

        await this.data.logEvent(sendingUser, true, 'Vendor', 'Delete', vendorId)

        let vendor = this.data.vendor.delete({
          where: { id: vendorId }
        })

        await this.data.logEvent(sendingUser, false, 'Vendor', 'Delete', vendor)

        return vendor

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Vendor')
    }
  }
}

