import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as Yup from 'yup';
import PublisherTable from "../datatable/Publisher";

interface PropsDialog {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectID: string | null,
    checkValue: string | null,
    setCheckValue: React.Dispatch<React.SetStateAction<string | null>>
}

interface PropsTitle {
    title: string,
    dataIndex: string
}

const RPointDialog = ({ open, setOpen, checkValue, setCheckValue, selectID }: PropsDialog) => {

    const emptyInitialValues = useMemo(() => ({
        package: '',
        points: '',
        money: '',
        model: '',
        function: '',
        totalBuy: '',
        strategy: '',
        files: '',
        totalFunction: '',
        createDate: ''
    }), [])


    const [initialValues, setInitialValues] = useState(emptyInitialValues);

    const validateSchema = Yup.object({
        package: Yup.string()
            .required('Tên gói R-Point là bắt buộc.'),
        points: Yup.string()
            .required('Số Point là bắt buộc.'),
        money: Yup.string()
            .required('Số tiền là bắt buộc.'),
        model: Yup.string()
            .required('Model là bắt buộc.'),
        function: Yup.string()
            .required('Hành động là bắt buộc.'),
        strategy: Yup.string()
            .required('Chiến lược là bắt buộc.'),
        files: Yup.string()
            .required('Files là bắt buộc.'),
        function2: Yup.string()
            .required('Hành động là bắt buộc.'),
        totalFunction: Yup.string()
            .required('totalFunction là bắt buộc.'),
        totalBuy: Yup.string()
            .required('totalBuy là bắt buộc.')
    })

    const handleSubmit = (values: typeof emptyInitialValues, { resetForm }: FormikHelpers<typeof emptyInitialValues>) => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        const formData = { ...values, createDate: formattedDate };
        setOpen(false);
        console.log(formData);
        resetForm();

    }

    const handleClose = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>, resetForm: () => void) => {
        setOpen(false);
        resetForm();
    };

    useEffect(() => {
        if (checkValue === 'add') {
            setInitialValues(emptyInitialValues);
        } else {
            const data = PublisherTable.find((item) => item.id === selectID);
            if (data) {
                setInitialValues({
                    package: data.package,
                    points: data.points,
                    money: data.money,
                    model: data.model,
                    function: data.function,
                    totalBuy: data.totalBuy,
                    strategy: data.strategy,
                    files: data.files,
                    totalFunction: data.totalFunction,
                    createDate: data.createDate
                })
            }
        }
    }, [checkValue, selectID, emptyInitialValues])


    const form: PropsTitle[] = [
        {
            title: 'Tên gói R-Point',
            dataIndex: 'package'
        },
        {
            title: 'Model',
            dataIndex: 'model'
        },
        {
            title: 'Số Points',
            dataIndex: 'points'
        },
        {
            title: 'Giá tiền',
            dataIndex: 'money'
        },
        // {
        //     title: 'Function',
        //     dataIndex: 'function'
        // },
        // {
        //     title: 'Chiến lược',
        //     dataIndex: 'strategy'
        // },
        // {
        //     title: 'Files (slot)',
        //     dataIndex: 'files'
        // },
        // {
        //     title: 'Function (slot)',
        //     dataIndex: 'totalFunction'
        // },

    ]

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-describedby"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle
                id='alert-dialog-title'
                sx={{
                    textAlign: 'center',
                    paddingBottom: 5,
                    paddingTop: 3
                }}
            >
                Thêm gói R-Point
            </DialogTitle>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={false}
            >
                {({ resetForm }) => (
                    <Form>
                        <DialogContent >
                            <Grid container spacing={2}>
                                {form.map((item, index) => {
                                    return (
                                        <Grid item xs={6} key={index}>
                                            <Typography variant="h6">
                                                {item.title}
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name={item.dataIndex}
                                                fullWidth
                                                margin="normal"
                                                // InputProps={{
                                                //     endAdornment: (
                                                //         <InputAdornment position="end">
                                                //             <img
                                                //                 src={icontext}
                                                //                 alt="icon"
                                                //                 style={{ width: '24px', height: '24px' }}
                                                //             />
                                                //         </InputAdornment>
                                                //     ),
                                                // }}
                                                helperText={
                                                    <ErrorMessage name={item.dataIndex}>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </DialogContent>

                        {/* <Grid
                                container
                                spacing={3}
                                justifyContent="center"

                            >
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Tên gói R-Point
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='package'
                                                fullWidth
                                                margin='normal'
                                                helperText={
                                                    <ErrorMessage name='package'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Số Points
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='points'
                                                fullWidth
                                                margin="normal"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <img
                                                                src={icontext}
                                                                alt="icon"
                                                                style={{ width: '24px', height: '24px' }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                helperText={
                                                    <ErrorMessage name='points'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Giá tiền
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='money'
                                                fullWidth
                                                margin='normal'
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            VNĐ
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                helperText={
                                                    <ErrorMessage name='money'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Tên Model
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='model'
                                                fullWidth
                                                margin='normal'
                                                helperText={
                                                    <ErrorMessage name='model'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Tên hành động
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='function'
                                                fullWidth
                                                margin='normal'
                                                helperText={
                                                    <ErrorMessage name='function'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Chiến lược
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='strategy'
                                                fullWidth
                                                margin='normal'
                                                helperText={
                                                    <ErrorMessage name='strategy'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Files
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='files'
                                                fullWidth
                                                margin='normal'
                                                helperText={
                                                    <ErrorMessage name='files'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Typography variant="h6">
                                                Hành động 2
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                name='totalFunction'
                                                fullWidth
                                                margin='normal'
                                                helperText={
                                                    <ErrorMessage name='totalFunction'>
                                                        {(msg) => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                    </ErrorMessage>
                                                }
                                                FormHelperTextProps={{ sx: { ml: 0 } }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        <DialogActions >
                            <Button
                                onClick={(event) => handleClose(event, resetForm)}
                                variant="contained"
                                color='error'
                            >
                                Đóng
                            </Button>
                            <Button
                                type="submit"
                                variant='contained'
                            >
                                Thêm
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>

        </Dialog>
    )
}

export default RPointDialog
