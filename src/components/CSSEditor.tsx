export const CSSEditor = () => {
  return (
    <div className="w-[100vw] h-[100vh] px-8">
      <div className="text-3xl text-center mb-8 ">Interactive CSS Editor</div>
      <iframe
        src="cssInteractive.html"
        title="css iframe"
        className="w-full h-full"
      />
    </div>
  );
};
