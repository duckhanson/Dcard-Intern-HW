import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
} from "reactstrap";
import SpotTable from "components/SpotTable.jsx";

import "./FilterableProductTable.css";

export default class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cities = ["Taipei", "Hsinchu", "Taichung", "Chiayi", "Tainan"];
        const cityItems = cities.map((city) => {
            let cityLink = "/" + city;
            return (
                <DropdownItem>
                    <NavLink tag={Link} to={cityLink}>
                        {city}
                    </NavLink>
                </DropdownItem>
            );
        });
        const tags = ["", ...cities];
        const routeList = tags.map((tag) => {
            let link = "/" + tag;
            return (
                <Route
                    exact
                    path={link}
                    render={() => <SpotTable city={tag} />}
                />
            );
        });

        return (
            <Router>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand className="col-auto text-info" href="/">
                        MOTC
                    </NavbarBrand>
                    <Collapse navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/" className="col-auto">
                                    All Spots
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown
                                nav
                                inNavbar
                                className="col-auto"
                            >
                                <DropdownToggle nav caret>
                                    City
                                </DropdownToggle>
                                <DropdownMenu
                                    modifiers={{
                                        setMaxHeight: {
                                            enabled: true,
                                            order: 890,
                                            fn: (data) => {
                                                return {
                                                    ...data,
                                                    styles: {
                                                        ...data.styles,
                                                        overflow: "auto",
                                                        maxHeight: "3rem",
                                                    },
                                                };
                                            },
                                        },
                                    }}
                                >
                                    {cityItems}
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavLink tag={Link} to="/">
                                            All
                                        </NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>

                <div className="bg-faded container my-auto">
                    <div className="row my-1">{routeList}</div>
                </div>

                <footer className="container">
                    <div className="row">
                        <span className="text-muted text-center col">
                            Dcard Intern.
                        </span>
                    </div>
                </footer>
            </Router>
        );
    }
}
