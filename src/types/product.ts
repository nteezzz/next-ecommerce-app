export interface Product {
    uuid: string;
    values: {
      [key: string]: {
        data: string;
      }[];
    };
  }
  