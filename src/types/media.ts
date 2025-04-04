// Define the MediaItem interface
export interface MediaItem {
  id: string;
  file_name: string;  // Keep for backward compatibility
  name: string;       // Add this for AdminMedia.tsx
  file_type: string;
  file_size: number;
  file_path: string;
  folder_id?: string | null;
  uploaded_at: string; // Add this for AdminMedia.tsx
  uploaded_by?: string | null;
  created_at: string;
}

// Define MediaFolder interface for future implementation
export interface MediaFolder {
  id: string;
  name: string;
  parent_id?: string | null;
  created_at: string;
}
