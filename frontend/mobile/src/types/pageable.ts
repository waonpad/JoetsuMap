export type PageableParams = {
  page?: number;
  size?: number;
  // sort?: string;
};

export type PageableData = {
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
};

export type PageData = {
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export type Page<T> = {
  content: T[];
  pageable: PageableData;
} & PageData;
