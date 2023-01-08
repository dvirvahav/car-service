export type StateSignupDetails = {
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  verifyPassword: string;
};

export type Action =
  | { type: 'setFirstName'; firstName: string }
  | { type: 'setLastName'; lastName: string }
  | { type: 'setMail'; mail: string }
  | { type: 'setPassword'; password: string }
  | { type: 'setVerifyPassword'; verifyPassword: string };

export const initialState: StateSignupDetails = {
  firstName: '',
  lastName: '',
  mail: '',
  password: '',
  verifyPassword: '',
};

export function reducer(
  state: StateSignupDetails,
  action: Action
): StateSignupDetails {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setLastName':
      return { ...state, lastName: action.lastName };
    case 'setMail':
      return { ...state, mail: action.mail };
    case 'setPassword':
      return { ...state, password: action.password };
    case 'setVerifyPassword':
      return { ...state, verifyPassword: action.verifyPassword };
    default:
      throw new Error();
  }
}
