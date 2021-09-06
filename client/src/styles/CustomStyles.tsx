import { makeStyles } from '@material-ui/styles';
import { relative } from 'path';


export const useStyles = makeStyles({
    table: {
        width: "100%",
        display: 'block',
        overflowX: 'auto'
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
    }
})
