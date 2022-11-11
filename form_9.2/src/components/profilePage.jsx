import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("user");
    const user = data?.length ? JSON.parse(data) : false;
    setUser(user || {     
      name: "", 
      surname: "",
      year: "",
      link: "" });
  }, []);

  const handlerEditOn = () => {
      history.replace("/edit");
  };

  const calcAge = (year) => {
    const age =  new Date().getFullYear() - year;
  
    const postFix = (m) => {
      return m % 10 > 4 || m % 10 == 0 || (m >= 10 && m <= 20)
        ? "лет"
        : (m % 10 != 1) 
          ? "годa" 
          : "год";
    };
  
    return `${age} ${postFix(age)}`;
  };

  return (
    <>
      {user 
      ? <div className="py-6 px-6 flex-col content-center">
          {/* <h2 className="text-2xl font-bold">Создать</h2> */}
          <div className="mt-2 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <ul className="list-none md:list-disc">
                  <li className="">
                    <span className="text-black font-bold">
                    Имя:  
                    </span>{"  "}
                    <span className="text-slate-500 font-semibold">
                    {user.name}
                    </span>
                  </li>
                  <li className="">
                    <span className="text-black font-bold">
                    Фамилия: 
                    </span>{"  "}
                    <span className="text-slate-500 font-semibold">
                    {user.surname}
                    </span>
                  </li>
                  <li className="">
                    <span className="text-black font-bold">
                    Год рождения: 
                    </span>{"  "}
                    <span className="text-slate-500 font-semibold">
                    {`${user.year} (${calcAge(user.year)})`}
                    </span>
                  </li>
                  <li className="">
                    <span className="text-black font-bold">
                    Портфолио: 
                    </span>{"  "}
                    <span className="text-slate-500 font-semibold">
                    {user.link}
                    </span>
                  </li>
                </ul>
              </label>
              <button 
                className="bg-sky-500 text-white rounded-md p-2.5 w-100 mt-9" 
                type='button' 
                onClick={handlerEditOn}
              >Изменить</button>
            </div>
          </div>
        </div>
    : <div>
        <span className="text-black font-bold">Loading...</span>
      </div>}
    </>
  )
}

export default ProfilePage