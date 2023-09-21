import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePlaceOfServiceInput } from '@case-clinical/api/place-of-service/data-access'
import { UserCreateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access'
import { UserCreateVendorLocationInput } from '@case-clinical/api/vendor-location/data-access'
import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access'
import { UserCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'
import { UserCreateAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'


@InputType()
export class UserCreateLocationInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  locationName?: string

  @Field({ nullable: true })
  vendorLocationId?: string

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

  @Field({ nullable: true })
  locationImageId?: string

  @Field(() => [UserCreateClinicalProviderLocationInput], { nullable: true })
  providerLocations?: UserCreateClinicalProviderLocationInput[]

  @Field(() => [UserCreateCaseAccountInput], { nullable: true })
  caseAccounts?: UserCreateCaseAccountInput[]

  @Field(() => [UserCreateCaseProcedureInput], { nullable: true })
  caseProcedures?: UserCreateCaseProcedureInput[]

  @Field(() => [UserCreateAppointmentInput], { nullable: true })
  appointments?: UserCreateAppointmentInput[]

  @Field(() => UserCreatePlaceOfServiceInput ,{ nullable: true })
  placeOfService?: UserCreatePlaceOfServiceInput

  @Field(() => [UserCreateDocumentInput] ,{ nullable: true })
  locationImages?: UserCreateDocumentInput[]

}
