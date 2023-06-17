export type SearchTravelBookletFormProps = {
  defaultValues?: SearchTravelBookletFormInput;
  onSubmitAction: (data: SearchTravelBookletFormInput) => void;
};

export type SearchTravelBookletFormInput = {
  freeKeyword: string;
};
