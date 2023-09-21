import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ClinicalProviderInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  expertId?: string

  @Field({ nullable: true }) 
  bio?: string

  @Field({ nullable: true }) 
  npi?: string

  @Field({ nullable: true }) 
  stateLicenseNumber?: string

  @Field({ nullable: true }) 
  caqhNumber?: string

  @Field({ nullable: true }) 
  honorific?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  suffix?: string

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  emailAddress?: string

  @Field({ nullable: true }) 
  profilePictureId?: string

  @Field({ nullable: true }) 
  compressProfilePictureId?: string

}
