import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'


@ObjectType()
export class ClinicalProviderLocationAvailability {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  day?: string

  @Field({ nullable: true })
  startTime?: string

  @Field({ nullable: true })
  endTime?: string

  @Field({ nullable: true })
  clinicalProviderLocationId?: string


  @Field(() => ClinicalProviderLocation, { nullable: true })
  clinicalProviderLocation?: ClinicalProviderLocation

}
