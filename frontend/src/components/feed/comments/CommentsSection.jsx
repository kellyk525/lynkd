import toast from "react-hot-toast";
import { useState } from "react";
import { Loader, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../../api/posts";

const CommentsSection = ({ post, currentUser }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { mutate: createCommentMutation, isPending: isCreatingComment } =
    useMutation({
      mutationFn: (commentData) => createComment(commentData),
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
      createCommentMutation({ comment: newComment, postId: post._id });
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
    <div className="p-4">
      <div className="mb-4 max-h-60 overflow-y-auto text-sm">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border-b-[1px] p-2 flex items-start"
          >
            <img
              src={comment.user.profilePicture || "/avatar.png"}
              alt={comment.user.name}
              className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
            />
            <div className="flex-grow">
              <div className="flex justify-between mb-2 text-xs text-stone-500">
                <div className="flex flex-col mr-2">
                  <span className="font-semibold text-sm text-neutral">
                    {comment.user.name}
                  </span>
                  <span>{comment.user.headline}</span>
                </div>
                <span>{formatDistanceToNow(new Date(comment.createdAt))}</span>
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
          className="flex-grow text-sm mr-2 p-2 rounded-full border-[1px] focus:outline-none focus:ring-2 focus:ring-base-200"
        />

        <button
          type="submit"
          className="text-white p-3 rounded-full bg-neutral hover:bg-secondary duration-300"
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
