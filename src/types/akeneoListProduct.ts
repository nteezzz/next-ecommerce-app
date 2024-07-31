export interface AkeneoListProduct {
  identifier: string;
  uuid: string;
  values: {
      name: { data: string }[];
      price: { data: { amount: string; }[]}[];
      image_1?: { _links: {download:{href: string}}}[]; 
  };
}

  export interface AkeneoProductResponse {
    _embedded: {
      items: AkeneoListProduct[];
    };
  }