import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ClinicalProviderLocationAvailabilityInput {

  @Field({ nullable: true }) 
  id?: string

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
}
