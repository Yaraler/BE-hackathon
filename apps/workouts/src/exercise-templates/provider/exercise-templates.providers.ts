import { DataSource } from 'typeorm';
import { ExercisesTemplates } from '../entitiy/exercise-templates.entity';

export const exerciseTemplatesProviders = [
  {
    provide: 'EXERCISE_TEMPLATE',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExercisesTemplates),
    inject: ['DATA_SOURCE'],
  },
];

