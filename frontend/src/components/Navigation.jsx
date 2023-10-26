import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="flex justify-between py-3 my-5 mx-3">
      <NavLink to={"/questionpage"}>
        <h1 className="text-2xl font-bold">Questions App</h1>
      </NavLink>
      <div className="mx-0">
        <NavLink
          to="/questionplay"
          className={
            "bg-blue-200 px-3 w-40 mx-10 py-2 inline-block rounded-md hover:bg-blue-400 hover:cursor-pointer text-zinc-950 font-bold text-center"
          }
        >
          {" "}
          Play Now{" "}
        </NavLink>

        <NavLink
          to="/questionform"
          className={
            "bg-blue-200 px-3 w-40 py-2 rounded-md inline-block hover:bg-blue-400 hover:cursor-pointer text-zinc-950 font-bold text-center"
          }
        >
          {" "}
          Create Question
        </NavLink>
      </div>
    </nav>
  );
}
