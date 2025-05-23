import toast from "react-hot-toast";
import { useState } from "react";
import { Image, Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../api/posts.js";

const PostCreation = ({ user }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: (postData) => createPost(postData),
    onSuccess: () => {
      resetForm();
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // fetch posts again
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to create post ");
    },
  });

  const handlePostCreation = async () => {
    try {
      const postData = { content };
      if (image) postData.image = await readFileAsDataURL(image); // convert raw image object to data url

      createPostMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataURL(file).then(setImagePreview); // will return the base64 string format
    } else {
      setImagePreview(null);
    }
  };

  const readFileAsDataURL = (file) => {
    // taking a file from the user's machine and read it as a data url
    // which would be in the base64 format (string representation of the image)
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onloadend = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="card mb-4 p-4">
      <div className="flex space-x-3">
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="size-12 rounded-full"
        />
        <textarea
          placeholder="Start a post"
          className="w-full p-3 border-[1px] rounded-xl border-base-300 hover:border-neutral focus:outline-none resize-none min-h-[100px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Selected"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <label className="flex items-center text-sm text-neutral font-semibold hover:text-secondary duration-200 cursor-pointer">
            <Image size={20} className="mr-2" />
            <span>Add Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <button
          className="submit-button"
          onClick={handlePostCreation}
          disabled={isPending}
        >
          {isPending ? <Loader className="size-5 animate-spin" /> : "Share"}
        </button>
      </div>
    </div>
  );
};

export default PostCreation;
