export type Phone = {
  ddd: number;
  number: number;
};

export type Part = {
  name: string;
  secondName: string;
  email: string;
  document: string;
  phone: Phone;
};

export type Contract = {
  title: string;
  startDate: string;
  expiration: string;
  file: string;
  parts?: Part[];
};

export type AssociatePart = {
  contractTitle: string;
  partDocument: string;
};
