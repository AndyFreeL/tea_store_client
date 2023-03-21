import React from "react";
import Admin from "./pages/Admin";
import {ADMIN_ROUTE, BASKET_ROUTE, DRINK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./consts";
import Basket from "./pages/Basket";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DrinkPage";
import Shop from "./pages/Shop";

export const authRoutes =[
    {
        path:ADMIN_ROUTE,
        Component:<Admin/>
    },
    {
        path:BASKET_ROUTE,
        Component:<Basket/>
    }
]

export const publicRoutes =[
    {
        path:SHOP_ROUTE,
        Component:<Shop/>
    },
    {
        path:LOGIN_ROUTE,
        Component:<Auth/>
    },
    {
        path:REGISTRATION_ROUTE,
        Component:<Auth/>
    },
    {
        path:DRINK_ROUTE + '/:id',
        Component:<DevicePage/>
    }
]