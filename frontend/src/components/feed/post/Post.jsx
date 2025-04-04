import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../api/auth.js";

import PostHeader from "./PostHeader.jsx";
import PostActions from "./PostActions.jsx";
import CommentsSection from "../comments/commentsSection.jsx";

const Post = ({ post }) => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
  });
  const [showComments, setShowComments] = useState(false);
  const isOwner = post.author._id === authUser._id;
  const isLiked = post.likes.includes(authUser._id);

  const handleToggleCommentsSection = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-secondary rounded-lg shadow mb-4">
      <div className="p-4">
        <PostHeader post={post} isOwner={isOwner} />
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full mb-4"
          />
        )}
        <PostActions
          post={post}
          isLiked={isLiked}
          toggleCommentsSection={handleToggleCommentsSection}
        />
      </div>
      {showComments && <CommentsSection post={post} currentUser={authUser} />}
    </div>
  );
};

export default Post;
