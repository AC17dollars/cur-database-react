const RightBar = () => {
  return (
    <div className="fixed right-0 top-32 w-1/3 rounded-md text-md bg-slate-200 shadow-md">
      <div className="flex flex-col">
        <div className="flex flex-col gap-3 items-baseline ml-1">
          <span className="text-md font-semibold flex gap-2 items-center">
            cur-Database
            <span className="text-sm font-light">© 2023</span>
          </span>
          <span className="text-sm font-light">AC17dollars</span>
          <span className="text-sm font-light">
            A Web UI made using ReactJS, tailwind and typescript integrating a
            &nbsp;<span className="line-through">postgreSQL</span>&nbsp;
            <span className="font-bold">mySQL</span>
            &nbsp;database.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
