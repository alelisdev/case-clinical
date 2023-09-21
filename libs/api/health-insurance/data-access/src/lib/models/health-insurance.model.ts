import { Field, ObjectType } from '@nestjs/graphql'



@ObjectType()
export class HealthInsurance {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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
