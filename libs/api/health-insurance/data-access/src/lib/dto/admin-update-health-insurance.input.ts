import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AdminUpdateHealthInsuranceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  healthInsuranceKind?: string

  @Field({ nullable: true }) 
  identificationGroupNumber?: string

  @Field({ nullable: true }) 
  mediCalNumber?: string

  @Field({ nullable: true }) 
  medicareNumber?: string

  @Field({ nullable: true }) 
  policyNumber?: string

  @Field({ nullable: true }) 
  legalCaseId?: string


}