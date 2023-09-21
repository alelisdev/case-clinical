import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateContactSettingInput } from './user-update-contact-setting.input'

@InputType()
export class UserUpdateContactSettingsInput {
  @Field(() => [UserUpdateContactSettingInput], {nullable: true }) 
  contactSettings: UserUpdateContactSettingInput[]
}
