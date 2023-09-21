import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { Location } from '@case-clinical/api/location/data-access'
import { ClinicalProviderLocationAvailability } from '@case-clinical/api/clinical-provider-location-availability/data-access'


@ObjectType()
export class ClinicalProviderLocation {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  distance?: number

  @Field({ nullable: true })
  clinicalProviderId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field(() => [ClinicalProviderLocationAvailability], { nullable: true })
  clinicalProviderLocationAvailabilities?: ClinicalProviderLocationAvailability[]


  @Field(() => ClinicalProvider, { nullable: true })
  clinicalProvider?: ClinicalProvider

  @Field(() => Location, { nullable: true })
  location?: Location

}
