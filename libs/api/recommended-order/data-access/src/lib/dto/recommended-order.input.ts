import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class RecommendedOrderInput {

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
  status?: string
}
