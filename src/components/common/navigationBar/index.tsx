import { ChangeEvent, useState } from "react";

interface NavigationBarProps {
  onFetchUser: (gitHubUsername: string, page: number, perPage: number) => void;
}

const NavigationBar = (props: NavigationBarProps) => {
  const { onFetchUser } = props;
  const [username, setUsername] = useState("");

  const perPage: number = Number.parseInt(localStorage.getItem("perPage") || "25");

  const onChangeSearchUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return <nav className="flex flex-row w-full h-14 bg-black py-3 justify-center">
    <div className="flex flex-row">
      <input type="text" name="search" placeholder="Username" className="text-center px-2"
             onChange={onChangeSearchUsername} />
      <button className="bg-blue-600 px-2 text-white"
              onClick={() => {
                onFetchUser(username, 1, perPage);
                localStorage.setItem("username", username);
              }}>
        Search
      </button>
    </div>
  </nav>;
};

export default NavigationBar;