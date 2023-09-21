import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ProcedureOrTreatmentRequestInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  facilityVendorId?: string

  @Field({ nullable: true }) 
  facilityContractId?: string

  @Field({ nullable: true }) 
  anesthesiaVendorId?: string

  @Field({ nullable: true }) 
  anesthesiaVendorContractId?: string

  @Field({ nullable: true }) 
  requestingProviderId?: string

  @Field({ nullable: true }) 
  procedureTypeId?: string



  @Field({ nullable: true }) 
  status?: string
}
