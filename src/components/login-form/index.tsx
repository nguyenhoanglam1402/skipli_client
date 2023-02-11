import { ChangeEvent, useState } from "react";
import { createNewOTP, validateOTP } from "../../services/accessCode.services";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await validateOTP({ phoneNumber, otp });
    if (response.status === 200) {
      localStorage.setItem("phoneNumber", phoneNumber);
    }
  };

  const getOTP = async () => {
    const response = await createNewOTP({ phoneNumber: phoneNumber });
    if (response.status === 200) {
      alert("Please check your phone");
    }
  };

  const onPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value);
  const onOTPChange = (event: ChangeEvent<HTMLInputElement>) => setOtp(event.target.value);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <form className="flex flex-col w-1/2 m-auto p-2" onSubmit={handleSubmit}>
        <input className="text-center border-blue-500" name="phone" type="text" placeholder="Phone Number"
               value={phoneNumber} onChange={onPhoneNumberChange} />
        <input className="text-center" type="text" name="otp"
               value={otp}
               onChange={onOTPChange} placeholder="OTP" />
        <div className="flex flex-row gap-5 justify-center">
          <button className="text-blue-600 font-semibold" type="button" onClick={getOTP}>Get OTP</button>
          {otp.length === 6 && <button className="font-semibold" type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
