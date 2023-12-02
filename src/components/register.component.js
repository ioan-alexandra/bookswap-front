import React, {useCallback, useState} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';

import AuthService from "../services/auth.service";
import {Alert, Box, Button, Link, Stack, Tab, Tabs, TextField, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [method, setMethod] = useState('email');

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            username: Yup
                .string()
                .max(255)
                .required('Username is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await AuthService.register(values.username, values.email, values.password, ["user"]);
                navigate("/profile");
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

    const handleMethodChange = useCallback(
        (event, value) => {
            setMethod(value);
        },
        []
    );

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{mb: 3}}
                        >
                            <Typography variant="h4">
                                Register
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Already have an account?
                                &nbsp;
                                <Link
                                    href="/auth/register"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Log in
                                </Link>
                            </Typography>
                        </Stack>
                        <Tabs
                            onChange={handleMethodChange}
                            sx={{mb: 3}}
                            value={method}
                        >
                            <Tab
                                label="Email"
                                value="email"
                            />
                            <Tab
                                label="Phone Number"
                                value="phoneNumber"
                            />
                        </Tabs>
                        {method === 'email' && (
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Stack spacing={3}>

                                    <TextField
                                        error={!!(formik.touched.username && formik.errors.username)}
                                        fullWidth
                                        helperText={formik.touched.username && formik.errors.username}
                                        label="Username"
                                        name="username"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.username}
                                    />

                                    <TextField
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        fullWidth
                                        helperText={formik.touched.email && formik.errors.email}
                                        label="Email Address"
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="email"
                                        value={formik.values.email}
                                    />

                                    <TextField
                                        error={!!(formik.touched.password && formik.errors.password)}
                                        fullWidth
                                        helperText={formik.touched.password && formik.errors.password}
                                        label="Password"
                                        name="password"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.password}
                                    />
                                </Stack>

                                {formik.errors.submit && (
                                    <Typography
                                        color="error"
                                        sx={{mt: 3}}
                                        variant="body2"
                                    >
                                        {formik.errors.submit}
                                    </Typography>
                                )}
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{mt: 3}}
                                    type="submit"
                                    variant="contained"
                                >
                                    Register
                                </Button>
                                <Alert
                                    color="primary"
                                    severity="info"
                                    sx={{mt: 3}}
                                >
                                    <div>
                                        You can use <b>demo@bookswap.io</b> and password <b>Password123!</b>
                                    </div>
                                </Alert>
                            </form>
                        )}
                        {method === 'phoneNumber' && (
                            <div>
                                <Typography
                                    sx={{mb: 1}}
                                    variant="h6"
                                >
                                    Not available in the demo
                                </Typography>
                                <Typography color="text.secondary">
                                    To prevent unnecessary costs we disabled this feature in the demo.
                                </Typography>
                            </div>
                        )}
                    </div>
                </Box>
            </Box>
        </>
    );
}