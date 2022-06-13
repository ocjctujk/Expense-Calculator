
export interface Entry{
  id: number,
  name: string,
  expense: number,
  type: 'income' | 'expense',
  date: Date
}
