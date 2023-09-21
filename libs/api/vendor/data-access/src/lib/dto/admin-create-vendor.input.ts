import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateVendorTypeInput } from '@case-clinical/api/vendor-type/data-access' 
import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { AdminCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { AdminCreateDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access' 
import { AdminCreateVendorLocationInput } from '@case-clinical/api/vendor-location/data-access' 
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminCreateVendorInput {

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

  @Field(() => [AdminCreateContractInput], { nullable: true }) 
  contracts?: AdminCreateContractInput[]

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

  @Field(() => [AdminCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminCreateAssignedDocumentInput[]

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

  @Field(() => [AdminCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: AdminCreateCaseAccountInput[]

  @Field(() => [AdminCreateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: AdminCreateProcedureVendorInput[]

  @Field(() => [AdminCreateDurableMedicalEquipmentInput], { nullable: true }) 
  durableMedicalEquipments?: AdminCreateDurableMedicalEquipmentInput[]

  @Field(() => [AdminCreateVendorLocationInput], { nullable: true }) 
  vendorLocations?: AdminCreateVendorLocationInput[]

  @Field(() => [AdminCreateClinicalProviderInput], { nullable: true }) 
  clinicalProviders?: AdminCreateClinicalProviderInput[]


  @Field(() => AdminCreateVendorTypeInput ,{ nullable: true }) 
  vendorType?: AdminCreateVendorTypeInput  

}