export interface Project {
  id: string;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status: "pending" | "active" | "completed" | "cancelled";
  budget?: number;
  region?: string;
  project_type?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: "admin" | "manager" | "member" | "viewer";
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  assigned_to?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectMilestone {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  target_date?: string;
  status: "pending" | "in_progress" | "completed" | "missed";
  created_at: string;
  updated_at: string;
}

export interface ProjectDocument {
  id: string;
  project_id: string;
  name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  update_text: string;
  update_type?: string;
  created_by?: string;
  created_at: string;
}

export interface ProjectResource {
  id: string;
  project_id: string;
  resource_name: string;
  resource_type?: string;
  quantity?: number;
  unit?: string;
  cost?: number;
  created_at: string;
  updated_at: string;
}
