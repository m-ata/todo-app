import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers/rootReducer";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import "./styles.scss";
import Table from "@components/Table";
import Card from "@components/Card";
import { TODO_COLUMNS } from "@/constants";

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="todos-container">
      <div className="list-container">
        {isMobile ? <Card data={todos} /> : <Table data={todos} columns={TODO_COLUMNS} />}
      </div>
      <Pagination />
    </div>
  );
};
export default TodoList;
