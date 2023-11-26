import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
            <Card color="transparent" shadow={false} className="w-full max-w-md">
                <form onSubmit={handleLogin} className="card-body">
                    <Typography variant="h4" color="blue-gray" className="text-center mb-4">
                        Login
                    </Typography>

                    <div className="mb-6 mt-4">
                        <Input
                            size="lg"
                            placeholder="Email"
                            name="email"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                    </div>

                    <div className="mb-6">
                        <Input
                            type="password"
                            size="lg"
                            placeholder="Password"
                            name="password"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                        <Typography className="mt-2">
                            <Link to="#" className="text-blue-500 hover:underline">Forgot password?</Link>
                        </Typography>
                    </div>

                    <div className="mb-6">
                        <Button className="btn-primary" type="submit" fullWidth>
                            Login
                        </Button>
                    </div>
                </form>
                <p className="px-6 mt-4 text-center text-sm text-gray-600">
                <small>New Here? <Link to="/signup">Create an account</Link></small>
                </p>
                <div className="flex flex-col mx-auto">
                    <p className="my-3">or</p>
                    <div>
                        <SocialLogin />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Login;
