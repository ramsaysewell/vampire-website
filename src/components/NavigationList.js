import {collection, getDocs} from "@firebase/firestore/lite";
import Add from "@mui/icons-material/Add";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import Jumbotron from "../components/JumbotronComponent";
import db from "../firebase";
import useStyles from "../styles/ContentManagementSystem";

// this component is used when listing navigational items such as Collections and Documents within Collections.
const NavigationList = () => {
  // initialises state including values to be mapped, component styles, and navigational hooks
  const {type} = useParams();
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const navigate = useNavigate();

  // this function will run when the NavigationList component is rendered
  useEffect(() => {
    // if there is a current collection type found in the URL path
    // i.e. /cms/edit, type = "edit" whereas /cms, type = undefined
    if (type) {
      // send a getDocs() request on all documents in specified Collection
      getDocs(collection(db, type)).then((res) => {
        let results = [];
        // loop through each document in the collection and format it into a JSON variable "results"
        // items will then be able to indexed using values[item.id] when mapping through the array
        res.forEach((item) => {
          if (item.id) {
            results[item.id] = {...item.data(), id: item.id};
          }
        });

        // sets state to generated array
        setValues(results);
      });
    }
  }, []);

  // dynamic function that will allow the user to add a new document to specific type
  const addNew = () => {
    navigate(`/cms/${type}/new`, {replace: false});
  };

  // default rendered layout including Jumbtron, Breadcrumbs, Add New Button and a
  // rendering of the mapped items in the values state array
  return (
    <>
      <Jumbotron title={`Edit ${type[0].toUpperCase()}${type.slice(1)}`} />
      <Container className={classes.container} spacing={2}>
        {type && values && (
          <Breadcrumbs aria-label='breadcrumb' sx={{marginBottom: "1.5rem"}}>
            <Link component={RouterLink} to='/cms'>
              CMS
            </Link>
            <Typography color='text.primary'>
              {`${type[0].toUpperCase()}${type.slice(1)}`}
            </Typography>
          </Breadcrumbs>
        )}
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={(e) => addNew()}
              sx={{marginBottom: "1rem"}}
            >
              Create New <Add />
            </Button>
          </Grid>
          {type === "publications" && (
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant='contained'
                color='warning'
                onClick={(e) => navigate("/cms/publications/search")}
                sx={{marginBottom: "1rem"}}
              >
                Search Publications <Add />
              </Button>
            </Grid>
          )}
        </Grid>
        <List className={classes.list}>
          {values &&
            Object.values(values).map((item) => {
              // this list will only be mapped if there are currently values in the array
              // otherwise, this loop would cause an error to be triggered
              const {name, title} = item;
              return (
                <RouterLink
                  key={item.id}
                  component='ListItem'
                  to={`./${item.id}`}
                  className={classes.link}
                >
                  <Typography variant='h6'>
                    {name || title ? name || title : "New Item"}
                  </Typography>
                  <Typography variant='h6' className={classes.edit}>
                    Edit <ArrowRightAlt />
                  </Typography>
                </RouterLink>
              );
            })}
        </List>
      </Container>
    </>
  );
};

export default NavigationList;
