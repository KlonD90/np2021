import { makeStyles } from '@material-ui/styles';



export const useStyles = makeStyles({
    table: {
        width: "100%",
        display: 'block',
        overflow: "hidden",
        alignSelf: "center",
    },
    header: {
        color: "white",
        fontWeight: 700,
        fontFamily: "'Montserrat', sans-serif;"
    },
    headerSm: {
        fontWeight: 300,
        fontStyle: "",
        fontFamily: "'Montserrat', sans-serif;"
    },
    paper: {
        width: "100%",
        backgroundColor: "white",
        minHeight: "4.3em",
        position: "relative",
        // left: "15%",
        display: "flex",
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        // borderRadius: "1em",
        padding: "6px"
    },
    breadcrumbs: {
        backgroundColor: "white",
        borderRadius: "0.4em",
        padding: "0.3em"
    },
    icon: {
        position: "relative",
        top: "0.2em",
        right: "0.2em",
        color: "black"
    },
    hoverEffect: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    toolBar: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(236, 236, 236, 1)",
        minHeight: "14px",
        position: "fixed",
        width: "100%",
        bottom: "0"
    },
    gridItem: {
        postion: "relative",
        marginTop: "6em"
    },
    appbar: {
        width: "86%",
        marginRight: "7%"
    },
    container: {
        position: "relative",
        // top: "9vh"
    },
    toolBarTop: {
        height: "8vh",
        width: "100%",
        backgroundColor: "rgba(236, 236, 236, 1)"
    },
    // logo: {
    //     width: "220px",
    //     // width: "100%",
    //     height: "52px",
    //     borderRadius: "1em"
    // },
    logoLg: {
        width: "100%",
        height: "52px",
        borderRadius: "1em"
    },
    link: {
        "&:hover": {
            background: "#D4F1F4",
            cursor: "pointer"
        },
        color: "black"
    }
})
