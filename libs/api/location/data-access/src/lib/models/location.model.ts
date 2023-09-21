import { Field, ObjectType } from '@nestjs/graphql'

import { PlaceOfService } from '@case-clinical/api/place-of-service/data-access'
import { ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'
import { VendorLocation } from '@case-clinical/api/vendor-location/data-access'
import { CaseAccount } from '@case-clinical/api/case-account/data-access'
import { CaseProcedure } from '@case-clinical/api/case-procedure/data-access'
import { Appointment } from '@case-clinical/api/appointment/data-access'
import { Document } from '@case-clinical/api/document/data-access'


@ObjectType()
export class Location {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

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

  @Field({ nullable: true })
  vendorLocationId?: string

  @Field(() => [ClinicalProviderLocation], { nullable: true })
  providerLocations?: ClinicalProviderLocation[]

  @Field(() => [CaseAccount], { nullable: true })
  caseAccounts?: CaseAccount[]

  @Field(() => [CaseProcedure], { nullable: true })
  caseProcedures?: CaseProcedure[]

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[]


  @Field(() => PlaceOfService, { nullable: true })
  placeOfService?: PlaceOfService

  @Field(() => VendorLocation, { nullable: true })
  vendorLocation?: VendorLocation

  @Field(() => [Document], { nullable: true })
  locationImages?: Document[]


}
