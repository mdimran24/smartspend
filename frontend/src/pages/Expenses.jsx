import { useEffect, useState } from "react";
import api from "../api";
import ExpenseForm from "../components/ExpenseForm";
import { useAuthContext } from "../hooks/useAuthContext";
import UpdateModal from "../components/UpdateModal";
export default function Expenses() {
  const { user } = useAuthContext();
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    async function getExpenses() {
      try {
        const response = await api.get("/expenses", {
          headers: { Authorization: `Bearer ${user.access_token}` },
        });
        if (response.data) {
          setExpenses(response.data);
        }
      } catch (error) {
        alert("Failed getting expense", error);
      }
    }

    if (user) {
      getExpenses();
    }
  }, [user]);

  return (
    <>
      <ExpenseForm />

      <div className="mt-4">
        <h2 className="text-lg font-bold">Your Expenses</h2>
        {expenses.length > 0 ? (
          <>
            <ul className="list-disc pl-5">
              {expenses.map((exp) => {
                const d = new Date(exp.date);
                const date = d.toLocaleDateString();
                const time = d.toLocaleTimeString();
                return (
                  <div className="bg-white rounded mx-2 my-4 lg:m-10 relative shadow-lg p-5 text-gray-800">
                    <h4 className="text-xl text-sky-600">
                      <strong>Name: </strong>
                      {exp.name.toUpperCase()}
                    </h4>

                    <p>
                      <strong>Amount: </strong>
                      {exp.amount}
                    </p>

                    <p>
                      <strong>Time: </strong>
                      {date} {time}
                    </p>

                    <p>
                      <strong>Date: </strong>
                      {exp.category}
                    </p>

                    <div className="items-center">
                      <button
                        className="lg:absolute lg:top-16 lg:right-6 lg:m-0  my-2  bg-red-600 text-white font-bold  text-sm px-[65px] py-2  rounded shadow hover:bg-red-700 outline-none focus:outline-none  ease-linear transition-all duration-150"
                        onClick
                      >
                        Remove
                      </button>
                      <UpdateModal expense={exp} />
                    </div>
                  </div>
                );
              })}
            </ul>
          </>
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </>
  );
}
