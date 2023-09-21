
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import { UserCreateClinicalProviderInput } from './dto/user-create-clinical-provider.input'
import { UserListClinicalProviderInput } from './dto/user-list-clinical-provider.input'
import { UserUpdateClinicalProviderInput } from './dto/user-update-clinical-provider.input'
import { UserUpdateClinicalProvidersInput } from './dto/user-update-clinical-providers.input'
import { getCalculateDistance } from '@case-clinical/shared/util/helpers'
import { ApiLocationDataAccessUserService } from '@case-clinical/api/location/data-access'


@Injectable()
export class ApiClinicalProviderDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService, private readonly locationService: ApiLocationDataAccessUserService) { }

  async userClinicalProviders(userId: string, input?: UserListClinicalProviderInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } });

    const name = input?.name ? input.name : undefined
    const vendorId = user.vendorId ?? input?.vendorId;
    const clinicalProviderId = (!input.clinicalProviderId || input.clinicalProviderId === "") ? undefined : input.clinicalProviderId;

    const clinicalProviderLocationId = (!input.clinicalProviderLocationId || input.clinicalProviderLocationId === "") ? undefined : input.clinicalProviderLocationId;
    const locationId = (!input.locationId || input.locationId === "") ? undefined : input.locationId;

    let clinicalProviders = await this.data.clinicalProvider.findMany({
      where: {
        AND: [{
          name: { contains: name },
          id: clinicalProviderId,
          clinicalProviderSpecialties: (input?.specialites && input.specialites?.length > 0) ? {
            some: {
              specialtyId: {
                in: input.specialites
              }
            }
          } : undefined,

          services: (input?.services && input.services?.length > 0) ?{
            some: {
              serviceId: {
                in: input.services
              }
            }
          } : undefined,
          favoriteProviders: input.favorites ? {
            some: {
              userId
            }
          } : undefined,
          vendorId: vendorId ? vendorId : undefined
        }]
      },
      take: input?.limit,
      skip: input?.skip,
      include: { clinicalProviderTags: {include: { tag: true }}, services: {include: {service: true,}}, vendor: true, favoriteProviders: { where: { userId } }, clinicalProviderSpecialties: { include: { clinicalProvider: true, specialty: true } }, clinicalProviderLocations: { include: { clinicalProvider: true, location: { include: { locationImages: true } } } } }
    })
    if(clinicalProviderLocationId){
      const customclinicalProviders: any[] = [];
      clinicalProviders.map((clinicalProvider) => {
        const customclinicalProviderLocations: any[] = [];
        let bFoundProvider = false;
        clinicalProvider.clinicalProviderLocations.map((clinicalProviderLocation) => {
          if(clinicalProviderLocation.id == clinicalProviderLocationId){
            customclinicalProviderLocations.push(clinicalProviderLocation)
            bFoundProvider = true;
          }
        })
        if (bFoundProvider) {
          clinicalProvider.clinicalProviderLocations = customclinicalProviderLocations;
          customclinicalProviders.push(clinicalProvider)
        }
      });
      clinicalProviders = customclinicalProviders
    }

    if(locationId && user.vendorId){
      const customclinicalProviders: any[] = [];
      clinicalProviders.map((clinicalProvider) => {
        const customclinicalProviderLocations: any[] = [];
        let bFoundProvider = false;
        clinicalProvider.clinicalProviderLocations.map((clinicalProviderLocation) => {
          if(clinicalProviderLocation.location.id == locationId){
            customclinicalProviderLocations.push(clinicalProviderLocation)
            bFoundProvider = true;
          }
        })
        if (bFoundProvider) {
          clinicalProvider.clinicalProviderLocations = customclinicalProviderLocations;
          customclinicalProviders.push(clinicalProvider)
        }
      });
      clinicalProviders = customclinicalProviders
      console.log("locationId", customclinicalProviders)
    }
    if(!input.isDoctorsPage) return clinicalProviders;
    let customclinicalProviders: any[] = [];
    if (input?.distance && input?.centerLocation && input?.centerLocation.length == 2) {
      const distanceFilter = Number(input?.distance);
      clinicalProviders.map((clinicalProvider) => {
        const customclinicalProviderLocations: any[] = [];
        let bFoundProvider = false;
        clinicalProvider.clinicalProviderLocations.map((clinicalProviderLocation) => {
          if(clinicalProviderLocation.location != null){
            if(clinicalProviderLocation.location.latitude != null && clinicalProviderLocation.location.longitude != null)
            {
              const distance = getCalculateDistance(input?.centerLocation , [clinicalProviderLocation.location.latitude, clinicalProviderLocation.location.longitude]);
              if (distance <= distanceFilter && distance >= 0) {
                customclinicalProviderLocations.push(clinicalProviderLocation)
                bFoundProvider = true;
              }
              clinicalProviderLocation['distance'] = distance;
            }
          }
        })
        if (bFoundProvider) {
          clinicalProvider.clinicalProviderLocations = customclinicalProviderLocations;
          customclinicalProviders.push(clinicalProvider)
        }
      });
    }else{
      customclinicalProviders = clinicalProviders.filter((clinicalProvider) => clinicalProvider.clinicalProviderLocations.length > 0)
    }


    return customclinicalProviders;
  }

  async userSelectClinicalProviders(userId: string, input?: UserListClinicalProviderInput) {
    const name = input?.name ? input.name : undefined

    return this.data.clinicalProvider.findMany({
      where: {
        AND: [{
          name: { contains: name },
          vendorId: input.vendorId,
        }]
      },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClinicalProviders(userId: string, input?: UserListClinicalProviderInput): Promise<CorePaging> {
    const name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProvider.count(
      {
        where: {
          AND: [{
            name: { contains: name },
            vendorId: input.vendorId,
          }]
        },
      }
    )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClinicalProvider(userId: string, clinicalProviderId) {

    const clinicalProder = await this.data.clinicalProvider.findUnique({
      where: { id: clinicalProviderId },
      include: {
        educations: true,
        experiences: true,
        // reviews: true,
        services: {
          include: {
            service: true,
          }
        },
        awards: true,
        vendor: true,
        appointments: { include: { location: true, patient: true, clinicalProvider: { include: { clinicalProviderSpecialties: true } }, legalCase: true, appointmentStatus: true } }, clinicalProviderLocations: { include: { clinicalProviderLocationAvailabilities: true,clinicalProvider: true, location: { include: { locationImages: true } } } },
        clinicalProviderSpecialties: { include: { clinicalProvider: true, specialty: true } }, clinicalProviderTags: { include: { clinicalProvider: true, tag: true } }, favoriteProviders: { where: { userId }, include: { clinicalProvider: true } }, medicalConditionProviders: { include: { clinicalProvider: true } }, medicalRecords: { include: { clinicalProvider: true } }, pchProviders: { include: { clinicalProvider: true } }
      }
    })
    if (clinicalProder == null) return null;
    if (clinicalProder != null && clinicalProder.profilePictureId) {
      const profileDocument = await this.data.userDocument(userId, clinicalProder.profilePictureId);
      clinicalProder['profileImage'] = profileDocument;
    }
    const review = await this.data.getRatingReview(userId, clinicalProviderId)
    clinicalProder['rating'] = Number((review._avg.rating??0).toFixed(2))
    clinicalProder['reviewCount'] = review._count.id
    return clinicalProder;
  }

  async checkClinicalProviderExist(clinicalProviderName: string, vendorId:string) {
    try {
      return this.data.clinicalProvider.findMany({ where: { name: clinicalProviderName, vendorId:vendorId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClinicalProvider(userId: string, input: UserCreateClinicalProviderInput) {
    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {

      let profileDocument;
      if (input.profileImage) {
        profileDocument = await this.data.userCreateDocument(userId, input.profileImage);
        if (!profileDocument)
          throw new BadRequestException('Cannot access azure storage');

        input.profilePictureId = profileDocument.id;
      }


      await this.data.logEvent(sendingUser, true, 'ClinicalProvider', 'Create', input)

      const locationIds = [];
      if(input.locations) {
        for(let i = 0; i < input.locations.length; i++) {
          try {
            const location = await this.locationService.userCreateLocation(userId, input.locations[i]);
            if(location) locationIds.push(location.id);
          } catch {
            console.log('location create error')
          }
        }
      }
      console.log({ locationIds, input: input.locations })
      const clinicalProvider = await this.data.clinicalProvider.create({
        data: {

          vendor:
            input.vendorId != null
              ? {
                connect: {
                  id: input.vendorId
                }
              } : undefined, name: input.name,
          npi: input.npi,
          clinicalProviderLocations: locationIds.length > 0 ? {
            create: locationIds.map((locationId) => ({locationId}))
          } : undefined,
          honorific: input.honorific,
          firstName: input.firstName,
          lastName: input.lastName,
          bio: input.bio,
          stateLicenseNumber: input.stateLicenseNumber, 
          caqhNumber: input.caqhNumber, 
          suffix: input.suffix,
          phoneNumber: input.phoneNumber,
          emailAddress: input.emailAddress,
          profileImage: input.profilePictureId ? {
            connect: {
              id: input.profilePictureId
            }
          } : undefined,
          compressProfilePictureId: input.compressProfilePictureId,
          expertId: input.expertId
        }
        , include: {
          vendor: true, appointments: true, clinicalProviderLocations: true, clinicalProviderSpecialties: true,
          clinicalProviderTags: true, favoriteProviders: true, medicalConditionProviders: true, medicalRecords: true, pchProviders: true
        }
      })

      await this.data.logEvent(sendingUser, false, 'ClinicalProvider', 'Create', clinicalProvider)

      if (profileDocument) clinicalProvider['profileImage'] = profileDocument;
      return clinicalProvider

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Clinical Provider')
    }

  }





  async userUpdateClinicalProvider(userId: string, clinicalProviderId: string, input: UserUpdateClinicalProviderInput) {
    console.log('this is in api clinical provider data access user service ts', input)

    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      if (!clinicalProviderId) {
        throw new BadRequestException('Clinical Provider Id is required')
      } else {

        let profileDocument;
        if (input.profileImage) {
          profileDocument = await this.data.userCreateDocument(userId, input.profileImage);
          if (!profileDocument)
          throw new BadRequestException('Cannot access azure storage');

          input.profilePictureId = profileDocument.id;
        }


        await this.data.logEvent(sendingUser, true, 'ClinicalProvider', 'Update', input)

        const clinicalProvider = this.data.clinicalProvider.update({
          where: { id: clinicalProviderId },
          data: {

            vendor:
              input.vendorId != null
                ? {
                  connect: {
                    id: input.vendorId
                  }
                } : undefined,
            name: input.name,
            npi: input.npi,
            honorific: input.honorific,
            firstName: input.firstName,
            lastName: input.lastName,
            suffix: input.suffix,
            bio: input.bio,
            stateLicenseNumber: input.stateLicenseNumber, 
            caqhNumber: input.caqhNumber, 
            phoneNumber: input.phoneNumber,
            emailAddress: input.emailAddress,
            profileImage: input.profilePictureId ? {
              connect: {
                id: input.profilePictureId
              }
            } : undefined,
            compressProfilePictureId: input.compressProfilePictureId,
            expertId: input.expertId,
            educations: input.educations ? {
              deleteMany: {},
              createMany: {
                data: input.educations
              },
            } : undefined,
            experiences: input.experiences ? {
              deleteMany: {},
              createMany: {
                data: input.experiences
              },
            } : undefined,
            awards: input.awards ? {
              deleteMany: {},
              createMany: {
                data: input.awards
              },
            } : undefined,
            clinicalProviderTags: input.clinicalProviderTags ? {
              deleteMany: {},
              createMany: {
                data: input.clinicalProviderTags.map(item => {
                  return {
                    id: item.id,
                    name: item.name,
                    tagId: item.tag.id,
                  }
                })
              }
            } : undefined,
            clinicalProviderSpecialties: input.clinicalProviderSpecialties ? {
              deleteMany: {},
              createMany: {
                data: input.clinicalProviderSpecialties.map(item => {
                  return {
                    id: item.id,
                    name: item.name,
                    specialtyId: item.specialty.id
                  }
                })
              }
            } : undefined,
          }
          , include: {
            educations: true,
            experiences: true,
            services: {
              include: {
                service: true,
              }
            },
            profileImage: true,
            awards: true,
            vendor: true,
            appointments: { include: { location: true, patient: true, clinicalProvider: { include: { clinicalProviderSpecialties: true } }, legalCase: true, appointmentStatus: true } }, clinicalProviderLocations: { include: { clinicalProviderLocationAvailabilities: true,clinicalProvider: true, location: { include: { locationImages: true } } } },
            clinicalProviderSpecialties: { include: { clinicalProvider: true, specialty: true } }, clinicalProviderTags: { include: { clinicalProvider: true, tag: true } }, favoriteProviders: { where: { userId }, include: { clinicalProvider: true } }, medicalConditionProviders: { include: { clinicalProvider: true } }, medicalRecords: { include: { clinicalProvider: true } }, pchProviders: { include: { clinicalProvider: true } }
          }
        })

        await this.data.logEvent(sendingUser, false, 'ClinicalProvider', 'Update', clinicalProvider)
        if (profileDocument) clinicalProvider['profileImage'] = profileDocument;
        return clinicalProvider

      }
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Clinical Provider')
    }
  }

  async userUpdateClinicalProviders(userId: string, input: UserUpdateClinicalProvidersInput): Promise<UpdateResult> {
    const total = input.clinicalProviders.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.clinicalProviders) {
      const inputData = input.clinicalProviders[key]

      const data = {
        id: inputData.id,
        name: inputData.name,
        vendorId: inputData.vendorId,
        expertId: inputData.expertId,
        npi: inputData.npi,
        honorific: inputData.honorific,
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        suffix: inputData.suffix,
        phoneNumber: inputData.phoneNumber,
        emailAddress: inputData.emailAddress,
        stateLicenseNumber: inputData.stateLicenseNumber, 
        caqhNumber: inputData.caqhNumber, 
        profilePictureId: inputData.profilePictureId,
        compressProfilePictureId: inputData.compressProfilePictureId,
        user: inputData.user,

      }

      const clinicalProviderData = await this.checkClinicalProviderExist(inputData.name, inputData.vendorId)

      if (clinicalProviderData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.clinicalProvider.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }

  async userAddToFavorites(userId: string, clinicalProviderId: string) {
    const favoriteProviders = await this.data.favoriteProvider.findMany({
      where: {
        clinicalProviderId,
        userId
      }
    });
    if (favoriteProviders?.length > 0) {
      throw new BadRequestException('Clinical provider has been already added to favorites');
    }

    const provider = await this.data.clinicalProvider.update({
      where: {
        id: clinicalProviderId
      },
      data: {
        favoriteProviders: {
          create: {
            userId,
          }
        }
      },
      include: {
        educations: true,
        experiences: true,
        reviews: true,
        services: {
          include: {
            service: true,
          }
        },
        awards: true,
        vendor: true,
        appointments: { include: { location: true, patient: true, clinicalProvider: { include: { clinicalProviderSpecialties: true } }, legalCase: true, appointmentStatus: true } }, clinicalProviderLocations: { include: { clinicalProvider: true, location: { include: { locationImages: true } } } },
        clinicalProviderSpecialties: { include: { clinicalProvider: true, specialty: true } }, clinicalProviderTags: { include: { clinicalProvider: true, tag: true } }, favoriteProviders: { where: { userId }, include: { clinicalProvider: true } }, medicalConditionProviders: { include: { clinicalProvider: true } }, medicalRecords: { include: { clinicalProvider: true } }, pchProviders: { include: { clinicalProvider: true } }
      }
    });

    if (provider.profilePictureId) {
      const profileImage = await this.data.userDocument(userId, provider.profilePictureId);
      provider['profileImage'] = profileImage;
    }
    const review = await this.data.getRatingReview(userId, clinicalProviderId)
    provider['rating'] = Number((review._avg.rating??0).toFixed(2))
    provider['reviewCount'] = review._count.id
    return provider;
  }

  async userRemoveFromFavorites(userId: string, clinicalProviderId: string) {
    const favoriteProvider = await this.data.favoriteProvider.findFirst({
      where: {
        userId,
        clinicalProviderId
      }
    })
    if (!favoriteProvider) {
      throw new BadRequestException('This clinical provider is not in favorite list')
    }

    const provider = await this.data.clinicalProvider.update({
      where: {
        id: clinicalProviderId
      },
      data: {
        favoriteProviders: {
          delete: {
            id: favoriteProvider.id
          }
        }
      },
      include: {
        educations: true,
        experiences: true,
        reviews: true,
        services: {
          include: {
            service: true,
          }
        },
        awards: true,
        vendor: true,
        appointments: { include: { location: true, patient: true, clinicalProvider: { include: { clinicalProviderSpecialties: true } }, legalCase: true, appointmentStatus: true } }, clinicalProviderLocations: { include: { clinicalProvider: true, location: { include: { locationImages: true } } } },
        clinicalProviderSpecialties: { include: { clinicalProvider: true, specialty: true } }, clinicalProviderTags: { include: { clinicalProvider: true, tag: true } }, favoriteProviders: { where: { userId }, include: { clinicalProvider: true } }, medicalConditionProviders: { include: { clinicalProvider: true } }, medicalRecords: { include: { clinicalProvider: true } }, pchProviders: { include: { clinicalProvider: true } }
      }
    });
    if (provider.profilePictureId) {
      const profileImage = await this.data.userDocument(userId, provider.profilePictureId);
      provider['profileImage'] = profileImage;
    }
    const review = await this.data.getRatingReview(userId, clinicalProviderId)
    provider['rating'] = Number((review._avg.rating??0).toFixed(2))
    provider['reviewCount'] = review._count.id
    return provider;
  }

  async userDeleteClinicalProvider(userId: string, clinicalProviderId: string) {
    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      if (!clinicalProviderId) {
        throw new BadRequestException('Clinical Provider Id is required')
      } else {

        const appointmentCount = await this.data.appointment.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (appointmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Appointment')
        }


        const clinicalProviderLocationCount = await this.data.clinicalProviderLocation.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (clinicalProviderLocationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Location')
        }


        const clinicalProviderSpecialtyCount = await this.data.clinicalProviderSpecialty.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (clinicalProviderSpecialtyCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Specialty')
        }


        const clinicalProviderTagCount = await this.data.clinicalProviderTag.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (clinicalProviderTagCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Tag')
        }


        const favoriteProviderCount = await this.data.favoriteProvider.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (favoriteProviderCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Favorite Provider')
        }


        const medicalConditionProviderCount = await this.data.medicalConditionProvider.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (medicalConditionProviderCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Medical Condition Provider')
        }


        const medicalRecordCount = await this.data.medicalRecord.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (medicalRecordCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Medical Record')
        }


        const pchProviderCount = await this.data.pchProvider.count({ where: { clinicalProviderId: clinicalProviderId } })
        if (pchProviderCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Pch Provider')
        }

        await this.data.logEvent(sendingUser, true, 'ClinicalProvider', 'Delete', clinicalProviderId)

        const clinicalProvider = this.data.clinicalProvider.delete({
          where: { id: clinicalProviderId }
        })

        await this.data.logEvent(sendingUser, false, 'ClinicalProvider', 'Delete', clinicalProvider)

        return clinicalProvider

      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Error in deleting Clinical Provider')
    }
  }
}
