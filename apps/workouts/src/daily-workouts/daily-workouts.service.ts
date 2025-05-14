import { ICreateWorkouts } from '@libs/contracts/workouts/ICreateWorkouts';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'apps/users/src/user/user.service';
import { MongoRepository, Repository } from 'typeorm';
import { DailyWorkouts } from './entity/daily-workouts.entity';
import { User } from 'apps/users/src/user/entity/user.entity';
import { ObjectId } from 'mongodb';
import { ExercisesService } from '../exercises/exercises.service';
import { Exercises } from '../exercises/entity/exercises';

@Injectable()
export class DailyWorkoutsService {
  constructor(
    //   private readonly aiRouterService: AiRouterService,
    private readonly userService: UserService,
    private readonly exercisesService: ExercisesService,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('DAILY_WORKOUTS')
    private readonly dailyWorkoutsRepository: MongoRepository<DailyWorkouts>,
  ) { }
  async createFirstWorkoutsCheckIndicators(idUser: string) {
    try {
      const user = await this.userService.findById(idUser)
      if (user.FirstWorkoutICheckndicatorId) {
        throw new InternalServerErrorException('User alerdi have firstWorkouts ');
      }
      //     const brigade = await this.brigadeService.getOneBrigade(user.brigadeId)
      //   const res = await this.aiRouterService.createFirstWorkoutsCheckingIndicators(brigade.requirements)
      const data: ICreateWorkouts = {
        name: "check your indicator",
        description: "A workout designed to help you assess your physical condition through a series of exercises that monitor strength, endurance, and flexibility. Ideal for tracking progress and identifying areas for improvement.",
        userId: idUser,
      }
      //const exercisesId = await this.exercisesService.createExercises(res)
      //data.exercisesId = exercisesId
      //console.log(exercisesId)
      const saveWorkouts = await this.createWorkouts(data)
      user.FirstWorkoutICheckndicatorId = saveWorkouts._id
      this.userRepository.save(user)

      return ""
      //res
    } catch (error) {
      throw error;
    }
  }
  async createWorkouts(data: ICreateWorkouts) {
    try {
      const daily = this.dailyWorkoutsRepository.create({
        name: data.name,
        description: data.description,
        userId: data.userId,
        state: false,
        exercisesId: data?.exercisesId?.map(id => id.toString()),
        day: new Date()
      })
      const res = await this.dailyWorkoutsRepository.save(daily)
      return res
    } catch (error) {
      throw error;
    }
  }
  async getFirstWorkouts(idUser: string) {
    try {
      const user = await this.userService.findById(idUser)
      if (!user.FirstWorkoutICheckndicatorId) {
        throw new InternalServerErrorException('Usere alerdy have firstWorkouts ');
      }

      return await this.getWorkoutsWithExercises(user.FirstWorkoutICheckndicatorId)

    } catch (error) {
      throw error;
    }
  }
  async endFirstExercises(idUser: string, exercises: Exercises) {
    try {
      const user = await this.userService.findById(idUser)
      const brigade = {
        "name": "Бригада морської піхоти ЗСУ",
        "shortName": "МП",
        "description": "Морська піхота України — елітний род військ, призначений для ведення бойових дій на суходолі, морі та прибережній зоні. Висока адаптація до складних погодних умов, довготривалих маршів та раптових змін середовища. Фізичні нормативи морпіхів надзвичайно жорсткі — вони повинні працювати в бронежилетах, з озброєнням та спорядженням в умовах підвищеного ризику.",
        "requirementsBrigade": [
          {
            "exercise": "Біг з навантаженням 10 кг (1000 м)",
            "minimum": 4.5,
            "maximum": 6
          },
          {
            "exercise": "Підтягування у бронежилеті",
            "minimum": 6,
            "maximum": null
          },
          {
            "exercise": "Плавання 100 м",
            "minimum": 2.5,
            "maximum": 4
          },
          {
            "exercise": "Віджимання",
            "minimum": 35,
            "maximum": null
          },
          {
            "exercise": "Присідання з навантаженням",
            "minimum": 30,
            "maximum": null
          }
        ]
      }
      //const res = await this.aiRouterService.commentExercise(brigade, exercises)
      //      const update = await this.exercisesService.endExercises(res.comment, exercises)
      return ""
      //update
    } catch (error) {
      throw error;
    }

  }
  async checkExercise(idDaily: string) {
    try {
      const workouts = await this.getWorkoutsWithExercises(idDaily)

    } catch (error) {
      throw error;
    }

  }
  async fastCreate(date: any) {
    try {
      const user = await this.userService.findById("68153bdbe35d79a29d4baed8")
      const exercisesId = await this.exercisesService.createExercises(date.exercises)
      const data: ICreateWorkouts = {
        name: "Відновлювальний тренувальний комплекс",
        description: "Повний тренувальний комплекс для сили та витривалості. Цей день відпочинку дозволяє відновити сили після важких тренувань, підготувати тіло до нових викликів і зменшити ризик травм. Відпочинок допомагає відновити м'язи, відновити енергетичні запаси і запобігти перенавантаженню організму. Для солдатів це критично важливо, адже фізична витривалість, швидкість відновлення і здатність до адаптації безпосередньо впливають на ефективність виконання завдань. Це час для відновлення, який дозволяє бути готовим до будь-яких фізичних навантажень, що можуть виникнути під час служби.",
        userId: "68153bdbe35d79a29d4baed8",
        exercisesId: exercisesId
      }
      const saveWorkouts = await this.createWorkouts(data)
      user.DailyWorkoutsIds.push(saveWorkouts._id)
      return this.userRepository.save(user)
    } catch (e) {
      throw e
    }
  }
  async getWorkouts(idUser: string) {
    try {
      const user = await this.userService.findById(idUser)
      if (!user) {
        throw new InternalServerErrorException('User alerdi have firstWorkouts ');
      }
      const res = await Promise.all(user.DailyWorkoutsIds.map(async (elem) => await this.getWorkoutsWithExercises(elem)))
      console.log(res[0].exercises)
      return res
    } catch (error) {
      throw error;
    }

  }
  async getWorkoutsWithExercises(id: string) {
    try {
      const workouts = await this.dailyWorkoutsRepository.findOne({
        where: {
          _id: new ObjectId(id)
        }
      });
      if (!workouts?.exercisesId) return { exercises: null, workouts }
      const exercises = await this.exercisesService.getExercises(workouts.exercisesId)



      return { workouts, exercises }
    } catch (error) {
      throw error;
    }

  }

}


