import * as React from "react";
import { getNoteAppHost } from "../shell/Hosts";
import { MicroFrontend } from "../shell/MicroFrontend";

const noteHost = getNoteAppHost();

const Note : React.FC = () => {
    return (
        <div id="notes-container">
            <MicroFrontend
                name="notes"
                host={noteHost}
            />
        </div>
    );
}

export { Note }
