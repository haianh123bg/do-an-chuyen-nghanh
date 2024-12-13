import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    CircularProgress,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import { fetchChangeBank } from 'src/store/user/account/changeBankSlice';
import { fetchGetUserInfo, setBank } from 'src/store/user/account/getUserInfoSlice';
import { SnackbarProps } from 'src/types/components/snackbar';
import { ApiResponse } from 'src/types/services/response/response';
import * as Yup from 'yup';

const BankInformation = () => {
    const [editing, setEditing] = useState(false);
    const [config, setConfig] = useState<SnackbarProps>({
        open: false,
        content: '',
        severity: 'error',
    });

    const dataUserInfo = useSelector((state: AppState) => state.getUserInfo.data);
    const loadingUserInfo = useSelector((state: AppState) => state.getUserInfo.loading);
    const loadingChangeBank = useSelector((state: AppState) => state.changeBankSlice.loading);
    useEffect(() => {
        if (dataUserInfo?.code != 200) {
            dispatch(fetchGetUserInfo());
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            bankName: dataUserInfo.result.bankName,
            accountNumber: dataUserInfo.result.accountNumber,
            accountHolder: dataUserInfo.result.accountName,
            branch: dataUserInfo.result.bankBranch,
        },
        validationSchema: Yup.object({
            bankName: Yup.string().required('Tên ngân hàng là bắt buộc'),
            accountNumber: Yup.string()
                .matches(/^[0-9]+$/, 'STK chỉ chứa số')
                .required('STK là bắt buộc'),
            accountHolder: Yup.string().required('Tên đầy đủ chủ ngân hàng là bắt buộc'),
            branch: Yup.string().required('Chi nhánh là bắt buộc'),
        }),
        onSubmit: (_values, { setSubmitting }) => {
            if (!formik.isValid) {
                return;
            }
            setEditing(false);
            setSubmitting(false);
        },
    });
    const handleSaveClick = async () => {
        const responseChangeBank = await dispatch(
            fetchChangeBank({
                accountName: formik.values.accountHolder,
                accountNumber: formik.values.accountNumber,
                bankBranch: formik.values.branch,
                bankCode: 'MB',
                bankName: formik.values.bankName,
            }),
        );
        const dataChangeBank = responseChangeBank.payload as ApiResponse<void>;

        if (dataChangeBank.code == 200) {
            setConfig({
                content: dataChangeBank.message || 'Cập nhật thành công',
                open: true,
                severity: 'success',
            });
            dispatch(
                setBank({
                    accountName: formik.values.accountHolder,
                    accountNumber: formik.values.accountNumber,
                    bankBranch: formik.values.branch,
                    bankCode: 'MB',
                    bankName: formik.values.bankName,
                }),
            );
            setEditing(false);
        } else {
            setConfig({
                content: dataChangeBank.message || 'Có lỗi xảy ra',
                open: true,
                severity: 'success',
            });
        }
    };
    const handleEditClick = () => {
        setEditing(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            formik.handleSubmit();
        }
    };

    const renderField = (field: string, label: string) => {
        return (
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6" fontWeight="500" sx={{ width: '200px' }}>
                    {label}:
                </Typography>
                {editing ? (
                    <>
                        <TextField
                            name={field}
                            value={formik.values[field as keyof typeof formik.values]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched[field as keyof typeof formik.touched] &&
                                Boolean(formik.errors[field as keyof typeof formik.errors])
                            }
                            helperText={
                                formik.touched[field as keyof typeof formik.touched] &&
                                formik.errors[field as keyof typeof formik.errors]
                            }
                            onKeyDown={handleKeyDown}
                            sx={{ flexGrow: 1, mr: 1 }}
                            size="small"
                        />
                    </>
                ) : (
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {formik.values[field as keyof typeof formik.values]}
                    </Typography>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ padding: 3, borderRadius: 1, boxShadow: 3, margin: '0 auto' }}>
            <Typography mb={4} variant="h4" fontWeight="600" gutterBottom display={'flex'} gap={1}>
                <AccountBalanceIcon /> <span>Thông tin ngân hàng</span>
            </Typography>
            {loadingUserInfo ? (
                <CircularProgress />
            ) : (
                <>
                    {renderField('bankName', 'Tên Ngân Hàng')}
                    {renderField('branch', 'Chi nhánh')}
                    {renderField('accountNumber', 'Số tài khoản')}
                    {renderField('accountHolder', 'Chủ ngân hàng')}
                </>
            )}

            <LoadingButton
                variant="contained"
                onClick={editing ? handleSaveClick : handleEditClick}
                sx={{ mt: 2, marginLeft: 'auto', display: 'block' }}
                loading={loadingChangeBank}
            >
                {editing ? 'Lưu' : 'Sửa'}
            </LoadingButton>
            <Snackbar
                open={config.open}
                autoHideDuration={5000}
                onClose={() =>
                    setConfig({
                        ...config,
                        open: false,
                    })
                }
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    variant="filled"
                    severity={config.severity}
                    sx={{ width: '100%', display: 'flex', alignItems: 'center', px: 3 }}
                >
                    {config.content}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BankInformation;
