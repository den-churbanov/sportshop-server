import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import {AuthPage} from "../pages/AuthPage";
import {ProfilePage} from "../pages/ProfilePage";
import {CatalogPage} from "../pages/CatalogPage";
import {BasketPage} from "../pages/BasketPage";
import {ProductPage} from "../pages/ProductPage";
import {WrapperPage} from "../pages/WrapperPage";
import {StubPage} from "../pages/StubPage";

export const Routes = ({isAuthenticated}) => {

    if (isAuthenticated) {
        return (
            <WrapperPage>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/main" component={LandingPage}/>
                    <Route exact path="/profile" component={ProfilePage}/>
                    <Route exact path="/basket" component={BasketPage}/>
                    <Route path="/catalog/product" component={ProductPage}/>
                    <Route path="/catalog" component={CatalogPage}/>
                    <Route exact path="/stub" component={StubPage}/>
                    <Redirect to="/catalog"/>
                </Switch>
            </WrapperPage>
        );
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/authorization" component={AuthPage}/>
                <Redirect to="/catalog"/>
            </Switch>
        </Router>
    );
}