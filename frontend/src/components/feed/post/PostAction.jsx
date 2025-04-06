const PostAction = ({ icon, text, onClick }) => {
  return (
    <button
      className="flex flex-1 justify-center items-center hover:bg-base-200 py-2 rounded-md"
      onClick={onClick}
    >
      <span className="mr-1">{icon}</span>
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
};

export default PostAction;
