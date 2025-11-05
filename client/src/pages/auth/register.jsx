import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { registerUser } from "@/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const initialState = {
    userName: '',
    email: '',
    password: ''
}

function AuthRegister() {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(event) {
        event.preventDefault();

        // Frontend validation
        if (!formData.userName || !formData.email || !formData.password) {
            toast.error('All fields are required');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast.success(data?.payload?.message)
                navigate('/auth/login')
            } else {
                // Handle both fulfilled with error and rejected cases
                const errorMessage = data?.payload?.message || data?.error?.message || 'Registration failed'
                toast.error(errorMessage)
            }
        })
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
                <p className="mt-2 ">Already have an account?
                    <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/login'>Login</Link>
                </p>

            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthRegister