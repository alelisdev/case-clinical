import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { AdminCreateAcademyCategoryInput } from './dto/admin-create-academy-category.input'
import { AdminListAcademyCategoryInput } from './dto/admin-list-academy-category.input'
import { AdminListCourseInput } from '@case-clinical/api/academy/course/data-access'
import { AdminUpdateAcademyCategoryInput } from './dto/admin-update-academy-category.input'

@Injectable()
export class ApiAcademyCategoryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAcademyCategories(adminId: string, input?: AdminListAcademyCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.academyCategory.findMany({
      where: {
        name: {
          contains: input?.name,
        },
      },
      take: input?.limit,
      skip: input?.skip,
      include: { courses: true },
    })
  }

  async adminCountAcademyCategories(adminId: string, input?: AdminListAcademyCategoryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

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

  async adminAcademyCategoryCourses(adminId: string, input?: AdminListCourseInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminCountAcademyCategoryCourses(adminId: string, input?: AdminListCourseInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.course.count({ where: { categoryId: input.categoryId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async adminAcademyCategory(adminId: string, academyCategoryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.academyCategory.findUnique({ where: { id: academyCategoryId }, include: { courses: true } })
  }

  async adminCreateAcademyCategory(adminId: string, input: AdminCreateAcademyCategoryInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminUpdateAcademyCategory(adminId: string, academyCategoryId, input: AdminUpdateAcademyCategoryInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminDeleteAcademyCategory(adminId: string, academyCategoryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.academyCategory.delete({ where: { id: academyCategoryId } })
  }
}
