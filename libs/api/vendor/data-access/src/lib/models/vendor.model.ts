import { Field, ObjectType } from '@nestjs/graphql'

import { VendorType } from '@case-clinical/api/vendor-type/data-access'
import { Contract } from '@case-clinical/api/contract/data-access' 
import { AssignedDocument } from '@case-clinical/api/assigned-document/data-access' 
import { CaseAccount } from '@case-clinical/api/case-account/data-access' 
import { ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access' 
import { DurableMedicalEquipment } from '@case-clinical/api/durable-medical-equipment/data-access' 
import { VendorLocation } from '@case-clinical/api/vendor-location/data-access' 
import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access' 


@ObjectType()
export class Vendor {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taxId?: string

  @Field({ nullable: true }) 
  line1?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  emailAddress?: string

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  fax?: string

  @Field({ nullable: true }) 
  mailingAddress?: string

  @Field({ nullable: true }) 
  vendorTypeId?: string

  @Field(() => [Contract], { nullable: true }) 
  contracts?: Contract[]

  @Field({ nullable: true }) 
  line2?: string

  @Field({ nullable: true }) 
  country?: string

  @Field({ nullable: true }) 
  office?: string

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  website?: string

  @Field({ nullable: true }) 
  contactPerson?: string

  @Field({ nullable: true }) 
  owner?: string

  @Field({ nullable: true }) 
  bankRoutingNumber?: string

  @Field({ nullable: true }) 
  bankAccountNumber?: string

  @Field({ nullable: true }) 
  bankName?: string

  @Field({ nullable: true }) 
  bankCity?: string

  @Field({ nullable: true }) 
  bankState?: string

  @Field({ nullable: true }) 
  bankZip?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  agreementDetails?: string

  @Field({ nullable: true }) 
  providerSearchNameDisplayType?: string

  @Field({ nullable: true }) 
  driversLicenseId?: string

  @Field(() => [AssignedDocument], { nullable: true }) 
  assignedDocuments?: AssignedDocument[]

  @Field({ nullable: true }) 
  logoId?: string

  @Field({ nullable: true }) 
  cellphone?: string

  @Field({ nullable: true }) 
  achCheckOrWire?: string

  @Field({ nullable: true }) 
  reductionNotes?: string

  @Field({ nullable: true }) 
  latitude?: number

  @Field({ nullable: true }) 
  longitude?: number

  @Field({ nullable: true }) 
  businessCentralName?: string

  @Field(() => [CaseAccount], { nullable: true }) 
  caseAccounts?: CaseAccount[]

  @Field(() => [ProcedureVendor], { nullable: true }) 
  procedureVendors?: ProcedureVendor[]

  @Field(() => [DurableMedicalEquipment], { nullable: true }) 
  durableMedicalEquipments?: DurableMedicalEquipment[]

  @Field(() => [VendorLocation], { nullable: true }) 
  vendorLocations?: VendorLocation[]

  @Field(() => [ClinicalProvider], { nullable: true }) 
  clinicalProviders?: ClinicalProvider[]


  @Field(() => VendorType, { nullable: true }) 
  vendorType?: VendorType  

}
