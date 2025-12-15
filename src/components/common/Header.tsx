const Header = ({ setSearchedName }: any) => {
  return (
    <div className="w-full flex items-center justify-between !py-5 !px-20 bg-[#F34D61]">
      <img src="logo.png" />
      <div>
        <input
          onChange={(e) => setSearchedName(e.target.value)}
          className="text-input"
          placeholder="Search by name"
          type="text"
        />
      </div>
    </div>
  );
};

export default Header;
