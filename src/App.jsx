import { useState, useEffect } from "react";
function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  function readInputValue(event) {
    setInput(event.target.value);
  }

  function addTodo() {
    if (!input) return alert("Todo is Required");
    const copyTodoList = [...todoList];
    copyTodoList.push(input);
    setTodoList(copyTodoList);
    setInput("");
  }

  function deleteTodo(index) {
    const copyList = [...todoList];
    copyList.splice(index, 1);
    setTodoList(copyList);
  }

  function editTodo(index) {
    setInput(todoList[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function updateTodo() {
    if (!input) return alert("Todo is Required");

    const updatedList = [...todoList];
    updatedList[editIndex] = input;
    setTodoList(updatedList);

    setInput("");
    setIsEditing(false);
    setEditIndex(null);
  }

  return (
    <div className="flex flex-col items-center mt-20 w-full px-4">
      {/* Input + Add/Update Button */}
      <div className="flex ">
        <div className="InputContainer">
          <input
            className="input"
            type="text"
            placeholder="Add Your Tasks"
            value={input}
            onChange={(e) => readInputValue(e)}
          />
        </div>
        <button
          onClick={isEditing ? updateTodo : addTodo}
          className="w-20 mt-1 ml-2 h-12 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      {/* Todo List */}
      <div className="mt-6 w-full max-w-lg">
        {todoList.length === 0 ? (
          <p className="text-gray-400 text-center text-lg mr-16 ">
            No tasks yet. Add one!
          </p>
        ) : (
          <ul className="space-y-3">
            {todoList.map((todo, index) => (
              <li
                key={index}
                className="List flex justify-between items-center bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
              >
                <span>{todo}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editTodo(index)}
                    className="w-20 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out"
                  >
                    <span className="font-medium text-[#333] group-hover:text-white">
                      Edit
                    </span>
                  </button>

                  <button
                    onClick={() => deleteTodo(index)}
                    className="w-20 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out"
                  >
                    <span className="font-medium text-[#333] group-hover:text-white">
                      Delete
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
