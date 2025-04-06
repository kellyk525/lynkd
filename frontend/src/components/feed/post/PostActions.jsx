import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp, MessageCircle, Repeat2, Send } from "lucide-react";
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
    <div className="flex justify-between text-neutral text-sm font-semibold border-t-[1px] pt-1 mx-2">
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
      <PostAction icon={<Repeat2 size={18} />} text="Repost" />
      <PostAction icon={<Send size={18} />} text="Send" />
    </div>
  );
};

export default PostActions;
