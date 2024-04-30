export interface Task {
  id: number;
  createdAt: string;
  title: string;
  content: string;
  like: boolean;
  completed: boolean;
}
