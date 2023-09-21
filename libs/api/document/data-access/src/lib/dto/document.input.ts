import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class DocumentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  extension?: string

  @Field({ nullable: true }) 
  contractId?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  providerId?: string

  @Field({ nullable: true }) 
  patientStudyId?: string

  @Field({ nullable: true }) 
  procedureVendorId?: string

  @Field({ nullable: true }) 
  medicalConditionProviderId?: string






}
