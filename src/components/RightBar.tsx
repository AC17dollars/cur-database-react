// Right Bar Contains a card like footer generic components like reddit
const RightBar = () => {
  return (
    <div className="fixed right-0 top-32 w-1/3 rounded-md text-md bg-slate-200 shadow-md">
      <div className="flex flex-col">
        <div className="flex flex-col gap-3 items-baseline ml-1">
          <span className="text-md font-semibold flex gap-2 items-center">
            cur-Database
            <span className="text-sm font-light">© 2021</span>
          </span>
          <span className="text-sm font-light">AC17dollars</span>
          {/* all rights reserved and such */}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
