import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ReferralRequestInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  requestingProviderId?: string

  @Field({ nullable: true }) 
  referredToId?: string

  @Field({ nullable: true }) 
  clinicalProviderLocationId?: string

  @Field({ nullable: true }) 
  status?: string
}
