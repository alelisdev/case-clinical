import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePlaceOfServiceInput } from '@case-clinical/api/place-of-service/data-access'
import { UserUpdateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access'
import { UserUpdateVendorLocationInput } from '@case-clinical/api/vendor-location/data-access'
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access'
import { UserUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'
import { UserUpdateAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access'


@InputType()
export class UserUpdateLocationInput {

  @Field({ nullable: true })
  id?: string

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
  vendorLocationId?: string

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

  @Field({ nullable: true })
  locationImageId?: string

  @Field(() => [UserUpdateClinicalProviderLocationInput], { nullable: true })
  providerLocations?: UserUpdateClinicalProviderLocationInput[]

  @Field(() => [UserUpdateVendorLocationInput], { nullable: true })
  vendorLocations?: UserUpdateVendorLocationInput[]

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true })
  caseAccounts?: UserUpdateCaseAccountInput[]

  @Field(() => [UserUpdateCaseProcedureInput], { nullable: true })
  caseProcedures?: UserUpdateCaseProcedureInput[]

  @Field(() => [UserUpdateAppointmentInput], { nullable: true })
  appointments?: UserUpdateAppointmentInput[]


  @Field(() => UserUpdatePlaceOfServiceInput ,{ nullable: true })
  placeOfService?: UserUpdatePlaceOfServiceInput

  @Field(() => [UserUpdateDocumentInput] ,{ nullable: true })
  locationImages?: UserUpdateDocumentInput[]
}
