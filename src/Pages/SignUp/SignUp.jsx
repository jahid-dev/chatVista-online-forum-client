import  { useContext } from 'react';
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            await updateUserProfile(data.name, data.photoURL);

            const userInfo = {
                name: data.name,
                email: data.email
            };

            const response = await axiosPublic.post('/users', userInfo);

            if (response.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
            <Card color="transparent" shadow={false} className="w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <Typography variant="h4" color="blue-gray" className="text-center mb-4">
                        Sign Up
                    </Typography>

                    <div className="mb-4">
                        <Input
                            size="lg"
                            placeholder="Your Name"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>

                    <div className="mb-4">
                        <Input
                            size="lg"
                            placeholder="Photo URL"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            {...register("photoURL", { required: true })}
                        />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                    </div>

                    <div className="mb-4">
                        <Input
                            size="lg"
                            placeholder="Your Email"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>

                    <div className="mb-4">
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                        />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase, one lowercase, one number, and one special character.</p>}
                    </div>

                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree to the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900 ml-1"
                                >
                                    Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "mt-2" }}
                    />
                    <Button className="mt-6" fullWidth type="submit">
                        Sign Up
                    </Button>
                </form>

                <p className="px-6 mt-4 text-center text-sm text-gray-600">
                    <small>
                        Already have an account?
                    </small>
                    <Link className="ml-4 font-extrabold" to="/login">Login</Link>
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

export default SignUp;
