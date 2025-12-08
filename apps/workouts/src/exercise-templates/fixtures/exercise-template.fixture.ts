import { ExercisesTemplates } from "../entitiy/exercise-templates.entity";
import { testCreateExerciseTemplate } from "./create-exercise-template.fixture";

export const testExerciseTemplate: ExercisesTemplates = {
  _id: "1",
  name: testCreateExerciseTemplate.name,
  imgUrl: testCreateExerciseTemplate.imgUrl,
  type: testCreateExerciseTemplate.type,
  engName: testCreateExerciseTemplate.engName,
  videoUrl: testCreateExerciseTemplate.videoUrl || ""
}

