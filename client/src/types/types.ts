export type Treatment = {
  id: string;
  info: string;
  date: Date;
  worker_email: string;
  car_id: string;
};

export type TreatmentsState = {
  treatments: Treatment[];
  setTreatments: (treatments: Treatment[]) => void;
};
export type SearchState = {
  search: string;
  setSearch: (search: string) => void;
};
export type User = {
  mail: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserState = {
  user: User;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  setUser: (user: User) => void;
};

export type getTreatmentsState = {
  data: Treatment[];
};

export type ApiClient = {
  getTreatments: (
    email: string,
    password: string
  ) => Promise<getTreatmentsState>;
  deleteTreatment: (
    id: string,
    email: string,
    password: string
  ) => Promise<getTreatmentsState>;
  updateTreatment: (
    id: string,
    info: string,
    car_id: string,
    worker_email: string,
    email: string,
    password: string
  ) => Promise<getTreatmentsState>;
  contactUs: (
    mail: string,
    firstName: string,
    lastName: string,
    comment: string
  ) => Promise<string>;
};
