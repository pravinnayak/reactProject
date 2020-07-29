import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemAvatar, ListItemText, TablePagination, Avatar, Typography } from "@material-ui/core";
import SearchBar from "./searchBar";
import Ad from "./ad"



const styles = muiBaseTheme => ({

    card: {
        maxWidth: 250,
        height: 300,
        display: "inline-block",
        margin: "0.8%",
        marginTop: "8%",
        // paddingTop:"10%",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        "border-radius":"5%"
    },
    adCard: {
        height: 100,
        width: "100%",
        // display: "inline-block",
        marginTop: "1%",
        marginBottom: "1%",
        marginRight: "100%",
        // paddingTop:"10%",
        transition: "0.3s",
        // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        // "&:hover": {
        //     boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        // }
    },
    media: {
        "background-size": "contain",
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: muiBaseTheme.spacing(3)
    },
    divider: {
        margin: `${muiBaseTheme.spacing(3)}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing()
        }
    },
    table: {

        marginRight: "40%",

    },
    root: {
        backgroundColor: muiBaseTheme.palette.background.paper,
        marginBottom: 9
    },
    searchbar: {
        marginLeft: 10
    },
    inline: {
        display: 'inline',
    }
});

function App({ classes }) {



    const [ad, setAd] = React.useState({})
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);


    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [data, setData] = React.useState([]);
    const [orginalData, setOriginal] = React.useState([]);
    const dataUrl = "https://reqres.in/api/users?page="


    const fetchData = (page) => {
        fetch(dataUrl + (Number(page) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setCount(result.total)
                    setData(result.data.sort(function (a, b) {
                        if (a.first_name < b.first_name) {
                            return -1
                        } else {
                            return 1
                        }
                    }))
                    setOriginal(result.data.sort(function (a, b) {
                        if (a.first_name < b.first_name) {
                            return -1
                        } else {
                            return 1
                        }
                    }))
                    // console.log(result.ad)
                    setAd(result.ad)
                },
                (error) => {
                    console.log(error)
                })
    }
    const handleChangePage = (event, newPage) => {

        setPage(newPage);
        fetchData(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
       
    };

    const onInputChange = (event, value, reason) => {

        let newData = [];
        for (let i of orginalData) {
            if (i.first_name.toLowerCase().includes(value.toLowerCase())) {
                newData.push(i)
            }
        }
        if (newData.length > 0) {
            setData(newData)

        }
    }



    React.useEffect(fetchData, [])

    return (
        <div className="App">
            <div className={classes.searchbar}>
                {data.length > 0 && <SearchBar data={data} onInputChange={onInputChange} />}
                

            </div>
            <Ad classes={classes} ad={ad}/>
            {data.map((value) => ((
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={value.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={value.first_name + " " + value.last_name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Email:
              </Typography>
                                    <a href="mailto:{value.email}">{value.email}</a>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    {/* <Divider variant="inset" component="li" /> */}
                </List>

            )))}

            <div className={classes.table}>
                <React.Fragment>
                    <TablePagination component="div" count={count} page={page} onChangePage={handleChangePage} rowsPerPage={rowsPerPage} rowsPerPageOptions={[6]} onChangeRowsPerPage={handleChangeRowsPerPage}></TablePagination>
                </React.Fragment>

            </div>
        </div>
    );
}

const WrappedApp = withStyles(styles)(App);


export default WrappedApp

// const rootElement = document.getElementById("root");
// ReactDOM.render(<WrappedApp />, rootElement);
