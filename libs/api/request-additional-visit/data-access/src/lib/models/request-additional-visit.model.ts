import { Field, ObjectType } from '@nestjs/graphql'

import { Patient } from '@case-clinical/api/patient/data-access'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'


@ObjectType()
export class RequestAdditionalVisit {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

}
