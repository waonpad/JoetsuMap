import type { UpdateModelCourseDTO } from '../../api/updateModelCourse';
import type { ModelCourse } from '../../types';

export type UpdateModelCourseFormProps = {
  modelCourseId: ModelCourse['id'];
};

export type UpdateModelCourseFormInput = UpdateModelCourseDTO['data'];
