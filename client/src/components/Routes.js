import React, {useContext, useEffect} from "react"
import {Route, Switch, Redirect} from "react-router-dom"
import {LandingPage} from "../pages/LandingPage"
import {AuthPage} from "../pages/AuthPage"
import {ProfilePage} from "../pages/ProfilePage"
import {CatalogPage} from "../pages/CatalogPage"
import {BasketPage} from "../pages/BasketStub"
import {ProductPage} from "../pages/ProductPage"
import {WrapperPage} from "../pages/WrapperPage"
import {_404Page} from "../pages/_404Page"
import {connect} from "react-redux";
import {clearUserInfo, fetchUserInfo} from "../redux/actions";
import {AuthContext} from "../AuthContext";

const RoutesComponent = ({isAuthenticated, token, user, fetchUserInfo, clearUserInfo}) => {

    useEffect(() => {
        if (isAuthenticated && !user) {
            fetchUserInfo(token)
        }
        else if(!isAuthenticated && user) {
            clearUserInfo()
        }
    }, [isAuthenticated])

    if (isAuthenticated) {
        return (
            <WrapperPage>
                <Switch>
                    <Route exact path="/main" component={LandingPage}/>
                    <Route exact path="/profile" component={ProfilePage}/>
                    <Route exact path="/basket" component={BasketPage}/>
                    <Route exact path="/catalog/product/:id" component={ProductPage}/>
                    <Route exact path="/catalog" component={CatalogPage}/>
                    <Route exact path="/stub" component={_404Page}/>
                    <Redirect to="/main"/>
                </Switch>
            </WrapperPage>
        )
    }

    return (
        <WrapperPage>
            <Switch>
                <Route exact path="/authorization" component={AuthPage}/>
                <PrivateRoute exact path="/profile" component={ProfilePage}/>
                <PrivateRoute exact path="/basket" component={BasketPage}/>
                <Route exact path="/catalog/product/:id" component={ProductPage}/>
                <Route exact path="/catalog" component={CatalogPage}/>
                <Route exact path="/stub" component={_404Page}/>
                <Route exact path="/main" component={LandingPage}/>
                <Redirect to="/main"/>
            </Switch>
        </WrapperPage>
    )
}

export function PrivateRoute({component, isAuthenticated, name, ...rest}) {
    return (
        <Route {...rest} render={({location}) =>
            isAuthenticated ? (component) : (
                <Redirect to={{
                    pathname: "/authorization",
                    state: {from: location}
                }}/>
            )
        }/>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserInfo: token => dispatch(fetchUserInfo(token)),
        clearUserInfo: () => dispatch(clearUserInfo())
    }
}
export const Routes = connect(mapStateToProps, mapDispatchToProps)(RoutesComponent)