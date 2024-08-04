import React from "react";
import { useSelector} from "react-redux";
import { Outlet } from "react-router-dom";
import SignUp from "../signup/SignUp";

export default function PrivateRoute() {
    const { currentUser } = useSelector(state => state.user);
    return currentUser ? <Outlet /> : <SignUp/>
}