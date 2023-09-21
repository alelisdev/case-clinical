import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePlaceOfServiceInput } from '@case-clinical/api/place-of-service/data-access' 
import { AdminCreateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 
import { AdminCreateVendorLocationInput } from '@case-clinical/api/vendor-location/data-access' 
import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { AdminCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class AdminCreateLocationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  locationName?: string

  @Field({ nullable: true }) 
  line1?: string

  @Field({ nullable: true }) 
  line2?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  latitude?: number

  @Field({ nullable: true }) 
  longitude?: number

  @Field({ nullable: true }) 
  abbrev?: string

  @Field({ nullable: true }) 
  division?: string

  @Field({ nullable: true }) 
  country?: string

  @Field({ nullable: true }) 
  officePhone?: string

  @Field({ nullable: true }) 
  fax?: string

  @Field({ nullable: true }) 
  attentionTo?: string

  @Field({ nullable: true }) 
  placeOfServiceId?: string

  @Field(() => [AdminCreateClinicalProviderLocationInput], { nullable: true }) 
  providerLocations?: AdminCreateClinicalProviderLocationInput[]

  @Field(() => [AdminCreateVendorLocationInput], { nullable: true }) 
  vendorLocations?: AdminCreateVendorLocationInput[]

  @Field(() => [AdminCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: AdminCreateCaseAccountInput[]

  @Field(() => [AdminCreateCaseProcedureInput], { nullable: true }) 
  caseProcedures?: AdminCreateCaseProcedureInput[]

  @Field(() => [AdminCreateAppointmentInput], { nullable: true }) 
  appointments?: AdminCreateAppointmentInput[]


  @Field(() => AdminCreatePlaceOfServiceInput ,{ nullable: true }) 
  placeOfService?: AdminCreatePlaceOfServiceInput  

}