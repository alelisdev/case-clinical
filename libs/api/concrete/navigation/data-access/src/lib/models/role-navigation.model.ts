import { Field, ObjectType } from '@nestjs/graphql'
import { Feature } from '../../../../../../feature/data-access/src'

@ObjectType()
export class RoleNavigation {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  roleId?: string

  @Field(() => Feature, { nullable: true })
  feature?: Feature
}
