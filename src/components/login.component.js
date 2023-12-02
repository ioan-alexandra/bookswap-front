import React, {useCallback, useState} from "react";

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Alert, Box, Button, Link, Stack, Tab, Tabs, TextField, Typography} from '@mui/material';
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [method, setMethod] = useState('email');

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
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
                await AuthService.login(values.username, values.password);
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
                    backgroundColor: 'background.paper',
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
                                Login
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Don&apos;t have an account?
                                &nbsp;
                                <Link
                                    href="/auth/register"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Register
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
                                label="Google Auth"
                                value="googleAuth"
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
                                        label="username"
                                        name="username"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.username}
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
                                    Continue
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
                        {method === 'googleAuth' && (
                            <div>
                                <Typography
                                    sx={{mb: 1}}
                                    variant="h6"
                                >
                                    Not available in the demo
                                </Typography>
                            </div>
                        )}
                    </div>
                </Box>
            </Box>
        </>
    );

}

