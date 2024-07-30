export interface AkeneoListProduct {
  identifier: string;
  uuid: string;
  values: {
      name: { data: string }[];
      price: { data: { amount: string; currency: string }[]}[];
      image_1?: { data: string }[]; 
  };
}

  export interface AkeneoProductResponse {
    _embedded: {
      items: AkeneoListProduct[];
    };
  }