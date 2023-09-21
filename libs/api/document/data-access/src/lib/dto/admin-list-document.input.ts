import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListDocumentInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  contractId?: string  


  @Field({ nullable: true }) 
  patientId?: string  


  @Field({ nullable: true }) 
  userId?: string  

  @Field({ nullable: true }) 
  prescriptionId?: string  


  @Field({ nullable: true }) 
  providerId?: string  


  @Field({ nullable: true }) 
  patientStudyId?: string  


  @Field({ nullable: true }) 
  procedureVendorId?: string  


}
