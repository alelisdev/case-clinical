import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  authorizationId?: string
}
