import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { Patient } from '@case-clinical/api/patient/data-access'


@ObjectType()
export class Review {

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
  clinicalProviderId?: string

  @Field({ nullable: true })
  comment?: string

  @Field({ nullable: true })
  rating?: number

  @Field({ nullable: true })
  reivewDateAndTime?: Date

  @Field({ nullable: true })
  parentId?: string


  @Field(() => ClinicalProvider, { nullable: true })
  clinicalProvider?: ClinicalProvider

  @Field(() => Patient, { nullable: true })
  patient?: Patient

  @Field(() => [Review], { nullable: true })
  childrenReviews?: Review[]
}
