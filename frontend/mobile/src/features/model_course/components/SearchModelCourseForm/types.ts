export type SearchModelCourseFormProps = {
  defaultValues?: SearchModelCourseFormInput;
  onSubmitAction: (data: SearchModelCourseFormInput) => void;
};

export type SearchModelCourseFormInput = {
  freeKeyword: string;
};
