import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access' 
import { RequiredField } from '@case-clinical/api/required-field/data-access' 


@ObjectType()
export class AccidentType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [LegalCase], { nullable: true }) 
  legalCases?: LegalCase[]

  @Field(() => [RequiredField], { nullable: true }) 
  requiredFields?: RequiredField[]


}
