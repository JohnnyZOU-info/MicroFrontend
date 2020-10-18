export const getNoteAppHost = () => {
    return process.env.REACT_APP_NOTE_HOST || "http://localhost:3002";
};

export const getTodoAppHost = () => {
    return process.env.REACT_APP_TODO_HOST || "http://localhost:3001";
};
