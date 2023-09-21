
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateVendorInput } from './dto/admin-create-vendor.input'
import { AdminListVendorInput } from './dto/admin-list-vendor.input'
import { AdminListVendorTypeInput } from '@case-clinical/api/vendor-type/data-access'
import { AdminUpdateVendorInput } from './dto/admin-update-vendor.input'

@Injectable()
export class ApiVendorDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminVendors(adminId: string, input?: AdminListVendorInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.vendor.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {vendorType: true}
    })
  }

  async adminCountVendors(adminId: string, input?: AdminListVendorInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.vendor.count(
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

  
  

  async adminVendor(adminId: string, vendorId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.vendor.findUnique({ where: { id: vendorId } , include: {vendorType: true, assignedDocuments: true, caseAccounts: true, clinicalProviders: true, contracts: true, durableMedicalEquipments: true, procedureVendors: true, vendorLocations: true} })
  }

  async checkVendorExist(vendorName: string) {
    try {
      return this.data.vendor.findMany({ where: { name: vendorName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateVendor(adminId: string, input: AdminCreateVendorInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const vendorData = await this.checkVendorExist(input.name)

      if (vendorData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.vendor.create({
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

    }
    , include: {vendorType: true, assignedDocuments: true, caseAccounts: true, clinicalProviders: true, contracts: true, durableMedicalEquipments: true, procedureVendors: true, vendorLocations: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateVendor(adminId: string, vendorId, input: AdminUpdateVendorInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.vendor.update({
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

}
, include: {vendorType: true, assignedDocuments: true, caseAccounts: true, clinicalProviders: true, contracts: true, durableMedicalEquipments: true, procedureVendors: true, vendorLocations: true} 
    })
  }

  async adminDeleteVendor(adminId: string, vendorId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.vendor.delete({ where: { id: vendorId } })
  }
}

