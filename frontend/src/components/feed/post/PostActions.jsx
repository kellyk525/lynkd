import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { likePost } from "../../../api/posts.js";
import PostAction from "./PostAction.jsx";

const PostActions = ({ post, isLiked, toggleCommentsSection }) => {
  const queryClient = useQueryClient();

  const { mutate: likePostMutation, isPending: isLikingPost } = useMutation({
    mutationFn: (postId) => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
    },
  });

  const handleLikePost = () => {
    // if we are liking the post, we don't want to send another request
    if (isLikingPost) return;
    likePostMutation(post._id);
  };

  return (
    <div className="flex justify-between text-info">
      <PostAction
        icon={
          <ThumbsUp
            size={18}
            className={isLiked ? "text-blue-500  fill-blue-300" : ""}
          />
        }
        text={`Like (${post.likes.length})`}
        onClick={handleLikePost}
      />

      <PostAction
        icon={<MessageCircle size={18} />}
        text={`Comment (${post.comments.length})`}
        onClick={toggleCommentsSection}
      />
      <PostAction icon={<Share2 size={18} />} text="Share" />
    </div>
  );
};

export default PostActions;
