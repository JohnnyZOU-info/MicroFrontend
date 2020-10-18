import * as React from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useNotes } from "./useNotes";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing(4)
    },
    editor: {
        marginTop: theme.spacing(1),
        border: "1px dashed #aaa",
        minHeight: theme.spacing(50),
        fontFamily: "Segoe UI",
        resize: "none"
    }
}));

type CommandId = "italic" | "bold" | "underline";

interface IEditButtonProps {
    name?: string;
    commandId: CommandId;
    arg?: string;
}

const EditIcon : React.FC<{ commandId: CommandId}> = ({ commandId }) => {
    switch (commandId) {
        case "italic":
            return (<FormatItalicIcon />);
        case "bold":
            return (<FormatBoldIcon />);
        case "underline":
            return (<FormatUnderlinedIcon />);
    }
}

const EditButton : React.FC<IEditButtonProps> = ({ name, commandId, arg }) => {
    return (
      <IconButton 
        key={commandId}
        onMouseDown={e => {
          e.preventDefault();
          document.execCommand(commandId, false, arg);
        }}
        size="small"
      >
        <EditIcon commandId={commandId} />
      </IconButton >
    );
}

const Notes: React.FC<{ initialHtmlText: string }> = ({ initialHtmlText}) => {
    const classes = useStyles();
    const { content, setContent } = useNotes(initialHtmlText);

    const handleChange = (e : ContentEditableEvent) => {
        setContent(e.target.value);
    };
    
    return (
        <div id="notes-app-root" className={classes.root} >
            <div>
                <EditButton commandId="bold" />
                <EditButton commandId="italic" />
                <EditButton commandId="underline" />                
            </div>
            <ContentEditable
                className={classes.editor}
                disabled={false}
                tagName="pre"
                html={content} 
                onChange={handleChange}
            />                
        </div>
    );
}

export { Notes };