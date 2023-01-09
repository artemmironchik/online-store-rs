interface IObjectKeys {
  [key: string]: string | number | IRating;
}

interface IRating extends IObjectKeys {
  rate: number;
  count: number;
}

export interface IProduct extends IObjectKeys {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}
