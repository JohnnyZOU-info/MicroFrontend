import * as React from "react";
import { getTodoAppHost } from "../shell/Hosts";
import { MicroFrontend } from "../shell/MicroFrontend";

const todoHost = getTodoAppHost();

const Todo : React.FC = () => {
    return (
        <div id="todo-container">
            <MicroFrontend
                name="todo"
                host={todoHost}
            />
        </div>
    );
}

export { Todo }
