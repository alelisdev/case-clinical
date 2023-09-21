import { Field, ObjectType } from '@nestjs/graphql'

import { EligibilityStatus } from '@case-clinical/api/eligibility-status/data-access'


@ObjectType()
export class EligibilityRequest {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  providerId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  visitTypeId?: string

  @Field({ nullable: true }) 
  taxID?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  memberRegistrationNumber?: string

  @Field({ nullable: true }) 
  eligibilityStatusId?: string


  @Field(() => EligibilityStatus, { nullable: true }) 
  elegibilityStatus?: EligibilityStatus  

}
