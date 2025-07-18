import { useState } from "react";
import { Stepper, Container } from "@mantine/core";
import {
    IconShoppingCart,
    IconClipboardCheck,
    IconCreditCard,
    IconTruckDelivery,
    IconCircleCheck,
} from "@tabler/icons-react";
import StepCart from "./StepCart";
import StepReview from "./StepReview";
import StepCheckout from "./StepCheckout";

import MainLayout from "@/Layouts/MainLayout";
import OrderSuccess from "./OrderSuccess";
import GuestLayout from "@/Layouts/GuestLayout";

const CheckoutPage = () => {
    const [active, setActive] = useState(0);
    const [orderId, setOrderId] = useState(null);

    const nextStep = () => setActive((current) => current + 1);
    const prevStep = () => setActive((current) => current - 1);
    const completeOrder = (id) => {
        setOrderId(id);
        nextStep();
    };

    const steps = [
        {
            label: "Cart",
            description: "Your items",
            icon: <IconShoppingCart size={18} />,
            component: <StepCart onNext={nextStep} />,
        },
        {
            label: "Review",
            description: "Order details",
            icon: <IconClipboardCheck size={18} />,
            component: <StepReview onNext={nextStep} onBack={prevStep} />,
        },
        {
            label: "Payment",
            description: "Secure checkout",
            icon: <IconCreditCard size={18} />,
            component: (
                <StepCheckout
                    onNext={nextStep}
                    onBack={prevStep}
                    onComplete={completeOrder}
                />
            ),
        },
        // {
        //     label: "Shipping",
        //     description: "Delivery info",
        //     icon: <IconTruckDelivery size={18} />,
        //     component: null, // Not implemented in this example
        // },
        {
            label: "Complete",
            description: "Order confirmed",
            icon: <IconCircleCheck size={18} />,
            component: <OrderSuccess orderId={orderId} />,
        },
    ];

    return (
        <Container size="md" my="xl">
            <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                iconSize={32}
                allowNextStepsSelect={false}
            >
                {steps.map((step, index) => (
                    <Stepper.Step
                        key={index}
                        icon={step.icon}
                        label={step.label}
                        description={step.description}
                        completed={active > index}
                    />
                ))}
            </Stepper>

            <div className="mt-8">{steps[active].component}</div>
        </Container>
    );
};

CheckoutPage.layout = (page) => (
    <GuestLayout title="Checkout">{page}</GuestLayout>
);

export default CheckoutPage;
