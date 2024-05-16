import React, { useState, useRef } from "react";
import { OtpInputWrapper } from "./OtpInput.styles";
const OtpInput = ({ numInputs = 5, handelChangeValue }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const isValidDigit = /^\d$/.test(value);
    if (isValidDigit) {
      const newOtp = [...otp];
      newOtp[index] = value;

      setOtp(newOtp);
      handelChangeValue(...newOtp);

      // Focus on the next input if available
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value.length === 0) {
      // Clear the current value if the user deletes
      const newOtp = [...otp];
      newOtp[index] = "";

      setOtp(newOtp);
      // Focus on the previous input if available
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      // Focus on the previous input on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <OtpInputWrapper>
      {otp.map((value, index) => (
        <input
          placeholder="-"
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </OtpInputWrapper>
  );
};

export default OtpInput;
