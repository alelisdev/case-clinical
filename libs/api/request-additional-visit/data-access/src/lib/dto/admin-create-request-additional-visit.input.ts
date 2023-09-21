import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminCreateRequestAdditionalVisitInput {

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


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  

}