import { Injectable } from '@nestjs/common'
import {
  ApiCoreDataAccessService,
  CorePaging,
  CorePagingInput,
  UpdateResult,
} from '@case-clinical/api/core/data-access'
import { UserCreateAcademyCategoryInput } from './dto/user-create-academy-category.input'
import { UserListAcademyCategoryInput } from './dto/user-list-academy-category.input'
import { UserUpdateAcademyCategoryInput } from './dto/user-update-academy-category.input'
import { UserListCourseInput } from '@case-clinical/api/academy/course/data-access'
import { UserUpdateAcademyCategoriesInput } from './dto/user-update-academy-categories.input'

@Injectable()
export class ApiAcademyCategoryDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userAcademyCategories(userId: string, input?: UserListAcademyCategoryInput) {
    return this.data.academyCategory.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { courses: true },
    })
  }

  async userSelectAcademyCategories(userId: string, input?: UserListAcademyCategoryInput) {
    return this.data.academyCategory.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountAcademyCategories(userId: string, input?: UserListAcademyCategoryInput): Promise<CorePaging> {
    const total = await this.data.academyCategory.count({
      where: {
        name: {
          contains: input?.name,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userAcademyCategory(userId: string, academyCategoryId) {
    return this.data.academyCategory.findUnique({ where: { id: academyCategoryId }, include: { courses: true } })
  }

  async userCreateAcademyCategory(userId: string, input: UserCreateAcademyCategoryInput) {
    return this.data.academyCategory.create({
      data: {
        courses:
          input.courses != null
            ? {
                createMany: {
                  data: {
                    ...input.courses,
                  },
                },
              }
            : undefined,
        name: input.name,
        slug: input.slug,
        title: input.title,
      },
      include: { courses: true },
    })
  }

  async userAcademyCategoryCourses(userId: string, input?: UserListCourseInput) {
    return this.data.course.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { categoryId: input.categoryId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountAcademyCategoryCourses(userId: string, input?: UserListCourseInput): Promise<CorePaging> {
    const total = await this.data.course.count({ where: { categoryId: input.categoryId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUpdateAcademyCategory(userId: string, academyCategoryId: string, input: UserUpdateAcademyCategoryInput) {
    return this.data.academyCategory.update({
      where: { id: academyCategoryId },
      data: {
        name: input.name,
        slug: input.slug,
        title: input.title,
      },
      include: { courses: true },
    })
  }

  async userUpdateAcademyCategories(userId: string, input: UserUpdateAcademyCategoriesInput): Promise<UpdateResult> {
    const total = input.academyCategories.length
    let updated = []
    let created = []
    let failed = []

    input.academyCategories.forEach(async (inputData) => {
      const data = {
        id: inputData.id,
        name: inputData.name,
        slug: inputData.slug,
        title: inputData.title,
      }

      try {
        
        const result = await this.data.academyCategory.upsert({
          where: { id: inputData.id || '' },
          create: data,
          update: data,
        })
        
        if (result.id === inputData.id){
           updated.push(result)
        }
        else {
          created.push(result)
        }
      } catch (error) {
        failed.push({input: inputData, error: error})
      }
    })

    return {
      total: total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed)
    }
    
  }

  

  async userDeleteAcademyCategory(userId: string, academyCategoryId: string) {
    return this.data.academyCategory.delete({ where: { id: academyCategoryId } })
  }
}
