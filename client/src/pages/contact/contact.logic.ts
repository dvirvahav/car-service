export type StateContactDetails = {
  firstName: string;
  lastName: string;
  mail: string;
  comment: string;
};

export type ActionContact =
  | { type: 'setFirstName'; firstName: string }
  | { type: 'setLastName'; lastName: string }
  | { type: 'setMail'; mail: string }
  | { type: 'setComment'; comment: string };

export const initialStateContact: StateContactDetails = {
  firstName: '',
  lastName: '',
  mail: '',
  comment: '',
};

export function contactReducer(
  state: StateContactDetails,
  action: ActionContact
): StateContactDetails {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setLastName':
      return { ...state, lastName: action.lastName };
    case 'setMail':
      return { ...state, mail: action.mail };
    case 'setComment':
      return { ...state, comment: action.comment };

    default:
      throw new Error();
  }
}
