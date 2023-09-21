import { Field, ObjectType } from '@nestjs/graphql'

import { Patient } from '@case-clinical/api/patient/data-access'

import { Document } from '@case-clinical/api/document/data-access'


@ObjectType()
export class Prescription {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  medicalProvider?: string

  @Field({ nullable: true })
  dateWritten?: Date

  @Field({ nullable: true })
  days?: string

  @Field({ nullable: true })
  note?: string

  @Field({ nullable: true })
  category?: string

  @Field({ nullable: true })
  kind?: string

  @Field({ nullable: true })
  quantity?: number

  @Field({ nullable: true })
  refills?: string

  @Field({ nullable: true })
  rxNumber?: string

  @Field({ nullable: true })
  sig?: string

  @Field({ nullable: true })
  strength?: string

  @Field({ nullable: true })
  unit?: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  documentId?: string


  @Field(() => Patient, { nullable: true })
  patient?: Patient

  @Field(() => Document, { nullable: true })
  document?: Document

}
