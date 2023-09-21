import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class EligibilityRequestInput {

  @Field({ nullable: true }) 
  id?: string

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
}
