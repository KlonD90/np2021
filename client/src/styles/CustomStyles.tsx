import { makeStyles } from '@material-ui/styles';
import { relative } from 'path';
import { isWhiteSpaceLike } from 'typescript';


export const useStyles = makeStyles({
    table: {
        width: "100%",
        display: 'block',
        overflow: "hidden",
        alignSelf: "center",
    },
    header: {
        color: "white"
    },
    paper: {
        width: "100%",
        backgroundColor: "rgba(177, 191, 204, 0.8)",
        minHeight: "3em",
        display: "flex",
        color: "#ededed",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        position: "relative",
        top: "0.2em",
        right: "0.2em",
        color: "#ededed"
    },
    hoverEffect: {
        "&:hover": {
            background: "#D4F1F4",
            cursor: "pointer"
        }
    },
    toolBar: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(177, 191, 204, 1)",
        minHeight: "14px",
        position: "fixed",
        width: "100%",
        bottom: "0"
    },
    gridItem: {
        postion: "relative",
        marginTop: "6em"
    }
})
