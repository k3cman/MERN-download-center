import React, { Component } from "react";
import {
  withStyles,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Collapse,
  InputBase,
  Button
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/Inbox";
import CategoriesList from "../Common/CategoriesList";
import { connect } from "react-redux";
import {
  updateItemsBrand,
  searchItems,
  getItems
} from "../../actions/ItemActions";
import SearchIcon from "@material-ui/icons/Search";

class Sidebar extends Component {
  state = {
    open: false,
    search: ""
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleBrandClick = brand => {
    this.props.updateItemsBrand(brand);
  };
  handleSearchInput = e => {
    this.setState({ search: e.target.value });
  };
  handleEnterKey = e => {
    let event = e.keyCode || e.which;
    if (event === 13) {
      const searchStr = this.state.search;
      searchStr === ""
        ? this.props.getItems()
        : this.props.searchItems(searchStr);
    }
  };
  render() {
    const { classes } = this.props;
    const { brands, categories, checked, filters } = this.props.sidebar;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
      >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Pretraga…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            name="search"
            value={this.state.search}
            onChange={this.handleSearchInput}
            onKeyPress={this.handleEnterKey}
          />
        </div>
        {filters ? (
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => this.props.getItems()}
          >
            Resetuj FIltere
          </Button>
        ) : null}

        <CategoriesList cats={categories} checked={checked} />
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Brendovi" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {brands.map((brand, index) => (
              <ListItem
                onClick={() => this.handleBrandClick(brand)}
                key={index}
                dense
                button
              >
                <ListItemText inset primary={brand} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Drawer>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  drawer: {
    width: 300,
    flexShrink: 0,
    backgroundColor: "#FAFAFA"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  drawerPaper: {
    width: 300,
    backgroundColor: "#FAFAFA"
  },
  search: {
    paddingLeft: 10,
    marginTop: 1,
    height: 64,
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const mapStateToProps = state => ({
  sidebar: state.all
});

export default connect(
  mapStateToProps,
  { updateItemsBrand, getItems, searchItems }
)(withStyles(styles)(Sidebar));
