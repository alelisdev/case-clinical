import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateIntegrationInput } from './user-update-integration.input'

@InputType()
export class UserUpdateIntegrationsInput {
  @Field(() => [UserUpdateIntegrationInput], {nullable: true }) 
  integrations: UserUpdateIntegrationInput[]
}
