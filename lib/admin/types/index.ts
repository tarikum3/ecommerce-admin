export interface LeadPayload {
  name: string;
}
export interface Pagination<T> {
  leads: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}
export type LeadsResponse = Pagination<LeadPayload>;
