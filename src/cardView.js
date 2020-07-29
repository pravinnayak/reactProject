import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {TablePagination,Card,CardMedia,CardContent,Divider,Typography} from '@material-ui/core';
import Ad from "./ad"
import SearchBar from "./searchBar";




const styles = muiBaseTheme => ({

    card: {
        maxWidth: 250,
        height: 300,
        display: "inline-block",
        margin: "1%",
        marginTop: "1%",
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
        marginTop: "1%",
        marginBottom: "1%",
        marginRight: "100%",
        transition: "0.3s",
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
        // handleData(0,parseInt(event.target.value, 10))
    };

    const onInputChange = (event, value, reason) => {
        let newData = [];
        for (let i of orginalData) {
            if (i.first_name.toLowerCase().includes(value.toLowerCase())) {
                newData.push(i)
            }
        }
        if(newData.length>0){
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


                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={
                            value.avatar
                        }
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"h6"}
                            gutterBottom
                        >
                            {value.first_name + " " + value.last_name} {value.id}
                        </Typography>
                        <Typography
                            className={"MuiTypography--subheading"}
                            variant={"caption"}
                        >
                            Email:<a href="mailto:{value.email}">{value.email}</a>

                        </Typography>
                        <Divider className={classes.divider} light />
                        {/* {faces.map(face => (
            <Avatar className={classes.avatar} key={face} src={face} />
        ))} */}
                    </CardContent>
                </Card>
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
