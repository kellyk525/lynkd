import toast from "react-hot-toast";
import { useState } from "react";
import { Loader, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../../api/posts.js";

const CommentsSection = ({ post, currentUser }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { mutate: createCommentMutation, isPending: isCreatingComment } =
    useMutation({
      mutationFn: (postId, commentData) => createComment(postId, commentData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success("Comment added successfully");
      },
      onError: (error) => {
        toast.error(error.response.data.message || "Failed to add comment");
      },
    });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createCommentMutation(post._id, newComment);
      setNewComment("");
      setComments([
        ...comments,
        {
          content: newComment,
          user: {
            _id: currentUser._id,
            name: currentUser.name,
            profilePicture: currentUser.profilePicture,
          },
          createdAt: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="px-4 pb-4">
      <div className="mb-4 max-h-60 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="mb-2 bg-base-100 p-2 rounded flex items-start"
          >
            <img
              src={comment.user.profilePicture || "/avatar.png"}
              alt={comment.user.name}
              className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
            />
            <div className="flex-grow">
              <div className="flex items-center mb-1">
                <span className="font-semibold mr-2">{comment.user.name}</span>
                <span className="text-xs text-info">
                  {formatDistanceToNow(new Date(comment.createdAt))}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="flex items-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="submit"
          className="bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300"
          disabled={isCreatingComment}
        >
          {isCreatingComment ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
