import type { CreateModelCourseDTO } from '../../api/createModelCourse';

export type CreateModelCourseFormProps = {
  defaultValues?: CreateModelCourseFormInput;
};

export type CreateModelCourseFormInput = CreateModelCourseDTO['data'];
