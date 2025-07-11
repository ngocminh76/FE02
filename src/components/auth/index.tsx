import type React from "react"
import { useCurrentApp } from "components/context/app.context";
import { Button, Result } from "antd";
import { useLocation } from "react-router-dom";

interface IProps {
    children: React.ReactNode
}
const ProtectedRoute = (props: IProps) => {

    const location = useLocation();
    const { isAuthenticated, user } = useCurrentApp();
    if (isAuthenticated === false) {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
            />)
    }

    const isAdminRoute = location.pathname.includes("admin")
    if (isAuthenticated === true && isAdminRoute === true) {
        const role = user?.role
        if (role == "USER") {
            return (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary">Back Home</Button>}
                />)
        }
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedRoute