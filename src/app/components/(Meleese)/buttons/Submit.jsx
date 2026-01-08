const SubmitButton = ({ text }) => {
  return (
    <div className="flex justify-end md:col-span-2">
      <button
        type="submit"
        className="cursor-pointer border-t-2 border-b-2 px-10 py-3 text-sm font-semibold tracking-wide uppercase transition hover:bg-pink-600 hover:text-black"
      >
        {text || "Submit"}
      </button>
    </div>
  );
};

export default SubmitButton;
