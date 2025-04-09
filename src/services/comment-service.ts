
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Comment {
  id: string;
  article_id: string;
  author_name: string | null;
  author_email: string | null;
  content: string;
  status: string;
  created_at: string;
  user_id: string | null;
  parent_id?: string | null;
  replies?: Comment[];
}

// Fetch comments for an article
export async function fetchComments(articleId: string): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    // Process comments to create a hierarchical structure
    const comments: Comment[] = data || [];
    const topLevelComments: Comment[] = [];
    const commentMap = new Map<string, Comment>();

    // First, create a map of all comments
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Then, organize them into a tree structure
    comments.forEach(comment => {
      if (comment.parent_id && commentMap.has(comment.parent_id)) {
        // This is a reply, add it to its parent
        const parent = commentMap.get(comment.parent_id);
        if (parent && parent.replies) {
          parent.replies.push(commentMap.get(comment.id) as Comment);
        }
      } else {
        // This is a top-level comment
        topLevelComments.push(commentMap.get(comment.id) as Comment);
      }
    });

    return topLevelComments;
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    toast({
      title: "Error fetching comments",
      description: error.message || "Failed to load comments",
      variant: "destructive"
    });
    return [];
  }
}

// Post a new comment
export async function postComment(
  comment: Omit<Comment, 'id' | 'created_at' | 'status' | 'user_id'>
): Promise<Comment | null> {
  try {
    // Get the current user session
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;
    
    // Set user_id from authenticated session if available
    const commentData = {
      ...comment,
      status: 'pending', // Comments might need approval
      user_id: session?.user?.id || null
    };

    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast({
      title: "Comment submitted",
      description: "Your comment has been submitted and is pending review."
    });

    return data;
  } catch (error: any) {
    console.error('Error posting comment:', error);
    toast({
      title: "Error posting comment",
      description: error.message || "Failed to submit your comment",
      variant: "destructive"
    });
    return null;
  }
}

// Delete a comment
export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    // Get the current user session
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;
    
    if (!session?.user?.id) {
      throw new Error('Authentication required to delete comments');
    }
    
    // RLS will ensure users can only delete their own comments
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      throw error;
    }

    toast({
      title: "Comment deleted",
      description: "Your comment has been deleted."
    });

    return true;
  } catch (error: any) {
    console.error('Error deleting comment:', error);
    toast({
      title: "Error deleting comment",
      description: error.message || "Failed to delete your comment",
      variant: "destructive"
    });
    return false;
  }
}

// Update an existing comment
export async function updateComment(commentId: string, content: string): Promise<Comment | null> {
  try {
    // Get the current user session
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;
    
    if (!session?.user?.id) {
      throw new Error('Authentication required to update comments');
    }
    
    // RLS will ensure users can only update their own comments
    const { data, error } = await supabase
      .from('comments')
      .update({ content })
      .eq('id', commentId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast({
      title: "Comment updated",
      description: "Your comment has been updated."
    });

    return data;
  } catch (error: any) {
    console.error('Error updating comment:', error);
    toast({
      title: "Error updating comment",
      description: error.message || "Failed to update your comment",
      variant: "destructive"
    });
    return null;
  }
}
