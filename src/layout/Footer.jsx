const Footer = () => {
  return (
    <footer className="mx-auto px-4 md:px-8 py-4 flex justify-between items-center gap-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
      <p className="caption text-n-2 lg:block">© {new Date().getFullYear()}</p>

      <div className="flex gap-2 text-n-2 text-sm font-semibold">
        <a className="cursor-pointer hover:underline hover:text-slate-600">
          Adatvédelem
        </a>
        <a className="cursor-pointer hover:underline hover:text-slate-600">
          Feltételek
        </a>
      </div>
    </footer>
  );
};

export default Footer;
