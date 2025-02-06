export interface Trip {
  id: number;
  region: string;
  from: string;
  to: string;
  tariff: "Эконом" | "Комфорт" | "Бизнес";
}
export interface TripCreate {
  region: string;
  from: string;
  to: string;
  tariff: "Эконом" | "Комфорт" | "Бизнес";
}