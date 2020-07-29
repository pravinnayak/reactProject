import React from "react";
import { Link,Typography, Card, } from "@material-ui/core";



function Ad(props) {
    const ad = props.ad
    const classes = props.classes
    return (
        <div>
            <Link target="_blank" href={ad.url}>
                <Card className={classes.adCard}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h5"}
                        gutterBottom
                        align="center">
                        {ad.company}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"h6"}
                        align="center"
                    >
                        {ad.text}

                    </Typography>

                </Card>
            </Link>

        </div>
    );
}



export default Ad;


