export interface Task {
  id: number;
  created_at: string;
  title: string;
  content: string;
  like: boolean;
  completed: boolean;
}
