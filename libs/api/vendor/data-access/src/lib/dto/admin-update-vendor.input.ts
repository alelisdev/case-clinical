import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateVendorTypeInput } from '@case-clinical/api/vendor-type/data-access' 
import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserUpdateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { UserUpdateDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access' 
import { UserUpdateVendorLocationInput } from '@case-clinical/api/vendor-location/data-access' 
import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminUpdateVendorInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateContractInput], { nullable: true }) 
  contracts?: UserUpdateContractInput[]

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

  @Field(() => [UserUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserUpdateAssignedDocumentInput[]

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

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserUpdateCaseAccountInput[]

  @Field(() => [UserUpdateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: UserUpdateProcedureVendorInput[]

  @Field(() => [UserUpdateDurableMedicalEquipmentInput], { nullable: true }) 
  durableMedicalEquipments?: UserUpdateDurableMedicalEquipmentInput[]

  @Field(() => [UserUpdateVendorLocationInput], { nullable: true }) 
  vendorLocations?: UserUpdateVendorLocationInput[]

  @Field(() => [UserUpdateClinicalProviderInput], { nullable: true }) 
  clinicalProviders?: UserUpdateClinicalProviderInput[]


  @Field(() => AdminUpdateVendorTypeInput ,{ nullable: true }) 
  vendorType?: AdminUpdateVendorTypeInput  

}