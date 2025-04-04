import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "../../../api/posts.js";
import toast from "react-hot-toast";
import { Loader, Trash2 } from "lucide-react";

const PostHeader = ({ post, isOwner }) => {
  const queryClient = useQueryClient();

  const { mutate: deletePostMutation, isPending: isDeletingPost } = useMutation(
    {
      mutationFn: (deletedPostId) => deletePost(deletedPostId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success("Post deleted successfully");
      },
      onError: (error) => {
        toast.error(error.response.data.message || "Error deleting post");
      },
    }
  );

  const handleDeletePost = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePostMutation(post._id);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Link to={`/profile/${post?.author?.username}`}>
          <img
            src={post.author.profilePicture || "/avatar.png"}
            alt={post.author.name}
            className="size-10 rounded-full mr-3"
          />
        </Link>

        <div>
          <Link to={`/profile/${post?.author?.username}`}>
            <h3 className="font-semibold">{post.author.name}</h3>
          </Link>
          <p className="text-xs text-info">{post.author.headline}</p>
          <p className="text-xs text-info">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      {isOwner && (
        <button
          onClick={handleDeletePost}
          className="text-red-500 hover:text-red-700"
        >
          {isDeletingPost ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      )}
    </div>
  );
};

export default PostHeader;
