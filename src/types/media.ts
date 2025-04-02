
// Define the MediaItem interface
export interface MediaItem {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  folder_id?: string | null;
  uploaded_at: string;
}

// Define MediaFolder interface for future implementation
export interface MediaFolder {
  id: string;
  name: string;
  parent_id?: string | null;
  created_at: string;
}
