// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { sum } from 'lodash';
import { Box, Stack, Button } from '@mui/material';
import AddToCart from '../productCart/AddToCart';

import { IconArrowBack } from '@tabler/icons-react';
import { useSelector } from 'src/store/Store';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FinalStep from './FinalStep';
import { ProductType } from 'src/types/apps/eCommerce';

const ProductCheckout = () => {
    const checkout = useSelector((state) => state.ecommerceReducer.cart);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const total = sum(checkout.map((product: ProductType) => product.price * product.qty));
    const Discount = Math.round(total * (5 / 100));

    return (
        <Box>
            {/* Removed HorizontalStepper to hide the steps */}

            {/* ------------------------------------------- */}
            {/* Checkout Steps logic */}
            {/* ------------------------------------------- */}
            {activeStep === 0 ? (
                <>
                    <Box my={0}>
                        <AddToCart />
                    </Box>
                    {checkout.length > 0 ? (
                        <>
                            {/* Cart Total */}
                            <FirstStep total={total} Discount={Discount} />
                            <Stack direction={'row'} justifyContent="space-between">
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Quay lại
                                </Button>
                                <Button variant="contained" onClick={handleNext}>
                                    Thanh toán
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        ''
                    )}
                </>
            ) : activeStep === 1 ? (
                // <>
                //   {/* Billing & Address */}
                //   <SecondStep nexStep={handleNext} />
                //   <FirstStep total={total} Discount={Discount} />
                //   <Stack direction={'row'} justifyContent="space-between">
                //     <Button color="inherit" disabled={activeStep !== 1} onClick={handleBack}>
                //       Back
                //     </Button>
                //     <Button color="inherit" variant="outlined">
                //       Select Address to go next
                //     </Button>
                //   </Stack>
                // </>

                <>
                    {/* Payment */}
                    <ThirdStep />
                    <FirstStep total={total} Discount={Discount} />
                    <Stack direction={'row'} justifyContent="space-between">
                        <Button color="inherit" disabled={activeStep !== 1} onClick={handleBack}>
                            <IconArrowBack /> Quay lại
                        </Button>
                        <Button onClick={handleNext} size="large" variant="contained">
                            hoàn tất đơn hàng
                        </Button>
                    </Stack>
                </>
            ) : (
                <>
                    <FinalStep />
                </>
            )}
        </Box>
    );
};

export default ProductCheckout;
