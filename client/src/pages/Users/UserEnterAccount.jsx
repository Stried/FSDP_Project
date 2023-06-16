import React, { useContext } from "react";
import "./../../App.css";
import FormInputSingleLine from "./../../components/FormInputSingleLine";
import FormInputMultiLine from "./../../components/FormInputMultiLine";
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";

function UserEnterAccount() {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const navigate = useNavigate();
	const { setUser } = useContext(UserContext); // TODO: Why is this not a function

	const formik = useFormik({
		initialValues: {
			emailAccount: "",
			password: "",
		},
		validationSchema: yup.object().shape({
			emailAccount: yup
				.string()
				.email("Please enter a valid email address.")
				.required("Email is required"),
			password: yup
				.string()
				.min(8, "Passwords are least 8 characters.")
				.max(30, "Passwords are most 30 characters.")
				.required(),
		}),
		onSubmit: async (data) => {
			data.emailAccount = data.emailAccount.trim();
			data.password = data.password.trim();

			await http
				.post("/user/login", data)
				.then((res) => {
					localStorage.setItem("accessToken", res.data.accessToken);
					setUser(res.data.user);
					navigate("/");
				})
				.catch(function (err) {
					console.log(err);
					toast.error(`${err.response.data.message}`);
				});
		},
	});

	return (
		<Box component={"div"} className="py-5 ml-10">
			<div className="bg-transparent w-1/2 py-3 rounded-lg ">
				<Box>
					<Typography
						variant="h4"
						className="text-green-600 dark:text-green-400"
					>
						Welcome Back!
					</Typography>
				</Box>

				<Box component={"form"} onSubmit={formik.handleSubmit}>
					<FormInputSingleLine
						name="Email Address"
						valueName="emailAccount"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.emailAccount}
						error={
							formik.touched.emailAccount && Boolean(formik.errors.emailAccount)
						}
						helperText={
							formik.touched.emailAccount && formik.errors.emailAccount
						}
					/>
					<FormInputSingleLine
						name="Password"
						valueName="password"
						type={showPassword ? "text" : "password"}
						onChange={formik.handleChange}
						value={formik.values.password}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>

					<div className="text-black dark:text-white">
						<input type="checkbox" id="rememberMe" className="" />
						<label for="rememberMe" className="mx-1 py-auto">
							Remember Me
						</label>
					</div>

					<ToastContainer />

					<Typography className="opacity-60 mb-4 text-black dark:text-white">
						Do not have an account?{" "}
						<span className="text-blue-400">
							<Link to="/user/createAccount">Sign Up</Link>
						</span>
					</Typography>

					<Box className="flex">
						<Box className="w-1/4 py-1">
							<Button
								variant="contained"
								type="submit"
								className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
							>
								Log In
							</Button>
						</Box>

						<Box className="w-1/4 py-1">
							<Button
								variant="contained"
								type="reset"
								className="bg-red-400 text-black hover:bg-red-600 hover:text-white"
							>
								Clear
							</Button>
						</Box>
					</Box>
				</Box>
			</div>
		</Box>
	);
}

export default UserEnterAccount;
