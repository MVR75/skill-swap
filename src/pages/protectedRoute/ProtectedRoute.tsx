import React from 'react';
import {useSelector} from 'react-redux';
import {Outlet, Navigate} from 'react-router-dom';
import type { Role, User } from '../../entities/types';
import type { RootState } from '../../app/store';

export const ProtectedRoute = ({accessRoles}: {accessRoles: Role[]}) => {
    // const { user, isInit, isLoading } = useSelector((store: RootState) => store.user);
    const isInit = true;
    const isLoading = false;
    const user: User = {id: "user2",
    email: "ivan@example.com",
    name: "Иван",
    date: "28.10.1999",
    gender: "мужской",
    role: "user",
    skills: ["2"]}

    if (!isInit || isLoading) {
        return <div>Загрузка...</div>
    }

    if (!user || !accessRoles.includes(user.role)) {
        return <Navigate to="/register" />;
    }

    return <Outlet />;
};