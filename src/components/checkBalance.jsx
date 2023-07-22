import { useDispatch, useSelector } from "react-redux"
import { accountNumber, authentication } from "../redux/actionCreator"
import { useState } from "react";

const CheckBalance = (props) => {
    const { history } = props;
    const dispatch = useDispatch()
    const accNo = useSelector(state => state.accountNumber)
    const cardDetails = useSelector(state => state.cards)
    const [pinNumber, setPinNumber] = useState("")
    const [pinValidation, setPinValidation] = useState("")
    const [isValid, setIsValid] = useState(false)
    const accountHolderName = cardDetails.find(accDetails => accNo.toString().includes(accDetails.card_no))

    const handleContinueButton = () => {
        if (pinNumber === "") {
            setPinValidation("Please enter Pin Number")
        }
        else {
            setPinValidation("")
            checkPinNumber()
        }
    }

    const checkPinNumber = () => {

        if (pinNumber === accountHolderName.pin.toString()) {
            setIsValid(true)
            // dispatch(authentication(false))
            // dispatch(accountNumber(""))
            // history.push("/")
        }
        else {
            setPinValidation("Incorrect Pin")
        }
    }

    const handleCancelButton = () => {
        dispatch(authentication(false))
        dispatch(accountNumber(""))
        history.push("/")
    }

    return (
        <div>
            <div className="bg-[#062C30] h-[100vh] flex flex-col border-2  border-white items-center">
                <div className="text-3xl text-[#E2D784] mt-10 font-medium">Balance Enquiry</div>
                <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Enter the Pin</div>
                <input value={pinNumber} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="password" onChange={(e) => setPinNumber(e.target.value.replace(/\D/g, ""))} maxLength={"4"} />
                <div className="mt-5 text-[#E6DDC4] font-medium">{pinValidation}</div>
                {
                    isValid ? <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Available Balance : {accountHolderName.availableBalance}</div> : ""
                }
                <div className="mt-5 space-x-5">
                    <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleContinueButton}>
                        Continue
                    </button>
                    <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CheckBalance