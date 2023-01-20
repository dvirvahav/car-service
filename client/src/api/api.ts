import axios from 'axios';
import { ApiClient } from '../types/types';
// in development changed to http://localhost:3001
export const createApiClient = (): ApiClient => {
  return {
    getTreatments: (email: string, password: string) => {
      return axios
        .post('/api/treatment', {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((error) => console.log(error));
    },
    deleteTreatment: (id: string, email: string, password: string) => {
      return axios
        .get(
          `/api/deleteTreatment?id=${id}&email=${email}&password=${password}`
        )
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((error) => console.log(error));
    },
    updateTreatment: (
      id: string,
      email: string,
      password: string,
      info: string,
      worker_email: string,
      car_id: string
    ) => {
      return axios
        .get(
          `/api/updateTreatment?info=${info}&car_id=${car_id}&worker_email=${worker_email}&id=${id}&email=${email}&password=${password}`
        )
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((error) => console.log(error));
    },
  };
};
