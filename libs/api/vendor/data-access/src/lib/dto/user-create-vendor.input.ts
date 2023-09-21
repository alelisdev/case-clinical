import { Field, InputType } from '@nestjs/graphql'

import { UserCreateVendorTypeInput } from '@case-clinical/api/vendor-type/data-access' 
import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { UserCreateDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access' 
import { UserCreateVendorLocationInput } from '@case-clinical/api/vendor-location/data-access' 
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class UserCreateVendorInput {

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

  @Field(() => [UserCreateContractInput], { nullable: true }) 
  contracts?: UserCreateContractInput[]

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

  @Field(() => [UserCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserCreateAssignedDocumentInput[]

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

  @Field(() => [UserCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserCreateCaseAccountInput[]

  @Field(() => [UserCreateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: UserCreateProcedureVendorInput[]

  @Field(() => [UserCreateDurableMedicalEquipmentInput], { nullable: true }) 
  durableMedicalEquipments?: UserCreateDurableMedicalEquipmentInput[]

  @Field(() => [UserCreateVendorLocationInput], { nullable: true }) 
  vendorLocations?: UserCreateVendorLocationInput[]

  @Field(() => [UserCreateClinicalProviderInput], { nullable: true }) 
  clinicalProviders?: UserCreateClinicalProviderInput[]


  @Field(() => UserCreateVendorTypeInput ,{ nullable: true }) 
  vendorType?: UserCreateVendorTypeInput  

}
