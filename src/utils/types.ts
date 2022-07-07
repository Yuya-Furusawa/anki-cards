export type Deck = {
  id: number;
  name: string;
};

export type Card = {
  id: number;
  deck: number;
  face: string;
  back: string;
};

export type Method = {
  id: number;
  name: string;
  method: 'random' | 'order';
};
