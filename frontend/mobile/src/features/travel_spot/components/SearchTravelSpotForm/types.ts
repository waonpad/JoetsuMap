export type SearchTravelSpotFormProps = {
  defaultValues?: SearchTravelSpotFormInput;
  onSubmitAction: (data: SearchTravelSpotFormInput) => void;
};

export type SearchTravelSpotFormInput = {
  freeKeyword: string;
};
