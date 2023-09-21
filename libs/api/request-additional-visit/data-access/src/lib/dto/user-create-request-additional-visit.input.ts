import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserCreateRequestAdditionalVisitInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  requestingProviderId?: string

  @Field({ nullable: true }) 
  numberOfVisitsBeingRequested?: number


  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  

}
